import Vue from 'vue'
import App from './App.vue'
import './uni.promisify.adaptor'
// import "./mock/index"

Vue.config.productionTip = false

const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App)))
app.$mount();
