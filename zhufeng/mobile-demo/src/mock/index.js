import Mock from 'mockjs';
const Random = Mock.Random
//mock
import record from './modules/home'
// 商品列表
Mock.mock('/news/index', 'get', record.produceNewsData(30));
// 商品详情
Mock.mock('/news/detail', 'post', record.newDateil);