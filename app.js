var express = require('express');
var superagent = require('superagent');
var cheerio =require('cheerio');
// 建立 express 实例
var app = express();
app.get('/', function (req, res, next) {
// 用 superagent 去抓取 https://cnodejs.org/ 的内容
superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      //找到要爬的标签 遍历所有$()里的标签元素
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        //获取这个标签元素的属性 并push到定义好的items数组中
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href'),
        });
      });
      res.send(items);
    });
});
//抓取李毅吧网页内容的示例
//app.get('/', function (req, res, next) {
//superagent.get('http://tieba.baidu.com/f?kw=%C0%EE%D2%E3&fr=ala0&tpl=5')
//  .end(function (err, sres) {
//    if (err) {
//      return next(err);
//    }
//    var $ = cheerio.load(sres.text);
//    var items = [];
//    $('.threadlist_title a').each(function (idx, element) {
//      var $element = $(element);
//      items.push({
//        title: $element.attr('title'),
//        href: $element.attr('href'),
//      });
//    });
//    res.send(items);
//  });
//});
app.listen(3000, function (req, res,next) {
  console.log('app is running at port 3000');
});
//输入命令node app.js 让程序跑起来！