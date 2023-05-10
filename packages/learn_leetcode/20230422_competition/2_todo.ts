// 这种方法超时了
function adventureCamp(expeditions: string[]): number {
    let knownSite = expeditions[0].split('->')
    knownSite=Array.from(new Set(knownSite))
    console.log('knownSite:', knownSite)
    let maxNewSitesLength = 0
    let minNewSitesIndex = Infinity
    expeditions.forEach((item, index) => {
        if (index !== 0) {
            const sites = item.split('->')
            const sitesNoRepeatSet = new Set(sites)
            const sitesNoRepeat = Array.from(sitesNoRepeatSet.values())
            console.log(`sitesNoRepeat:${sitesNoRepeat},knownSite:${knownSite}`)
            let newSites: string[] = []
            sitesNoRepeat.forEach((site) => {
                if (!knownSite.find((_site) => site === _site)) {
                    newSites.push(site)
                }
            })
            console.log('newSites:', newSites)
            if (newSites.length !== 0 && JSON.stringify(newSites) !== '[""]') {
                console.log('000')
                if (maxNewSitesLength < newSites.length) {
                        maxNewSitesLength = newSites.length
                        minNewSitesIndex = index
                } else if (maxNewSitesLength === newSites.length) {
                    minNewSitesIndex = Math.min(index, minNewSitesIndex)
                }
            }
            knownSite=knownSite.concat(newSites)
            console.log(`maxNewSitesLength:${maxNewSitesLength},minNewSitesIndex:${minNewSitesIndex}`)
        }
    })

    if(minNewSitesIndex===Infinity){
        return -1
    }

    return minNewSitesIndex;
};

// 比赛第10名的代码
function adventureCamp2(expeditions:string[]):number {
    let maxP = -1, maxV = 0;
    let visited = new Set();
    for (let i = 0; i < expeditions.length; i++) {
        let c = 0;
        for (const word of expeditions[i].split('->')) {
            if (word && !visited.has(word)) {// 这里是关键，当时没想到用Set.has判断
                ++c;
                visited.add(word);
            }
        }
        if (i>0 && c > maxV) {
            maxP = i; maxV = c;
        }
    }
    return maxP;
};
console.log(adventureCamp(["leet->code","leet->code->Campsite->Leet","leet->code->leet->courier"]))// 1
// console.log(adventureCamp(["Alice->Dex","","Dex"]))// -1
// console.log(adventureCamp(["","Gryffindor->Slytherin->Gryffindor","Hogwarts->Hufflepuff->Ravenclaw"])) // 2
// console.log(adventureCamp(["xO->xO->xO", "xO->BKbWDH", "xO->BKbWDH", "BKbWDH->mWXW", "LSAYWW->LSAYWW", "oAibBvPdJ", "LSAYWW->u", "LSAYWW->LSAYWW"])) // 1
