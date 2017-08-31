/**
 * Created by admin on 16/05/17.
 */
/**
 * Created by Heath on 24/05/16.
 */
/*global $, jQuery, happLoader*/

export default function CalendarNavigation() {

    var xmlHttp = createXmlHttpRequestObject(),
        searchModal = $('#SearchModal'),
        happSearchBtn = $('#searchHappEvents');

    let history = require('history-events');

    let currMonth = null,
        currYear = null,
        currEID = null;

    /**
     *
     * This object is the core of ajax, communicates with server and user computer
     * DO NOT REMOVE AJAX OBJECT
     *
     **/
    function createXmlHttpRequestObject() {
        var xmlHttp;

        // If a window is open in your browser is aware of this object
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");//you are IE
        }

        return xmlHttp;// this object is now usable by other functions
    }

    /**
     *
     * Handle the first thing that is loaded when we visit the page
     *
     **/
    function process() {
        if (xmlHttp) {
            try {
                xmlHttp.open("GET", "bacon.txt", true); //Configure connection settings with server
                xmlHttp.onreadystatechange = handleServerResponse;
                xmlHttp.send(null); //this connects with the server
            } catch (e) {
                alert(e.toString());
            }
        }
    }

    function setInitialUrl() {

        /**
         * Somehow check the url for an EID first & Y & M
         * If it is set don't perform the initial ajax call to set the url, instead try open the modal
         * method is in Approved Event
         */

        $.ajax({
            type: "POST",
            url: '/calendarfunction/getSessionData',

            success: function (response) {
                console.log(response);

                let data = jQuery.parseJSON(response);

                let year = data.year,
                    month = data.month,
                    eID = data.eID;
                // Should always return with month and year
                currMonth = month;
                currYear = year;
                console.log('our constants' + currMonth);
                console.log('our constants' + currYear);

                if (typeof eID !== 'undefined' && eID.length > 0) {
                    if (history.isHistorySupported()) {
                        window.history.pushState(null, null, '?Y=' + year + '&M=' + month + '&EID=' + eID); // `changestate` will be triggered
                        getAssociatedEventData(eID);
                        currEID = eID;
                        console.log('our constants' + currEID);
                    }
                } else {
                    if (history.isHistorySupported()) {
                        window.addEventListener('changestate', function (e) {
                            //console.log('URL changed');
                        });

                        window.history.pushState(null, null, '?Y=' + year + '&M=' + month); // `changestate` will be triggered
                    }
                }

            },
            complete: function () {
                // drawCalendarBody();
            }
        });
    }

    function drawCalendarBody()
    {
        //draw_calendar
        $.ajax({
            type: "POST",
            url: '/calendarfunction/draw_calendar',

            success: function (response) {
                $('.fc-calendar-container').html(response);
            },
            complete: function () {
                //doCalendar();
            }
        });
    }


    /**
     *
     * Handle server response
     *
     **/
    function handleServerResponse() {
        var theD = document.getElementById('theD');
        if (xmlHttp.readyState == 1) {
            theD.innerHTML += "status 1: server connection established <br />";
        } else if (xmlHttp.readyState == 2) {
            theD.innerHTML += "status 2: request received <br />";
        } else if (xmlHttp.readyState == 3) {
            theD.innerHTML += "status 3: request received <br />";
        } else if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                try {

                    var text = xmlHttp.responseText;
                    theD.innerHTML += "Status 4: request is finished and response is ready <br/>";
                    theD.innerHTML += text;
                } catch (e) {
                    alert(e.toString());
                }
            } else {
                alert(xmlHttp.statusText);
            }
        }
    }

    /**
     * Happ Search
     */
    $(happSearchBtn).on('click', function (e) {
        e.preventDefault();
        happLoader.startLoading();

        var keyword = $('#Form_HappSearchForm_keyword').val(),
            pastFuture = $('input[name=PastOrFuture]:checked').val(),
            dateOrText = $('input[name=DateOrText]:checked').val();

        //alert(url);
        $.ajax({
            type: "POST",
            url: '/pagefunction/searchHappEvents',
            data: {Keyword: keyword, PastFuture: pastFuture, DateOrText: dateOrText},
            success: function (response) {
                $('.search-results-wrapper').html(response);
                collapseAdvancedSearch()
            },
            complete: function () {
                // setupEventClickListner();
                setupApprovedEventClick();
                happLoader.finishLoading();
            }
        });
    });

    function setupEventClickListner() {
        $('.event-btn').on("click", function () {
            var target = $(this).attr("data-target");

            var EVENTID = $(this).attr("eid");

            getAssociatedEventData(EVENTID);

        });
    }

    function getAssociatedEventData(eventID) {
        // Set EventTitle
        $.ajax({
            type: "GET",
            url: '/calendarfunction/EventTitle',
            data: {EventID: eventID},
            success: function (response) {
                $('.modal-title').html(response);
            }
        });
        //EventImages
        $.ajax({
            type: "POST",
            url: '/calendarfunction/associatedEventData',
            data: {EventID: eventID},
            success: function (response) {
                $('.event-assocData').html(response);
            },
            complete: function () {
                setupBxSlider();
            }
        });

        $('#ApprovedEventModal').modal('show');
        // Modal Dialog control | reference
        $('#ApprovedEventModal').on('shown.bs.modal', function () {
            //$('#eventMap1').locationpicker('autosize');
            modalIsOpen();
        });

    }

    function collapseAdvancedSearch() {
        $('#advancedSearch').collapse('hide')
    }

    /**
     * for some reason was submitting the form
     */
    $('#advancedToggle').on('click', function (e) {
        e.preventDefault();
    });

    $(searchModal).on('shown.bs.modal', function () {
        $('html').addClass('modal-open');
    });

    $(searchModal).on('hidden.bs.modal', function () {
        $('html').removeClass('modal-open');
    });

    function setCorrectPreviousDateData(data) {
        let year = data.year;
        let month = data.month;
        console.log('before minus month ' + month);
        month--;
        if (month === 0) {
            year--;
            month = 12;
        }
        console.log('after minus month ' + month);
        console.log('after minus month for year ' + year);
        return {month, year}
    }

    function setCorrectNextDateData(data) {
        let year = data.year;
        let month = data.month;

        month++;
        if (month === 13) {
            year++;
            month = 1;
        }

        return {month, year}
    }

    /**
     * Reset Calendar Dates
     */
    $('#reset-calendar-dates').on('click', function (e) {
        e.preventDefault();
        happLoader.startLoading();

        var url = $(this).attr('href');
        $.ajax({
            type: "POST",
            url: url + '/resetCalendarDate',

            success: function (response) {
                $('.fc-calendar-container').html(response);

            },
            complete: function () {
                doMonth();
                setupApprovedEventClick();
            }
        });

        function doMonth() {
            $.ajax({
                type: "POST",
                url: url + '/currentMonthName',
                success: function (response) {
                    $('.theMonth').html(response);
                },
                complete: function () {
                    doYear();
                }
            });
        }

        function doYear() {
            $.ajax({
                type: "POST",
                url: url + '/currentYear',
                success: function (response) {
                    $('.theYear').html(response);
                },
                complete: function () {
                    doNextMonth();
                }
            });
        }

        function doNextMonth() {
            $.ajax({
                type: "POST",
                url: url + '/nextShortMonth',
                success: function (response) {
                    $('.short-next-text').html(response);
                },
                complete: function () {
                    doPrevMonth();
                }
            });
        }

        function doPrevMonth() {
            $.ajax({
                type: "POST",
                url: url + '/prevShortMonth',
                success: function (response) {
                    $('.short-previous-text').html(response);
                },
                complete: function () {
                    happLoader.finishLoading();
                }
            });
        }

    });

    /**
     * Next Month Logic
     */
    $('.calendarpage').on('click', '#next-month', function (e) {
        e.preventDefault();
        happLoader.startLoading();

        var url = $(this).attr('href');


        //let history = require('history-events');

        $.ajax({
            type: "POST",
            url: '/calendarfunction/getSessionData',

            success: function (response) {
                console.log(response);

                let data = jQuery.parseJSON(response);

                let correctData = setCorrectNextDateData(data);

                let year = correctData.year,
                    month = correctData.month;

                currYear = year;
                currMonth = month;

                if (history.isHistorySupported()) {
                    window.addEventListener('changestate', function (e) {
                        //console.log('URL changed');
                    });

                    window.history.pushState(null, null, '?Y=' + currYear + '&M=' + currMonth); // `changestate` will be triggered
                }


            },
            complete: function () {
                doCalendar();
            }
        });

        function doCalendar() {
            $.ajax({
                type: "POST",
                url: url + '/jaxNextMonth',

                success: function (response) {
                    $('.fc-calendar-container').html(response);
                },
                complete: function () {
                    doMonth();
                    setupApprovedEventClick();
                }
            });
        }

        function doMonth() {
            $.ajax({
                type: "POST",
                url: url + '/currentMonthName',
                success: function (response) {
                    $('.theMonth').html(response);
                },
                complete: function () {
                    doYear();
                }
            });
        }

        function doYear() {
            $.ajax({
                type: "POST",
                url: url + '/currentYear',
                success: function (response) {
                    $('.theYear').html(response);
                },
                complete: function () {
                    doNextMonth();
                }
            });
        }

        function doNextMonth() {
            $.ajax({
                type: "POST",
                url: url + '/nextShortMonth',
                success: function (response) {
                    $('.short-next-text').html(response);
                },
                complete: function () {
                    doPrevMonth();
                }
            });
        }

        function doPrevMonth() {
            $.ajax({
                type: "POST",
                url: url + '/prevShortMonth',
                success: function (response) {
                    $('.short-previous-text').html(response);
                },
                complete: function () {
                    happLoader.finishLoading();
                }
            });
        }

    });

    /**
     * Previous Month Logic
     */
    $('.calendarpage').on('click', '#previous-month', function (e) {
        e.preventDefault();
        happLoader.startLoading();

        var url = $(this).attr('href');

        // let history = require('history-events');

        $.ajax({
            type: "POST",
            url: '/calendarfunction/getSessionData',

            success: function (response) {

                let data = jQuery.parseJSON(response);

                let correctData = setCorrectPreviousDateData(data);

                let year = correctData.year,
                    month = correctData.month;

                currYear = year;
                currMonth = month;

                if (history.isHistorySupported()) {
                    window.addEventListener('changestate', function (e) {
                        //console.log('URL changed');
                    });

                    window.history.pushState(null, null, '?Y=' + currYear + '&M=' + currMonth); // `changestate` will be triggered
                }


            },
            complete: function () {
                doCalendar();
            }
        });

        /**
         * Will need to send Data now, we will get session data from above,
         * Then minus the Month by 1 and send this data to server to update session
         */
        function doCalendar() {
            $.ajax({
                type: "POST",
                url: url + '/jaxPreviousMonth',
                success: function (response) {
                    $('.fc-calendar-container').html(response);
                },
                complete: function () {
                    doMonth();
                    setupApprovedEventClick();
                }
            });
        }

        function doMonth() {
            $.ajax({
                type: "POST",
                url: url + '/currentMonthName',
                success: function (response) {
                    $('.theMonth').html(response);
                },
                complete: function () {
                    doYear();
                }
            });
        }

        function doYear() {
            $.ajax({
                type: "POST",
                url: url + '/currentYear',
                success: function (response) {
                    $('.theYear').html(response);
                },
                complete: function () {
                    doNextMonth();
                }
            });
        }

        function doNextMonth() {
            $.ajax({
                type: "POST",
                url: url + '/nextShortMonth',
                success: function (response) {
                    $('.short-next-text').html(response);
                },
                complete: function () {
                    doPrevMonth();
                }
            });
        }

        function doPrevMonth() {
            $.ajax({
                type: "POST",
                url: url + '/prevShortMonth',
                success: function (response) {
                    $('.short-previous-text').html(response);
                },
                complete: function () {
                    happLoader.finishLoading();
                }
            });
        }
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    var MyRequestsCompleted = (function () {
        var numRequestToComplete,
            requestsCompleted,
            callBacks,
            singleCallBack;

        return function (options) {
            if (!options) options = {};

            numRequestToComplete = options.numRequest || 0;
            requestsCompleted = options.requestsCompleted || 0;
            callBacks = [];
            var fireCallbacks = function () {
                happLoader.finishLoading();
                applyFilter();
                for (var i = 0; i < callBacks.length; i++) callBacks[i]();
            };
            if (options.singleCallback) callBacks.push(options.singleCallback);


            this.addCallbackToQueue = function (isComplete, callback) {
                if (isComplete) requestsCompleted++;
                if (callback) callBacks.push(callback);
                if (requestsCompleted == numRequestToComplete) fireCallbacks();
            };
            this.requestComplete = function (isComplete) {
                if (isComplete) requestsCompleted++;
                if (requestsCompleted == numRequestToComplete) fireCallbacks();
            };
            this.setCallback = function (callback) {
                callBacks.push(callBack);
            };
        };
    })();

    function happEventReveal() {
        // Scroll Reveal | https://github.com/jlmakes/scrollreveal


        if ($(window).width() <= 880) {
            // if smaller or equal
            // window.sr = ScrollReveal({duration: 750});
            // sr.reveal('.event-btn');
            var mobileEventReveal = {
                delay: 100,
                distance: '140px', //90 original
                easing: 'ease-in-out',
                //rotate   : { z: -10 }, // x y z
                width: 0,
                scale: 0.8,
                origin: 'bottom', // bottom, left , top right
                viewFactor: 0.3
            };

            //window.sr = ScrollReveal();
            if ($('.event-btn').length) {
                window.sr.reveal('.event-btn', mobileEventReveal);
            }

        } else {
            // if larger

        }
    }

    $(window).resize(function () {

    }).resize(); // This will simulate a resize to trigger the initial run.

    happLoader.finishLoading();

    /**
     *
     * Functions from Approved Event.
     *
     * ToDo : convert all this ugly JS into proper es6
     *
     */

    function setupApprovedEventClick() {
        $('.event-btn').on("click", function () {
            var target = $(this).attr("data-target");

            var EVENTID = $(this).attr("eid");
            currEID = EVENTID;

            // let mapLatitude = $(this).attr("lat"),
            //     mapLongitude = $(this).attr("lon");

            let mapLatitude = Number.parseInt($(this).attr("lat"), 10),
                mapLongitude = Number.parseInt($(this).attr("lon"), 10);

            console.log('becaue we need to setup click listner');
            // ToDO Create AJAX Call To Database to get different elements


            if (history.isHistorySupported()) {
                window.addEventListener('changestate', function (e) {
                    //console.log('URL changed');
                });

                window.history.pushState(null, null, '?Y=' + currYear + '&M=' + currMonth + '&EID=' + currEID); // `changestate` will be triggered
            }

            // Set EventTitle
            $.ajax({
                type: "POST",
                url: '/calendarfunction/EventTitle',
                data: {EventID: EVENTID},
                success: function (response) {
                    $('.modal-title').html(response);
                }
            });
            //EventImages
            $.ajax({
                type: "POST",
                url: '/calendarfunction/associatedEventData',
                data: {EventID: EVENTID},
                success: function (response) {
                    $('.event-assocData').html(response);

                    console.log(mapLatitude);
                    console.log(mapLongitude);

                    let happMarkerIcon = 'mysite/images/svg/location.svg';
                    let EventPosition = {lat: mapLatitude, lng: mapLongitude};


                    var approvedMap = new google.maps.Map(document.getElementById('tronMap'), {
                        center: {lat: mapLatitude, lng: mapLongitude},
                        scrollwheel: false,
                        zoom: 12,
                        markerIcon: 'mysite/images/svg/location.svg'
                    });

                    var marker = new google.maps.Marker({
                        position: EventPosition,
                        map: approvedMap,
                        title: 'Location Details',
                        icon: happMarkerIcon
                    });

                },
                complete: function () {
                    setupBxSlider();
                }
            });
            // Modal Dialog control | reference
            $('#ApprovedEventModal').on('shown.bs.modal', function () {
                //$('#eventMap1').locationpicker('autosize');
                modalIsOpen();
            });

        });
    }

    $('#ApprovedEventModal').on('hidden.bs.modal', function () {
        modalIsClosed();
        $.ajax({
            type: "POST",
            url: 'calendarfunction/resetApprovedModal',
            success: function (response) {
                $('.event-assocData').html(response);
            }
        });
    });

    function modalIsOpen() {
        $('html').addClass('modal-open');
    }

    function modalIsClosed() {
        // Check if search modal is open
        if ($('#SearchModal').hasClass('in')) {

        } else {
            $('html').removeClass('modal-open');
        }
    }

    var sliderOptions = {
        speed: 500,
        slideMargin: 0,
        nextText: 'Next',
        prevText: 'Prev',
        maxSlides: 1,
        slideWidth: 700,
        captions: true,
        adaptiveHeight: true,
        pager: false,
        responsive: true
    };

    function setupBxSlider() {
        if (window.jQuery === undefined) window.$ = window.jQuery = jQuery;
        $('.event-image-bxslider').bxSlider(sliderOptions);
    }

    setupApprovedEventClick();

    setInitialUrl();

    function revealEvents() {
        $('.event-btn ').addClass('show-event');
    }


    revealEvents();

    //happEventReveal();

}