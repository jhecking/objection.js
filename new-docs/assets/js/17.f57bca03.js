(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{182:function(t,e,s){"use strict";s.r(e);var o=s(0),n=Object(o.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("p",[t._v("You can use "),s("a",{attrs:{href:"https://github.com/Vincit/objection.js/issues",target:"_blank",rel:"noopener noreferrer"}},[t._v("github issues"),s("OutboundLink")],1),t._v(" to request features and file bug reports. An issue is also a good place to ask questions. We are happy to help out if you have reached a dead end, but please try to solve the problem yourself first. The "),s("a",{attrs:{href:"https://gitter.im/Vincit/objection.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("gitter chat"),s("OutboundLink")],1),t._v(" is also a good place to ask for help.")]),t._v(" "),s("p",[t._v("When creating an issue there are couple of things you need to remember:")]),t._v(" "),s("ol",[t._m(2),t._v(" "),t._m(3),t._v(" "),s("li",[s("p",[s("strong",[t._v("Provide enough information about the problem for others to reproduce it.")]),t._v(" The fastest way to get your bug fixed or problem solved is to create a simple standalone app or a test case that demonstrates your problem. There's a file called "),s("a",{attrs:{href:"https://github.com/Vincit/objection.js/blob/master/reproduction-template.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("reproduction-template.js"),s("OutboundLink")],1),t._v(" you can use as a starting point for your reproduction. If that's too much work then at least provide the code that fails with enough context and any possible stack traces. Please bear in mind that objection has hundreds of tests and if you run into a problem, say with "),s("code",[t._v("insert")]),t._v(" function, it doesn't mean that "),s("code",[t._v("insert")]),t._v(" is completely broken, but some small part of it you are using is. That's why enough context is necessary. It's not enough to say, \"insert fails\". You need to provide the code that fails and usually the models that are used too. And don't write made up code! When you do, you only write the parts you think are relevant and usually leave out the useful information. Use the actual code that you have tested to fail.")])])]),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("If you have found a bug or want to add a feature, pull requests are always welcome! It's better to create an issue first to open a discussion if the feature is something that should be added to objection. In case of bugfixes it's also a good idea to open an issue indicating that you are working on a fix.")]),t._v(" "),s("p",[t._v("For a pull request to get merged it needs to have the following things:")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),s("p",[t._v("Code and tests need to be written in ES2015 subset supported by node 6.0.0. The best way to make sure of this is to develop with the correct node version. "),s("a",{attrs:{href:"https://github.com/creationix/nvm",target:"_blank",rel:"noopener noreferrer"}},[t._v("nvm"),s("OutboundLink")],1),t._v(" is a great tool for swapping between node versions. "),s("code",[t._v("prettier")]),t._v(" is used to format the code. Remember to run "),s("code",[t._v("npm run prettier")]),t._v(" before committing code.")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"contribution-guide"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#contribution-guide","aria-hidden":"true"}},[this._v("#")]),this._v(" Contribution guide")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"issues"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#issues","aria-hidden":"true"}},[this._v("#")]),this._v(" Issues")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("p",[e("strong",[this._v("Update to the latest version of objection if possible and see if the problem remains.")]),this._v(" If updating is not an option you can still request critical bug fixes for older versions.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("p",[e("strong",[this._v("Describe your problem.")]),this._v(" What is happening and what you expect to happen.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"pull-requests"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pull-requests","aria-hidden":"true"}},[this._v("#")]),this._v(" Pull requests")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ol",[s("li",[s("p",[s("strong",[t._v("A good description of what the PR fixes or adds. You can just add a link to the corresponding issue.")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Tests that verify the fix/feature.")]),t._v(" It's possible to create a PR without tests and ask for someone else to write them but in that case it may take a long time or forever until someone finds time to do it. "),s("em",[t._v("Untested code will never get merged!")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("For features you also need to write documentation. See the "),s("a",{attrs:{href:"#development-setup"}},[t._v("development setup")]),t._v(" section for instructions on how to write documentation.")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"development-setup"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#development-setup","aria-hidden":"true"}},[this._v("#")]),this._v(" Development setup")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[e("p",[e("strong",[this._v("Fork objection in github")])])]),this._v(" "),e("li",[e("p",[e("strong",[this._v("Clone objection")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[this._v("git")]),this._v(" clone git@github.com:"),e("span",{pre:!0,attrs:{class:"token operator"}},[this._v("<")]),this._v("your-account"),e("span",{pre:!0,attrs:{class:"token operator"}},[this._v(">")]),this._v("/objection.js.git objection\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",{attrs:{start:"3"}},[e("li",[e("p",[e("strong",[this._v("Install MySQL and PostgreSQL or alternatively run "),e("code",[this._v("docker-compose up")]),this._v(" in the repo root")])])]),this._v(" "),e("li",[e("p",[e("strong",[this._v("Create test users and databases")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("psql -U postgres -c "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CREATE USER objection SUPERUSER"')]),t._v("\npsql -U postgres -c "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CREATE DATABASE objection_test"')]),t._v("\nmysql -u root -e "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CREATE USER objection"')]),t._v("\nmysql -u root -e "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GRANT ALL PRIVILEGES ON *.* TO objection"')]),t._v("\nmysql -u root -e "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CREATE DATABASE objection_test"')]),t._v("\n")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ol",{attrs:{start:"5"}},[s("li",[s("p",[s("strong",[t._v("Run "),s("code",[t._v("npm test")]),t._v(" in objection's root to see if everything works.")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Run "),s("code",[t._v("npm run docs:dev")]),t._v(" and goto http://localhost:8080 to see the generated documentation site when you change the markdown files in the "),s("code",[t._v("doc")]),t._v(" folder.")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can run the tests on a subset of databases by setting the "),e("code",[this._v("DATABASES")]),this._v(" env variable")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Only run tests on sqlite. No need for postgres and mysql setup.")]),t._v("\nDATABASES"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("sqlite3 "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),t._v("\n")])])])}],!1,null,null,null);e.default=n.exports}}]);