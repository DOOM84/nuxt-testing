export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/user')
        } catch (error) {
            throw error;
        }
    },

    async edit() {
        try {
            return await this.$axios.$get('admin/user/edit')
        } catch (error) {
            throw error;
        }
    },

    async create() {
        try {
            return await this.$axios.$get('admin/user/create')
        } catch (error) {
            throw error;
        }
    },

    async store({}, data) {
        try {
            return await this.$axios.$post('admin/user', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/user/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            await this.$axios.$delete(`admin/user/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
