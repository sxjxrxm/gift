var BrowserToo = new
function() {
    //设置cookie
    //name 名字
    //value 值
    //expires 有效期(单位：秒)
    this.setCookie = function(name, value, expires) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };
    //获取cookie
    this.getCookie = function(name) {
        var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (result != null) {
            return unescape(result[2]);
        }
        return null;
    };
    //删除cookie
    this.delCookie = function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var value = this.getCookie(name);
        if (value != null) document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };

    //根据名字获取url参数值
    this.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    //判断IE版本号，ver表示版本号
    this.isIE = function(ver) {
        var b = document.createElement('b') b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
        return b.getElementsByTagName('i').length === 1;
    };
    //判断浏览器版本
    this.getBrowserInfo = function() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        log.info('navigator.userAgent=' + ua);
        var s; (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        if (Sys.ie) { //Js判断为IE浏览器
            return {
                'type': 'ie',
                'ver': Sys.ie
            };
        }
        if (Sys.firefox) { //Js判断为火狐(firefox)浏览器
            return {
                'type': 'firefox',
                'ver': Sys.firefox
            };
        }
        if (Sys.chrome) { //Js判断为谷歌chrome浏览器
            return {
                'type': 'chrome',
                'ver': Sys.chrome
            };
        }
        if (Sys.opera) { //Js判断为opera浏览器
            return {
                'type': 'opera',
                'ver': Sys.opera
            };
        }
        if (Sys.safari) { //Js判断为苹果safari浏览器
            return {
                'type': 'safari',
                'ver': Sys.safari
            };
        }
        return {
            'type': 'unknow',
            'ver': -1
        };
    };

};