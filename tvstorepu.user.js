// ==UserScript==
// @name         TvStore PowerUP
// @namespace    https://github.com/netpok/tvstore-powerup
// @version      0.1
// @description  Add qBittorrent links, RSS download link
// @author       netpok
// @match        http://tvstore.me/*
// @match        https://tvstore.me/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-url-parser/2.3.1/purl.min.js
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {
    if (purl().attr("protocol") != "https") {
        location.href = location.href.replace('http:', 'https:');
    }

    $('#menu_button2').children()[0].href = $('#menu_button2').children()[0].href + '#q=24&h=2';
})();