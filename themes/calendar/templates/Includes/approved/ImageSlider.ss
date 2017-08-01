<%-- If it has Event Finda Images just loop over those, events should not be altered from their original source --%>
<% if $EventFindaImages %>
    <% if $EventFindaImages.Count >= 2 %>
        <ul class="event-image-bxslider">
            <% loop $EventFindaImages %>
                <li><img src="$URL" style="width: 100%;" class="img-responsive"/></li>
            <% end_loop %>
        </ul>
    <% else %>
        <% loop $EventFindaImages %>
            <img src="$URL" style="width: 100%;" class="img-responsive solo-event-image"/>
        <% end_loop %>
    <% end_if %>
<%-- If no Event Finda Images assuming its created internal and may have its own images in the file system --%>
<% else_if $EventImages %>
    <% if $EventImages.Count >= 2 %>
        <ul class="event-image-bxslider">
            <% loop $EventImages %>
                <li><img src="$fileName" style="width: 100%;" class="img-responsive"/></li>
            <% end_loop %>
        </ul>
    <% end_if %>
<% else %>
    <% loop $EventImages %>
        <img src="$URL" style="width: 100%;" class="img-responsive solo-event-image"/>
    <% end_loop %>
<% end_if %>