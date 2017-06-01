<div id="AddHappEventModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header add-event-header">
                <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--%>
                <div class="close-event-btn" data-dismiss="modal" aria-label="Close">
                    $getCloseSVG
                </div>
                <%--<radial-progress-bar :diameter="100"--%>
                                     <%--:completed-steps="completedSteps"--%>
                                     <%--:total-steps="totalSteps">--%>
                    <%--<p>{{ completedSteps }}/{{ totalSteps }}</p>--%>
                    <%--<p>Steps</p>--%>
                <%--</radial-progress-bar>--%>
                <h4 class="modal-title">Add Happ Event</h4>
            </div>
            <div class="modal-body" id="VueAddEvent">
                <%-- Continue form | this form will decide if we reset the form or not --%>
                    <% include ContinueAddEventForm %>
                <%-- Add Event | Form --%>
                <% include HappEventForm %>
                <div id="example">
                    <carousel-3d :controls-visible="true" :clickable="false">
                        <slide v-for="(slide, i) in slides" :index="i">
                            <figure>
                                <img src="https://placehold.it/360x270">
                                <figcaption>
                                    The sky is the limit only for those who aren't afraid to fly!
                                    The sky is the limit only for those who aren't afraid to fly!

                                </figcaption>
                            </figure>
                        </slide>
                    </carousel-3d>
                </div>
            </div>
            <%--<div class="modal-footer">--%>
                <%--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>--%>
                <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
            <%--</div>--%>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->