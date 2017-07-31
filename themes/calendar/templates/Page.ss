<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-store" />


    <title>Happ | $SiteConfig.Title</title>

    <%-- Favicons --%>
    <link rel="shortcut icon" href="$ThemeDir/favicons/favicon.ico"/>

    <link rel="apple-touch-icon" sizes="180x180" href="$ThemeDir/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="$ThemeDir/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="$ThemeDir/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="$ThemeDir/favicons/manifest.json">
    <link rel="mask-icon" href="$ThemeDir/favicons/safari-pinned-tab.svg" color="#FC6636">
    <meta name="theme-color" content="#ffffff">


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="http://maps.google.com/maps/api/js?key=AIzaSyBWVd4651hNv8mOn-RaHZdC166O82S-BbY&sensor=false&libraries=places"></script>

    <style>
        .pac-container {
            z-index: 9999999999!important;
        }
    </style>

    <% include InlineAppColors %>
</head>

<body class="$ClassName.LowerCase">

<div class="container-fluid" id="site-wrapper">

    <div class="site-content-wrapper" id="VueFilter">
        $Layout
        <% if $Form %>
            <div style="height: 100px;"></div>
            $Form
        <% end_if %>
    </div>
</div>

</body>

</html>
