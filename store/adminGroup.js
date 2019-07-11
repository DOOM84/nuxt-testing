export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/group')
        } catch (error) {
            throw error;
        }
    },

    async edit() {
        try {
            return await this.$axios.$get('admin/group/edit')
        } catch (error) {
            throw error;
        }
    },

    async create() {
        try {
            return await this.$axios.$get('admin/group/create')
        } catch (error) {
            throw error;
        }
    },

    async store({}, data) {
        try {
            return await this.$axios.$post('admin/group', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/group/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            await this.$axios.$delete(`admin/group/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
