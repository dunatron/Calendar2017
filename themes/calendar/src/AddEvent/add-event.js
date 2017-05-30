import Vue from '../../node_modules/vue/dist/vue.common';
import VeeValidate from 'vee-validate';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import RadialProgressBar from 'vue-radial-progress'

Vue.use(VeeValidate);

export default function VueAddEvent() {

 new Vue({
        el: '#site-wrapper',
        components: {VueGoogleAutocomplete, RadialProgressBar},
        name: 'Add-Event',
        data: ({
            Title: '',
            address: '',
            Description: '',
            HasTickets: false,
            TicketType: null,
            Restriction: '',
            // Below is Progress spinner Data
            completedSteps: 0,
            totalSteps: 5,
            animateSpeed: 1000,
            diameter: 300,
            strokeWidth: 10,
            startColor: '#429321',
            stopColor: '#FF6733',
            innerStrokeColor: '#323232',
            timingFunc: 'linear'

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

            detailsForwardProgress: function() {
                if(this.HasTickets === true)
                {
                    this.completedSteps = 1;
                } else {
                    this.completedSteps = 3;
                }
            },

            ticketBackProgress: function() {
                this.completedSteps = 0;
            },
            ticketForwardProgress: function() {
                if(this.TicketType === "5")
                {
                    this.completedSteps = 2;
                } else {
                    this.completedSteps = 3;
                }

            },

            websiteBackProgress: function() {
                this.completedSteps = 1;
            },
            websiteForwardProgress: function() {
                    this.completedSteps = 3;
            },

            locationBackProgress: function() {
                if(this.TicketType === "5")
                {
                    this.completedSteps = 2;
                }
                else if (this.HasTickets === true)
                {
                    this.completedSteps = 1;
                }
                else {
                    this.completedSteps = 0;
                }
            },
            locationForwardProgress: function() {
                this.completedSteps = 4;
            },

            dateBackProgress: function() {
                this.completedSteps = 3;
            },
            dateForwardProgress: function() {
                this.completedSteps = 5;
            },

            finishBackProgress: function() {
                this.completedSteps = 4;
            },

        }


    })

}