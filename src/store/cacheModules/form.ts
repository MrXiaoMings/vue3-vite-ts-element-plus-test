import { defineStore } from 'pinia'

interface OptionsArr {
    label: string,
    value: string
}
interface ValidateOption {
    validateFn: string,
    arg?: Array<any>
}
interface FormJsonObj {
    type: string,
    labelName: string,
    valueName: any,
    tipText?: string,
    placeholder?: string,
    isRequired?: boolean,
    defaultValue?: any,
    options?: Array<OptionsArr>,
    validateArr?: Array<ValidateOption>
}

export const UseFormInfo = defineStore('formInfo', {
    state: (): UseFormInfo => ({
        formInfoData: []
    }),
    getters: {
        formInfoDataCom: state => state.formInfoData
    },
    actions: {
        updateFormInfo(payload: any) {
            this.$state.formInfoData = payload
        },
        addFormItem(payload: FormJsonObj) {
            this.$state.formInfoData.push(payload)
        }
    },
    persist: {
        key: 'pinia-form-test',
        storage: window.sessionStorage,
        paths: ['formInfoData']
    }
})
