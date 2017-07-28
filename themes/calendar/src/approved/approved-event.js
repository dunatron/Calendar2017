export default function ApprovedEvent() {


    /**
     *
     *
     * Thinking about detecting if &EID exists on Page load, If it does,
     * Then perform an event-btn on click function and parse the EID.
     * Also seperate the on eventClick and ajax call. i.e fire event click which retrieves the EID and parses
     * it to get eventAJxData or something.
     *
     * Edge cases. Their will potentially be no month and year in the url.
     * Perhaps on initial Page load we get the year and Month Session Data and auto populate.
     * It would just suck doing this every time we fired a modal call
     *
     *
     */


    $('.event-btn').on("click", function () {
        var target = $(this).attr("data-target");
        var LATITUE = $(this).attr("lat");
        var LONGITUDE = $(this).attr("lon");
        var RADIUS = $(this).attr("radius");

        console.log('becaue we need to setup click listner');
        // ToDO Create AJAX Call To Database to get different elements
        // eventMap | div element
        // $('#eventMap1').locationpicker({
        //     location: {
        //         latitude: LATITUE,
        //         longitude: LONGITUDE
        //     },
        //     radius: RADIUS,
        //     enableAutocomplete: true,
        //     markerIcon: 'mysite/images/svg/location.svg'
        // });

        var EVENTID = $(this).attr("eid");

        // Set EventTitle
        $.ajax({
            type:"POST",
            url: '/calendarfunction/EventTitle',
            data: {EventID:EVENTID},
            success:function (response){
                $('.modal-title').html(response);
            }
        });
        //EventImages
        $.ajax({
            type:"POST",
            url: '/calendarfunction/associatedEventData',
            data: {EventID:EVENTID},
            success:function (response){
                $('.event-assocData').html(response);
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

    $('#ApprovedEventModal').on('hidden.bs.modal', function () {
        modalIsClosed();
        $.ajax({
            type:"POST",
            url: 'calendarfunction/resetApprovedModal',
            success:function (response){
                $('.event-assocData').html(response);
            }
        });
    });

    function modalIsOpen() {
        $('html').addClass('modal-open');
    }

    function modalIsClosed() {
        // Check if search modal is open
        if($('#SearchModal').hasClass('in')){

        }else {
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

}


