<div id="AddHappEventModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header add-event-header">
                <div class="close-modal" data-dismiss="modal" aria-label="Close">
                    $getCloseSVG
                </div>
                <h4 class="title">Add Happ Event</h4>
            </div>
            <div class="modal-body" id="VueAddEvent">
                <%-- Continue form | this form will decide if we reset the form or not --%>
                    <% include ContinueAddEventForm %>
                <%-- Add Event | Form --%>
                <% include HappEventForm %>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->