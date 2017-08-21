<div id="AddHappEventModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header add-event-header">
                <div class="close-modal" data-dismiss="modal" aria-label="Close">
                    $getCloseSVG
                </div>
                <%--<radial-progress-bar :diameter="80"--%>
                                     <%--:completed-steps="completedSteps"--%>
                                     <%--:total-steps="totalSteps"--%>
                <%--:strokeWidth="strokeWidth"--%>
                <%--:startColor="startColor"--%>
                <%--:stopColor="stopColor"--%>
                <%--:innerStrokeColor="innerStrokeColor">--%>
                    <%--<p>{{ totalSteps }} / {{ completedSteps }}</p>--%>
                <%--</radial-progress-bar>--%>
                <h4 class="title">Add Happ Event</h4>
            </div>
            <div class="modal-body" id="VueAddEvent">
                <%-- Continue form | this form will decide if we reset the form or not --%>
                    <% include addevent/ContinueAddEventForm %>
                <%-- Add Event | Form --%>
                <% include addevent/HappEventForm %>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->