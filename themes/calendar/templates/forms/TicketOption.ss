<%--https://docs.silverstripe.org/en/3/developer_guides/forms/form_templates/--%>
<ul $AttributesHTML>
    <% loop $Options %>
        <li class="$Class">
            <input v-model="TicketType" id="$ID" class="radio" name="$Name" type="radio" value="$Value.ATT"<% if $isChecked %> checked<% end_if %><% if $isDisabled %> disabled<% end_if %> <% if $Up.Required %>required<% end_if %> />
            <label for="$ID">$Title</label>
        </li>
    <% end_loop %>
</ul>
