"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {CjkName, Language, splitName} from 'spellnames';
const sn = require("../dist/index.mjs");
for (let name of ['陈李四', '肖发民', '尉迟融', '东方不败', '慕容复', '刘六六六', '司马仲达', '阿里巴巴', 'John Smith']) {
    console.log(sn.splitName(name, 'Chinese').isName);
    const cjkName = sn.CjkName.fromString(name, sn.Language.Chinese, (_) => _, true, false, undefined);
    console.log(cjkName);
}
for (let name of ['張三', '陳李四', '歐陽王五', '劉六六六', '諸葛亮', '東方不敗', '阿裡巴巴']) {
    console.log(sn.splitName(name, 'Chinese', (_) => "__PINYIN__").getFullNameTransliteration());
}
console.log(sn.splitName("Flav", 'Chinese'));
