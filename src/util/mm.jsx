/**
 * 通用工具类
 * 
*/
class MUtil{
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    // 数据请求成功
                    if(0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }else if(10 === res.status) {
                        // 没有登录状态，强制去登录页面
                        this.doLogin();

                    }else {
                        // 错误
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: error => {
                    // statusText 是HTTP的错误消息
                    typeof reject === 'function' && reject(error.statusText);
                }
            })
        });
    }
    // 成功的提示
    successTips(successMsg) {
        alert(successMsg || '操作成功!');
    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || '操作失败');
    }
    // 跳转登录页面
    doLogin() {
        // pathname 中可能有特殊字符需要转义
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParam(name) {
        // xxxx.com?param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '', 
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            result = queryString.match(reg);
            // result 是一个数组，第一个是整体匹配，第二个是 '' ,第三个是需要的，最后一个是结束符
            return result ? decodeURIComponent(result[2]) : null;
        

    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || '好像有哪里不对哟~');
    }

    //
    setStorage(name, data) {
        let excludeType = ['number', 'string', 'boolean'];
        let dataType = typeof data;
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        } else if (excludeType.includes(dataType)) {
            window.localStorage.setItem(name, data);
        }else{
            // 其它不支持的类型
            alert('该类型不能用于本地存储');
        }
    }
    // 取出存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data){
            return JSON.parse(data);
        }else{
            return null;
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default MUtil;