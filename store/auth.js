import Cookie from 'cookie';
export const state = () => ({
    busy: false,
    loggedIn: false,
    strategy: "local",
    user: false,
    location: 'ua'
});

export const mutations = {
    SET_LOCATION(state, data){
        state.location = data
    }
};


export const actions = {
    setLang({commit}){

    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;

    const cookies = Cookie.parse(cookieStr || '') || {};

    const lang = cookies['lang'];
        if(!lang)this.$cookiz.set('lang', 'ua', {
        maxAge: 60 * 60 * 24 * 30
    });
        commit('SET_LOCATION', lang)
},
    setLocation({commit},lang){
        commit('SET_LOCATION', lang)
    }
};


export const getters = {

    location(state){
        return state.location
    }

};

