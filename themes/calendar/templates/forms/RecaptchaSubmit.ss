<% if $UseButtonTag %>
    <vue-recaptcha
            @verify="onVerify"
            @expired="onExpired"
            :sitekey="sitekey">
    <button $AttributesHTML>
        <% if $ButtonContent %>$ButtonContent<% else %>$Title.XML<% end_if %>
    </button>
    </vue-recaptcha>
<% else %>
    <h1>Heath</h1>
    <input $AttributesHTML />
<% end_if %>