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
        $("body").append('<div id="dialog" title="Add to qBittorrent" style="display: none;">' +
            '<form id="dlForm"><input type="hidden" id="dlUrl">' +
            '<label>Location: <span id="locationBase"><span id="mediaLocation"></span>/' +
            '<span id="typeLocation">tv.shows</span>/</span>' +
            '<input type="text" id="location" required="required"></label><br>' +
            '<label>Label: <input id="dlLabel" value="TV shows"></label><br>' +
            '<label>Apply for all: <input type="checkbox" id="applyForAll"></label></form></div>');
        GM_addStyle('.ui-widget-header .ui-icon { background-image: url(https://code.jquery.com/ui/1.12.1/themes/base/images/ui-icons_444444_256x240.png)!important;} .torrents_trakt a{outline: none;width: 28px;height: 27px;display: block;padding: 0;background: url(https://cdn-images-1.medium.com/fit/c/36/36/1*r3Oe6V2xRiOo9zlLIByGXA.png) no-repeat center;background-size: 20px;} .torrents_sj a{outline: none;width: 28px;height: 27px;display: block;padding: 0;background: url(/pic/ico_junkie.png) no-repeat center;background-size: 20px;} td.torrents_sx a, td.torrents_sx a:hover{color: #999;font-size: 10px;} td.torrents_sx {vertical-align: bottom;text-align:center;}');
        $(".table_head:first").prepend(' <a id="localRSS" href="javascript:void(0);" target="_blank"><img title="A kiválaszott feltételek szerinti RSS hozzáadása qBittorrenthez" src="/pic/rss.png" style="-webkit-filter: hue-rotate(180deg)"></a>');
        $('#localRSS').click(function () {
            this.href = "http://sikuli.localhost/rss/tvstore/" + encodeURIComponent($('#catp1').attr("title")) + "/" + encodeURIComponent(encodeURIComponent(siteURL + '/torrent/rss.php?rss_uid=' + rss_uid + '&rss_passkey=' + rss_passkey + '&' + s_gene_params(-1)));
        });
        setTimeout(function () {
            $('.torrents_fajlok').after('<td class="torrents_sx" class="torrents_sx"><a title="Torrent file letöltése" href="javascript:void(0)" target="dfr">DL</a></td>');
            $('.torrents_letolt_free>a').prop("title","qBittorrentbe küldés").click(function (e) {
                e.preventDefault();
                var url = this.href + '&type=rss&uid=' + rss_uid + '&passkey=' + rss_passkey;
                if ($("#applyForAll").prop("checked")) {
                    sendToqB(url);
                } else {
                    $("#dlUrl").val(url);
                    var title = $(this).closest(".torrents_epizod").prev().find("img").attr("title");
                    if ($("#search_cat_sel_eng").find(">optgroup:first").text().indexOf(title) != -1) {
                        title = $(this).closest("tbody").find("td:first>a").text().replace(/ - [0-9]+x[0-9]+..\[.*/, "");
                    }
                    $("#location").val(title.toLowerCase().replace(/[!:\(\)]/g, "").replace(/ /g, "."));
                    $("#mediaLocation").text("/mnt/data/media");
                    $("#dialog").dialog({
                        buttons: {
                            "Start download": function () {
                                sendToqB($("#dlUrl").val());
                                $("#dialog").dialog("close");
                            }
                        }
                    });
                }
            });
            $('.torrents_sx>a').click(function () {
                this.href = $(this).closest("tr").prev().find(">td:last>a").prop('href');
            });
            $('.torrents_nfo').before('<td class="torrents_sj"><a href="javascript:void(0)" target="_blank"></a></td><td class="torrents_trakt"><a href="javascript:void(0)" target="_blank"></a></td>');
            $('.torrents_sj>a').click(function () {
                this.href = "http://www.sorozatjunkie.hu/?s=" + encodeURIComponent($(this).closest(".torrents_epizod").prev().find("img").attr("title").split(" (")[0]);
            });
            $('.torrents_trakt>a').click(function () {
                this.href = "https://trakt.tv/search/shows?utf8=✓&query=" + encodeURIComponent($($(this).parents("tr")[1]).find("img")[0].title.split(" (")[0]);
            });
            $('.torrents_epizod_mufaj').attr("colspan", 2);
        }, 1000);
    }

    function sendToqB(url) {
        var data = new FormData();
        data.append('urls', url);
        data.append('savepath', $("#locationBase").text() + $("#location").val());
        data.append('label', $("#dlLabel").val());
        data.append('cookie', "");
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://localhost:8080/command/download",
            data: data,
            onload: function (response, a) {
                $.notify("Torrent sent", "success");
            }
        });
    }
})();