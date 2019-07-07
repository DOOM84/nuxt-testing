export const state = () => ({
});

export const mutations = {};


export const actions = {

    async fetch() {
        try {
            return await this.$axios.$get('admin/home')
        } catch (error) {
            throw error;
        }
    },
};
