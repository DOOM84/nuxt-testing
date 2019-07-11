export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/source')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/source', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/source/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            await this.$axios.$delete(`admin/source/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
