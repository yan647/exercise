module.exports = function(app) {
    app.controller("indexCtrl",function($scope){
        $scope.init=function(){
            console.log('success');
        };
        $scope.touchStart=function(){
            alert("touchStart");
        };
        $scope.touchMove=function(){
            console.log("touchMove");
        };
        $scope.touchEnd=function(){
            alert("touchEnd");
        };

        //拖拽移动
        $scope.sortable = [{'name':'张春玲','age':28},{'name':'王晰','age':26},{'name':'吴正青','age':66}];
    });
};