<div class="ticket-strip">
    <%-- Check If we have a price for tickets--%>
    <% if $MinPrice %>
        <% if $MinPrice == $MaxPrice %>
            {$getTicketSVG} <span class="ticket-price">From ${$MinPrice}
            <% if $BookingWebsite %>
                <a href="$BookingWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG
                    Buy Tickets</a>
            <% else_if $TicketWebsite %>
                <a href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG
                    Buy Tickets</a>
            <% end_if %></span>
        <% else %>
            {$getTicketSVG} <span class="ticket-price">From ${$MinPrice} - ${$MaxPrice}<% if $BookingWebsite %>
            <a href="$BookingWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG
                Buy Tickets</a>
        <% else_if $TicketWebsite %>
            <a href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG
                Buy Tickets</a>
        <% end_if %></span>
        <% end_if %>
        <%-- Check if the event is free --%>
    <% else_if $IsFree == 1 %>
        {$getTicketSVG} <span class="ticket-price">Free
        <% if $BookingWebsite %>
            <a href="$BookingWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
        <% else_if $TicketWebsite %>
            <a href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
        <% end_if %></span>
    <% else %>
        {$getTicketSVG} <span class="ticket-price">
        <% if $BookingWebsite %>
            See website<a href="$BookingWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Buy Tickets</a>
        <% else_if $EventFindaURL %>
            see event finda <a href="$EventFindaURL" target="_blank" class="buy-ticket-btn">$getTicketSVG
            Event Finda</a>
        <% else_if $TicketWebsite %>
            see website<a href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
        <% else %>
            No ticket info
        <% end_if %></span>
    <% end_if %>
</div>