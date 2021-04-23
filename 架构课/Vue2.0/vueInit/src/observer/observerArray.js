const oldArrayProtoMethods = Array.prototype;
export let arrayMethods = Object.create(oldArrayProtoMethods);
//重写七大方法
let methods = ['push', 'shift', 'unshift', 'splice', 'pop', 'sort', 'reverse'];
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        console.log(args)
        const result = oldArrayProtoMethods[method].apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.splice(2);
                break;
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted)
        return result
    }
})