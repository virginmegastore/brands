/**
 * RTO+P Video Player v1.0.0
 * Copyright 2019 RTO+P https://www.rtop.com
 * Author Rob Kandel
 */
 !(function (e, t, s, a) {
    "use strict";
    function r(t, s) {
        (this._element = e(t)), (this._settings = e.extend({}, r._defaults, s)), (this._defaults = e.extend(!0, {}, r._defaults)), (this._name = "RTOP_VideoPlayer"), (this._version = "1.0.0"), (this._updated = "05.07.19"), this.init();
    }
    (r._defaults = {
        showControls: !0,
        showControlsOnHover: !0,
        controlsHoverSensitivity: 3e3,
        showScrubber: !0,
        showTimer: !1,
        showPlayPauseBtn: !0,
        showSoundControl: !1,
        showFullScreen: !1,
        keyboardControls: !0,
        themeClass: "rtopTheme",
        fontAwesomeControlIcons: !0,
        autoPlay: !1,
        allowPlayPause: !0,
        loop: !1,
        allowReplay: !0,
        playInModal: !1,
        showCloseBtn: !1,
        closeModalOnFinish: !1,
        gtmTagging: !1,
        gtmOptions: {},
    }),
        (r.prototype.init = function () {
            var t = this;
            (t._video = t._element.find("video")[0] === a ? t.createVideoTags() : t._element.find("video")),
                t._video.wrap('<div class="rtopVideoPlayerWrapper"><div class="rtopVideoPlayer ' + t._settings.themeClass + (t._settings.fontAwesomeControlIcons ? " hasFA" : "") + '"></div>'),
                (t._playerWrapper = t._element.find(".rtopVideoPlayer")),
                t._video.wrap('<div class="rtopVideoHolder' + (t._settings.fontAwesomeControlIcons ? " hasFAIcons" : "") + '"></div>'),
                t._video.attr("id") || t._video.attr("id", t.generateRandomId()),
                (t._player = s.getElementById(t._element.find("video").attr("id"))),
                t._settings.playInModal &&
                    (e("body").append('<div class="rtopVideoModal" id="' + t._element.find("video").attr("id") + '_modal"><div class="videoModalHolder"></div></div>'),
                    t._element.append('<div class="rtopVideoPosterImage' + (t._settings.fontAwesomeControlIcons ? " hasFAIcons" : "") + '"><img src="' + t._video.attr("poster") + '" /></div>')),
                t._settings.showControls
                    ? t.buildControls()
                    : !t._settings.showControls && t._settings.allowPlayPause
                    ? t.playPauseEvents()
                    : t._settings.showControls || t._settings.allowPlayPause || !t._settings.autoPlay || t.startAutoPlay(),
                t.trigger("load_player");
        }),
        (r.prototype.createVideoTags = function () {
            var e = this,
                t = e._element.data();
            return e._element.html('<video src="' + t.video + '" playsinline type="' + t.type + '" poster="' + t.poster + '"><source src="' + t.video + '" type="' + t.type + '"></video>'), e._element.find("video");
        }),
        (r.prototype.buildControls = function () {
            var e = this;
            e._element.find(".rtopVideoPlayer").append('<div class="vidControls' + (e._settings.fontAwesomeControlIcons ? " hasFAIcons" : "") + '"></div>'),
                e._settings.showScrubber ? e.addProgressBar() : e._element.find(".vidControls").addClass("noProgressBar").prepend('<div id="progressSpacer" class="controlBtn"></div>'),
                e._settings.showTimer && e.addTimer(),
                e._settings.showSoundControl && e.addSoundControl(),
                e._settings.showFullScreen && e.addFullScreen(),
                e._settings.showPlayPauseBtn ? e.addPlayPauseBtn() : e._element.find(".vidControls").addClass("noPP").prepend('<div id="playPauseHolder" class="controlBtn"></div>'),
                e._settings.showCloseBtn && e.addCloseBtn(),
                e.clickEvents();
        }),
        (r.prototype.addProgressBar = function () {
            var e = this;
            e._element
                .find(".vidControls")
                .addClass("hasProgressBar")
                .append('<div id="progressholder" class="controlBtn"><div id="fullvideoprogress"></div><div id="buffered"></div><div id="progress"></div><div id="progressorb"></div></div>');
        }),
        (r.prototype.addTimer = function () {
            var e = this;
            e._element.find(".vidControls").addClass("hasTimer").append('<div id="timeholder" class="controlBtn"><span id="currenttime">00:00</span> / <span id="totaltime">00:00</span></div>');
        }),
        (r.prototype.addSoundControl = function () {
            var e = this;
            e._element
                .find(".vidControls")
                .addClass("hasSound")
                .append(
                    '<div id="soundControl" class="controlBtn"><span class="muteBtn' +
                        (e._settings.fontAwesomeControlIcons ? " FAIcon" : "localAsset") +
                        '">' +
                        (e._settings.fontAwesomeControlIcons ? '<i class="fa fa-volume-up"></i>' : "") +
                        '</span><span class="soundBars"><span class="soundBar active" data-value=".25"></span><span class="soundBar active" data-value=".50"></span><span class="soundBar active" data-value=".75"></span><span class="soundBar active" data-value="1"></span></span></div>'
                );
        }),
        (r.prototype.addFullScreen = function () {
            var e = this;
            e._element
                .find(".vidControls")
                .addClass("hasFS")
                .append(
                    '<div id="fullScreenBtn" class="controlBtn"><span class="' +
                        (e._settings.fontAwesomeControlIcons ? "FAIcon" : "localAsset") +
                        '">' +
                        (e._settings.fontAwesomeControlIcons ? '<i class="fa fa-expand"></i>' : "") +
                        "</span></div>"
                );
        }),
        (r.prototype.addPlayPauseBtn = function () {
            var e = this;
            e._element
                .find(".vidControls")
                .addClass("hasPP")
                .prepend(
                    '<div id="playPause" class="controlBtn"><span class="' +
                        (e._settings.fontAwesomeControlIcons ? "FAIcon" : "localAsset") +
                        '">' +
                        (e._settings.fontAwesomeControlIcons ? '<i class="fa fa-pause-circle"></i>' : "") +
                        "</span></div>"
                );
        }),
        (r.prototype.addCloseBtn = function () {
            var e = this;
            e._element
                .find(".rtopVideoPlayerWrapper")
                .append('<div id="closeVideo"><span class="' + (e._settings.fontAwesomeControlIcons ? "FAIcon" : "localAsset") + '">' + (e._settings.fontAwesomeControlIcons ? '<i class="fa fa-times-circle"></i>' : "") + "</span></div>");
        }),
        (r.prototype.clickEvents = function () {
            var t = this;
            t.playPauseEvents(),
                t._playerWrapper.find("#playPause").unbind("click"),
                t._playerWrapper.find("#playPause").on("click", function () {
                    t._playerWrapper.hasClass("playing") ? t.pause() : t._playerWrapper.hasClass("finished") ? (t._settings.allowReplay ? t.replay() : null) : t.play();
                }),
                t._playerWrapper.find("#soundControl").unbind("click"),
                t._playerWrapper
                    .find("#soundControl")
                    .find(".muteBtn")
                    .on("click", function () {
                        t.mute();
                    }),
                t._playerWrapper
                    .find("#soundControl")
                    .find(".soundBar")
                    .each(function () {
                        e(this).unbind("click"),
                            e(this).on("click", function () {
                                t.adjustVolume(e(this).data("value"));
                            });
                    }),
                t._playerWrapper.find("#fullScreenBtn").unbind("click"),
                t._playerWrapper.find("#fullScreenBtn").on("click", function () {
                    t.fullScreen();
                }),
                t._playerWrapper.parent().find("#closeVideo").unbind("click"),
                t._playerWrapper
                    .parent()
                    .find("#closeVideo")
                    .on("click", function () {
                        t.close();
                    }),
                t._playerWrapper.find("#progressholder").unbind("mousemove"),
                t._playerWrapper.find("#progressholder").unbind("click"),
                t._playerWrapper
                    .find("#progressholder")
                    .on("mousemove", function (e) {
                        t.updateOrb(e);
                    })
                    .on("click", function (e) {
                        e.stopPropagation();
                        var s = e.pageX - t._playerWrapper.find("#progressholder").offset().left,
                            a = (s + 1) / t._playerWrapper.find("#progressholder").width();
                        t.goTo(a * t._player.duration);
                    }),
                t._settings.playInModal &&
                    (t._element.find(".rtopVideoPosterImage").unbind("click"),
                    t._element.find(".rtopVideoPosterImage").on("click", function () {
                        t.openInModal();
                    }));
        }),
        (r.prototype.playPauseEvents = function () {
            var t = this;
            t._element.find(".rtopVideoHolder").unbind("click"),
                t._element.find(".rtopVideoHolder").unbind("mousemove"),
                t._element.find(".rtopVideoHolder").unbind("mouseout"),
                t._element
                    .find(".rtopVideoHolder")
                    .on("click", function () {
                        t._playerWrapper.hasClass("playing") ? t.pause() : t._playerWrapper.hasClass("finished") ? (t._settings.allowReplay ? t.replay() : null) : t.play();
                    })
                    .on("mousemove", function () {
                        t._settings.showControls && t._playerWrapper.hasClass("hideOverlay") && (clearTimeout(t._motion_timer), t._playerWrapper.removeClass("hideOverlay").find(".vidControls").removeClass("hide"));
                    })
                    .on("mouseout", function () {
                        t._player.paused ||
                            (t._settings.showControls &&
                                (clearTimeout(t._motion_timer),
                                (t._motion_timer = setTimeout(function () {
                                    t._playerWrapper.addClass("hideOverlay").find(".vidControls").addClass("hide");
                                }, t._settings.controlsHoverSensitivity))));
                    }),
                t._settings.keyboardControls &&
                    (e("body").unbind("keyup"),
                    e("body").on("keyup", function (e) {
                        32 == e.keyCode && (t._playerWrapper.hasClass("playing") ? t.pause() : t._playerWrapper.hasClass("finished") ? (t._settings.allowReplay ? t.replay() : null) : t.play());
                    })),
                t._settings.autoPlay && t.startAutoPlay();
        }),
        (r.prototype.startAutoPlay = function () {
            var e = this;
            e._playerWrapper.addClass("noPlayPause"), (e._player.autoplay = !0), (e._player.muted = !0), e._player.load(), e.trigger("autoplayStart");
        }),
        (r.prototype.play = function () {
            var e = this;
            e._playerWrapper.addClass("playing").removeClass("paused"),
                e._player.play(),
                e._settings.fontAwesomeControlIcons ? e._playerWrapper.find("#playPause").html('<span class="FAIcon"><i class="fa fa-pause-circle"></i></span>') : e._playerWrapper.find("#playPause").addClass("isPlaying"),
                e._settings.showControls &&
                    (e._settings.showScrubber || e._settings.showTimer) &&
                    (e._progress = setInterval(function () {
                        e.updateProgress(e);
                    }, 100)),
                e._settings.showControls &&
                    (clearTimeout(e._motion_timer),
                    (e._motion_timer = setTimeout(function () {
                        e._playerWrapper.addClass("hideOverlay").find(".vidControls").addClass("hide");
                    }, e._settings.controlsHoverSensitivity))),
                e.trigger("play");
        }),
        (r.prototype.pause = function () {
            var e = this;
            e._playerWrapper.removeClass("playing").addClass("paused").removeClass("hideOverlay"),
                e._settings.fontAwesomeControlIcons ? e._playerWrapper.find("#playPause").html('<span class="FAIcon"><i class="fa fa-play-circle"></i></span>') : e._playerWrapper.find("#playPause").removeClass("isPlaying"),
                e._settings.showControls && (e._settings.showScrubber || e._settings.showTimer) && clearInterval(e._progress),
                e._settings.showControls && (clearTimeout(e._motion_timer), e._playerWrapper.removeClass("hideOverlay").find(".vidControls").removeClass("hide")),
                e._player.pause(),
                e.trigger("pause");
        }),
        (r.prototype.replay = function () {
            var e = this;
            e._settings.showControls && (e._settings.showScrubber || e._settings.showTimer) && clearInterval(e._progress),
                e._settings.showControls && (clearTimeout(e._motion_timer), e._playerWrapper.removeClass("hideOverlay").find(".vidControls").removeClass("hide")),
                e._playerWrapper.removeClass("finished").find(".vidControls").removeClass("hide"),
                e.play(),
                e.trigger("replay");
        }),
        (r.prototype.fullScreen = function () {
            var e = this;
            if (t.isFs) {
                t.isFs = !1;
                var s = e._player.exitFullScreen || e._player.webkitExitFullScreen || e._player.mozExitFullScreen || e._player.oExitFullScreen || e._player.msExitFullScreen;
                s.call(e._player), e.trigger("videoExitFullScreen");
            } else {
                t.isFs = !0;
                var a = e._player.requestFullscreen || e._player.webkitEnterFullscreen || e._player.mozRequestFullScreen || e._player.oRequestFullscreen || e._player.msRequestFullscreen;
                a.call(e._player), e.trigger("videoEnterFullScreen");
            }
        }),
        (r.prototype.mute = function () {
            var t = this;
            if (e(t._player).prop("muted")) {
                (t._player.muted = !1),
                    t._settings.fontAwesomeControlIcons ? t._element.find(".vidControls").find(".muteBtn").html('<i class="fa fa-volume-up"></i>') : t._element.find(".vidControls").find(".muteBtn").removeClass("isMuted");
                var s = !0;
                t._element.find(".soundBar").each(function () {
                    s && e(this).addClass("active"), parseFloat(e(this).data("value")) === parseFloat(t._element.find(".vidControls").find(".muteBtn").data("current")) && (s = !1);
                }),
                    t.trigger("unmute");
            } else
                (t._player.muted = !0),
                    t._settings.fontAwesomeControlIcons
                        ? t._element.find(".vidControls").find(".muteBtn").html('<i class="fa fa-volume-mute"></i>').data("current", t._element.find(".soundBar.active").last().data("value"))
                        : t._element.find(".vidControls").find(".muteBtn").addClass("isMuted"),
                    t._element.find(".soundBar.active").removeClass("active"),
                    t.trigger("mute");
        }),
        (r.prototype.adjustVolume = function (t) {
            var s = this;
            e(s._player).prop("muted") && (s._player.muted = !1), (s._player.volume = parseFloat(t));
            var a = !0;
            s._element.find(".soundBar.active").removeClass("active"),
                s._element.find(".soundBar").each(function () {
                    a && e(this).addClass("active"), parseFloat(e(this).data("value")) === parseFloat(t) && (a = !1);
                }),
                s.trigger("volume_change", { action: { name: "volume", value: { vol: t } } });
        }),
        (r.prototype.close = function () {
            var t = this;
            t._playerWrapper.hasClass("playing") && t.pause(),
                t._playerWrapper.removeClass("finished").find(".vidControls").removeClass("hide"),
                t._settings.playInModal &&
                    (e("#" + t._video.attr("id") + "_modal").removeClass("show"),
                    e("#" + t._video.attr("id") + "_modal")
                        .find(".videoModalHolder")
                        .empty()),
                t.trigger("closeVideo");
        }),
        (r.prototype.updateProgress = function (e) {
            e._playerWrapper.find("#buffered").css("width", (e._player.buffered.end(e._player.buffered.length - 1) / e._player.duration) * 100 + "%"),
                e._playerWrapper.find("#progress").css("width", (e._player.currentTime / e._player.duration) * 100 + "%");
            var t = e.sformat(e._player.currentTime),
                s = e.sformat(e._player.duration);
            if ((e._playerWrapper.find("#currenttime").text(t), e._playerWrapper.find("#totaltime").text(s), e._player.ended && e.videoEnded(), e._settings.gtmTagging && typeof dataLayer !== a))
                for (var r in e._settings.gtmOptions)
                    Math.floor((e._player.currentTime / e._player.duration) * 100) === parseFloat(e._settings.gtmOptions[r].time) && (e.checkTaging(e._settings.gtmOptions[r].name) || e.sendTag(e._settings.gtmOptions[r].type, name));
            e.trigger("video_progress", {
                action: {
                    name: "progress",
                    value: { buffered: (e._player.buffered.end(e._player.buffered.length - 1) / e._player.duration) * 100, duration: e._player.duration, currentTime: (e._player.currentTime / e._player.duration) * 100 },
                },
            });
        }),
        (r.prototype.sformat = function (e) {
            var t = [Math.floor(e / 60) % 60, Math.floor(e % 60)];
            return $.map(t, function (e) {
                return (10 > e ? "0" : "") + e;
            }).join(":");
        }),
        (r.prototype.updateOrb = function (e) {
            var t = this,
                s = e.pageX - t._playerWrapper.find("#progressholder").offset().left,
                a = s / t._playerWrapper.find("#progressholder").width();
            a * t._player.duration;
            t._playerWrapper.find("#progressorb").css("left", s + t._playerWrapper.find("#progressorb").width() / 12 + "px");
        }),
        (r.prototype.goTo = function (e) {
            var t = this;
            (t._player.currentTime = e), t.updateProgress(t);
        }),
        (r.prototype.videoEnded = function () {
            var e = this;
            e._playerWrapper
                .removeClass("playing")
                .removeClass("paused")
                .addClass(e._settings.closeModalOnFinish ? "closing" : "finished")
                .removeClass("hideOverlay")
                .find(".vidControls")
                .addClass("hide"),
                clearInterval(e._progress),
                clearTimeout(e._motion_timer),
                e._settings.closeModalOnFinish
                    ? setTimeout(function () {
                          e.close();
                      }, 300)
                    : setTimeout(function () {
                          e._player.load();
                      }, e._settings.controlsHoverSensitivity),
                e.trigger("videoEnded");
        }),
        (r.prototype.openInModal = function () {
            var t = this;
            t._playerWrapper.parent().appendTo("#" + t._video.attr("id") + "_modal .videoModalHolder"), e("#" + t._video.attr("id") + "_modal").addClass("show"), t.play(), t.clickEvents(), t.trigger("modalOpen");
        }),
        (r.prototype.generateRandomId = function () {
            for (var e = this, t = "", s = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", a = 0; 10 > a; a++) t += s[Math.round(Math.random() * (s.length - 1))];
            return (e._settings.id = t), t;
        }),
        (r.prototype.sendTag = function (e, t) {
            var s = this,
                a = {};
            (a[e] = t), dataLayer.push(a), s.trigger("sentTag");
        }),
        (r.prototype.checkTaging = function (e) {
            if (typeof dataLayer !== a) {
                for (var t in dataLayer) if (dataLayer[t].event === e) return !0;
                return !1;
            }
            return !0;
        }),
        (r.prototype.destroy = function () {
            var t = this;
            t._player.pause(), t.goTo(0), clearInterval(t._progress), clearTimeout(t._motion_timer), e(t._element).removeData("vid.RTOP_VideoPlayer"), t.trigger("destroyed");
        }),
        (r.prototype.update = function (e) {
            for (var t in e) t in this._settings && (this._settings[t] = e[t]);
            this.trigger("updated_settings", { action: { name: "settings", value: { updated: e, all: this._settings } } });
        }),
        (r.prototype.trigger = function (t, s, a) {
            var r = e.camelCase(
                    e
                        .grep(["on", t, a], function (e) {
                            return e;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                o = e.Event([t, "vid", a || "RTOP_VideoPlayer"].join(".").toLowerCase(), e.extend({ relatedTarget: this }, status, s));
            return this.register({ name: t }), this._element.trigger(o), this._settings && "function" == typeof this._settings[r] && this._settings[r].call(this, o), o;
        }),
        (r.prototype.register = function (t) {
            if ((e.event.special[t.name] || (e.event.special[t.name] = {}), !e.event.special[t.name].vid)) {
                var s = e.event.special[t.name]._default;
                (e.event.special[t.name]._default = function (e) {
                    return !s || !s.apply || (e.namespace && -1 !== e.namespace.indexOf("vid")) ? e.namespace && e.namespace.indexOf("vid") > -1 : s.apply(this, arguments);
                }),
                    (e.event.special[t.name].vid = !0);
            }
        }),
        (e.fn.RTOP_VideoPlayer = function (t) {
            var s = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var a = e(this),
                    o = a.data("vid.RTOP_VideoPlayer");
                if ((o || ((o = new r(this, "object" == typeof t && t)), a.data("vid.RTOP_VideoPlayer", o)), "string" == typeof t))
                    try {
                        o[t].apply(o, s);
                    } catch (n) {
                        o.trigger("error", { action: { name: "update", error: { message: n } } });
                    }
            });
        }),
        (e.fn.RTOP_VideoPlayer.Constructor = r);
})(window.jQuery, window, document);
