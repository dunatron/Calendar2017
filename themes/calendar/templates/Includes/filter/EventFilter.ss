<div class="Event-Filter-Wrapper">
    <div class="panel-group" id="accordion">
        <%-- Main Tags Filter --%>
            <% loop $allSecondaryTags %>
                <%--<div class="filter-option">--%>
                <%--<input type="checkbox" id="$ID" value="$ID" v-model="SecondaryFilter" @click="CheckFilter"><label for="$Title">$Title</label>--%>
                <%--<input class="regular-checkbox" type="checkbox" id="$ID" value="$ID" v-model="SecondaryFilter" @click="CheckFilter"><label for="$Title">$Title</label>--%>


                <div class="notsopretty success smooth">
                <input type="checkbox" id="$ID" value="$ID" v-model="SecondaryFilter" @click="CheckFilter">
                <label>
                    <i class="glyphicon glyphicon-pushpin"></i>
                    $Title
                </label>
            </div>

                <%--</div>--%>
            <% end_loop %>
    </div>

</div>