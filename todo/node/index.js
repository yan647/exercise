/**
 * Created by lsq on 2020/10/24.
 */

'use strict';
const server=require("./server");
const router=require("./router");
server.start(router.route);



