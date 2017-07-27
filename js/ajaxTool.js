//获取ajax请求对象 创建XMLHttpRuquest对象
var getXmlHttp = function() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return null;
            }
        }
    }
    return xmlhttp;
}




//发起ajax请求
var ajaxRequest = function(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {

    var xmlHttpObj = getXmlHttp();//获取ajax请求对象 创建XMLHttpRuquest对象

    var error, errInfo;
    if (!xmlHttpObj) {
        errInfo = "创建请求失败";
        var error = tool.getReturnError(errInfo, -1);
        log.error(errInfo);
        if (cbErr) cbErr(error);
        return;
    }
    //保存ajax请求对象
    xmlHttpObjSeq++;
    xmlHttpObjMap[xmlHttpObjSeq] = xmlHttpObj;

		//设置和服务器交互的相应参数
    xmlHttpObj.open(meth, url, true);
    
    //注册回调方法
    xmlHttpObj.onreadystatechange = function() {
    		//判断和服务器端的交互是否完成，还要判断服务器端是否返回正确的数据
        if (xmlHttpObj.readyState == 4) {
            xmlHttpObjMap[xmlHttpObjSeq] = null; //清空
            if (xmlHttpObj.status == 200) {
                if (cbOk) cbOk(xmlHttpObj.responseText);
                xmlHttpObj = null;
                curLongPollingRetErrorCount = curBigGroupLongPollingRetErrorCount = 0;
            } else {
                xmlHttpObj = null;
                //避免刷新的时候，由于abord ajax引起的错误回调
                setTimeout(function() {
                    var errInfo = "请求服务器失败,请检查你的网络是否正常";
                    var error = tool.getReturnError(errInfo, -2);
                    //if (!isLongPolling && cbErr) cbErr(error);
                    if (cbErr) cbErr(error);
                },
                16);
            }
        }
    };
    xmlHttpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //设置超时时间
    if (!timeout) {
        timeout = ajaxDefaultTimeOut; //设置ajax默认超时时间
    }
    if (timeout) {
        xmlHttpObj.timeout = timeout;
        xmlHttpObj.ontimeout = function(event) {
            xmlHttpObj = null;
            //var errInfo = "请求服务器超时";
            //var error = tool.getReturnError(errInfo, -3);
            //if (cbErr) cbErr(error);
        };
    }
    //设置向服务器端发送的数据，启动和服务器端的交互
    xmlHttpObj.send(req);
}