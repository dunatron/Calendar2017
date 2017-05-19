<div id="$Name" class="field<% if $extraClass %> $extraClass<% end_if %>">
    <% if $Title %><label class="left">$Title</label><% end_if %>
    <div class="middleColumn">
        $Field
        <p class="text-danger" v-if="errors.has('$RightTitle')">{{ errors.first('$RightTitle') }}
    </div>
    <%--<% if $RightTitle %><label class="right">$RightTitle</label><% end_if %>--%>
    <% if $Message %><span class="message $MessageType">$Message</span><% end_if %>
    <% if $Description %><span class="description">$Description</span><% end_if %>
</div>
