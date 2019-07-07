export default {
    data() {
        return {
            from: 0,
            to: 10,
            search: '',
            currentPage: 1
        }
    },
    watch: {
        search(){
            this.changePage(1);
            this.from = 0;
            this.to = 10;
            if(!this.search){
                this.pages = this.tableData.length;
                this.filtered = this.tableData
            }
        }
    },
    methods: {
        changePage(page) {
            this.currentPage = page
        },
        pages(){
            return this.tableData.length;
        },
        handleCurrentChange(val) {
            this.from = (val-1)*10;
            this.to = this.from + 10;
        },
        showInfo(){
            if(!this.pages){
                return `Showing 0 to 0 of 0 entries (filtered from ${this.tableData.length} total entries)`
            }
            return `Showing from ${this.from+1} to ${(this.pages - this.from <= 8) ? this.pages  : this.to > this.pages ? this.to-1 : this.to} in ${this.pages} entries`
        },
    }
}