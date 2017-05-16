<div class="Event-Filter-Wrapper">
   <div class="filter-inner">
       <form role="form">
           <div class="filter-event-holder">
               <div class="form-group">
                   <label for="event-filter-dropdown" class="dropdown-label"></label>
                   <select class="select-style RealTagsHolder" id="tag-drop-down" multiple="multiple" tabindex="-1" aria-hidden="true">
                       <option value="placeholder" data-tag="none" data-title="placeholder"><a href="#">-- Select Tag --</a></option>
                       <% loop $CalendarTags %>
                           <option class="realTags" value="$ID" data-tag="$ID" data-title="$Title"><a href="#">$Title</a></option>
                       <% end_loop %>
                   </select>
                   <%--<a class="search-section-submit" id="viewAllEvents">View All</a>--%>
               </div>
           </div>
       </form>
   </div>
</div>
