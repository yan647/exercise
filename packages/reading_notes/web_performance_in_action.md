## 《Web性能实战》读后感
总体来说，看了这本书，对实际项目中希望尽快提升页面秒开率的目标，没有大的作用。但书中说的很多细节确实值得我们平时开发时多注意。

其中第三章介绍的优化CSS的方法确实比较有用，对提升秒开率还是有作用的，但需要改动的内容太多，性价比不高，只适合在做了很多其他优化手段后，暂时没思路了，可以尝试使用。

第四章先加载首屏样式的方法，确实有效，但还是需要比较多的改动，性价比不高。

第五、六章介绍了优化图片的方法，但都是些已知的方法，没啥新内容，没什么参考价值。除非你对性能优化完全不了解，值得看。但凡对性能优化稍微有些了解的，都没啥必要看。

第七、九章确实可能会比较有效吧，没有尝试过，以后可以尝试一下。

第八章的介绍也是些已知的方法，而且还提到了jQuery，技术栈太旧了，没多少参考价值。

第十章的CDN托管、文件压缩也是些已知的方法，现在应该没有哪家的项目没做这些处理的吧，一点参考价值都没有。

第十一章介绍的HTTP/2的并发请求也是已知的方法，提到的服务器推送，应该就是服务端渲染（SSR），文章的内容没有参考价值，但这个方法确实有参考价值，后续可以尝试一下。

第十二章使用gulp优化，目前项目应该很少有用gulp的吧，也没啥参考价值。

综上所述：
1. 对于初学者，或者对前端性能完全不了解的人来说，值得一看，介绍了Web性能相关的很多概念，常见优化方法
2. 对前端性能有了解但不多的人来说，也是值得看的，大概率会有部分章节非常有用，可以查漏补缺
3. 对于新开发一个全新的项目的人来说，直接使用书中提到的部分方法，应该会较晚才会遇到性能问题，但也要有选择的选取其中的方法。
3. 对于像我这样急功近利，想在一两个月时间内，大幅提升现有项目的秒开率，没有太多参考价值。书中提到的很多我觉得有用的优化方法，对于已有项目，改动太大，不是短期可以完成的。
短期想提升现有项目的秒开率，最好的办法还是根据实际项目情况来寻找解决方案。对我来说可能第七、九章以前没考虑过，说不定可以参考，其他章节对我来说都没价值。

