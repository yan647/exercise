const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());

var angular = require('angular');//引入angular
require('ngtouch');
//require('angular-ui-router');
var app = angular.module('myApp',["ngTouch"/*,'angular-ui-router'*/]);//定义一个angular模块
require('./directives/hello-world/hello-world.js')(app);//引入指令(directive)文件
//require('./directives/angular-sortable-view/angular-sortable-view.js')(app);
//require('./directives/batch-upload-files/batch-upload-files.js')(app);
require('./controller/indexCtrl.js')(app);
require('./css/style.css');//引入样式文件