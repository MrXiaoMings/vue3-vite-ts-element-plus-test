class Validate {
    chineseCharacters: RegExp
    constructor() {
        this.chineseCharacters = /[\u4E00-\u9FA5]/g; // 中文
    }
    validateFn(...arg:any[]) {
        const {
            chineseCharacters
        } = this
        return {
            checkCharacters(rule: any, value: any, callback: any) {
                if (!chineseCharacters.test(value)) {
                    callback(new Error('只允许中文'))
                } else {
                    callback()
                }
            }
        }
    }
}

const validateForm = new Validate()
export default validateForm


