// jquery is required for bootstrap
import $ from 'jquery'

// bootstrap
//import 'bootstrap-sass'
//
// // bootstrap css
// import 'bootstrap/dist/css/bootstrap.css'
//
// import './sass/app.scss'



//import './bootstrap/customizations.scss'

// Import custom css
import './../css/Calendar-Core.css'

require('bootstrap-loader');

import './sass/app.scss'

// import './../css/homepage.css'



// select2
//import select2 from 'select2'
import 'select2'

// BxSlider
import '../node_modules/bxslider/dist/jquery.bxslider.min'

// scroll reveal
import ScrollReveal from 'scrollreveal';
window.sr = ScrollReveal();

// svg.js
import 'svg.js'

import CalendarNavigation from './navigation/navigation';
import AddEventForm from './AddEvent/old-event-controls';
import ApprovedEvent from './approved/approved-event';
import HappLogoAnimation from './logo/svg-logo';
// import LocationPickerAutoFill from './location/location-picker-autofill';
import VueAddEvent from './AddEvent/add-event';


$(document).ready(function () {
    VueAddEvent();
    HappLogoAnimation();
    CalendarNavigation();
    ApprovedEvent();
    AddEventForm();
    // LocationPickerAutoFill();
});