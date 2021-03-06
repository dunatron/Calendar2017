// import Vue from '../../node_modules/vue/dist/vue.common';
/*jslint browser: true*/
/*global $, jQuery, happLoader*/
import Vue from '../../node_modules/vue/dist/vue.esm.js';
import VeeValidate from 'vee-validate';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import RadialProgressBar from 'vue-radial-progress'
import moment from 'moment';
import VueRecaptcha from 'vue-recaptcha';
import VueClip from 'vue-clip';


Vue.use(VeeValidate);
Vue.use(VueClip); // make vue use this plugin


// Vue.component('filter-events', {
//
//     template: `<div class="notsopretty success smooth">
//                     <input type="checkbox" id="$ID" value="$ID" v-model="SecondaryFilter" @click="CheckFilter">
//                     <label>
//                         <i class="glyphicon glyphicon-pushpin"></i>
//                         $Title
//                     </label>
//                 </div>`,
//
//     data() {
//         return {
//             MainFilter: [],
//             SecondaryFilter: [],
//         }
//     },
//
//
//     methods: {
//
//         CheckFilter: function ()
//         {
//             let Events = $('.event-btn');
//
//             let FilterTags = this.SecondaryFilter;
//
//             Events.each( function(index){
//
//                 let eventTagID =  $(this).attr('data-tag');
//                 let theEvent = $(this);
//
//                 if (FilterTags.includes(eventTagID)) {
//                     $(this).removeClass('hide-event');
//                     $(this).addClass('show-event');
//                 }
//                 else
//                 {
//                     $(this).removeClass('show-event');
//                     $(this).addClass('hide-event');
//
//                 }
//
//             });
//
//             // Remove all filters
//             if (this.SecondaryFilter.length === 0)
//             {
//                 Events.each( function(index){
//                     $(this).removeClass('hide-event');
//                     $(this).addClass('show-event');
//                 });
//             }
//
//         }
//
//     }
//
// });


export default function VueAddEvent() {

    let AddEventForm = new Vue({
        el: '#site-wrapper',
        components: {
            VueGoogleAutocomplete,
            RadialProgressBar,
            'vue-recaptcha': VueRecaptcha,
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
            BookingWebsite: null,
            Restriction: '',
            HappTag: null,
            SecondaryTag: null,
            // Below is Progress spinner Data
            completedSteps: 0,
            totalSteps: 5,
            animateSpeed: 1000,
            diameter: 5,
            strokeWidth: 2,
            startColor: '#FF6733',
            stopColor: '#FF6733',
            innerStrokeColor: '#FF6733',
            timingFunc: 'linear',
            specLocation: '',
            specEntry: '',
            // 3d slider
            //slides: 7
            //sitekey: '6LdeySkUAAAAAFkVXrWjtjBccmEVBeSnRVbkzdQ1'
            sitekey: '6Ldr6CkUAAAAAIraLSAjSqITbabSitWpJi2nVmnM',
            image: '',
            files: [],
            // Vue clip
            options: {
                url: '/pagefunction/UploadFormImages',
                maxFilesize: 2, // 1mb
                maxFiles: {
                    limit: 5,
                    message: 'You can only upload a max of 5 files'
                },
                acceptedFiles: {
                    extensions: ['image/*'],
                    message: 'You are uploading an invalid file'
                },
                accept: function (file, done) {
                    console.log('HITTING THE VALIDATION I SUPPOSE, FIRE INCAPSULA');
                    if (file.size > (2 * 1024 * 1024)) {
                        done('File must be smaller than 1MB')
                        return
                    }

                    done()
                }
            },
            // Filter
            MainFilter: [],
            SecondaryFilter: [],

        }),

        computed: {
            name() {
                return `${this.EventForm.first_name} ${this.EventForm.last_name}`;
            }
        },

        accept: function (file, done) {
            if (file.size > (1024 * 1024)) {
                done('File must be smaller than 1MB')
                return
            }

            done()
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

                var contentString = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<p id="firstHeading" class="firstHeading">' + this.placeData.adr_address + '</p>' +
                    '</div>' +
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
                marker.addListener('click', function () {
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

            stepFourForwardProgress() {
                console.log('Go To Step Three after validation');
            },

            stepTwoBackProgress() {
                console.log('Go Back to step One');
            },

            stepThreeBackProgress() {
                console.log('Go Back to step One');
            },

            stepFourBackProgress() {
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

                    // // Callback method that fires after dom has been updated by this method
                    // this.$nextTick(function () {
                    //     //$('.Generated__Time').wickedpicker(GlobalTimePickerOptions);
                    //     this.scrollToDates();
                    // })

                }

                // Callback method that fires after dom has been updated by this method
                this.$nextTick(function () {
                    //$('.Generated__Time').wickedpicker(GlobalTimePickerOptions);
                    this.scrollToDates();
                })

            },

            scrollToDates: function () {
                console.log('I wanna scroll down');
                //$('.Event__Dates').animate({ scrollTop: 0 }, 'slow');

                // Need Jquery ui
                // $('html, body').animate({
                //     scrollTop: $('.Date__Object').offset().top
                // }, 300, 'easeInOutExpo');
            },


            submitNewEvents: function () {

                happLoader.startLoading();

                $('#submitHappEvent').replaceWith('<h1 id="SubmittingText">Thank-you for your event Submission</h1>');

                let MyData = this.$data;

                console.log(MyData);

                axios.post('/pagefunction/storeNewEvents', {
                    Data: MyData
                })
                    .then(function (response) {
                        happLoader.finishLoading();
                        console.log(response);
                        $('#SubmittingText').replaceWith('<h1>Thank-you for your event Submission</h1>');
                    })
                    .catch(function (error) {
                        happLoader.finishLoading();
                        alert(error);
                    });

            },


            onSubmit: function () {
                this.$refs.invisibleRecaptcha.execute()
            },
            onVerify: function (response) {
                console.log('Verify: ' + response)
                // I think Recaptcha has passewd at this point(safe to submit form to
                // server to validate there too
                this.submitNewEvents();
            },
            onExpired: function () {
                console.log('Expired')
            },
            resetRecaptcha: function () {
                this.$refs.recaptcha.reset() // Direct call reset method
            },

            fileAdded (file) {
                // console.log('adding this FILE JUSUT ID PLEASE');
                // console.log(file.xhrResponse.response);
                // //this.files.push(file)
                // this.files.push(file.xhrResponse.response);
            },

            complete: function (file, status, xhr) {
                console.log('---file---');
                console.log(file)
                console.log('---status---');
                console.log(status);
                console.log('---xhr---');
                console.log(xhr);

                var data = JSON.parse(file.xhrResponse.response);
                // Adding server id to be used for deleting
                // the file.
                //file.addAttribute('id', xhr.response.id)
                if (status === 'success') {
                    // this.files.push(file.xhrResponse.response);
                    // let FileObject = {
                    //     "FileObject": {
                    //         "ID": data,
                    //     }
                    // };
                    this.files.push(data);
                }

            },

            eventHasTickets: function () {

                this.HasTickets = true;

                this.$nextTick(function () {

                    if (this.HasTickets === true) {
                        axios.post('/pagefunction/getTicketOptionTemplate', {
                            Data: this.HasTickets
                        })
                            .then(function (response) {
                                // $('.ticket-type-wrap').html('<h1>Surely</h1>')

                                $('#has-tickets').html('<span id="has-tickets"></span>');
                                $('.ticket-type-wrap').html(response.data);
                                console.log(response)
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }

                })

            },

            toggleWebTicket: function ()
            {
                alert('Toggling');
            },


            CheckFilter: function ()
            {
                let Events = $('.event-btn');

                let FilterTags = this.SecondaryFilter;

                Events.each( function(index){

                    let eventTagID =  $(this).attr('data-tag');
                    let theEvent = $(this);

                    if (FilterTags.includes(eventTagID)) {
                        $(this).removeClass('hide-event');
                        $(this).addClass('show-event');
                    }
                    else
                    {
                        $(this).removeClass('show-event');
                        $(this).addClass('hide-event');
                    }

                });

                // Remove all filters
                if (this.SecondaryFilter.length === 0)
                {
                    Events.each( function(index){
                        $(this).removeClass('hide-event');
                        $(this).addClass('show-event');
                    });
                }

            }


        }


    })

}