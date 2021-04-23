let arr = ['a', 'b', {
    name: 'zhangSan', option: {
        age: 18
    }
}, /[.]/g, function fn1() {

}];
// const arr1 = [...arr];
// console.log(arr[3] ===
// let arr1 = arr.slice(0)
// console.log(arr[1] === arr1[1]);
/*浅拷贝 ，堆内存地址相同*/
// const arr1 = JSON.parse(JSON.stringify(arr)); //深拷贝缺陷 正则，函数无法拷贝
// console.log(arr,arr1)


//自定义一个深拷贝方法
function deepCopy(obj) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (_type(obj) === '[object RegExp]') return new RegExp(obj);
    if (_type(obj) === '[object Date]') return new Date(obj);
    let newObj = new obj.constructor;
    for (let objKey in obj) {
        if (!obj.hasOwnProperty(objKey)) {
            break;
        } else {
            newObj[objKey] = deepCopy(obj[objKey]);
        }
    }
    return newObj;
}

//判断类型方法
function _type(value) {
    return Object.prototype.toString.call(value)
}

const arr1 = deepCopy(arr)
arr[2].name = 'lisi'
// const arr1 = JSON.parse(JSON.stringify(arr))
console.log(arr[2].name === arr1[2].name, arr, arr1)

