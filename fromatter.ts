class CjkNamePart {
    // I've committed this dict files to the repo.
    static dict: Record<string, Record<string, CjkNamePart>> = {
        "chinese": require('./all.dict.json')
            .reduce((acc: Record<string, CjkNamePart>, name: CjkNamePart) => ({
                ...acc,
                [name.name]: name
            }), {} as Record<string, CjkNamePart>)
    };

    name: string;
    pinyin: string;

    constructor(name: string, pinyin: string) {
        this.name = name;
        this.pinyin = pinyin;
    }
}

class CjkName {
    familyName: CjkNamePart;
    givenName: CjkNamePart;

    isName: boolean;

    constructor() {
        this.familyName = new CjkNamePart('', '');
        this.givenName = new CjkNamePart('', '');
        this.isName = false;
    }

    public getFullName(): CjkNamePart {
        return new CjkNamePart(this.familyName.name + this.givenName.name, this.familyName.pinyin + ' ' + this.givenName.pinyin);
    }
}

function splitName(name: string, lang: string, allowDoubleFamilyName: boolean): CjkName {
    let nameCandidate = new CjkName();

    for (let splitIndex = 2; splitIndex > 0; splitIndex--) {
        
        let familyNameCandidate = CjkNamePart.dict[lang][name.slice(0, splitIndex)];
        let givenNameCandidateStr = name.slice(splitIndex);
        
        // pinyin should be called only once, since I don't know how much time it consumes.
        // let givenNameCandidate = new CjkNamePart(name, ''); // To be changed here. Call pinyin over name.

        if (!familyNameCandidate) {
            continue;
        }

        nameCandidate.isName = true;

        // Requirement from the standard files.
        if (allowDoubleFamilyName) {
            let restName = splitName(givenNameCandidateStr, lang, false);
            if (restName.isName) {
                nameCandidate.familyName = new CjkNamePart(
                    familyNameCandidate.name + restName.familyName.name,
                    familyNameCandidate.pinyin + '-' + restName.familyName.pinyin); // Though the standard requires, I think this splitter '-' can be changed.
                nameCandidate.givenName = restName.givenName;
                return nameCandidate;
            }
        }

        nameCandidate.familyName = familyNameCandidate;
        nameCandidate.givenName = new CjkNamePart(givenNameCandidateStr, ''); // To be changed here. Call pinyin over the given name.
        return nameCandidate;
    }

    // Alibaba problem solved here.
    // Names of legal entities should be family name, I think.
    nameCandidate.familyName = new CjkNamePart(name, ''); // To be changed here. Call pinyin over name.
    return nameCandidate;
}

// Split a name.
function formatCjkName(name: string, lang: string): CjkName {

    // I'm not asking if it's Simplified or Traditional Chinese anymore.
    // Just query the name in both zh-CN and zh-TW. Should not affect the result.
    // It's possible a user enter a zh-TW author name in a zh-CN item, or vice versa.
    if (lang !== 'chinese') {
        throw new Error('Unknown language.');
    }

    return splitName(name, lang, true);
}

console.log(formatCjkName('张三', 'chinese'));
console.log(formatCjkName('陈李四', 'chinese'));
console.log(formatCjkName('欧阳王五', 'chinese'));
console.log(formatCjkName('刘六六六', 'chinese'));
console.log(formatCjkName('诸葛亮', 'chinese'));
console.log(formatCjkName('东方不败', 'chinese'));
console.log(formatCjkName('阿里巴巴', 'chinese'));

console.log(formatCjkName('張三', 'chinese'));
console.log(formatCjkName('陳李四', 'chinese'));
console.log(formatCjkName('歐陽王五', 'chinese'));
console.log(formatCjkName('劉六六六', 'chinese'));
console.log(formatCjkName('諸葛亮', 'chinese'));
console.log(formatCjkName('東方不敗', 'chinese'));
console.log(formatCjkName('阿裡巴巴', 'chinese'));
