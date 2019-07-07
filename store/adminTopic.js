export const state = () => ({
});

export const mutations = {};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/topic')
        } catch (error) {
            throw error;
        }
    },

    async edit() {
        try {
            return await this.$axios.$get('admin/topic/edit')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/topic', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, data){

        try {
            await this.$axios.patch(`admin/topic/${data.id}`, data)
        } catch (error) {
            throw error;
        }
    },

    async delete({}, id){

        try {
            //await this.$axios.patch(`admin/topic/${data.id}`, data)
            await this.$axios.$delete(`admin/topic/${id}`);
        } catch (error) {
            throw error;
        }
    }
};
