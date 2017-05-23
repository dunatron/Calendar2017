import Vue from '../../node_modules/vue/dist/vue.common';
import VeeValidate from 'vee-validate';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

Vue.use(VeeValidate);

export default new Vue({
    el: '#site-wrapper',
    // components: { VueGoogleAutocomplete },
    components: { VueGoogleAutocomplete },
    //name: 'Add-Event',
    data: ({
        Title: '',
        address: '',
        Description: '',
        HasTickets: false,
        Restriction: '',

    }),

    computed: {
        name() {
            return `${this.EventForm.first_name} ${this.EventForm.last_name}`;
        }
    },
    methods: {
        /**
         * When the location found
         * @param {Object} addressData Data of the found location
         * @param {Object} placeResultData PlaceResult object
         */
        getAddressData: function (addressData, placeResultData) {
            this.address = addressData;
        },

        // placechanged: {
        //
        // }
    }


})