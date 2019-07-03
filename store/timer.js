export const state = () => ({
    min:null,
    sec:null,
    testStarted: false

});

export const mutations = {
    SET_START(state){
        state.testStarted = true;
    },
    SET_FINISH(state){
        state.testStarted = false;
        state.min = null;
        state.sec = null;
    },
    SET_TIME(state, data){
        state.min = data.min;
        state.sec = data.sec
    }
};

export const actions = {
    setFinish({commit}){
        commit('SET_FINISH')
    },
};

export const getters = {

    minutes(state){
        return state.min
    },
    seconds(state){
        return state.sec
    },
    started(state){
        return state.testStarted
    }

};