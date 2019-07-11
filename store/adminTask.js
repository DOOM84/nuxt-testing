export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/task')
        } catch (error) {
            throw error;
        }
    },

    async edit({}, id) {
        try {
            return await this.$axios.$get(`admin/task/edit/${id}`)
        } catch (error) {
            throw error;
        }
    },

    async create() {
        try {
            return await this.$axios.$get('admin/task/create')
        } catch (error) {
            throw error;
        }
    },

    async store({}, data) {
        try {
            return await this.$axios.$post('admin/task', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/task/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async deleteAnsw({}, id){

        try {
            await this.$axios.$delete(`admin/task/delAnsw/${id}`);
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            await this.$axios.$delete(`admin/task/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
