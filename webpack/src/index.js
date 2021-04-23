import {initMixin} from './init'
//初始化操作
function Vue(option){
    console.log(option)
    this._init(option);
}
initMixin(Vue)
export default Vue