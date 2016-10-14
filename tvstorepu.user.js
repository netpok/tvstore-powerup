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
    
    if (purl().attr("file") == 'browse.php') {
        eval("fillTable=" + String(fillTable).replace("href=\"#g='+matches[x].cat+'", "href=\"#g='+matches[x].cat+'&q=24&h=2").replace('function fillTable(', 'function('));
        GM_addStyle('.ui-widget-header .ui-icon { background-image: url(https://code.jquery.com/ui/1.12.1/themes/base/images/ui-icons_444444_256x240.png)!important;} .torrents_trakt a{outline: none;width: 28px;height: 27px;display: block;padding: 0;background: url(https://cdn-images-1.medium.com/fit/c/36/36/1*r3Oe6V2xRiOo9zlLIByGXA.png) no-repeat center;background-size: 20px;} .torrents_sj a{outline: none;width: 28px;height: 27px;display: block;padding: 0;background: url(/pic/ico_junkie.png) no-repeat center;background-size: 20px;} td.torrents_sx a, td.torrents_sx a:hover{color: #999;font-size: 10px;} td.torrents_sx {vertical-align: bottom;text-align:center;}');
        setTimeout(function () {
            $('.torrents_fajlok').after('<td class="torrents_sx" class="torrents_sx"><a title="Torrent file letöltése" href="javascript:void(0)" target="dfr">DL</a></td>');
            $('.torrents_letolt_free>a').prop("title","qBittorrentbe küldés");
            $('.torrents_nfo').before('<td class="torrents_sj"><a href="javascript:void(0)" target="_blank"></a></td><td class="torrents_trakt"><a href="javascript:void(0)" target="_blank"></a></td>');
            $('.torrents_epizod_mufaj').attr("colspan", 2);
        }, 1000);
    }
})();