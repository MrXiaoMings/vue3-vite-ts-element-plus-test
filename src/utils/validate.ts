class Validate {
    chineseCharacters: RegExp
    internetAdReg: RegExp
    constructor() {
        this.chineseCharacters = /[\u4E00-\u9FA5]/g // 中文
        this.internetAdReg = /^(http:\/\/|https:\/\/|bestpay:\/\/)/ // 校验网址
    }
    validateFn(...arg:any[]) {
        const {
            chineseCharacters,
            internetAdReg
        } = this
        return {
            checkCharacters(rule: any, value: any, callback: any) {
                if (!chineseCharacters.test(value)) {
                    callback(new Error('只允许中文'))
                } else {
                    callback()
                }
            },
            regInternetAd(rule: any, value: any, callback: any) {
                if (!value) {
                    callback();
                } else {
                    if (!internetAdReg.test(value)) {
                        callback(new Error('跳转地址必须以"http://"或"https://"或"bestpay://"开头'));
                    } else {
                        callback();
                    }
                }
            }
        }
    }
}

const validateForm = new Validate()
export default validateForm


