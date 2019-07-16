export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/stats')
        } catch (error) {
            throw error;
        }
    },

    async userStat({}, data){
        try {
            return await this.$axios.$get(`admin/stats/user/${data}`)
        } catch (error) {
            throw error;
        }
    },

    async groupStat({}, data){
        try {
            return await this.$axios.$get(`admin/stats/group/${data}`)
        } catch (error) {
            throw error;
        }
    },

    async resDetail({}, data){
        try {
            return await this.$axios.$get(`admin/stats/user/resDetail/${data}`)
        } catch (error) {
            throw error;
        }
    },

    async graphStud({}, data){
        try {
            return await this.$axios.$get(`admin/stats/graphStud/${data}`)
        } catch (error) {
            throw error;
        }
    },

    async graphGroup({}, data){
        try {
            return await this.$axios.$get(`admin/stats/graphGroup/${data}`)
        } catch (error) {
            throw error;
        }
    },

    async graphStudByDate({}, data) {
        try {
            return await this.$axios.$post(`admin/stats/graphStudByDate/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async graphGroupByDate({}, data) {
        try {
            return await this.$axios.$post(`admin/stats/graphGroupByDate/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    }
};
