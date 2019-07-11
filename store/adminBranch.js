export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/branch')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/branch', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/branch/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            await this.$axios.$delete(`admin/branch/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
