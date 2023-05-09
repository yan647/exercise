module.exports = function(app) {
    app.directive('mySelect', mySelectFn);
    function mySelectFn() {
        return {
            restrict: 'EA',
            scope: {
                options: '='
            },
            template: '<select ng-options="l.value as getDesc(l) for l in options | byOrder " ng-model="model"><option value=\'\'>{{options.placeholder||\'--请选择--\'}}</option></select>',
            controller: ['$scope',function ($scope) {
                $scope.getDesc = function(l) {
                    return l.label;
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
};