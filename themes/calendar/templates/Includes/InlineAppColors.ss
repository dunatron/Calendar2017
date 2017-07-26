<%-- TODO NEW NEW https://www.youtube.com/watch?v=5w3fqtIPM8A | HIDDEN SCROLLBAR--%>
<style>
    .pac-container {
        z-index: 99999;
    }
    .nav-bar-wrapper {
        background-color: {$SiteConfig.ClientColor} !important;
    }
    .theMonth, .theYear, .short-previous-text, .short-next-text {
        color: {$SiteConfig.MonthTxtColor} !important;
    }
    .short-previous-text::before, .short-next-text::before {
        border-color: {$SiteConfig.MonthArrowsColor} !important;
    }
    .add-event {
        background-color: {$SiteConfig.ClientColor} !important;
    }
    .search-event {
        background-color: {$SiteConfig.ClientColor} !important;
    }
    .filter-events {
        background-color: {$SiteConfig.ClientColor} !important;
    }
    .event-btn {
        background-color: {$SiteConfig.EventBackgroundColor} !important;
    }
    .event-btn:hover {
        background-color: {$SiteConfig.EventBackgroundHoverColor} !important;
    }
    .event-btn:hover .happ_e_button {
        color: {$SiteConfig.LetterHoverColor} !important;
    }
    .happ_e_button {
        color: {$SiteConfig.LetterColor} !important;
    }

    .current-day {
        background-color: {$SiteConfig.CurrentDayBackground} !important;
        color: {$SiteConfig.CurrentDayColor} !important;
    }

    /* Menu Icon Colors */
    .search-svg,.add-event-svg,.filter-svg {
        fill: {$SiteConfig.MenuIconColors} !important;
    }

    /* Event Modal SVG COLORS */
    .event-modal-header {
        background-color: {$SiteConfig.EventHeaderBGColor} !important;
    }
    .event-modal-header .modal-title {
        color: {$SiteConfig.EventHeaderTxtColor} !important;
    }
    .location-svg {
        fill: {$SiteConfig.ModalLocationColor} !important;
    }
    .calendar-svg,.clock-svg,.ticket-svg,.restrict-svg {
        fill: {$SiteConfig.EventModalIcoColors} !important;
    }
    .solo-event-image {
        border-bottom: 1px solid #000;
        border-top: 1px solid #000;
    }
    .close-event-btn {
        background-color: {$SiteConfig.AddCloseBGColor} !important;
    }
    .close-event-btn .close-svg {
        fill: {$SiteConfig.AddCloseIcoColor} !important;
    }

    /* Search Modal Colors */
    .close-search-btn {
        background-color: {$SiteConfig.SearchCloseBGColor} !important;
    }
    .close-search-btn .close-svg {
        fill: {$SiteConfig.SearchCloseIcoColor} !important;
    }
    .search-btn {
        background-color: {$SiteConfig.SearchBtnBGColor} !important;
    }
    .search-btn .search-svg {
        fill: {$SiteConfig.SearchBtnIcoColor} !important;
    }

    /* Add Event Modal Colors */
    .add-event-header {
        background-color: {$SiteConfig.AddEventHeaderBGColor} !important;
    }
    .add-event-header .modal-title {
        color: {$SiteConfig.AddEventHeaderTxtColor} !important;
    }
    .close-add-btn {
        background-color: {$SiteConfig.SearchCloseBGColor} !important;
    }
    .close-add-btn .close-svg {
        fill: {$SiteConfig.SearchCloseIcoColor} !important;
    }

    #AddHappEventModal .modal-dialog .modal-content .modal-body {
        background-color: {$SiteConfig.AddEventBodyBGColor} !Important;
    }

    .datepicker table {
        background-color: {$SiteConfig.CalendarPickerBGColor};
    }


</style>
