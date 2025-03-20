import {splitName} from '../dist/index.mjs';

for (let name of ['陈李四', '欧阳王五', '刘六六六', '司马仲达', '阿里巴巴']) {
    console.log(splitName(name, (_) => _, 'Chinese').familyName.transliteration);
}
for (let name of ['張三', '陳李四', '歐陽王五', '劉六六六', '諸葛亮', '東方不敗', '阿裡巴巴']) {
    console.log(splitName(name,  (_) => _, 'Chinese').getFullNameTransliteration());
}
