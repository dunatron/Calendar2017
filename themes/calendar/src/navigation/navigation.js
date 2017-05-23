/**
 * Created by admin on 16/05/17.
 */
/**
 * Created by Heath on 24/05/16.
 */

export default function CalendarNavigation() {

    var xmlHttp = createXmlHttpRequestObject(),
        ajaxPageLoad = $('.ajax-page-load'),
        searchModal = $('#SearchModal'),
        happSearchBtn = $('#searchHappEvents');

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
    $(happSearchBtn).on('click', function(e){
        e.preventDefault();
        ajaxIsLoading();

        var keyword = $('#Form_HappSearchForm_keyword').val(),
            pastFuture  = $('input[name=PastOrFuture]:checked').val(),
            dateOrText  = $('input[name=DateOrText]:checked').val();

        //alert(url);
        $.ajax({
            type:"POST",
            url: '/pagefunction/searchHappEvents',
            data: {Keyword:keyword, PastFuture:pastFuture, DateOrText:dateOrText},
            success: function (response) {
                $('.search-results-wrapper').html(response);
                collapseAdvancedSearch()
            },
            complete: function(){
                ajaxFinishedLoading();
            }
        });
    });

    function collapseAdvancedSearch() {
        $('#advancedSearch').collapse('hide')
    }

    /**
     * for some reason was submitting the form
     */
    $('#advancedToggle').on('click', function(e){
        e.preventDefault();
    });

    $(searchModal).on('shown.bs.modal', function () {
        $('html').addClass('modal-open');
    });

    $(searchModal).on('hidden.bs.modal', function () {
        $('html').removeClass('modal-open');
    });

    /**
     * Reset Calendar Dates
     */
    $('#reset-calendar-dates').on('click', function (e) {
        e.preventDefault();
        ajaxIsLoading();

        var url = $(this).attr('href');
        $.ajax({
            type:"POST",
            url: url + '/resetCalendarDate',

            success: function (response) {
                $('.fc-calendar-container').html(response);

            },
            complete: function(){
                doMonth();
            }
        });

        function doMonth(){
            $.ajax({
                type:"POST",
                url: url + '/currentMonthName',
                success: function (response) {
                    $('.theMonth').html(response);
                },
                complete: function(){
                    doYear();
                }
            });
        }

        function doYear(){
            $.ajax({
                type:"POST",
                url: url + '/currentYear',
                success: function (response) {
                    $('.theYear').html(response);
                },
                complete: function(){
                    doNextMonth();
                }
            });
        }

        function doNextMonth(){
            $.ajax({
                type:"POST",
                url: url + '/nextShortMonth',
                success: function (response) {
                    $('.short-next-text').html(response);
                },
                complete: function(){
                    doPrevMonth();
                }
            });
        }

        function doPrevMonth(){
            $.ajax({
                type:"POST",
                url: url + '/prevShortMonth',
                success: function (response) {
                    $('.short-previous-text').html(response);
                },
                complete: function(){
                    ajaxFinishedLoading();

                }
            });
        }

    });

    $('.calendarpage').on('click', '#next-month', function (e) {
        e.preventDefault();
        ajaxIsLoading();

        var url = $(this).attr('href');
        $.ajax({
            type:"POST",
            url: url + '/jaxNextMonth',

            success: function (response) {
                $('.fc-calendar-container').html(response);
            },
            complete: function(){
                doMonth();
            }
        });

        function doMonth(){
            $.ajax({
                type:"POST",
                url: url + '/currentMonthName',
                success: function (response) {
                    $('.theMonth').html(response);
                },
                complete: function(){
                    doYear();
                }
            });
        }

        function doYear(){
            $.ajax({
                type:"POST",
                url: url + '/currentYear',
                success: function (response) {
                    $('.theYear').html(response);
                },
                complete: function(){
                    doNextMonth();
                }
            });
        }

        function doNextMonth(){
            $.ajax({
                type:"POST",
                url: url + '/nextShortMonth',
                success: function (response) {
                    $('.short-next-text').html(response);
                },
                complete: function(){
                    doPrevMonth();
                }
            });
        }

        function doPrevMonth(){
            $.ajax({
                type:"POST",
                url: url + '/prevShortMonth',
                success: function (response) {
                    $('.short-previous-text').html(response);
                },
                complete: function(){
                    ajaxFinishedLoading();
                }
            });
        }

    });

    /**
     * Previous Month Logic
     */
    $('.calendarpage').on('click', '#previous-month', function (e) {
        e.preventDefault();
        ajaxIsLoading();

        var url = $(this).attr('href');
        $.ajax({
            type:"POST",
            url: url + '/jaxPreviousMonth',

            success: function (response) {
                $('.fc-calendar-container').html(response);
            },
            complete: function(){
                doMonth();
            }
        });

        function doMonth(){
            $.ajax({
                type:"POST",
                url: url + '/currentMonthName',
                success: function (response) {
                    $('.theMonth').html(response);
                },
                complete: function(){
                    doYear();
                }
            });
        }

        function doYear(){
            $.ajax({
                type:"POST",
                url: url + '/currentYear',
                success: function (response) {
                    $('.theYear').html(response);
                },
                complete: function(){
                    doNextMonth();
                }
            });
        }

        function doNextMonth(){
            $.ajax({
                type:"POST",
                url: url + '/nextShortMonth',
                success: function (response) {
                    $('.short-next-text').html(response);
                },
                complete: function(){
                    doPrevMonth();
                }
            });
        }

        function doPrevMonth(){
            $.ajax({
                type:"POST",
                url: url + '/prevShortMonth',
                success: function (response) {
                    $('.short-previous-text').html(response);
                },
                complete: function(){
                    ajaxFinishedLoading();
                }
            });
        }
    });


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
                ajaxFinishedLoading();
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


    function ajaxIsLoading() {
        $(ajaxPageLoad).addClass('ajax-is-loading');
        $(ajaxPageLoad).removeClass('ajax-not-loading');
    }

    function ajaxFinishedLoading() {
        $(ajaxPageLoad).addClass('ajax-not-loading');
        $(ajaxPageLoad).removeClass('ajax-is-loading');
        applyFilter();
        happEventReveal();
    }

    /***
     *
     * FILTER jQuery
     */
    var FilterTagsHolder = $('.RealTagsHolder'),
        FilterModal = $('#FilterModal'),
        currentTagArray = [],
        event = $('.event-btn');

    $(FilterModal).modal({
        backdrop: false,
        show:false,
        label:false
    });

    $(FilterTagsHolder).select2({
        placeholder: "Filter..."
    });

    $(FilterTagsHolder).on('select2:select', function(){
        currentTags();
        //console.log(currentTagArray);
        applyFilter();
        $(this).addClass('Filter-Selected')
    });

    $(FilterTagsHolder).on('select2:unselect', function(){
        currentTags();
        //console.log(currentTagArray);
        applyFilter();
    });

    $(FilterTagsHolder).on('select2:open', function(){

    });

    $(FilterTagsHolder).on('select2:closing', function(){

    });

    function currentTags(){
        var TagData = $(FilterTagsHolder).select2('data');
        currentTagArray = [];
        $.each(TagData, function( key, value ){
            currentTagArray.push(value.text);
        });
    }
    function applyFilter(){
        if(currentTagArray.length !== 0){
            $('.event-btn').each(function(){
                var eventItem = this;
                var eventTags = $(this).attr('data-tag');

                if($.inArray(eventTags, currentTagArray) !== -1){
                    //console.log('WE have found ONE');
                    $(this).removeClass('fully-hide-event');
                    $(this).addClass('show-event');
                    $(this).removeClass('hide-event');

                } else {
                    //console.log('Not found');
                    $(this).addClass('hide-event');
                    $(this).removeClass('show-event');
                    setTimeout(function () {
                        $(eventItem).addClass('fully-hide-event');
                    }, 800);
                }
            });
        } else {
            setTimeout(function () {
                showAllEvents();
            }, 500);
        }
    }

    function showAllEvents(){
        $('.event-btn').each(function(){
            var eventItem = this;
            $(eventItem).removeClass('fully-hide-event');
            $(eventItem).removeClass('hide-event');
            $(eventItem).addClass('show-event');

            setTimeout(function () {
                $(eventItem).removeClass('fully-hide-event');
            }, 300);
        });
    }

    function happEventReveal(){
        // Scroll Reveal | https://github.com/jlmakes/scrollreveal

        if($(window).width() <= 880) {
            // if smaller or equal
            // window.sr = ScrollReveal({duration: 750});
            // sr.reveal('.event-btn');
            var mobileEventReveal = {
                delay    : 100,
                distance : '140px', //90 original
                easing   : 'ease-in-out',
                //rotate   : { z: -10 }, // x y z
                width   : 0,
                scale    : 0.8,
                origin : 'bottom', // bottom, left , top right
                viewFactor: 0.3
            };

            //window.sr = ScrollReveal();
            window.sr.reveal('.event-btn', mobileEventReveal);
        } else {
            // if larger

        }
    }

    $(window).resize(function() {

    }).resize(); // This will simulate a resize to trigger the initial run.

    ajaxFinishedLoading();


}









