const content = `
::: headStart
::: start
# Baby Shark

::: start
icon:phone 185xxxx5387
icon:github [github.com/Jack](github.com/Jack)
:::
icon:email coderleilei@163.com
icon:link [blog.com](https://blog.com)
:::
icon:wechat wechatnumberxxx
icon:yuque [yueque.com/xiongleixin](yueque.com/xiongleixin)
::: end

:::
![个人头像](data:image/jpeg;base64,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3NF2T7ps6/JrfdkLvyB+xvfkyW8cwH5Ex0NubYscr0j5n2g/QTl6s/03xfDT4iJkuREQEREBERA4ImE7zbOfZuOzU1ypmz0TyZT7yeAuVtxtbtE3eQO9W71PG0DSayuutN7XyN/pPAj+wky8IqJ2JtVKipiEN1PEcx9JT3iXBHDAEagzMdzt1doYepU9ooVCLWDqwdgRZlAOgtfU2Oo0mjbPolEAPG5Ph3TTdmpL8q5ll4eyIiZLkREBERAREQEREDiV/a6WqE9oB/T9JYJHbVwpYBgLleXaJfp640pucxBRO1MO5Ngrek7hs6r9D5j+86rrM+WPF+nkie5dl1TyA8T/AGnemx25uPIXkXqZnynt19M+6QcYFopR+J3zHuVP9yPQyb6I9nMmGqV2/wCa4C/Zp5lv+It6T53q3BqYqslSnWVRlCsHBJWxJuoXjx4G3DjLts3BpRpU6Ke7TUKO2wHE954+c5t67ry1zniPZERKLkREBERAREQEREBERAREQEREBERAREQEREBERAREQEROCIHMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED/2Q==)
::: end
::: headEnd


## 个人技能
::: start
PHP/Java/Node
:::
熟练程度

::: end
::: start
ThinkPHP/Yaf/Yii/Lavaral/LazyPHP
:::
熟练程度
::: end
::: start
Bootstrap/AngularJS/EmberJS/HTML5/Cocos2dJS/ionic
:::
熟练程度
::: end
::: start
Bower/Gulp/SaSS/LeSS/PhoneGap
:::
熟练程度
::: end
::: start
PHPUnit/SimpleTest/Qunit
:::
熟练程度
::: end
::: start
SAE/BAE/AWS/微博开放平台/微信应用开发
:::
熟练程度
::: end
...

## 开源项目
::: start
### typenet
:::
web typewriter effect with support for chain calls. ( 网页打字机效果, 支持链式调用 )
::: end
::: start
### markdown-resume-to-pdf
:::
resume writing tool with markdown syntax.( 在线简历制作工具, markdown 转 PDF )
::: end

## 工作经历
::: start
#### xxx公司
:::
2021-21 ~ 2022-01
::: end
- 负责前端技术架构设计，探索Web前端与游戏前端技术结合领域，推进新技术在业务中落地
- 主导并参与美团游戏项目的设计过程和方案调研，对技术方案、风险进行评审和分析
- 深入理解业务，注重产品和用户体验，支持和推动业务的快速迭代发展
- 具备良好学习能力、沟通能力、需求落地能力、数学及抽象思维能力、承压能力

::: start
#### xxx公司
:::
2021-21 ~ 2022-01
::: end
- 我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快
- 这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。
- 这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。

## 项目经历
::: start
#### MNO项目
:::
**技术总监（2022.08 ~ 2023.02）**
::: end
- 我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快
- 这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。
- 这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。

::: start
#### xxx项目
:::
**前端架构师（2022.08 ~ 2023.02）**
::: end
- 我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快
- 这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。
- 这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。


## 教育背景
::: start
xxx学校 (软件工程)
:::
2016-07 ~ 2016-07
::: end
...
## 致谢
...
感谢您花时间阅读我的简历，期待能有机会和您共事。
`
export default {
  name: '简约风(小鲨鱼)',
  primaryColor: '#555',
  primaryBackground: '#790FAE',
  img: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/274659ec6a294c2cb4f0d289bee3ba4f~tplv-k3u1fbpfcp-watermark.image?',
  content
}