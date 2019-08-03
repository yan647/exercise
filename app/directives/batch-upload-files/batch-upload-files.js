//var app = require("../../../app.js");
module.exports = function(app) {
    'use strict';
    app.directive('batchUploadFiles', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                model: "=",
            },
            replace: true,
            //template:require('./batch-upload-files.html'),
            templageUrl: 'batch-upload-files.html',
            controller: ['$scope', function ($scope) {
                $scope.files = [];
                $scope.model.allowClick = false;//上传文件按钮是否可用
                $scope.model.display = 'displayNone';//隐藏图片预览区域
                $scope.mouseEnterFun = function () {
                    $('a').css('display', 'inline-block');
                };
                $scope.mouseLeaveFun = function () {
                    $timeout(function () {
                        $('a').css('display', 'none');
                    }, 200);
                };
                $scope.del = function ($index) {
                    $scope.files.splice($index, 1);
                    $scope.displayImageName();
                };
                $scope.uploadFile = function () {
                    if ($scope.files.length == 0) {
                        alert('请选择要上传的文件');
                    } else alert('准备上传' + $scope.files.length + '个文件');
                };
                $scope.getFile = function () {
                    $scope.temp_files = document.getElementById('file').files;
                    for (let i = 0; i < $scope.temp_files.length; i++) {
                        if ($scope.filenames && ~($scope.filenames.indexOf($scope.temp_files[i]['name']))) {
                            alert('请不要重复打开文件');
                            return false;
                        }
                        $scope.files.push($scope.temp_files[i]);
                    }
                    $scope.displayImageName();
                };
                $scope.displayImageName = function () {
                    /*
                    //触发脏检测的第二种方法
                    var fileNames=[];
                    for(let i=0;i<$scope.files.length;i++){
                        fileNames.push($scope.files[i].name);
                    }
                    $scope.filenames=fileNames;
                    var line=document.getElementsByClassName('line')[0];
                    line.click();*/

                    //触发脏检测的第一种方法
                    $scope.filenames = [];
                    var dotPosition = [];//文件名中点的位置
                    var suffix = [];//文件的后缀

                    for (let i = 0; i < $scope.temp_files.length; i++) {
                        dotPosition.push($scope.temp_files[i].name.lastIndexOf('.'));
                        suffix.push($scope.temp_files[i].name.substr(dotPosition[i] + 1).toUpperCase().toLowerCase());
                        switch ($scope.model.fileType) {
                            case 'changsha':
                                if (suffix[i] != 'jpg' && suffix[i] != 'png' && suffix[i] != 'jpeg' && suffix[i] != 'gif') {
                                    alert('只能上传.jpg .png .jepg .gif格式的文件');
                                    return;
                                } else {
                                    if (window.FileReader) {
                                        var reader = new FileReader;
                                        if ($scope.files) {
                                            reader.readAsDataURL($scope.temp_files[i]);
                                        }
                                        reader.onload = function (e) {
                                            let imgDiv = $('.changsha-container');
                                            $("\<changsha src=" + e.target.result + "\>").appendTo(imgDiv[0]);
                                        };
                                    }
                                }
                                break;
                            case 'excel':
                                if (suffix[i] != 'xls' && suffix[i] != 'xlsx') {
                                    alert('只能上传.xls .xlsx格式的文件');
                                    return;
                                }
                                break;
                            default:
                        }
                    }
                    for (let i = 0; i < $scope.files.length; i++) {
                        $scope.filenames.push($scope.files[i].name);
                        if ($scope.filenames.length) {
                            $scope.model.allowClick = true;
                        }
                    }
                    $scope.$digest();
                };
            }]
        };
    });

    app.factory('$batchUploadFiles', function () {
        return {
            createBatchUploadFiles: function () {
                return {
                    options: [],
                    fileType: '',//all,changsha,excel
                    setOption: function (_options) {
                        this.options = {
                            multiple: _options.multiple//0:单选，1:多选
                        };
                        return this;//可以链式访问
                    },
                    setMultiple: function () {//可以上传单个文件还是多个文件
                        var input = document.getElementById('file');
                        debugger;
                        if (this.options.multiple) {
                            input.setAttribute('multiple', this.options.multiple);
                        }
                        return this;
                    },
                    setFileType: function (_fileType) {//设置可以上传的文件格式
                        this.fileType = _fileType;
                        return this;
                    }
                }
            }
        }
    });
}
