export const state = () => ({
});

export const mutations = {};


export const actions = {

    async fetch() {
        try {
            return await this.$axios.$get('group')
        } catch (error) {
            throw error;
        }
    },
};
