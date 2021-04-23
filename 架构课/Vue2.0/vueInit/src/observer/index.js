import {arrayMethods} from "./observerArray";
import Dep from "./dep";


class Observer {
    constructor(data) {
        Object.defineProperty(data,'__ob__',{
            enumerable:false,//不可枚举
            configurable:false,//不可以更改
            value:this
        })
        if(Array.isArray(data)){
            data.__proto__ = arrayMethods;
            this.observeArray(data) //数组劫持
        }else {
            this.walk(data) //对象劫持
        }
    }
    observeArray(data){
        data.forEach(item=>observe(item))
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}

function defineReactive(data, key, value) {

    observe(value);
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            //收集依赖
            if(Dep.target){ //如果这个属性是在模版中获取的
                dep.append()
                console.log(1)
            }
            return value
        }
        ,
        set(v) {
            console.log(v,'数据更新了')
            //更新视图
            if (v === value) return;
            observe(v) //如果赋值的是一个新对象 要重新对这个对象进行劫持
            value = v;

        }
    })
}

export function observe(data) {
    
    //如果是对象才观测
    if (!(typeof data === 'object' && data !== null)) {
        return
    }
    return new Observer(data)
}