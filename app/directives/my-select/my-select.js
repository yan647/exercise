module.exports = function(app) {
    app.directive('mySelect', mySelectFn);
    function mySelectFn() {
        return {
            restrict: 'EA',
            scope: {},
            template: '<select  ng-model="b" ng-options="l.field as getDesc(l) for l in t | byOrder "></select>',
            //controllerAs: 'vm',// <=> $scope.vm = {greeting: '你好，我是卡哥'}
            controller: ['$scope',function ($scope) {
                $scope.getDesc1 = function(key, value) {
                    return (parseInt(key, 10) + 1) + "、" + value.field;
                };

                $scope.t = [{
                    "field": "jw_companyTalent"
                }, {
                    "field": "jw_reportgroup"
                }];
                $scope.getDesc = function(l) {
                    return l.order + "、" + l.field;
                };
            }]
        }
    }
    app.filter('byOrder',function(){
        return function(array) {
            return (array || []).map(function(item, index) {
                item.order = index + 1;
                return item;
            });
        };
    });
}