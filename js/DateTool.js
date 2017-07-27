//时间工具类
var DateTool = new
function() {

    //格式化时间戳
    //format格式如下：
    //yyyy-MM-dd hh:mm:ss 年月日时分秒(默认格式)
    //yyyy-MM-dd 年月日
    //hh:mm:ss 时分秒
    this.formatTimeStamp = function(timestamp, format) {
        if (!timestamp) {
            return 0;
        }
        var formatTime;
        format = format || 'yyyy-MM-dd hh:mm:ss';
        var date = new Date(timestamp * 1000);
        var o = {
            "M+": date.getMonth() + 1,//月份
            "d+": date.getDate(),//日
            "h+": date.getHours(),//小时
            "m+": date.getMinutes(),//分
            "s+": date.getSeconds() //秒
        };
        if (/(y+)/.test(format)) {
            formatTime = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        } else {
            formatTime = format;
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(formatTime)) formatTime = formatTime.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return formatTime;
    };

    //获取unix时间戳
    this.unixtime = function(d) {
        if (!d) d = new Date();
        return Math.round(d.getTime() / 1000);
    };
    //时间戳转日期
    this.fromunixtime = function(t) {
        return new Date(t * 1000);
    };
}