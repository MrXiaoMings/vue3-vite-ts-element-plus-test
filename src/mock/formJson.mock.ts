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
    placeholder?: string,
    isRequired?: boolean,
    defaultValue?: any,
    options?: Array<OptionsArr>,
    validateArr?: Array<ValidateOption>
}
export const formData: Array<FormJsonObj> = [
    {
        "type": 'InputItem',
        "labelName": "测试label",
        "valueName": "testValue",
        "placeholder": "请输入",
        "isRequired": true,
        "defaultValue": null,
        validateArr: [
            {
                validateFn: 'checkCharacters'
            }
        ]
    },
    {
        "type": 'SelectItem',
        "labelName": "测试label1",
        "valueName": "testValue1",
        "placeholder": "请选择",
        "isRequired": true,
        "options": [
            {
                label: "标签1",
                value: "value1"
            },
            {
                label: "标签2",
                value: "value2"
            },
            {
                label: "标签3",
                value: "value3"
            }
        ]
    },
    {
        "type": 'RadioItem',
        "labelName": "测试label3",
        "valueName": "testValue2",
        "isRequired": true,
        "defaultValue": "value1",
        "options": [
            {
                label: "标签1",
                value: "value1"
            },
            {
                label: "标签2",
                value: "value2"
            },
            {
                label: "标签3",
                value: "value3"
            }
        ]
    },
    {
        "type": 'CheckBoxItem',
        "labelName": "测试label4",
        "valueName": "testValue3",
        "isRequired": true,
        "options": [
            {
                label: "标签1",
                value: "value1"
            },
            {
                label: "标签2",
                value: "value2"
            },
            {
                label: "标签3",
                value: "value3"
            }
        ]
    }
]
export default {
    formData
}
