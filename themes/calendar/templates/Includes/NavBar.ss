<div class="container-fluid">
    <div class="nav-bar-wrapper row">

        <div class="logos-wrapper">
            <div class="logo-wrapper happ-logo">
                <a href="$AbsoluteBaseURL" id="siteBaseUrl">
                    <% include HappLogoSVG %>
                </a>
            </div>

            <div class="logo-wrapper client-logo">
                <a href="$AbsoluteBaseURL" id="siteBaseUrl">
                    <% with $SiteConfig.ClientLogo.SetHeight(50) %>
                        <img src="$URL" data-target="$AbsoluteBaseURL/home" id="reset-calendar-dates"
                             class="img-responsive">
                    <% end_with %>
                </a>
            </div>
        </div>

        <div class="controls-wrapper">
            <div class="controls-prev-next">
                <a class="month-button" id="previous-month" href="$AbsoluteBaseURL/home">
                    <span class="short-previous-text">$prevShortMonth</span>
                </a>
                <div class="date-wrapper">
                    <h2 class="full-date"><span class="theMonth">$currentMonthName</span><span class="theYear">$currentYear</span></h2>
                </div>
                <a class="month-button" id="next-month" href="$AbsoluteBaseURL/home">
                    <span class="short-next-text">$nextShortMonth</span>
                </a>
            </div>
        </div>
        <div class="events-control-wrapper">
            <div class="events-inner-wrap">
                <div class="add-event">
                    <%-- Add Event --%>
                    <a data-toggle="modal" data-target="#AddHappEventModal">
                        $getAddEventSVG
                    </a>
                </div>
                <div class="search-event">
                    <a data-toggle="modal" data-target="#SearchModal">
                        $getSearchSVG
                    </a>
                </div>
                <div class="filter-events">
                    <%-- Add Event --%>
                    <a data-toggle="modal" data-target="#FilterModal">
                        $getFilterSVG
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>


