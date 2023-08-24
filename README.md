<div style="text-align: center">

  <h1><code>SpellNames</code></h1>

<strong>A script that splits CJK names.</strong>
</div>

## About

This repo implements in TypeScript a function that splits CJK names into family names and given names.
Currently, only Chinese (both Simplified and Traditional) names are supported.
This script (aims to) strictly follows [GB/T 28039-2011], the Chinese phonetic alphabet spelling rules for Chinese
names.

[GB/T 28039-2011]: https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=22334869F6825C2492FC9BC913430EAD

## 🚴 Usage

This script only cuts names.
You will need a pinyin library to translate results into English.

## 📚 GB/T 28039-2011 中国人名汉语拼音字母拼写规则（部分）

### 5 拼写规则（部分）

#### 5.1 汉语人名拼写规则（部分）

- [x] 5.1.1
  正式的汉语人名由姓和名两部分组成。
  姓和名分写，姓在前，名在后，姓名之间用空格隔开。
  复姓连写。
  姓和名的开头字母大写。
- [x] 5.1.2
  由双姓组合（并列姓氏）作为姓氏部分，双姓中间加连接号，每个姓氏开头字母大写。
- [ ] 5.1.3
  笔名、字（或号）、艺名、法名、代称、技名、帝王名号等，按正式人名写法拼写。
- [ ] 5.1.7
  三音节以内不能分出姓和名的人名，包括历史上已经专门化的称呼，以及笔名、艺名、法名、神名、帝王年号等，连写，开头字母大写。
- [ ] 5.1.8
  四音节以上不能分出姓和名的人名，如代称、雅号、神仙名等，按语义结构或语音节律分写，各分开部分开头字母大写。