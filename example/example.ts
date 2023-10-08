import {splitName} from 'spellnames';

function pinyin(text: string): string {
    return 'Sample Pinyin';
}

for (let name of ['张三', '陈李四', '欧阳王五', '刘六六六', '诸葛亮', '东方不败', '阿里巴巴']) {
    console.log(splitName(name, pinyin, 'Chinese'));
}
for (let name of ['張三', '陳李四', '歐陽王五', '劉六六六', '諸葛亮', '東方不敗', '阿裡巴巴']) {
    console.log(splitName(name, pinyin, 'Chinese'));
}