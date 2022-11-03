class Validate {
    constructor() {
        this.chineseCharacters = /[\u4E00-\u9FA5]/g; // 中文
    }
    validateFn(...arg) {
        const {
            chineseCharacters
        } = this
        return {
            checkCharacters(rule: any, value: any, callback: void) {
                if (!chineseCharacters.test(value)) {
                    callback(new Error('只允许中文'))
                } else {
                    callback()
                }
            }
        }
    }
}

const validateForm = new Validate(null, null, true)
export default validateForm


