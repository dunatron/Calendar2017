// jquery is required for bootstrap
import $ from 'jquery';

window.axios = require('axios');

// jquery UI
import 'jquery-ui';

// Import custom css
import './../css/Calendar-Core.css'

require('bootstrap-loader');

import './sass/app.scss'

import 'select2'

// BxSlider
import '../node_modules/bxslider/dist/jquery.bxslider.min';

// Bootstrap DatePicker
import 'bootstrap-datepicker';

// Bootstrap TimePicker
import 'bootstrap-timepicker';

// WickedPicker(timepicker)
import 'wickedpicker';


// scroll reveal
import ScrollReveal from 'scrollreveal';
window.sr = ScrollReveal();

window.GlobalTimePickerOptions = {
    //now: "12:35", //hh:mm 24 hour format only, defaults to current time
    twentyFour: false,  //Display 24 hour format, defaults to false
    upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
    downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
    close: 'wickedpicker__close', //The close class selector to use, for custom CSS
    hoverState: 'hover-state', //The hover state class to use, for custom CSS
    title: 'Happ Time Picker', //The Wickedpicker's title,
    showSeconds: false, //Whether or not to show seconds,
    timeSeparator: ' : ', // The string to put in between hours and minutes (and seconds)
    secondsInterval: 1, //Change interval for seconds, defaults to 1,
    minutesInterval: 1, //Change interval for minutes, defaults to 1
    beforeShow: null, //A function to be called before the Wickedpicker is shown
    afterShow: null, //A function to be called after the Wickedpicker is closed/hidden
    show: null, //A function to be called when the Wickedpicker is shown
    clearable: true, //Make the picker's input clearable (has clickable "x")
};

// svg.js
import 'svg.js'

import CalendarNavigation from './navigation/navigation';
import AddEventForm from './AddEvent/old-event-controls';
//import ApprovedEvent from './approved/approved-event';
import HappLogoAnimation from './logo/svg-logo';
// import LocationPickerAutoFill from './location/location-picker-autofill';
import VueAddEvent from './AddEvent/add-event';


$(document).ready(function () {
    VueAddEvent();
    HappLogoAnimation();
    CalendarNavigation();
    //ApprovedEvent();
    AddEventForm();
    // LocationPickerAutoFill();
});