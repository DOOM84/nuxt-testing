import Vue from 'vue'

Vue.mixin({
    methods: {
        random(high, low) {
            high++;
            return Math.floor((Math.random()) * (high - low)) + low;
        }
    }
});