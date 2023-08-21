class CjkNamePart {
    name: string;
    pinyin: string;

    constructor(name: string, pinyin: string) {
        this.name = name;
        this.pinyin = pinyin;
    }
}

class CjkName {
    // I've committed this dict files to the repo.
    static surname_dict: CjkNamePart[] = require('./all.dict.json');

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

function splitName(name: string, initial: boolean): CjkName {
    let nameCandidate = new CjkName();
    
    for (let splitIndex = 2; splitIndex > 0; splitIndex--) {
        
        let familyNameCandidate = name.slice(0, splitIndex);
        let givenNameCandidate = name.slice(splitIndex);
        
        for (let surname of CjkName.surname_dict) {
            
            if (surname.name === familyNameCandidate) {
                nameCandidate.isName = true;

                // Requirement from the standard files.
                if (initial) {
                    let restName = splitName(givenNameCandidate, false);
                    if (restName.isName) {
                        let familyName = new CjkNamePart(
                            familyNameCandidate + restName.familyName.name,
                            surname.pinyin + '-' + restName.familyName.pinyin); // Though the standard requires, I think this splitter '-' can be changed.
                        nameCandidate.familyName = familyName;
                        nameCandidate.givenName = restName.givenName;
                        nameCandidate.isName = true;
                        return nameCandidate;
                    }
                }

                nameCandidate.familyName = surname;
                nameCandidate.givenName = new CjkNamePart(givenNameCandidate, ''); // To be change here. Call pinyin over the given name.
                return nameCandidate;
            }
        }
    }

    // Alibaba problem. Solved here.
    nameCandidate.givenName = new CjkNamePart(name, ''); // To be change here. Call pinyin over name.
    return nameCandidate;
}

// Split a name.
function formatCjkName(name: string, lang: string): CjkName {

    // I'm not asking if it's Simplified or Traditional Chinese anymore.
    // Just query the name in both zh-CN and zh-TW. Should not affect the result.
    // It's possible a user enter a zh-TW author name in a zh-CN item, or vice versa.
    if (lang !== 'chinese') {
        throw new Error('Not Chinese');
    }

    return splitName(name, true);
}

console.log(formatCjkName('张三', 'chinese'));
console.log(formatCjkName('刘李四', 'chinese'));
console.log(formatCjkName('欧阳王五', 'chinese'));
console.log(formatCjkName('诸葛亮', 'chinese'));
console.log(formatCjkName('东方不败', 'chinese'));
console.log(formatCjkName('阿里巴巴', 'chinese'));
