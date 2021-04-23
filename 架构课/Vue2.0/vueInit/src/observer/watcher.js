import {pushTarget} from "./dep";
import {popTarget} from "./dep";

export default class Watcher {
    constructor(vm, fn, cb, options) {
        this.vm = vm;
        this.fn = fn;
        this.cb = cb;
        this.options = options;
        this.depIds = new Set();//存取dep里的id
        this.deps = [];//存deep
        this.get();
    }

    get() {
        console.log('watcher')
        pushTarget(this);//每个组件渲染 都会生成一个watcher,将其与dep绑定 dep.target = watcher;
        this.fn(); //执行render方法
        popTarget()
    }

    addDep(dep) {
        console.log(dep)
        const id = dep.id;
        console.log(this.depIds)
        if (!this.depIds.has(id)) {
            this.depIds.add(id);
            this.deps.push(dep);
            
            dep.appendWatcher(this)
        }
    }

}