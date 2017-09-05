'use strict';

const path = require('path');
const sortBy = require('lodash/sortBy');
const values = require('lodash/values');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');
const isSubclassOf = require('../utils/classUtils').isSubclassOf;
const resolveModel = require('../utils/resolveModel').resolveModel
const QueryBuilder = require('../queryBuilder/QueryBuilder');
const RelationProperty = require('./RelationProperty');
const getModel = () => require('../model/Model');
const ref = require('../queryBuilder/ReferenceBuilder').ref;

const RelationFindOperation = require('./RelationFindOperation');
const RelationUpdateOperation = require('./RelationUpdateOperation');
const RelationDeleteOperation = require('./RelationDeleteOperation');

class Relation {

  constructor(relationName, OwnerClass) {
    this.name = relationName;
    this.ownerModelClass = OwnerClass;
    this.relatedModelClass = null;

    this.ownerProp = null;
    this.relatedProp = null;

    this.joinTableModelClass = null;
    this.joinTableOwnerProp = null;
    this.joinTableRelatedProp = null;
    this.joinTableExtras = [];

    this.modify = null;
  }

  setMapping(mapping) {

    let ctx = {
      mapping,
      ownerModelClass: this.ownerModelClass,
      relatedModelClass: null,
      relatedProp: null,
      ownerProp: null,
      modify: null,
      createError: (msg) => this.createError(msg)
    };

    ctx = checkOwnerModelClass(ctx);
    ctx = checkRelatedModelClass(ctx);
    ctx = resolveRelatedModelClass(ctx);
    ctx = checkRelation(ctx);
    ctx = createJoinProperties(ctx);
    ctx = parseModify(ctx);

    this.relatedModelClass = ctx.relatedModelClass;
    this.ownerProp = ctx.ownerProp;
    this.relatedProp = ctx.relatedProp;
    this.modify = ctx.modify;
  }

  get joinTable() {
    if (this.joinTableModelClass) {
      return this.joinTableModelClass.tableName;
    } else {
      return null;
    }
  }

  joinModelClass(knex) {
    if (knex && knex !== this.joinTableModelClass.knex()) {
      return this.joinTableModelClass.bindKnex(knex);
    } else {
      return this.joinTableModelClass;
    }
  }

  relatedTableAlias(builder) {
    const tableRef = builder.tableRefFor(this.relatedModelClass);

    return `${tableRef}_rel_${this.name}`;
  }

  isOneToOne() {
    return false;
  }

  clone() {
    const relation = new this.constructor(this.name, this.ownerModelClass);

    relation.relatedModelClass = this.relatedModelClass;
    relation.ownerProp = this.ownerProp;
    relation.relatedProp = this.relatedProp;
    relation.modify = this.modify;

    relation.joinTableModelClass = this.joinTableModelClass;
    relation.joinTableOwnerProp = this.joinTableOwnerProp;
    relation.joinTableRelatedProp = this.joinTableRelatedProp;
    relation.joinTableExtras = this.joinTableExtras;

    return relation;
  }

  bindKnex(knex) {
    const bound = this.clone();

    bound.relatedModelClass = this.relatedModelClass.bindKnex(knex);
    bound.ownerModelClass = this.ownerModelClass.bindKnex(knex);

    if (this.joinTableModelClass) {
      bound.joinTableModelClass = this.joinTableModelClass.bindKnex(knex);
    }

    return bound;
  }

  findQuery(builder, opt) {
    const relatedRefs = this.relatedProp.refs(builder);

    /* istanbul ignore if */
    if (opt.isColumnRef) {
      // This branch is only used by `objection-find`. Keep it for backward compat.
      for (let i = 0, l = relatedRefs.length; i < l; ++i) {
        builder.where(relatedRefs[i], ref(opt.ownerIds[i]));
      }
    } else if (containsNonNull(opt.ownerIds)) {
      builder.whereInComposite(relatedRefs, opt.ownerIds);
    } else {
      builder.resolve([]);
    }

    return builder.modify(this.modify);
  }

  join(builder, opt) {
    opt = opt || {};

    opt.joinOperation = opt.joinOperation || 'join';
    opt.relatedTableAlias = opt.relatedTableAlias || this.relatedTableAlias(builder);
    opt.relatedJoinSelectQuery = opt.relatedJoinSelectQuery || this.relatedModelClass.query().childQueryOf(builder);
    opt.relatedTable = opt.relatedTable || builder.tableNameFor(this.relatedModelClass);
    opt.ownerTable = opt.ownerTable || builder.tableRefFor(this.ownerModelClass);

    let relatedSelect = opt.relatedJoinSelectQuery
      .modify(this.modify)
      .as(opt.relatedTableAlias);

    if (relatedSelect.isSelectAll()) {
      // No need to join a subquery if the query is `select * from "RelatedTable"`.
      relatedSelect = `${opt.relatedTable} as ${opt.relatedTableAlias}`;
    }

    return builder
      [opt.joinOperation](relatedSelect, join => {
        const relatedProp = this.relatedProp;
        const ownerProp = this.ownerProp;

        for (let i = 0, l = relatedProp.size; i < l; ++i) {
          const relatedRef = relatedProp.ref(builder, i).table(opt.relatedTableAlias);
          const ownerRef = ownerProp.ref(builder, i).table(opt.ownerTable);

          join.on(relatedRef, ownerRef);
        }
      });
  }

  insert(builder, owner) {
    /* istanbul ignore next */
    throw this.createError('not implemented');
  }

  update(builder, owner) {
    return new RelationUpdateOperation('update', {
      relation: this,
      owner: owner
    });
  }

  patch(builder, owner) {
    return new RelationUpdateOperation('patch', {
      relation: this,
      owner: owner,
      modelOptions: {patch: true}
    });
  }

  find(builder, owners) {
    return new RelationFindOperation('find', {
      relation: this,
      owners: owners
    });
  }

  delete(builder, owner) {
    return new RelationDeleteOperation('delete', {
      relation: this,
      owner: owner
    });
  }

  relate(builder, owner) {
    /* istanbul ignore next */
    throw this.createError('not implemented');
  }

  unrelate(builder, owner) {
    /* istanbul ignore next */
    throw this.createError('not implemented');
  }

  // TODO: get rid of this monstrosity.
  mergeModels(models1, models2) {
    let modelClass;

    models1 = compact(models1);
    models2 = compact(models2);

    if (isEmpty(models1) && isEmpty(models2)) {
      return [];
    }

    if (!isEmpty(models1)) {
      modelClass = models1[0].constructor;
    } else {
      modelClass = models2[0].constructor;
    }

    let idProperty = modelClass.getIdPropertyArray();
    let modelsById = Object.create(null);

    for (let i = 0, l = models1.length; i < l; ++i) {
      const model = models1[i];
      const key = model.$propKey(idProperty);

      modelsById[key] = model;
    }

    for (let i = 0, l = models2.length; i < l; ++i) {
      const model = models2[i];
      const key = model.$propKey(idProperty);

      modelsById[key] = model;
    }

    return sortBy(values(modelsById), idProperty);
  }

  createError(message) {
    if (this.ownerModelClass && this.ownerModelClass.name && this.name) {
      return new Error(`${this.ownerModelClass.name}.relationMappings.${this.name}: ${message}`);
    } else {
      return new Error(`${this.constructor.name}: ${message}`);
    }
  }
}

function checkOwnerModelClass(ctx) {
  if (!isSubclassOf(ctx.ownerModelClass, getModel())) {
    throw ctx.createError(`Relation's owner is not a subclass of Model`);
  }

  return ctx;
}

function checkRelatedModelClass(ctx) {
  if (!ctx.mapping.modelClass) {
    throw ctx.createError('modelClass is not defined');
  }

  return ctx;
}

function resolveRelatedModelClass(ctx) {
  let relatedModelClass;

  try {
    relatedModelClass = resolveModel(ctx.mapping.modelClass, ctx.ownerModelClass.modelPaths, 'modelClass');
  } catch (err) {
    throw ctx.createError(err.message);
  }

  return Object.assign(ctx, {relatedModelClass});
}

function checkRelation(ctx) {
  if (!ctx.mapping.relation) {
    throw ctx.createError('relation is not defined');
  }

  if (!isSubclassOf(ctx.mapping.relation, Relation)) {
    throw ctx.createError('relation is not a subclass of Relation');
  }

  return ctx;
}

function createJoinProperties(ctx) {
  const mapping = ctx.mapping;

  if (!mapping.join || !mapping.join.from || !mapping.join.to) {
    throw ctx.createError('join must be an object that maps the columns of the related models together. For example: {from: "SomeTable.id", to: "SomeOtherTable.someModelId"}');
  }

  const fromProp = createRelationProperty(ctx, mapping.join.from, 'join.from');
  const toProp = createRelationProperty(ctx, mapping.join.to, 'join.to');

  let ownerProp;
  let relatedProp;

  if (fromProp.modelClass.tableName === ctx.ownerModelClass.tableName) {
    ownerProp = fromProp;
    relatedProp = toProp;
  } else if (toProp.modelClass.tableName === ctx.ownerModelClass.tableName) {
    ownerProp = toProp;
    relatedProp = fromProp;
  } else {
    throw ctx.createError('join: either `from` or `to` must point to the owner model table.');
  }

  if (relatedProp.modelClass.tableName !== ctx.relatedModelClass.tableName) {
    throw ctx.createError('join: either `from` or `to` must point to the related model table.');
  }

  return Object.assign(ctx, {ownerProp, relatedProp});
}

function createRelationProperty(ctx, refString, propName) {
  try {
    return new RelationProperty(refString, (table) => {
      return [ctx.ownerModelClass, ctx.relatedModelClass].find(it => it.tableName === table);
    });
  } catch (err) {
    if (err instanceof RelationProperty.ModelNotFoundError) {
      throw ctx.createError('join: either `from` or `to` must point to the owner model table and the other one to the related table.');
    } else {
      throw ctx.createError(`${propName} must have format TableName.columnName. For example "SomeTable.id" or in case of composite key ["SomeTable.a", "SomeTable.b"].`);
    }
  }
}

function parseModify(ctx) {
  const mapping = ctx.mapping;

  let modify = mapping.modify || mapping.filter;
  let type = typeof modify;

  if (modify && type === 'object') {
    const obj = modify;
    modify = (qb) => qb.where(obj);
  } else if (type !== 'function') {
    modify = () => {};
  }

  return Object.assign(ctx, {modify});
}

function containsNonNull(arr) {
  for (let i = 0, l = arr.length; i < l; ++i) {
    const val = arr[i];

    if (Array.isArray(val) && containsNonNull(val)) {
      return true;
    } else if (val !== null && val !== undefined) {
      return true;
    }
  }

  return false;
}

module.exports = Relation;