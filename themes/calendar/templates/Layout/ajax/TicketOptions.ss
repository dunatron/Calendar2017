<div class="ticket-options-wrapper">
    <h2>Multiple items selector with filter</h2>
    <div class="row">
        <div class="form-group">
            <div class="items-collection">

                <div data-toggle="buttons" class="btn-group bizmoduleselect">
                    <label class="btn btn-default">
                        <div class="itemcontent">
                            <input type="checkbox" name="var_id[]" autocomplete="off" value="">
                            <span class="fa fa-car fa-2x"></span>
                            <h5>Door Sales</h5>
                        </div>
                    </label>
                </div>
                <div data-toggle="buttons" class="btn-group itemcontent">
                    <label class="btn btn-default">
                        <div class="itemcontent">
                            <input type="checkbox" name="var_id[]" autocomplete="off" value="">
                            <span class="fa fa-truck fa-2x"></span>
                            <h5>Purchase tickets from website</h5>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <br>
        <div id="Form_HappEventForm_EventVenue_Holder" class="field text">
            <%--<label for="Form_HappEventForm_TicketWebsite" class="left">Copy and paste the direct URL to purchase tickets</label>--%>
            <div class="middleColumn">
                <input type="text" name="EventVenue" id="Form_HappEventForm_TicketWebsite" class="text" placeholder="Copy and paste the direct URL to purchase tickets">
            </div>
        </div>
    </div>
</div>

<style>

    .ticket-options-wrapper {
        width: 100%;
    }

    .items-collection {
        margin: 20px 0 0 0;
    }

    .items-collection label.btn-default.active {
        background-color: #007ba7;
        color: #FFF;
    }

    .items-collection label.btn-default {
        width: 90%;
        border: 1px solid #305891;
        margin: 5px;
        border-radius: 17px;
        color: #305891;
    }

    .items-collection label .itemcontent {
        width: 100%;
    }

    .items-collection .btn-group {
        width: 90%
    }

    :focus {
        outline: none;
    }

    .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {
        outline: none;
        outline-offset: 0;
    }

    .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {
        outline: none;
        outline-offset: 0;
    }
</style>
