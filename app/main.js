const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());

var angular = require('angular');//引入angular
require('ngtouch');
var app = angular.module('myApp',["ngTouch"]);//定义一个angular模块
require('./directives/hello-world/hello-world.js')(app);//引入指令(directive)文件
//require('./directives/batch-upload-files/batch-upload-files.js')(app);
require('./controller/touchCtrl.js')(app);
require('./css/style.css');//引入样式文件