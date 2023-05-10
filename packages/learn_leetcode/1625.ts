/**
 * Created by lsq on 2023/3/19.
 */

'use strict';

function findLexSmallestString(s: string, a: number, b: number): string {
    let list=s.split('').map(item=>Number(item));
    let accuSucc=true;
    let rotateSucc=true;
    let accuList:number[]=[];
    let rotateList:number[]=[];
    while(accuSucc || rotateSucc) {
        accuList = accumulation(list, a);
        accuSucc = lexicographicMin(list, accuList);
        list=accuSucc?accuList:list;
        console.log('accuSucc:',accuSucc);

        rotateList = rotate(list, b);
        rotateSucc = lexicographicMin(list, rotateList);
        list=rotateSucc?rotateList:list;
        console.log('rotateSucc:',rotateSucc);
    }

    return accuSucc?accuList.join(''):rotateList.join('');
};

function accumulation(list:number[],a:number):number[]{
    const newList=[];
    for(let i=0;i<list.length;i++){
        if(i%2===0){
            newList.push(list[i]);
        } else{
            let addResult=Number( list[i]+a);
            if(addResult>=10){
                addResult=addResult-10;
            }
            newList.push(addResult);
        }
    }
    return newList;
}

function rotate(list:number[],b:number):number[]{
    for(let i=0;i<b;i++){
        list.unshift(list[list.length-1]);
        list.pop();
    }
    return list;
}

function lexicographicMin(list:number[],newList:number[]):boolean{
    let result=true;
    for(let i=0;i<list.length;i++){
        if(newList[i]>Number(list[i])){
            result=false;
            break;
        }
    }
    return result;
}


console.log(findLexSmallestString('5525',9,2));
