<div class="ticket-strip">
    <% if $MinPrice %>
        <% if $MinPrice == $MaxPrice %>
            {$getTicketSVG} <span class="ticket-price">From ${$MinPrice}<% if $TicketWebsite %><a
                href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG
            Buy Tickets</a><% end_if %></span>
        <% else %>
            {$getTicketSVG} <span class="ticket-price">From ${$MinPrice} - ${$MaxPrice}<% if $TicketWebsite %><a
                href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG
            Buy Tickets</a><% end_if %></span>
        <% end_if %>
    <% else_if $IsFree == 1 %>
        {$getTicketSVG} <span class="ticket-price">Free
        <% if $TicketWebsite %>
            <a href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
        <% else_if $EventFindaURL %>
            <a href="$EventFindaURL" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
            <% else_if $BookingWebsite %>
            <a href="$BookingWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
        <% end_if %></span>
    <% else %>
        {$getTicketSVG} <span class="ticket-price">
        <% if $TicketWebsite %>
            See website<a href="$TicketWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Buy Tickets</a>
        <% else_if $EventFindaURL %>
            see event finda <a href="$EventFindaURL" target="_blank" class="buy-ticket-btn">$getTicketSVG
            Event Finda</a>
        <% else_if $BookingWebsite %>
            see website<a href="$BookingWebsite" target="_blank" class="buy-ticket-btn">$getTicketSVG Website Info</a>
        <% else %>
            No ticket info
        <% end_if %></span>
    <% end_if %>
</div>