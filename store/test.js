import Vue from 'vue'
export const state = () => ({
    answers: []

});

export const mutations = {
    SET_ANSWERS(state, data){
        Vue.set(state.answers, data.index, data.answer);
    },
    CLEAR_ANSWERS(state){
        state.answers = [];
    }
};

export const actions = {

    async fetch({}, data) {
        try {
            return await this.$axios.$post('test', {topic: data})
        } catch (error) {
            throw error;
        }
    },
    async finish({}, data) {
        try {
            return await this.$axios.$post('getResult', data)
        } catch (error) {
            throw error;
        }
    },
    async getMes({}, answers) {
        try {
            return await this.$axios.$post('getMes', {answers: answers})
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

    answers(state){
        return state.answers.filter(Boolean)
    }

};