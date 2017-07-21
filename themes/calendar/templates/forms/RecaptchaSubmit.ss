<% if $UseButtonTag %>
    <%--<vue-recaptcha--%>
            <%--ref="recaptcha"--%>
            <%--@verify="onVerify"--%>
            <%--@expired="onExpired"--%>
            <%--:sitekey="sitekey">--%>
    <%--<button $AttributesHTML>--%>
        <%--<% if $ButtonContent %>$ButtonContent<% else %>$Title.XML<% end_if %>--%>
    <%--</button>--%>
    <%--</vue-recaptcha>--%>

    <vue-recaptcha
            ref="invisibleRecaptcha"
            @verify="onVerify"
            @expired="onExpired"
            size="invisible"
            :sitekey="sitekey">
        <button $AttributesHTML>
            <% if $ButtonContent %>$ButtonContent<% else %>$Title.XML<% end_if %>
        </button>
    </vue-recaptcha>
    <%--<button $AttributesHTML>--%>
    <%--<% if $ButtonContent %>$ButtonContent<% else %>$Title.XML<% end_if %>--%>
    <%--</button>--%>

<% else %>
    <h1>Heath</h1>
    <input $AttributesHTML />
<% end_if %>