<%-- Location --%>
<div class="location-strip">
    {$getLocationSVG} <h2 class="location-text">$LocationText</h2>
</div>
<div class="date-time-strip">
    <%-- Date --%>
    <div class="date-strip">
        {$getCalendarSVG} <span class="date-text">$EventDate</span>
    </div>
    <%-- Time --%>
    <div class="time-strip">
        {$getClockSVG} <span class="time-text">$StartToFinishTime</span>
    </div>
</div>
<%-- Image --%>
<div class="image-strip">
    <% include ImageSlider %>
</div>

<div class="ticket-restrict-strip">
    <%-- Ticket --%>
    <% include TicketStrip %>
    <%-- Restriction --%>
    <div class="restriction-strip">
        {$getRestrictSVG} <span class="restriction-type">For All Ages</span>
    </div>
</div>

<%-- SpecialLocation --%>
<% if $SpecialLocation %>$SpecialLocation<% end_if %>
<%-- SpecialEntry --%>
<% if $SpecialEntry %>$SpecialEntry<% end_if %>
<%-- Description --%>
<div class="description-strip">
    {$EventDescription}
</div>