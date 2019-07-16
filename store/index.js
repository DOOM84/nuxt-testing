export const state = () => ({
    aside: true

});

export const mutations = {
    SET_ASIDE(state){
        state.aside = !state.aside
    },

};

export const actions = {
    nuxtServerInit({dispatch}){
        dispatch('auth/setLang');
    }
};

export const getters = {

    aside(state){
        return state.aside
    }

};