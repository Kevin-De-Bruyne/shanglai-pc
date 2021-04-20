import cusToast from './_toast';

console.log(cusToast)
cusToast.install = function (Vue) {
    Vue.prototype['$cusToast'] = cusToast;
}

export default cusToast;