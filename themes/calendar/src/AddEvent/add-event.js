import Vue from '../../node_modules/vue/dist/vue.common';
import VeeValidate from 'vee-validate';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import RadialProgressBar from 'vue-radial-progress'
import moment from 'moment';
import VueRecaptcha from 'vue-recaptcha';

Vue.use(VeeValidate);


// import Carousel3d from 'vue-carousel-3d';
//
// Vue.use(Carousel3d);

export default function VueAddEvent() {

    let AddEventForm = new Vue({
        el: '#site-wrapper',
        components: {
            VueGoogleAutocomplete,
            RadialProgressBar,
            'vue-recaptcha': VueRecaptcha
        },
        name: 'Add-Event',
        data: ({
            Dates: [],
            Title: '',
            address: '',
            placeData: '',
            Description: '',
            HasTickets: false,
            TicketType: null,
            Restriction: '',
            HappTag: null,
            SecondaryTag: null,
            // Below is Progress spinner Data
            completedSteps: 0,
            totalSteps: 5,
            animateSpeed: 1000,
            diameter: 300,
            strokeWidth: 10,
            startColor: '#429321',
            stopColor: '#FF6733',
            innerStrokeColor: '#323232',
            timingFunc: 'linear',
            // 3d slider
            //slides: 7
            //sitekey: '6LdeySkUAAAAAFkVXrWjtjBccmEVBeSnRVbkzdQ1'
            sitekey: '6Ldr6CkUAAAAAIraLSAjSqITbabSitWpJi2nVmnM'

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
                this.placeData = placeResultData;
                let EventPosition = {lat: this.address.latitude, lng: this.address.longitude};
                let happMarkerIcon = 'mysite/images/svg/location.svg',
                    map = new google.maps.Map(document.getElementById('addEventMap'), {
                        center: {lat: this.address.latitude, lng: this.address.longitude},
                        zoom: 13,
                        scrollwheel: false,
                    });

                // let happMarker = new google.maps.Marker({
                //     position: {lat: this.address.latitude, lng: this.address.longitude},
                //     map: map,
                //     icon: happMarkerIcon
                // });

                var infowindow = new google.maps.InfoWindow();
                var infowindowContent = document.getElementById('infowindow-content');
                infowindow.setContent(infowindowContent);
                var marker = new google.maps.Marker({
                    map: map,
                    anchorPoint: new google.maps.Point(this.address.latitude, this.address.longitude)
                });

                var contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<p id="firstHeading" class="firstHeading">'+this.placeData.adr_address+'</p>'+
                        '<hr>'+
                    '<div id="bodyContent">'+
                    '<p>Lat: <b>'+ this.address.latitude + '</b>' +
                    '<p>Lon: <b>'+ this.address.latitude + '</b>' +
                    '</p>'+
                    '</div>'+
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200
                });

                var marker = new google.maps.Marker({
                    position: EventPosition,
                    map: map,
                    title: 'Location Details',
                    icon: happMarkerIcon
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });

                infowindow.open(map, marker);

                //marker.trigger('click');

            },

            stepOneForwardProgress() {
                console.log('Go To Step two after validation');
            },

            stepTwoForwardProgress() {
                console.log('Go To Step Three after validation');
            },

            stepThreeForwardProgress() {
                console.log('Go To Step Three after validation');
            },

            stepTwoBackProgress() {
                console.log('Go Back to step One');
            },

            stepThreeBackProgress() {
                console.log('Go Back to step One');
            },

            detailsForwardProgress: function () {
                if (this.HasTickets === true) {
                    this.completedSteps = 1;
                } else {
                    this.completedSteps = 3;
                }
            },

            ticketBackProgress: function () {
                this.completedSteps = 0;
            },
            ticketForwardProgress: function () {
                if (this.TicketType === "5") {
                    this.completedSteps = 2;
                } else {
                    this.completedSteps = 3;
                }

            },

            websiteBackProgress: function () {
                this.completedSteps = 1;
            },
            websiteForwardProgress: function () {
                this.completedSteps = 3;
            },

            locationBackProgress: function () {
                if (this.TicketType === "5") {
                    this.completedSteps = 2;
                }
                else if (this.HasTickets === true) {
                    this.completedSteps = 1;
                }
                else {
                    this.completedSteps = 0;
                }
            },
            locationForwardProgress: function () {
                this.completedSteps = 4;
            },

            dateBackProgress: function () {
                this.completedSteps = 3;
            },
            dateForwardProgress: function () {
                this.completedSteps = 5;
            },

            finishBackProgress: function () {
                this.completedSteps = 4;
            },

            generateDates: function () {

                // First Clear any Dates
                this.Dates = [];

                // Get Calendar Picker
                let date_input = $('.Bootstrap__DatePicker');

                let Dates = $(date_input).datepicker('getDates');

                let StartTime = $('#Form_HappEventForm_StartTime').val();
                let FinishTime = $('#Form_HappEventForm_FinishTime').val();

                for (let value of Dates) {

                    let today = new Date();
                    let dd = value.getDate();
                    let mm = value.getMonth() + 1; //January is 0!

                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    let yyyy = value.getFullYear();
                    value = dd + '/' + mm + '/' + yyyy;

                    //let DateMom = moment(String(value)).format('dd/mm/yyyy');
                    let StartTimeFormat = moment(StartTime, ["h:mm A"]);
                    let FinishTimeFormat = moment(FinishTime, ["h:mm A"]);

                    let FormatStartTime = StartTimeFormat.format("HH:mm");
                    let FormatFinishTime = FinishTimeFormat.format("HH:mm");

                    let DateObject = {
                        "DateObject": {
                            "EventDate": value,
                            "StartTime": FormatStartTime,
                            "EndTime": FormatFinishTime
                        }
                    };

                    this.Dates.push(DateObject);

                    // Callback method that fires after dom has been updated by this method
                    this.$nextTick(function () {
                        //$('.Generated__Time').wickedpicker(GlobalTimePickerOptions);
                    })

                }

            },


            submitNewEvents: function () {

               this.$refs.invisibleRecaptcha.execute();

                axios.post('/pagefunction/storeNewEvents', {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            onSubmit: function () {
                this.$refs.invisibleRecaptcha.execute()
            },
            onVerify: function (response) {
                console.log('Verify: ' + response)
            },
            onExpired: function () {
                console.log('Expired')
            },
            resetRecaptcha () {
                this.$refs.recaptcha.reset() // Direct call reset method
            }

        }


    })

}