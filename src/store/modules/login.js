const logins = {
    state: {
        isShowLogin: false,
        isLogin: false
    },
    getters: {
        ShowLogin: state => {
            return state.isShowLogin
        },
        homeLogin: state => {
            return state.isLogin
        },
    },
    mutations: {
        toggleisShowLogin(state, isShowLogin) {
            state.isShowLogin = isShowLogin
        },
        toggleLogin(state, isLogin) {
            state.isLogin = isLogin
        },
    },
    actions: {}
}

export default logins
