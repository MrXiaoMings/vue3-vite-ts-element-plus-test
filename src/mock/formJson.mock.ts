interface OptionsArr {
    label: string,
    value: string
}
interface FormJsonObj {
    type: string,
    labelName: string,
    valueName: any,
    placeholder?: string,
    options?: Array<OptionsArr>
}
export const formData: Array<FormJsonObj> = [
    {
        "type": 'InputItem',
        "labelName": "测试label",
        "valueName": "testValue",
        placeholder: "请输入"
    },
    {
        "type": 'SelectItem',
        "labelName": "测试label1",
        "valueName": "testValue1",
        placeholder: "请选择",
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
