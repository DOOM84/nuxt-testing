export const state = () => ({

});

export const mutations = {

};

export const actions = {

    async detail({}, data) {
        try {
            return await this.$axios.$post('detail', {id: data})
        } catch (error) {
            throw error;
        }
    },
    async result({}) {
        try {
            return await this.$axios.$post('results')
        } catch (error) {
            throw error;
        }
    },
    async group({}) {
        try {
            return await this.$axios.$post('group')
        } catch (error) {
            throw error;
        }
    },

    async graphStud({}) {
        try {
            return await this.$axios.$post('graphStud')
        } catch (error) {
            throw error;
        }
    },
    async graphGroup({}) {
        try {
            return await this.$axios.$post('graphGroup')
        } catch (error) {
            throw error;
        }
    },
    async graphStudByDate({}, data) {
        try {
            return await this.$axios.$post('graphStudByDate', data)
        } catch (error) {
            throw error;
        }
    },
    async graphGroupByDate({}, data) {
        try {
            return await this.$axios.$post('graphGroupByDate', data)
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

};