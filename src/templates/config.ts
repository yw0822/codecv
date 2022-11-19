import front_end from "./front_end";
import operation from "./operation";
import internet from "./internet";
import internet_avatar from "./internet_avatar";
import general from "./general/index";
import operation_avatar from "./operation_avatar";
import business from "./business";
import internet_social from "./internet_social";

export const themes = [
  {
    type: 'operation',
    id: 1,
    img: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da4c963a203e4007b09408a08f80a846~tplv-k3u1fbpfcp-watermark.image?",
    content: operation,
    name: '运营类'
  },
  {
    type: 'front_end',
    id: 2,
    img: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7cbae36d47d4ed7ab9c79dca959f3fa~tplv-k3u1fbpfcp-watermark.image?',
    content: front_end,
    name: '互联网IT通用'
  },
  {
    type: 'internet',
    id: 3,
    img: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7f4750d40d4459486b1c9f77918ea50~tplv-k3u1fbpfcp-watermark.image?',
    content: internet,
    name: '互联网IT通用'
  },
  {
    type: 'internet_avatar',
    id: 4,
    img: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c02c66e3f2346d4bd7b81268775c406~tplv-k3u1fbpfcp-watermark.image?',
    content: internet_avatar,
    name: '互联网IT模板-带头像'
  },
  {
    type: 'general',
    id: 5,
    img: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e76e4375f8443a48aaaaaf83968854f~tplv-k3u1fbpfcp-watermark.image?',
    content: general,
    name: '通用模板'
  },
  {
    type: "operation_avatar",
    id: 6,
    img: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5560f15292d4f629f6a2fe560165987~tplv-k3u1fbpfcp-watermark.image?',
    content: operation_avatar,
    name: '运营大类'
  },
  {
    type: "business",
    id: 7,
    img: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22f0130e940a4a8b8c022f3bd1e43bea~tplv-k3u1fbpfcp-watermark.image?',
    content: business,
    name: '商务类(一页)'
  },
  {
    type: "internet_social",
    id: 8,
    img: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee8318e9ad2542ab8b340a1d21a96e9e~tplv-k3u1fbpfcp-watermark.image?',
    content: internet_social,
    name: '互联网社招类(适合经验丰富)'
  },
];

export type themeType = typeof themes[0];