import install ,{ Vue} from "@/vue-router/install";
class Router{
    constructor(options) {
        console.log(options);
        this.mode = options.mode || 'hash';

    }
    init(app){
        console.log('init',app) //app 为Vue的实例
    }

}
Router.install = install;
export default Router;