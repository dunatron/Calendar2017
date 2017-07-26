/**
 * Created by admin on 19/05/17.
 */
/**
 * Created by admin on 16/05/17.
 */
export default function AddEventForm() {

    let StepOneWrapper  =   $('#StepOne'),
        StepOneNext =   $('#StepOneNext'),
        StepTwoWrapper  =   $('#StepTwo'),
        StepTwoBack =   $('#StepTwoBack'),
        StepTwoNext =   $('#StepTwoNext'),
        StepThreeWrapper    =   $('#StepThree'),
        StepThreeNext =   $('#StepThreeNext'),

        StepFourWrapper  =   $('#StepFour'),
        StepFourBack =   $('#StepFourBack'),
        StepFourNext =   $('#StepFourNext'),



        DetailsNext = $('#detailsNextBtn'),
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
        continueFormBtn = $('#continue-add-event'),
        CalendarDatePicker = $('.Bootstrap__DatePicker');

    /**
     * Setup DatePicker
     */
    // $('.Bootstrap__DatePicker').datepicker({
    //     multidate: true,
    //     format: "mm/dd/yyy"
    // });

    function removeHighlightOption($option)
    {
        $($option).removeClass('Higlight__Option');
    }

    function addHighlightOption($option)
    {
        $($option).addClass('Higlight__Option');
    }


    $('#CalendarSingle').on('click', function(){
        CalendarDatePicker.datepicker('destroy');
        //$('.Bootstrap__DatePicker').replaceWith('<div class="Bootstrap__DatePicker"></div>');
        CalendarDatePicker.datepicker(SingleCalendarOptions);

        addHighlightOption($(this));
        removeHighlightOption('#CalendarReccuring');
        removeHighlightOption('#CalendarMultiDay');
    });

    // $('#CalendarReccuring').on('click', function(){
    //     $('.Bootstrap__DatePicker').replaceWith('<div class="Bootstrap__DatePicker">' +
    //         '<div class="range-start"></div>' +
    //         '<div class="range-end"></div>' +
    //         '</div>');
    //     $('.Bootstrap__DatePicker').datepicker({
    //         inputs: $('.range-start, .range-end'),
    //         format: "mm/dd/yyy"
    //     });
    //     addHighlightOption($(this));
    //     removeHighlightOption('#CalendarSingle');
    //     removeHighlightOption('#CalendarMultiDay');
    // });

    $('#CalendarMultiDay').on('click', function(){
        CalendarDatePicker.datepicker('destroy');
        CalendarDatePicker.datepicker(MultiCalendarOptions);
        addHighlightOption($(this));
        removeHighlightOption('#CalendarReccuring');
        removeHighlightOption('#CalendarSingle');
    });


    /**
     * TimePicker
     */
    $('#Form_HappEventForm_StartTime').wickedpicker(GlobalTimePickerOptions);

    $('#Form_HappEventForm_FinishTime').wickedpicker(GlobalTimePickerOptions);

    let container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";

    let MultiCalendarOptions={
        format: 'dd/mm/yyyy',
        template:"modal",
        //container: container,
        todayHighlight: true,
        autoclose: false,
        multidate: true,
    };
    let SingleCalendarOptions ={
        format: 'dd/mm/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: false,
        multidate: false,
    };


    CalendarDatePicker.datepicker(SingleCalendarOptions);



    $(StepOneNext).on('click', function () {
        hideStep(StepOneWrapper);
        showStep(StepTwoWrapper);
        console.log('Hide the step please');
    });

    $(StepTwoBack).on('click', function () {
        hideStep(StepTwoWrapper);
        showStep(StepOneWrapper);
        console.log('Hide the step please');
    });

    $(StepTwoNext).on('click', function () {
        hideStep(StepTwoWrapper);
        showStep(StepThreeWrapper);
        console.log('Hide the step please');
    });

    $(StepThreeBack).on('click', function () {
        hideStep(StepThreeWrapper);
        showStep(StepTwoWrapper);
        console.log('Hide the step please');
    });

    $(StepThreeNext).on('click', function () {
        hideStep(StepThreeWrapper);
        showStep(StepFourWrapper);
    });

    $(StepFourBack).on('click', function () {
        hideStep(StepFourWrapper);
        showStep(StepThreeWrapper);
    });

    $(StepFourNext).on('click', function () {
        showSubmitBtn()
    });

    function hideStep($container)
    {
        $container.addClass('field-hidden');
    }

    function showStep($container)
    {
        $container.removeClass('field-hidden');
    }


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

    /**
     * Tag DropDown Select Code
     */
    let HappTagDropdown = $('#Form_HappEventForm_HappTag'),
        SecondaryTagDropdown = $('#Form_HappEventForm_SecondaryTag'),
        RestrictionDropDown = $('#Form_HappEventForm_Restriction');

    $(HappTagDropdown).selectpicker({
        liveSearch: 'true',
        showTick: true
    });

    $(SecondaryTagDropdown).selectpicker({
        liveSearch: 'true',
        showTick: true,
    });

    $(RestrictionDropDown).selectpicker({
        liveSearch: 'true',
        showTick: true,
    });

    $(SecondaryTagDropdown).prop('disabled', true);
    $(SecondaryTagDropdown).selectpicker('refresh');

    $(HappTagDropdown).on('change', function () {
        let selectedOption = $(this).find('option:selected').val();
        console.log('SelectedOption'+ selectedOption);
        $.ajax({
            type:"POST",
            url: '/calendarfunction/getHappSecondaryTags',
            data: {HappTagID:selectedOption},
            success:function (response){

                $(SecondaryTagDropdown).prop('disabled', false);

                let data = JSON.parse(response);

                // Always keep first 2 Options
                let optionset = $('Form_HappEventForm_SecondaryTag option').slice(0, 2);
                let select = $(SecondaryTagDropdown).html(optionset);

                // Append Data Options to dropdown
                $.each( data, function(index, value) {
                    select.append("<option value="+index+">"+value+"</option>");
                });

                $(SecondaryTagDropdown).selectpicker('refresh');
                $(SecondaryTagDropdown).selectpicker('val', '');





                $(SecondaryTagDropdown).selectpicker('refresh');
            }
        });

    });

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
        $('#VueAddEvent').animate({ scrollTop: 0 }, 'slow');
    });

    $('.add-event-next').on('click', function(){
        $('#AddHappEventModal').animate({ scrollTop: 0 }, 'slow');
        $('#VueAddEvent').animate({ scrollTop: 0 }, 'slow');
    });
}