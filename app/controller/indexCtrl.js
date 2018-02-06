module.exports = function(app) {
    app.controller("indexCtrl",function($scope){
        $scope.init=function(){
            //console.log('success');
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

        $scope.options=[{
            "value": {
                category_id: 111,
                company_id: 12,
                enable: true,
                id: 22222222
            },
            "label":'身份证'
        }, {
            "value": {
                category_id: 222,
                company_id: 13,
                enable: true,
                id: 111111111
            },
            "label":"护照"
        }];
    })
};