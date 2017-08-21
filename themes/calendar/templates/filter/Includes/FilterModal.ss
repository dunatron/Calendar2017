<div id="FilterEventModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <div class="close-modal" data-dismiss="modal" aria-label="Close">
                    $getCloseSVG
                </div>
                <h4 class="title">Filter Events</h4>
            </div>

            <div class="modal-body" id="VueFilterEvent">
                <p>Filter events by category. An event has only one category</p>
                <hr>
                <% include filter/EventFilter %>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->