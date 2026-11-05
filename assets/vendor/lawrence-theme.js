/* lawrence */
//function handleButtonClick() { 
//    if (!$("#side-contact-form #FixFormOuter").hasClass("open")) {
//        $("#side-contact-form #FixFormOuter").addClass("open");
//        $("#side-contact-form #FixFormOuter").closest("#GridPromo").addClass("form-open");
//        $("#side-contact-form #FixFormOuter").parent().animate({
//                left: '0%'
//            }, 500);
//            $("#DynamicFormObject").fadeIn();
//        } else {
//        $("#side-contact-form #FixFormOuter").removeClass("open");
//        $("#side-contact-form #FixFormOuter").closest("#GridPromo").removeClass("form-open");
//        var width = (parseInt($("#side-contact-form #FixFormOuter").parent().find("#DynamicFormObject").outerWidth()) + 1) * (-1);
//            console.log(width);
//        $("#side-contact-form #FixFormOuter").parent().animate({
//                left: width + 'px'
//            }, 500);
//        }
 
//}

//$("#side-contact-form #FixFormOuter").removeClass("button-holder")
//$("#side-contact-form #FixFormOuter").attr("onClick", handleButtonClick())
$(document).ready(function () {
    
    function unZoom() {
        var doc = document.documentElement;
        if (window.devicePixelRatio > 1) {
            doc.style.setProperty('--unZoom', "0.8");
        } else {
            doc.style.setProperty('--unZoom', "1");
        }
    }

    function headerHeight() {
        var doc = document.documentElement;
        doc.style.setProperty('--headerHeight', "".concat($('#header').outerHeight(), "px"));
    }

    var appHeight = function appHeight() {
        var doc = document.documentElement;
        doc.style.setProperty('--app-height', "".concat(window.innerHeight, "px"));
    };

    if ($("body").has("home-page") && $(window).width() < 767) {
        var windowH = $(window).height() - 70;
        $(".TopVideo, #home-gallery").css("height", windowH)
    }

    appHeight();

    headerHeight();
    unZoom();

    var os = navigator.platform;
    if (os == 'Win32') {
        $("body").addClass("osWin")
    } else {
        $("body").addClass("macOs")
    };

    var currentUserAgent = navigator.userAgent;
    if (currentUserAgent.includes('Chrome')) {
        $("body").addClass("chromeBrowser")
    } else if (currentUserAgent.includes('Safari')) {
        $("body").addClass("safariBrowser")
    };
    if (isMobile) {
        $("#header .phone-icon a").append($("#header .phone-icon a").attr("href").replace("tel:", ""))
    }
})

