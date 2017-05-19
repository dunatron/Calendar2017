import $ from 'jquery';
import CalendarNavigation from './navigation/navigation';
import AddEventForm from './AddEvent/old-event-controls';
import ApprovedEvent from './approved/approved-event';
//import HappLogoAnimation from './logo/svg-logo';
import LocationPickerAutoFill from './location/location-picker-autofill';
import Vue from './AddEvent/add-event';


$(document).ready(function () {
    //HappLogoAnimation();
    CalendarNavigation();
    ApprovedEvent();
    AddEventForm();
    LocationPickerAutoFill();
});