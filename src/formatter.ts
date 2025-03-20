export enum Language {
    Chinese = 'Chinese',
    Japanese = 'Japanese',
    Korean = 'Korean'
}

export class CjkNamePartBase {
    name: string;
    transliteration: string;

    constructor(name: string, transliteration: string) {
        this.name = name;
        this.transliteration = transliteration;
    }
}

export class CjkNamePart extends CjkNamePartBase {
    // I've committed these dict files to the repo.
    static dict: Record<Language, Record<string, CjkNamePart>> = {
        // It'll be more convenient if I need to add zh-HK or zh-SG in the future.
        Chinese: [...require('../assets/zh-CN/merged.dict.json'), ...require('../assets/zh-TW/merged.dict.json')]
            .reduce((acc: Record<string, CjkNamePart>, {n, t}) => {
                acc[n] = new CjkNamePart(n, t, Language.Chinese);
                return acc;
            }, {} as Record<string, CjkNamePart>),
        Japanese: {} as Record<string, CjkNamePart>,
        Korean: {} as Record<string, CjkNamePart>
    };

    language: Language | undefined;

    constructor()
    constructor(name: string, transliteration: string, language: Language)

    constructor(name?: string, transliteration?: string, language?: Language) {
        super(name ? name : '', transliteration ? transliteration : '');
        this.language = language;
    }
}

export class CjkName {
    familyName: CjkNamePart;
    givenName: CjkNamePart;

    isName: boolean;

    constructor()
    constructor(familyName: CjkNamePart, givenName: CjkNamePart)
    constructor(familyName: CjkNamePart, givenName: CjkNamePart, isName: boolean)

    constructor(familyName?: CjkNamePart, givenName?: CjkNamePart, isName?: boolean) {
        this.familyName = familyName ? familyName : new CjkNamePart();
        this.givenName = givenName ? givenName : new CjkNamePart();
        this.isName = isName == undefined ? familyName != undefined && givenName != undefined : isName;
    }

    static fromString(name: string,
                      language: Language,
                      transliterate: (text: string) => string,
                      capitalize: boolean = true, // Capitalize compound family names, e.g. DongFang => Dongfang.
                      allowDoubleFamilyName: boolean = true,
                      doubleFamilyNameSplitter: string = '-'): CjkName {
        return splitNameIter(name, allowDoubleFamilyName);

        function splitNameIter(name: string, allowDoubleFamilyName: boolean): CjkName {
            let nameCandidate = new CjkName();

            // Is there any triple family name? In China, no.
            // But what if one's parents both have double family names?
            // I prefer not to handling this case for this script will look ugly.
            for (let splitIndex = 2; splitIndex > 0; splitIndex--) {

                let familyNameCandidate = CjkNamePart.dict[language][name.slice(0, splitIndex)];
                // transliterate should be called only once, since I don't know how much time it consumes.
                // let givenNameCandidate = new CjkNamePart(name.slice(splitIndex), ''); // To be changed here. Call transliterate over name.
                let givenNameCandidateStr = name.slice(splitIndex);

                if (!familyNameCandidate) {
                    continue;
                }

                if (splitIndex > 1 && capitalize) {
                    familyNameCandidate.transliteration =
                        familyNameCandidate.transliteration.slice(0, 1).toUpperCase() +
                        familyNameCandidate.transliteration.slice(1).toLowerCase();
                }

                // Requirement from the standard files.
                if (allowDoubleFamilyName) {
                    let restName = splitNameIter(givenNameCandidateStr, false);
                    if (restName.isName) {
                        // Though the standard requires, I think this splitter (doubleFamilyNameSplitter = '-') can be changed.
                        nameCandidate.familyName = new CjkNamePart(
                            familyNameCandidate.name + restName.familyName.name,
                            familyNameCandidate.transliteration + doubleFamilyNameSplitter + restName.familyName.transliteration,
                            language);
                        nameCandidate.givenName = restName.givenName;

                        nameCandidate.isName = true;
                        return nameCandidate;
                    }
                }

                nameCandidate.familyName = familyNameCandidate;
                nameCandidate.givenName = new CjkNamePart(
                    givenNameCandidateStr,
                    transliterate(givenNameCandidateStr),
                    language);

                nameCandidate.isName = true;
                return nameCandidate;
            }

            // Alibaba problem solved here.
            // Names of legal entities should be family name, I think.
            nameCandidate.familyName = new CjkNamePart(name, transliterate(name), language);
            return nameCandidate;
        }
    }

    // I don't think any native Chinese would like to split a name though.
    public getFullName(splitter: string = ''): string {
        return this.familyName.name + splitter + this.givenName.name;
    }

    // But we do need to split the translation.
    public getFullNameTransliteration(splitter: string = ' '): string {
        return this.familyName.transliteration + splitter + this.givenName.transliteration;
    }
}

// Split a name.
export function splitName(name: string,
                          lang: string,
                          transliterate: (text: string) => string = (_) => _): CjkName {

    // I'm not asking if it's Simplified or Traditional Chinese anymore.
    // Just query the name in both zh-CN and zh-TW. Should not affect the result.
    // It's possible a user enter a zh-TW author name in a zh-CN item, or vice versa.
    if (lang !== 'Chinese') {
        throw new Error('Unknown language.');
    }

    // TODO: I'm going to add Korean support afterwards.
    return CjkName.fromString(name, Language[lang], transliterate, undefined, false, undefined);
}
