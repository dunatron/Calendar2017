/**
 * Created by admin on 19/05/17.
 */
/**
 * Created by admin on 16/05/17.
 */
export default function AddEventForm() {

    var DetailsNext = $('#detailsNextBtn'),
        TicketCheck = $('#hasTickets'),
        DetailsWrapper = $('#details-step'),
        TicketWrapper = $('#ticket-step'),
        TicketBackBtn = $('#ticketBackBtn'),
        TicketNextBtn = $('#ticketNextBtn'),
        AccessField = $('#Form_HappEventForm_AccessType_5'),
        TicketWebWrapper = $('#ticket-web-step'),
        TicketWebBackBtn = $('#ticketWebBack'),
        TicketWebNextBtn = $('#ticketWebNext'),
        LocationWrapper = $('#location-step'),
        LocationBack = $('#locationBack'),
        LocationNext = $('#locationNext'),
        DateWrapper = $('#date-step'),
        DateBack = $('#dateBack'),
        DateNext = $('#dateNext'),
        FinishWrapper = $('#finish-step'),
        FinishBackBtn = $('#finishBack'),
        SubmitBtn = $('#submitHappEvent'),
        addEventModal = $('#AddHappEventModal'),
        continueAddEventOverlay = $('.continue-add-event-overlay'),
        clearFormBtn = $('#Form_HappEventForm_action_ClearAction'),
        resetFormBtn = $('#reset-add-event'),
        continueFormBtn = $('#continue-add-event');

    /**
     * Setup DatePicker
     */
    $('.Bootstrap__DatePicker').datepicker({
        multidate: true,
        format: "mm/dd/yyy"
    });

    function removeHighlightOption($option)
    {
        $($option).removeClass('Higlight__Option');
    }

    function addHighlightOption($option)
    {
        $($option).addClass('Higlight__Option');
    }


    $('#CalendarSingle').on('click', function(){
        console.log($(date_input).datepicker('getDates'));
        addHighlightOption($(this));
        removeHighlightOption('#CalendarReccuring');
        removeHighlightOption('#CalendarMultiDay');
    });

    $('#CalendarReccuring').on('click', function(){
        $('.Bootstrap__DatePicker').replaceWith('<div class="Bootstrap__DatePicker">' +
            '<div class="range-start"></div>' +
            '<div class="range-end"></div>' +
            '</div>');
        $('.Bootstrap__DatePicker').datepicker({
            inputs: $('.range-start, .range-end'),
            format: "mm/dd/yyy"
        });
        addHighlightOption($(this));
        removeHighlightOption('#CalendarSingle');
        removeHighlightOption('#CalendarMultiDay');
    });

    $('#CalendarMultiDay').on('click', function(){
        $('.Bootstrap__DatePicker').replaceWith('<div class="Bootstrap__DatePicker"></div>');
        $('.Bootstrap__DatePicker').datepicker({
            multidate: true,
            format: "mm/dd/yyy"
        });
        addHighlightOption($(this));
        removeHighlightOption('#CalendarReccuring');
        removeHighlightOption('#CalendarSingle');
    });


    /**
     * TimePicker
     */
    $('#Form_HappEventForm_StartTime').timepicker({
        disableMousewheel: false,
        template:"dropdown",
        disableFocus:true,
        modalBackdrop:true,
        minuteStep: 1,
    });

    $('#timepicker1').timepicker();

    // $('.Generate__Dates').on('click', function () {
    //     let Dates = $(date_input).datepicker('getDates');
    //     console.log(Dates);
    //     for (var value of Dates)
    //     {
    //         value.setHours(15);
    //         value.setMinutes(20);
    //         console.log(value.getMonth());
    //         $('.Generate__Dates').append('<input type="date" class="Start__Date">');
    //         var now = new Date();
    //         var today = new Date();
    //         var dd = today.getDate();
    //         var mm = today.getMonth()+1; //January is 0!
    //         if(dd<10){dd='0'+dd}
    //         if(mm<10){mm='0'+mm}
    //         var yyyy = today.getFullYear();
    //         today = yyyy+'-'+mm+'-'+dd;
    //
    //         $('.Start__Date').val(today);
    //     }
    //
    //     //let FormData = $('#Form_HappEventForm').serialize();
    //
    //     let FormData = $('.form-step').find("select,textarea, input").serialize();
    //
    //     console.log(FormData);
    //     console.log('time to try generate some dates');
    // });


    //var date_input=$('input[name="date"]'); //our date input has the name "date"
    let date_input = $('.Bootstrap__DatePicker');
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'dd/mm/yyyy',
        template:"modal",
        //container: container,
        todayHighlight: true,
        autoclose: false,
        multidate: true,
    };
    var optionsTwo ={
        format: 'dd/mm/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: false,
        multidate: false,
    };
    date_input.datepicker(options);




    $(DetailsNext).on('click', function () {
        if ($(TicketCheck).is(':checked')) {

            showTicketStep();
            hideDetailsStep();
        } else {
            hideDetailsStep();
            showLocationStep();
        }
    });

    $(TicketBackBtn).on('click', function () {
        hideTicketStep();
        showDetailsStep();
    });

    $(TicketNextBtn).on('click', function () {
        if ($(AccessField).is(':checked')) {
            hideTicketStep();
            showTicketWebsiteStep();
        } else {
            hideTicketStep();
            showLocationStep();
        }
    });

    $(TicketWebBackBtn).on('click', function () {
        hideTicketWebsiteStep();
        showTicketStep();
    });

    $(TicketWebNextBtn).on('click', function () {
        hideTicketWebsiteStep();
        showLocationStep();
    });

    $(LocationBack).on('click', function () {
        if ($(AccessField).is(':checked')) {
            hideLocationStep();
            showTicketWebsiteStep();
        } else if ($(TicketCheck).is(':checked')) {
            hideLocationStep();
            showTicketStep();
        } else {
            hideLocationStep();
            showDetailsStep();
        }
    });

    $(LocationNext).on('click', function () {
        hideLocationStep();
        showDateStep();

    });

    $(DateBack).on('click', function () {
        hideSubmitBtn();
        hideDateStep();
        showLocationStep();
    });

    $(DateNext).on('click', function () {
        showSubmitBtn();
        hideDateStep();
        showFinalStep();
    });

    $(FinishBackBtn).on('click', function () {
        hideSubmitBtn()
        hideFinalStep();
        showDateStep();
    });


    function showDetailsStep() {
        $(DetailsWrapper).removeClass('field-hidden');
    }

    function hideDetailsStep() {
        $(DetailsWrapper).addClass('field-hidden');
    }

    function showTicketStep() {
        $(TicketWrapper).removeClass('field-hidden');
    }

    function hideTicketStep() {
        $(TicketWrapper).addClass('field-hidden');
    }

    function showTicketWebsiteStep() {
        $(TicketWebWrapper).removeClass('field-hidden');
    }

    function hideTicketWebsiteStep() {
        $(TicketWebWrapper).addClass('field-hidden');
    }

    function showLocationStep() {
        $(LocationWrapper).removeClass('field-hidden');
        showMap();
    }

    function showFinalStep(){
        $(FinishWrapper).removeClass('field-hidden');
    }

    function hideLocationStep() {
        $(LocationWrapper).addClass('field-hidden');
    }

    function showDateStep() {
        $(DateWrapper).removeClass('field-hidden');
    }

    function hideDateStep() {
        $(DateWrapper).addClass('field-hidden');
    }

    function hideFinalStep(){
        $(FinishWrapper).addClass('field-hidden');
    }



    function hideSubmitBtn() {
        $(SubmitBtn).addClass('field-hidden');
    }

    function showSubmitBtn() {
        $(SubmitBtn).removeClass('field-hidden');
    }


    function showMap() {
        //$('#addEventMap').locationpicker('autosize');
    }

// Continue overlay functions
    function hideContinueOverlay() {
        $(continueAddEventOverlay).addClass('hide-continue-options');
        $(continueAddEventOverlay).removeClass('show-continue-options');
    }

    function showContinueOverlay() {
        $(continueAddEventOverlay).addClass('show-continue-options');
        $(continueAddEventOverlay).removeClass('hide-continue-options');
    }

// wipe/reset form
    $(resetFormBtn).on('click', function () {
        resetAddEventForm();
    });
//Continue form where user left off
    $(continueFormBtn).on('click', function () {
        resumeAddEventForm();
    });

    function resumeAddEventForm() {
        hideContinueOverlay();
    }

    function resetAddEventForm() {
        $(clearFormBtn).trigger('click');
        hideSubmitBtn();
        hideDateStep();
        hideLocationStep();
        hideTicketWebsiteStep();
        showDetailsStep();
        hideContinueOverlay();
        hideFinalStep();
    }


// //Details Tags step
// $('.checkbox').on('click', function(){
//     $(this).parent().toggleClass('tag-selected');
// });
//Details Tags step
    $("input[name*='EventTags']").on('click', function () {
        $(this).parent().toggleClass('tag-selected');
    });

// If details step has tickets

    $("input[name*='HasTickets']").on('click', function () {
        $(this).parent().toggleClass('tag-selected');
    });

    $(addEventModal).on('shown.bs.modal', function () {
        //$('#eventMap1').locationpicker('autosize');
        $('html').addClass('modal-open');
    });

    $(addEventModal).on('hidden.bs.modal', function () {
        $('html').removeClass('modal-open');
        showContinueOverlay();
    });


    // Scroll to top of modal
    $('.add-event-back').on('click', function(){
        $('#AddHappEventModal').animate({ scrollTop: 0 }, 'slow');
    });

    $('.add-event-next').on('click', function(){
        $('#AddHappEventModal').animate({ scrollTop: 0 }, 'slow');
    });
}