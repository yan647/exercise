/**
 * Created by lsq on 2019-06-22.
 */

'use strict';

let getUrl = function () {
    let params = window.location.search.split("?")[1].split("&");
    let type = params.filter((item) => {
        return item.includes("type")
    })[0].split("=")[1];
    return "./" + type + ".json";
};

let isArray = function (array) {
    return Object.prototype.toString.call(array) === "[object Array]";
};

let isObject = function (object) {
    return Object.prototype.toString.call(object) === "[object Object]";
};

let createJourney=function(infos){
    let journey=document.getElementById(infos.item);
    infos.info[infos.item].map(function(_journey){
        let journey_item = document.createElement('div');
        journey_item.className = "journey_item";
        journey.appendChild(journey_item);
        let title_list={
            "address":"地点",
            "arrive_time":"抵达时间",
            "duration":"游玩时间",
            "description":"简介",
            "fee":"费用",
            "feed":"美食",
            "picture":"图片"
        };
        let journey_item_content=document.createElement('div');
        journey_item_content.className="journey_item_content";
        journey_item.appendChild(journey_item_content);
        for(let _journey_item in _journey){
            if(_journey_item==="picture"){
                let journey_item_img=document.createElement('div');
                journey_item_img.innerHTML="<img src="+_journey[_journey_item]+" width='400' height='300'>";
                journey_item_img.className="image";
                journey_item.appendChild(journey_item_img);
            } else {
                let journey_item_div = document.createElement('div');
                journey_item_div.innerHTML="<label>"+title_list[_journey_item]+"：</label><span>"+_journey[_journey_item]+"</span>";
                journey_item_content.appendChild(journey_item_div);
            }

        }
    });
};

let windowOnloadFunc = function () {
    let json_url = getUrl();
    let info = {};
    let request = new XMLHttpRequest();
    request.open("get", json_url);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            info = JSON.parse(request.responseText);
            for (let item in info) {
                if (!isArray(info[item])) {
                    document.getElementById(item).innerText = info[item];
                } else {
                    if(/go|back/.test(item)){
                        let go_div=document.getElementById(item);
                        info[item].map(function (_img) {
                            let img=document.createElement('img');
                            img.src=_img;
                            img.width=250;
                            img.height=400;
                            go_div.appendChild(img);
                        });

                    } else createJourney({
                        info:info,
                        item:item
                    });
                }
            }

        }
    };
};

window.onload = windowOnloadFunc();





