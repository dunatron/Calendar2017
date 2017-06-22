<div id="modal-status">Add Event</div>
<%--<% if $SteppedEventForm %>--%>
    <%--<% with $SteppedEventForm %>--%>
        <%--<% include MultiFormProgressList %>--%>
    <%--<% end_with %>--%>
    <%--$SteppedEventForm--%>
<%--<% end_if %>--%>

$HappEventForm

<ul id="example-1">
    <li v-for="Date in Dates">
        <input type="date" v-bind:value="Date.DateObject.EventDate" v-model="Date.DateObject.EventDate">
        <input type="time" v-bind:value="Date.DateObject.EndTime" v-model="Date.DateObject.EndTime">
        <%--<input type="text" name="input1" placeholder="YYYY-MM-DD" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" title="Enter a date in this formart YYYY-MM-DD"/>--%>
    </li>
</ul>
<input type="time">
<input type="date" name="input1" placeholder="YYYY-MM-DD" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" title="Enter a date in this formart YYYY-MM-DD"/>