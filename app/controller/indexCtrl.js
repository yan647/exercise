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

        // $scope.getDesc1 = function(key, value) {
        //     return (parseInt(key, 10) + 1) + "、" + value.field;
        // };
        //
        // $scope.t = [{
        //     "field": "jw_companyTalent"
        // }, {
        //     "field": "jw_reportgroup"
        // }];
        // $scope.getDesc = function(l) {
        //     return l.order + "、" + l.field;
        // };
    })/*.filter("index", [
        function() {
            return function(array) {
                return (array || []).map(function(item, index) {
                    item.order = index + 1;
                    return item;
                });
            };
        }
    ])*/;
};