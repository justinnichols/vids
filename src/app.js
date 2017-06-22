var Application = (function($, undefined) {
    "use strict";

    var hasInitialized = false,
        $body, $urlBar, $player, $url, $watchButton;

    return {
        init: init
    };

    function init() {
        if (hasInitialized) return;
        hasInitialized = true;
        cache();
        bind();
    }

    function cache() {
        $body = $("body");
        $urlBar = $("#url-bar");
        $player = $("#player");
        $url = $("#url");
        $watchButton = $("#watch-button");
    }

    function bind() {
        $body.on("mouseenter", onBodyMouseEnter);
        $body.on("mouseleave", onBodyMouseLeave);
        $watchButton.on("click", onWatchButtonClick);
    }

    function onBodyMouseEnter() {
        $urlBar.removeClass("hidden");
    }

    function onBodyMouseLeave() {
        $urlBar.addClass("hidden");
    }

    function onWatchButtonClick() {
        var url = $url.val();
        if (url === '') {
            url = $url.attr("placeholder");
        }
        url = getEmbedUrl(url);
        console.log(url);
        $player[0].loadURL(url);
    }

    function getEmbedUrl(url) {
        if (url.indexOf("youtube.com/watch") >= 0) {
            // it's youtube
            var split = url.split("v=")[1];
            var id = split;
            if (split.indexOf("&") >= 0) {
                id = split.substring(0, split.indexOf("&"));
            }
            url = "https://www.youtube.com/embed/" + id;
        }
        return url;
    }
}(jQuery));