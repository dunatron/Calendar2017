<%--<% include TopBar %>--%>

<%-- Calendar nav is casuing the geolocation not to work--%>
<div class="ajax-page-load ajax-is-loading">
    <div class="ajax-loader"><div class="ajax-load-icon"><div class="ajax-load-message">Loading data...</div> </div> </div>
</div>
<% include NavBar %>


<div class="container-calendar-wrapper">

    <div class="custom-calendar-wrap custom-calendar-full">

        <!-- Substitute this calendar below for silverstripe variables, creating a calendar on the fly -->
        <div class="fc-calendar-container">
            <% include RenderCalendar %>
        </div>
    </div>

    <%-- Approved Events Modal | AJax to get event id and render maps and data --%>

    <%--<% include 'approved/ApprovedEventModal' %>--%>


    <!-- END CALENDAR -->

</div>


<% include addevent/AddHappEventModal %>
<% include search/SearchModal %>
<% include filter/FilterModal %>
