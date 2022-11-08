import { createStore } from "vuex"

import createPersistedState from 'vuex-persistedstate'
import form from './modules/form'

export default createStore<any>({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        form
    },
    plugins: [
        createPersistedState({
            key: 'vue3-ts',
            paths: ['form']
        })
    ]
})
