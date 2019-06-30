export const state = () => ({
});

export const mutations = {};


export const actions = {

    async fetch() {
        try {
            return await this.$axios.$get('topics')
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {};