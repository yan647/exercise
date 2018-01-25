module.exports = function(app) {
    app.controller("touchCtrl",function($scope){
        $scope.init=function(){
            console.log('success');
        }
        $scope.touchStart=function(){
            alert("touchStart");
        }
        $scope.touchMove=function(){
            console.log("touchMove");
        }
        $scope.touchEnd=function(){
            alert("touchEnd");
        }
    });
}