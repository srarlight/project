import {initMixin} from './init'
import {renderMixin} from "./render";
import {lifecycleMixin} from "./lifecycle";
//初始化操作
function Vue(option){
    this._init(option);
}
initMixin(Vue);
renderMixin(Vue); // _render
lifecycleMixin(Vue); // _update
export default Vue