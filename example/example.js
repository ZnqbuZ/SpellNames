"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatter_1 = require("../src/formatter");
function pinyin(text) {
    return 'Sample Pinyin';
}
for (var _i = 0, _a = ['张三', '陈李四', '欧阳王五', '刘六六六', '诸葛亮', '东方不败', '阿里巴巴']; _i < _a.length; _i++) {
    var name_1 = _a[_i];
    console.log((0, formatter_1.splitName)(name_1, 'Chinese', pinyin));
}
for (var _b = 0, _c = ['張三', '陳李四', '歐陽王五', '劉六六六', '諸葛亮', '東方不敗', '阿裡巴巴']; _b < _c.length; _b++) {
    var name_2 = _c[_b];
    console.log((0, formatter_1.splitName)(name_2, 'Chinese', pinyin));
}
//# sourceMappingURL=example.js.map