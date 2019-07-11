export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/level')
        } catch (error) {
            throw error;
        }
    },

    async store({}, data) {
        try {
            return await this.$axios.$post('admin/level', data)
        } catch (error) {
            throw error;
        }
    },

    async create() {
        try {
            return await this.$axios.$get('admin/level/create')
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/level/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            await this.$axios.$delete(`admin/level/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
