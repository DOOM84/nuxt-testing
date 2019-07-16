import Cookie from 'cookie';
export const state = () => ({
    busy: false,
    loggedIn: false,
    strategy: "local",
    user: false,
    location: 'ua',
    isAdmin: null
});

export const mutations = {
    SET_LOCATION(state, data){
        state.location = data
    },
    SET_ADMIN(state, data){
        state.isAdmin = data
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
    },

    async checkAdmin({commit}) {
        try {
            const adm = await this.$axios.$get('checkAdmin');
            commit('SET_ADMIN', adm);
            return adm;

        } catch (error) {
            throw error;
        }

    },
};

export const getters = {

    location(state){
        return state.location
    },
    isAdmin(state){
        return state.isAdmin()
    }
};

