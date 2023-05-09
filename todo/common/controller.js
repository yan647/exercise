/**
 * Created by lsq on 2019-10-09.
 */

'use strict';

var getJson=function(url) {
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function(){
        if(request.status === 200){
            return request.response;
        }
    };
};