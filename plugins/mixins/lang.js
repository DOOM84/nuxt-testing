import Vue from 'vue'
import Lang from '@/static/lang'

Vue.mixin({
    methods: {
        getLang (loc,key) {
            if(loc === 'en' || loc === 'ua'){
                return Lang[loc][key]
            }
            return Lang['ua'][key]
        }
    }
});
