let id = 0;
export default class Dep {
    constructor() {
        this.id = id++;
        this.watchers = []
    }
    append(){
        Dep.target.addDep(this) //watcher和dep要互相存值
    }
    appendWatcher(watcher){
        this.watchers.push(watcher)
    }
}
Dep.target = null;
export  function pushTarget(watcher){
    Dep.target = watcher;
}

export function popTarget(){
    Dep.target = null;
}