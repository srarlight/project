import {nextTick} from "../utils";

let queue = [];
let has = {};
let pending = false
function flushQueue(){
    queue.forEach(item=>item.run());
    queue = [];
    has = {};
    pending = false
}
export function queueWatcher(watcher){
    const id = watcher.id;
    if(has[id] == null){
        queue.push(watcher);
        has[id] = true;
        //多次处理成一次 防抖处理 去重防抖
        if(!pending){
            nextTick(flushQueue,0);
            pending = true;
        }
    }

}

