/**
 * Created by admin on 16/05/17.
 */

import ApprovedEvent from './parts/approved/approved-event';
import CalendarNavigation from './parts/navigation';
import HappLogoAnimation from './parts/logo/svg-logo';

$(document).ready(function () {
    HappLogoAnimation();
    CalendarNavigation();
    ApprovedEvent();
});
