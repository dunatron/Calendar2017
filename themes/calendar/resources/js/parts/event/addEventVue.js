/**
 * Created by admin on 16/05/17.
 */
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

export default new Vue({
    el: '#TimmyTalesApp',

    data() {
        return {
            tales: [],

        }
    },

    created()
    {

    },

    methods: {

        change() {

        },

    },
    watch: {

    },
    mounted(){
        //$(this.$refs.vueTaleFormModal).on("hidden.bs.modal", this.clearTaleForm)
    }

})
