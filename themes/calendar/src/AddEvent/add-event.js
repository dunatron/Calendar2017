import Vue from '../../node_modules/vue/dist/vue.common';
import VeeValidate from 'vee-validate';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import RadialProgressBar from 'vue-radial-progress'
import moment from 'moment';
import VueRecaptcha from 'vue-recaptcha';
import VueClip from 'vue-clip';

Vue.use(VeeValidate);
Vue.use(VueClip); // make vue use this plugin


// import Carousel3d from 'vue-carousel-3d';
//
// Vue.use(Carousel3d);

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
            }

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

                let MyData = this.$data;

                console.log(MyData);

                axios.post('/pagefunction/storeNewEvents', {
                    Data: MyData
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //this.resetRecaptcha();
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
                //
                // var newurl = window.location.protocol + "//" + window.location.host + window.loctaion.pathname + '?myNewUrlQuery=1';
                // window.history.pushState({path:newurl},'',newurl);
                //window.location.href = window.location.href + '#abc';

                // es6b g
                //this.history.push('/store/' + storeId);


                // Get year, Month all from an axios request (from session data)
                // Update the window url etc

                //for the php
                //if (parse_url($url, PHP_URL_QUERY))
                //if ($_GET)
                //if (isset($_SERVER['QUERY_STRING']))


                // var history = require('history-events');
                //
                // if (history.isHistorySupported()) {
                //     window.addEventListener('changestate', function(e) {
                //         console.log('URL changed');
                //     });
                //
                //     // window.history.pushState(null, null, '/login'); // `changestate` will be triggered
                //     window.history.pushState(null, null, '?Y=2017&M=07&EID=26'); // `changestate` will be triggered
                // }



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

            }


        }


    })

}