/**
 * Created by Administrator on 2017/8/11.
 */
var http = require('http');
var url = 'http://www.imooc.com/learn/348';

//nodejs里绑定事件是使用的on

http.get(url,function (res) {
    var html = '';

    res.on('data',function (data) {
        //console.log(data);
        html += data;
        //console.log(html);
    });
    res.on('end',function () {
        console.log(html);
    });
}).on('error',function () {
    console.log('获取课程数据出错')
});

