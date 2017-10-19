/**
 * Created by Administrator on 2017/8/11.
 */
var http = require('http'); //http模块
var cheerio = require('cheerio'); //cheerio模块
var url = 'http://www.imooc.com/learn/348'; //指定的网址

function  filterChapters(html) {
    var $ = cheerio.load(html);
    var  chapters = $('.chapter'); //每一大章
   /* [{
        chapterTitle:'',
        videos:[]
    }]*/
    //获取页面中的指定数据进行重组并输出
    var courseData = [];

    chapters.each(function (item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        };
        videos.each(function (item) {
            var video = $(this).find('.J-media-item');
            var videoTitle =video.text();
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title:videoTitle,
                id:id
            });
        });

        courseData.push(chapterData);
    })
    return  courseData;
}

function printCourseIfo(courseData) {
    //console.log(courseData);
    courseData.forEach(function (item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle.replace(/\s+/g, "")+'\n');

        item.videos.forEach(function (video) {
            console.log('['+video.id.replace(/\s+/g, "") +']'+'\n'+video.title.replace(/\s+/g, "")+'\n');
        })

    });
}

http.get(url,function (res) {
    var html = '';

    //使用data数据
    res.on('data',function (data) {
        html += data;
    });
    res.on('end',function () {
       // console.log(html);
        var courseData = filterChapters(html);
        printCourseIfo(courseData);
    });
}).on('error',function () {
    console.log('获取课程数据出错')
});
