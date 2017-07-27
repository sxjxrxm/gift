var StringTool = new
function() {

    //英文名转换成中文名
    this.nameEn2Ch = function(type_en) {
        var type_ch = null;
        switch (type_en) {
        case 'Public':
            type_ch = '公开群';
            break;
        case 'ChatRoom':
            type_ch = '聊天室';
            break;
        case 'Private':
            type_ch = '讨论组';
            break;
        case 'AVChatRoom':
            type_ch = '直播聊天室';
            break;
        default:
            type_ch = type_en;
            break;
        }
        return type_ch;
    };

    //中文名转换成英文名
    this.nameCh2En = function(type_ch) {
        var type_en = null;
        switch (type_ch) {
        case '公开群':
            type_en = 'Public';
            break;
        case '聊天室':
            type_en = 'ChatRoom';
            break;
        case '讨论组':
            type_en = 'Private';
            break;
        case '直播聊天室':
            type_en = 'AVChatRoom';
            break;
        default:
            type_en = type_ch;
            break;
        }
        return type_en;
    };

    //防止XSS攻击
    this.xssFilter = function(val) {
        val = val.toString();
        val = val.replace(/[<]/g, "&lt;");
        val = val.replace(/[>]/g, "&gt;");
        val = val.replace(/"/g, "&quot;");
        //val = val.replace(/'/g, "&#039;");
        return val;
    };

    //将空格和换行符转换成HTML标签
    this.formatText2Html = function(text) {
        var html = text;
        if (html) {
            html = this.xssFilter(html); //字段会出现脚本字符串
            html = html.replace(/ /g, "&nbsp;");
            html = html.replace(/\n/g, "<br/>");
        }
        return html;
    };

    //将HTML标签转换成空格和换行符
    this.formatHtml2Text = function(html) {
        var text = html;
        if (text) {
            text = text.replace(/&nbsp;/g, " ");
            text = text.replace(/<br\/>/g, "\n");
        }
        return text;
    };

    //获取字符串(UTF-8编码)所占字节数
    //参考：http://zh.wikipedia.org/zh-cn/UTF-8
    this.getStrBytes = function(str) {
        if (str == null || str === undefined) return 0;
        if (typeof str != "string") {
            return 0;
        }
        var total = 0,
        charCode, i, len;
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1; //字符代码在000000 – 00007F之间的，用一个字节编码
            } else if (charCode <= 0x07ff) {
                total += 2; //000080 – 0007FF之间的字符用两个字节
            } else if (charCode <= 0xffff) {
                total += 3; //000800 – 00D7FF 和 00E000 – 00FFFF之间的用三个字节，注: Unicode在范围 D800-DFFF 中不存在任何字符
            } else {
                total += 4; //010000 – 10FFFF之间的用4个字节
            }
        }
        return total;
    };

    //去掉头尾空白符
    this.trimStr = function(str) {
        if (!str) return '';
        str = str.toString();
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };

    //判断是否为8位整数
    this.validNumber = function(str) {
        str = str.toString();
        return str.match(/(^\d{1,8}$)/g);
    };
}