module.exports = function(ngModule) {
    ngModule.directive('helloWorld', helloWorldFn);
    require('./hello-world.scss');
    function helloWorldFn() {
        return {
            restrict: 'E',
            scope: {},
            template: require('./hello-world.html'),
            //templateUrl: 'directives/hello-world/hello-world.html',
            controllerAs: 'vm',// <=> $scope.vm = {greeting: '你好，我是卡哥'}
            controller: function () {
                var vm = this;
                vm.greeting = '你好，很高兴见到你';
            }
        }
    }
}