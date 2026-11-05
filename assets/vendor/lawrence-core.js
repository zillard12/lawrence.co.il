//test add line



var story = story || {};



var headerHeight = 0;



var historyOrderItemID = 0;

var isStatic = false;

if ($("#StaticSite").length && $("#StaticSite").val() == "true") {

    isStatic = true;

}

var isMobile = false;

if ($(window).width() < 1024) {

    isMobile = true;

}

if (!isMobile) {

    $('.GridTop.GridTop-Mobile').remove()

} else {

    $('.GridTop.GridTop-Desktop').remove()

}

if ($("#header2").length > 0) {

    headerHeight = $("#header2").outerHeight();

    if ($("#header2").css("top") != "0px") {

        headerHeight = headerHeight + parseInt($("#header2").css("top").replace("px", ""));

    }

    if ($(".ShopCheckoutPage .mobile-subTotal").length > 0 && !$(".ShopCheckoutPage .mobile-subTotal").hasClass("notFixed")) {

        headerHeight = headerHeight + $(".ShopCheckoutPage .mobile-subTotal").outerHeight();

    }

}

else {

    headerHeight = $("#header").outerHeight();

    if ($("#header-top-strip").length > 0) {

        headerHeight = headerHeight + $("#header-top-strip").outerHeight();

    }

}



if ($(".mobile-subTotal").length > 0 && $(".mobile-subTotal").css("display") == "block") {

    headerHeight = headerHeight + $(".mobile-subTotal").outerHeight();

}

if ($(".TopGalleryMargin").length > 0) {

    $(".TopGalleryMargin").css("margin-top", headerHeight);

}

//$(window).on('popstate', function (event) {

//    if ($("#catalog-quickview-modal").hasClass("in")) {

//        $("#catalog-quickview-modal").modal("hide");

//    }

//});











$(document).ready(function () {



    // scrolltop button

    $('#scrolltop-btn button').click(function () {

        $("html, body").animate({ scrollTop: 0 }, "slow");

    })



    // toggle password preview

    $('.btn-password-preview').click(function (e) {

        e.preventDefault();

        e.stopPropagation();

        let input = $(this).siblings('input');

        $(this).find('.icon-cross').fadeToggle();

        let inputType = input.prop("type")

        if (inputType == "text") {

            input.prop("type", "password");

        } else {

            input.prop("type", "text");

        }

    });



    $('#shop-modal').on('hidden.bs.modal', function (e) {

        $(this).attr("data-cf", "");

        if ($(this).find("iframe").length > 0) {

            $(this).find("iframe").attr("src", "");

        }

    });





    if ($(window).innerWidth() <= 1024 && $(".navbar-collapse").hasClass("MenuFadeIn")) {

        var totalHeight = 0;

        var screenHeight = $(window).innerHeight();

        var counter = 0;

        $(".MenuFadeIn .submenu > li > a").each(function () {

            var height = parseInt($(this).css("line-height").replace("px", ""));

            var padding = parseInt($(this).parent().css("padding-top").replace("px", "")) + parseInt($(this).parent().css("padding-bottom").replace("px", ""));

            totalHeight += height + padding;

            counter++;

        });

        var socialPadding = parseInt($(".social-links").css("padding-top").replace("px", "")) + parseInt($(".social-links").css("padding-bottom").replace("px", ""));

        var socialHeight = parseInt($(".social-links a:first-child").css("line-height").replace("px", ""));

        totalHeight += socialPadding + socialHeight;

        //console.log(totalHeight, "::", screenHeight, "::", counter);	

        var diff = (screenHeight - totalHeight) / 2;

        $(".MenuFadeIn #navbar-collapse-main").css("padding-top", diff);

    }



    //if ($(window).innerWidth() <= 1024 && $("#header2").hasClass("MenuFadeIn")) {

    //    var totalHeight = 0;

    //    var screenHeight = $(window).innerHeight();

    //    var counter = 0;

    //    $(".MenuFadeIn .menu > li > a").each(function () {

    //        var height = parseInt($(this).css("line-height").replace("px", ""));

    //        var padding = parseInt($(this).parent().css("padding-top").replace("px", "")) + parseInt($(this).parent().css("padding-bottom").replace("px", ""));

    //        totalHeight += height + padding;

    //        counter++;

    //    });

    //    var socialPadding = parseInt($(".social-links").css("padding-top").replace("px", "")) + parseInt($(".social-links").css("padding-bottom").replace("px", ""));

    //    if ($(".social-links a:first-child").length > 0) {

    //        var socialHeight = parseInt($(".social-links a:first-child").css("line-height").replace("px", ""));

    //    }

    //    else {

    //        var socialHeight = 0;

    //    }



    //    totalHeight += socialPadding + socialHeight;

    //    var diff = (screenHeight - totalHeight) / 2;

    //    $(".MenuFadeIn .menu").css("padding-top", diff);

    //}

    var gridContentHeight = $('#GridContent').outerHeight();

    var bodyHeight = $('body').outerHeight();

    if ($(".fixedStrip").length > 0 && ($('#GridContent').outerHeight() / $('body').outerHeight() * 100) > 75) {

        $('.fixedStrip').affix({

            offset: {

                top: $('.fixedStrip').offset().top,

                bottom: $('#GridBottom').outerHeight() > 0 ? $('#GridBottom').outerHeight() + $('#SiteFooter').outerHeight() : $('#SiteFooter').outerHeight()

            }

        });

    }



    //if ($("header.shopHeader").length > 0 ) {

    //    $('header.shopHeader').affix({

    //        offset: {

    //            top: $('header.shopHeader').offset().top,

    //            bottom: $('#GridBottom').outerHeight() > 0 ? $('#GridBottom').outerHeight() + $('footer').outerHeight() : $('footer').outerHeight()

    //        }

    //    });

    //}

    if ($(window).innerWidth() > 991) {

        var contentHeight = $("#GridContent").outerHeight(true);

        var footerHeight = $("#SiteFooter").outerHeight(true);

        var totalHeight = window.innerHeight / 4;

        if ($("#GridPromo").length > 0 && !$("#GridPromo").hasClass("form-container-wide") && footerHeight < contentHeight) {

            if ($(window).innerWidth() > 1200) {

                if ($("#GridPromo .button-holder").length > 0) {  //form with btn don't get bottom stop

                    var opnBtnHgt = $(".button-holder").outerHeight();

                    $('#GridPromo').css("max-height", opnBtnHgt);

                    $('#GridPromo').affix({

                        offset: {

                            top: ($('#GridPromo').offset().top - 100)

                        }

                    });

                }

                else {

                    $('#GridPromo').affix({

                        offset: {

                            //top: ($('#GridPromo').offset().top - 100),

                            top: ($('#GridPromo').offset().top - 100),

                            bottom: $('#GridBottom').outerHeight() > 0 ? $('#GridBottom').outerHeight() + $('footer').outerHeight() : 0

                        }

                    });

                }



            }

            else {

                $('#GridPromo').affix({

                    offset: {

                        top: ($('#GridPromo').offset().top - 262),

                        bottom: $('#GridBottom').outerHeight(true) + $('#SiteFooter').outerHeight(true) + 50

                    }

                });

            }

        }

    }





    if (isStatic) {

        if ($(".GridTop.noTopImage").length > -1 && $("#GridPromo").length > -1) {

            var headerHeight = $('#header').outerHeight(true);

            $("#GridPromo.affix").css("top", headerHeight + "px");

        }

    }

    else {

        if ($("#GridTop.noTopImage").length > -1 && $("#GridPromo").length > -1) {

            var headerHeight = $('#header').outerHeight(true);

            $("#GridPromo.affix").css("top", headerHeight + "px");

        }

    }

    



});

$(window).scroll(function () {

    if (isStatic) {

        if ($(".GridTop.noTopImage").length > -1 && $("#GridPromo").length > -1) {

            var headerHeight = $('#header').outerHeight(true);

            $("#GridPromo.affix").css("top", headerHeight + "px");

        }



    } else {

        if ($("#GridTop.noTopImage").length > -1 && $("#GridPromo").length > -1) {

            var headerHeight = $('#header').outerHeight(true);

            $("#GridPromo.affix").css("top", headerHeight + "px");

        }

    }

    

});



/**jquery validate forms**/



$(window).keydown(function (event) {



    var item = event.target;

    //console.log(event.target.type);

    //console.log(event.keyCode);

    if (((!$(item).hasClass("menu-nav") && !$(item).hasClass("input-data")) || ($(item).hasClass("input-data") && event.target.type != 'textarea')) && ($(item).closest(".menu-nav").length ==0)) {

        if (event.target.type != 'button' && event.target.type != 'submit') {

            if ((event.keyCode == 13 && event.localName != "a" && event.originalEvent.srcElement.nodeName != "A" && event.target.type != "select-one")) {

                event.preventDefault();

                return false;

            }

        }

    }

});



//$("textarea").keyup(function (event) {

//    var currentTextarea = $(this);

//    var keyCode = event.keyCode;    

//    if (keyCode == 13) {

//        event.preventDefault();

//        event.stopPropagation();

//        currentTextarea.val(currentTextarea.val() + "\n");

//    }

//});

$("textarea").keypress(function (event) {

    var currentTextarea = $(this);

    var keyCode = event.keyCode;

    if (keyCode == 13) {

        event.preventDefault();

        event.stopPropagation();

        currentTextarea.val(currentTextarea.val() + "\n");

    }

});

$("#searchFormInput").keydown(function (event) {

    var keyCode = event.keyCode;

    if (keyCode == 13) {

        $("#searchFormSubmit").trigger('click');

    }

});



$("#searchFormCategory").keydown(function (event) {

    var keyCode = event.keyCode;

    if (keyCode == 13) {

        $("#searchCategoryFormSubmit").trigger('click');

    }

});



$.validator.addMethod(

    "regex",

    function (value, element, regexp) {

        var check = false;

        return this.optional(element) || regexp.test(value);

    },

    "אנא בדוק שוב"

);



function submitForm(form_id, server_function, successFunc) {



    $(form_id + " .input-data").on("keypress", function (e) {

        //console.log($(this).type);

        if (e.keyCode === 13 && e.currentTarget.type != "textarea") {

            $(form_id + " .form-submit").trigger("click");

            return false;

        }

    });





    $(form_id + " .form-submit").on("click", function (event) {

        event.preventDefault();

        var formValid = false;

        var t = $(form_id).valid();

        $(form_id + " .input-data").not(".not-to-valid").each(function () {

            if ($(this).valid()) {

                formValid = true;

            }

            else {

                //const errorElement = $(".error").first();

                //if (errorElement.length) {

                //    document.documentElement.scrollTo({

                //        top: errorElement.offset().top - 20,

                //        behavior: 'smooth'

                //    });

                //}

                $("#register-form,#DynamicFormObject").find(".error").first().focus()

                if ($(".deliveryMethodsError").length > 0 && $(".deliveryMethodsError").css("display") != "none") {



                }

                else {

                    if ($("#deliveryHour-error").length > 0 && $("#deliveryHour-error").css("display") != "none") {

                      $('html,body').animate({ scrollTop: $("form#checkout-form .row > div.checkoutInputsWrapper[style='display: block;'] #deliveryHour-error").offset().top - (headerHeight + 20) }, 'slow');

                    }

                    else {

                      $('html,body').animate({ scrollTop: $(this).offset().top - (headerHeight + 20) }, 'slow');

                    }

                }



                return formValid = false;

            }

        }).promise().done(function () {

            if (window.location.pathname.indexOf("/0/Checkout") > -1) {

                if ($(".deliveryOptionBox").length >= 1 && $("input[name=deliveryType]").val() == "0") {

                    formValid = false;

                    $(".deliveryMethodsError").show();

                    $(".deliveryMethodsError").parent().focus();

                    //window.location = window.location;

                }

                if ($(".deliveryMethodsMinimumError").css("display") != "none") {

                    formValid = false;

                }



                if ($("input[name=deliveryType]").val() != "2") {

                    if ($("#cityValidationInput").length > 0 && $("#cityValidationInput").val() == "" && $("#cityValidationInput").prop("required") === true) {

                        showValidationError();

                        formValid = false;

                    }

                }

            }

            if (formValid) {

                $(form_id + " .form-submit").attr("disabled", "true");

                $(form_id + " .spinner .fa-spinner").show();



                $.post(server_function, $(form_id).serialize(), function (data) {

                    successFunc(data);

                })

                //.fail(function (e,textStatus, errorThrown) {

                //    console.log(e.responseText);

                //    sendFailureMail(e.responseText + "--" + textStatus + "--" + errorThrown, form_id, server_function);

                //})





                //var data = $(form_id).serialize();

                //$.ajax({

                //    type: 'post',

                //    url: server_function,                    

                //    //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

                //    data: data,

                //    dataType: 'json',

                //    processData: false,                    

                //    contentType: false,                    

                //    error: function (e) {

                //        console.log(e.responseText);

                //        sendFailureMail(e.responseText);

                //    },

                //    success: function (e) {

                //        successFunc(e);

                //    }

                //});

            }



        })

    })

}

//function sendFailureMail(responseText, formID, serverFunction) {

//    //$.ajaxSetup ({ async: false })

//    //var ipAddress = getIP();

//        $.post("https://connectors.lawrence.co.il/CustomFormMail/Home/ErrorMails/", { URL: window.location.href, Error: responseText, FormID: formID, ServerFunction: serverFunction, ClientIP: clientIP }, function (data) {

//            console.log(data);

//        });

//}



//function getIP() {

//    $.ajaxSetup({ async: false })

//    //$.get('https://api.ipify.org?format=json', function (response) {

//    //    return response.ip;

//    //});



//    return clientIP;

//}

$(document).ready(function () {

    $('input.fileUploader').change(function () {

        var maxSize = $('#fileMaxSize').val();

        if (maxSize == undefined || maxSize == "" || maxSize < 1) {

            maxSize = 4;

        }   

        maxSize = maxSize * 1024 * 1024

        var ext = this.value.match(/\.([^\.]+)$/)[1];

        switch (ext.toLowerCase()) {

            case 'jpg':

            case 'png':

            case 'svg':

            case 'doc':

            case 'docx':

            case 'xls':

            case 'xlsx':

            case 'ppt':

            case 'pptx':

            case 'pdf':

            case 'tif':

            case 'jpeg':

            case 'webp':

                var name = $(this).prop("files")[0]['name'];

                if (this.files[0].size <= maxSize) {

                    $(this).parent().find(".fileUploadTrigger").attr("placeholder", name);

                    $(this).parent().find(".fileUploader-error").hide();

                }

                else {

                    $(".fileUploader-error").show();

                    this.value = '';

                }

                break;

            default:

                $(".fileUploader-error").show();

                this.value = '';

        }

    });

    $('input.filesUploader').change(function () {

        var maxSize = $('#fileMaxSize').val();

        if (!maxSize || maxSize < 1) {

            maxSize = 4;

        }

        maxSize = maxSize * 1024 * 1024;



        var allowedExtensions = ['jpg', 'png', 'svg', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'tif'];

        var validFiles = [];

        var hasError = false;



        for (let i = 0; i < this.files.length; i++) {

            let file = this.files[i];

            let extMatch = file.name.match(/\.([^\.]+)$/);

            let ext = extMatch ? extMatch[1].toLowerCase() : '';



            if (allowedExtensions.includes(ext) && file.size <= maxSize) {

                validFiles.push(file.name);

            } else {

                hasError = true;

                break;

            }

        }



        if (hasError) {

            $(this).val('');

            $(this).parent().find(".fileUploader-error").show();

            $(this).parent().find(".fileUploadTrigger").attr("placeholder", "");

        } else {

            let nameList = validFiles.join(', ');

            $(this).parent().find(".fileUploadTrigger").attr("placeholder", nameList);

            $(this).parent().find(".fileUploader-error").hide();

        }

    });

    $('input.fileUploaderSignature').change(function () {

        var ext = this.value.match(/\.([^\.]+)$/)[1];

        switch (ext.toLowerCase()) {

            case 'jpg':

            case 'png':

            case 'svg':

            case 'doc':

            case 'docx':

            case 'xls':

            case 'xlsx':

            case 'ppt':

            case 'pptx':

            case 'pdf':

            case 'tif':

            case 'jpeg':

            case 'webp':

                var name = $(this).prop("files")[0]['name'];

                if (this.files[0].size <= 4097152) {

                    $(".fileUploadTrigger").attr("placeholder", name);

                    $(".fileUploaderSignature-error").hide();

                }

                else {

                    $(".fileUploaderSignature-error").show();

                    this.value = '';

                }

                break;

            default:

                $(".fileUploaderSignature-error").show();

                this.value = '';

        }

    });

});







function submitFormDynamicForm(form_id, server_function, successFunc) {

    if (isStatic) {

        $("input[name='formUrl']").val(window.location.href);

        server_function = "https://connectors.lawrence.co.il/static/DynamicFormSubmitNew";

    }

    $(form_id + " .input-data").on("keypress", function (e) {

        if (e.keyCode === 13 && e.currentTarget.type != "textarea") {

            $(form_id + " .form-submit").trigger("click");

            return false;

        }

    });

    var formID = $(form_id).attr("data-formid");



    var lastSubmitTrigger = 0;

    $(form_id + " .form-submit").on("touchend", function (event) {

        event.preventDefault();

        var now = Date.now();

        if (now - lastSubmitTrigger < 1000) return;

        lastSubmitTrigger = now;

        if (document.activeElement && document.activeElement !== this && document.activeElement.blur) {

            try { document.activeElement.blur(); } catch (e) {}

        }

        $(this).trigger("click");

    });



    $(form_id + " .form-submit").on("click", function (event) {

        if ($("#cfbirthday").val()) return false;



        event.preventDefault();

        var formValid = false;



        var fdata = new FormData();



        fdata.append("formID", formID);

        fdata.append("formUrl", $(form_id + " #formUrl").val());

        fdata.append("formPageName", $(form_id + " #formPageName").val());

        fdata.append("recaptchaResponse", $(form_id + " .g-recaptcha textarea").val());



        if (isStatic && $(form_id + " #siteURL").length && $(form_id + " #siteURL").val() != '' && $(form_id + " #siteURL").val() != undefined) {

            fdata.append("siteURL", $(form_id + " #siteURL").val());

        }



        $('input.fileUploader').each(function (a, b) {

            var fileInput = $('input.fileUploader')[a];

            if (fileInput.files.length > 0) {

                var file = fileInput.files[0];

                fdata.append($(this).attr("name"), file);

            }

        });

        $('input.filesUploader').each(function () {

            var $input = $(this);

            var inputName = $input.attr("name");



            if (this.files.length > 0) {

                for (let i = 0; i < this.files.length; i++) {

                    fdata.append(inputName, this.files[i]);

                }

            }

        });



        fileUploaderSignatureIndex = 0;

        $("input.fileUploaderSignature").each(function (a, b) {

            var fileInput = $("input.fileUploaderSignature")[a];

            if (fileInput.files.length > 0) {

                var file = fileInput.files[0];

                fdata.append($(this).attr("name"), file);

            }

            fileUploaderSignatureIndex++;

        });

        var t = $(form_id).valid();

        $(form_id + " .input-data").not(".not-to-valid").each(function () {

            if ($(this).valid()) {

                formValid = true;

                if ($(this).attr('type') == 'checkbox') {

                    if ($(this).is(":checked")) {

                        $(this).val("true");

                    }

                    else {

                        $(this).val("false");

                    }

                }

                if ($(this).hasClass('fileUploader') && $(this).attr('required') == 'required' && ($(this).next().next().css("display") != "none" || $(this).val() == "")) {

                    $(this).focus();

                    $(this).next().next().css("display", "block");

                    return formValid = false;

                }

                if ($(this).hasClass('fileUploaderSignature') && $(this).attr('required') == 'required' && ($(this).next().css("display") != "none" || $(this).val() == "")) {

                    $(this).focus();

                    $(this).next().css("display", "block");

                    return formValid = false;

                }



                fdata.append($(this).attr("name"), $(this).val());

            }

            else {

                $(this).focus();

                $(this).closest("form").find(".notification").show();

                return formValid = false;

            }

        }).promise().done(function () {

            if (formValid) {

                $(form_id + " .notification").hide();

                $(form_id + " .form-submit").attr("disabled", "true");

                $(form_id + " .spinner .fa-spinner").show();

                $.ajax({

                    type: 'post',

                    url: server_function,

                    data: fdata,

                    processData: false,

                    contentType: false,

                    timeout: 180000,

                    error: function (xhr, textStatus, errorThrown) {

                        console.error("[DynamicFormSubmit] failed", {

                            formID: formID,

                            status: xhr && xhr.status,

                            statusText: xhr && xhr.statusText,

                            textStatus: textStatus,

                            errorThrown: errorThrown,

                            responseText: xhr && xhr.responseText

                        });

                        successFunc("error");

                    },

                    success: function (e) {

                        successFunc(e);

                    },

                    complete: function () {

                        $(form_id + " .spinner .fa-spinner").hide();

                        $(form_id + " .form-submit").removeAttr("disabled");

                    }

                });

            }

        });

    });

}







story.ua = navigator.userAgent;

story.isMobileWebkit = /WebKit/.test(story.ua) && /Mobile/.test(story.ua);





var imageStart = "";

clicked = 0;









story.dateTimePicker = function (lang, format, useCurrent, showToday) {

    $("input[data-datepicker='true']:not(.specialDate)").datetimepicker({

        daysOfWeekDisabled: [],

        locale: lang, // takes a string as param ex. 'he'

        format: format, // takes a string as param ex. 'DD/MM/YYYY'

        useCurrent: useCurrent, // takes a bool as param ex. false

        ignoreReadonly: true,

        // minDate: moment().subtract(1, 'd'),

        viewMode: 'years',

        focusOnShow: true,

        showTodayButton: showToday// takes a bool as param ex. true        

        //widgetPositioning: {

        //        horizontal: 'auto',

        //        vertical: 'auto'

        //}



    }).on('dp.change', function (event) {

        var date = event.date;

        if ($(this).attr("name") == "date") {

            setDate(date);

        }

    });

}









//$(document).on('blur', "input", function () {

//    $("body").css("transform", "scale(0.9,0.9)");

//});

//$(document).on('blur', 'input, textarea', function () {

//    setTimeout(function () {

//        window.scrollTo(document.body.scrollLeft, document.body.scrollTop);

//        $("body").css("transform", "scale(0.9,1)");

//    }, 0);

//});



function changeViewPort(key, val) {

    var reg = new RegExp(key, "i"), oldval = document.querySelector('meta[name="viewport"]').content;

    var newval = reg.test(oldval) ? oldval.split(/,\s*/).map(function (v) { return reg.test(v) ? key + "=" + val : v; }).join(", ") : oldval += ", " + key + "=" + val;

    document.querySelector('meta[name="viewport"]').content = newval;

}

if ($(window).width() < 767) {

    $(document).on('blur', 'select,input, textarea', function () {

        changeViewPort("maximum-scale", 1);

        changeViewPort("maximum-scale", 10);

    });

    $(document).on('focus', 'select, input, textarea', function () {

        changeViewPort("maximum-scale", 10);

        changeViewPort("maximum-scale", 1);

    });

}







function LoadAlbumData(event, modal, imageID) {

    //event.preventDefault();

    if (event.type == "keyup") {

        console.log("key up detected");

        if (event.keyCode != 13) {

            return false;

        }

    }

    $(".gallery-cubes .image-link-container").attr("aria-hidden", "false");

    imageStart = imageID;

    //$(".gallery-cubes-modal").attr("id", modal);

    var id = modal.replace("#gallery-modal-", "");

    var slidesForModal = $(".slidesForModal[data-id=gallery-" + id + "] .slides").html();

    if ($(".gallery-cubes-modal .slides").length == 0) {

        $(".gallery-cubes-modal .flex-container").append("<div class='flexslider modal-slider' style='direction:ltr;'><div class='slides'></div></div>");

    }

    $(".gallery-cubes-modal .slides").html(slidesForModal);

    if (id.indexOf("-random") <= 0) {

        $(".gallery-cubes-modal").modal('show');

    }

    else {

        $(".gallery-cubes-modal" + modal).modal('show');

    }

}



function initFlexModal() {

    $('.modal-slider').flexslider({

        selector: ".slides > div.img-background-flex.slider",

        animation: "slide",

        maxItems: 1,

        slideshow: false,

        directionNav: true,

        keyboard: true,

        controlNav: false,

        multipleKeyboard: true,

        startAt: imageStart,

        prevText: "",

        nextText: "",

        start: function (slider) {

            slider.resize();

        }

    });

};



/**Fade in elements one by one - animation delay**/

function fadeElements(item) {

    $(item).each(function (index) {

        var multiply = 0.2 * (index + 1);

        $(this).css("animation-delay", multiply + "s");

    });

}











$(document).ready(function () {

    $('.print-share').each(function () {

        $(this).click(function (e) {

            e.preventDefault();

            window.print();

        });

    });



    $('.modal').on('show.bs.modal', function (e) {



        if (clicked > 0) {

            if (galleryId == $(this).attr("id")) {

                $(".flex-container").html(storeData).promise().done(function () {

                    initFlexModal();

                });

            }

            else {

                clicked++;

                storeData = $(".flex-container").html();

                galleryId = $(this).attr("id");

                initFlexModal();

            }



        } else {

            storeData = $(".flex-container").html();

            galleryId = $(this).attr("id");

            clicked++;

            initFlexModal();

        }



        //initFlexModal();



    });

});







$('.modal').on('hidden.bs.modal', function (e) {

    $(".flex-container").empty();

});



$(".gallery-cubes-modal").on('hide.bs.modal', function (e) {

    console.log("hide");

    var currentIndex = $(this).find(".flex-active-slide").attr("data-image");

    $(".gallery-cubes-modal").find(".boxes-images-outer-image").each(function () {

        var index = $(this).attr("data-image-index");

        if (index == currentIndex) {

            $(this).closest(".gallery-cubes").find(".boxes-images-outer-image").removeClass("toFocus");

            $(".boxes-images-outer-image").removeClass("toFocus");

            $(this).addClass("toFocus");

        }

    });

});

$(".gallery-cubes-modal").on('hidden.bs.modal', function (e) {

    $(".toFocus").focus();

});





/**Google Map**/



//// When the window has finished loading create our google map below

//google.maps.event.addDomListener(window, 'load', init);



//function init() {

//    // Basic options for a simple Google Map

//    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

//    var isDraggable = $("#map-section .map-cover").hasClass("clicked") ? true : false; // If document (your website) is wider than 480px, isDraggable = true, else isDraggable = false

//    var isScrollable = $("#map-section .map-cover").hasClass("clicked") ? true : false;

//    var mapOptions = {

//        // How zoomed in you want the map to start at (always required)

//        zoom: 17,

//        draggable: isDraggable,

//        // The latitude and longitude to center the map (always required)

//        center: new google.maps.LatLng(32.130174, 34.792328), 

//        scrollwheel: isScrollable,

//        // How you would like to style the map.

//        // This is where you would paste any style found on Snazzy Maps.

//        //styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

//    };



//    // Get the HTML DOM element that will contain your map

//    // We are using a div with id="map" seen below in the <body>

//    var mapElement = document.getElementById('map-holder');



//    // Create the Google Map using our element and options defined above

//    var map = new google.maps.Map(mapElement, mapOptions);



//    // Let's also add a marker while we're at it

//    //var image = {

//    //    url: '../../../000frames/site/images/logo.png',

//    //    scaledSize: new google.maps.Size(94,29)

//    //};

//    //var marker = new google.maps.Marker({

//    //    position: new google.maps.LatLng(32.071051,	34.788495),

//    //    map: map,

//    //    icon: image

//    //});



//}





$(".map-cover").click(function () {

    $(this).addClass("clicked");

    $(this).fadeOut();

    $(this).parent().find(".overlay").hide();

});







/**END Google Map**/











var timer;



$(document).ready(function () {









    /**change top img to mobile img**/



    //if (window.innerWidth < 767) {

    //    $("#GridTop").addClass("");

    //}

    $('.category-block-button').on('click', function () {

        if (window.outerWidth >= 768) {

            return false;

        }

        return false;

    });



    $(".submenu li.has-sub > a").click(function () {

        $(this).next().trigger('click');

    });

    /**check if gallery - to change max width**/

    if (($("#galleryview").html() != "" && $("#galleryview").length > 0 && $("#galleryview").find("#text1 p").length == 0 && $("#galleryview").parent().parent().parent().attr("id") != "PopUpData") || ($("#contactview").html() != "" && $("#contactview").length > 0)) {

        $("#GridPage").addClass("gallery");

    }

    if ($("#contactview").html() != "" && $("#contactview").length > 0) {

        $("#GridPage").addClass("gallery contact");

    }

    if (($("#galleryview").html() != "" && $("#galleryview").length > 0)) {

        $(".section-animation-item").css({

            "animation": "fadeElements .5s forwards"

        });

    }



    //$("input[data-datepicker='true']").on("change", function (e) {

    //    alert('hey');

    //});



    //$("input[data-datepicker='true']").change(function () {

    //    alert("changed");

    //});



    //$("#date").keypress(function (event) { event.preventDefault(); });



    //if ($(window).width() < 767) {

    //    if ($(".submenu").is(":visible") == true) {

    //    $('.submenu').slimScroll({

    //        //height:'90vh'

    //        });

    //    }

    //}





    //    $('.submenu').slimScroll({

    //    });

    //}







    /**check if header2 exists**/

    if ($("#header2").length > 0) {

        $("#GridTop, .GridTop").addClass("longer");

    }







    /**Open menu**/

    $("#header .menu-nav").click(function (e) {

        console.log("Test " + e);

        openCloseMenu(e);

    });



    if (window.innerWidth < 992) {

        //$("#header2 .menu-nav").click(function (e) {            

        //    openCloseMenu(e);

        //});

    }



    if ($("#TopVideo iframe").length > 0) {

        $("#TopVideo iframe").attr("aria-hidden", "true");

    }



    if ($("#header #menu").length > 0) {

        var ul = document.getElementById('menu');

        var liSelected;

        var index = -1;



        document.addEventListener('keydown', function (event) {

            var len = ul.getElementsByTagName('li').length - 1;

            if (event.which === 40) {

                index++;

                //down 

                if (liSelected) {

                    //removeClass(liSelected, 'selected');

                    next = ul.getElementsByTagName('li')[index];

                    if (typeof next !== undefined && index <= len) {



                        liSelected = next;

                    } else {

                        index = 0;

                        liSelected = ul.getElementsByTagName('li')[0];

                    }

                    //addClass(liSelected, 'selected');

                    $(liSelected).find('a').focus();

                    console.log(index);

                } else {

                    index = 0;



                    liSelected = ul.getElementsByTagName('li')[0];

                    //addClass(liSelected, 'selected');

                    $(liSelected).find('a').focus();

                }

            } else if (event.which === 38) {



                //up

                if (liSelected) {

                    //removeClass(liSelected, 'selected');

                    index--;

                    console.log(index);

                    next = ul.getElementsByTagName('li')[index];

                    if (typeof next !== undefined && index >= 0) {

                        liSelected = next;

                    } else {

                        index = len;

                        liSelected = ul.getElementsByTagName('li')[len];

                    }

                    //addClass(liSelected, 'selected');

                    $(liSelected).find('a').focus();

                } else {

                    index = 0;

                    liSelected = ul.getElementsByTagName('li')[len];

                    //addClass(liSelected, 'selected');

                    $(liSelected).find('a').focus();

                }

            }

        }, false);

    }

   



    









    //if (window.innerWidth <= 1024) {

    //    $("#header2 .menu-nav").click(function () {

    //        openCloseMenu();

    //    });

    //    $("#header2 .menu-nav").keyup(function (event) {

    //        if (event.keyCode != 9 && event.keyCode != 16) {

    //            openCloseMenu();

    //        }

    //    });

    //}

    var lastFocusedElement;

    var topScrollPos;

    function openCloseMenu(event) {

        $("#nav-toggle").toggleClass("active");

        checkOpenShopBoxes();

        lastFocusedElement = document.activeElement;

        var buttonClicked = event.target;

       

        if ($("#nav-toggle").hasClass("active")) {

            console.log("#nav-toggle active");            

            $("#nav-toggle").attr("aria-expanded", "true");

            $(".menu-nav").attr("aria-expanded", "true");

            $(".menu-nav").attr("aria-label", "סגור תפריט ניווט");

            if ($(window).width() < 550) {

                $(".languages").fadeIn();

                $("#header #header-center-kdm > a:first-child").css("visibility", "hidden");

            }

            if ($(window).width() <= 991) {

                $(".MenuFadeIn li").each(function (i) {

                    $(this).parent().find(".MenuFadeIn").fadeIn(250);

                    $(this).parent().find(".MenuFadeIn").addClass("showMenu");

                    var listItem = $(this);

                    if (i == 0) {

                        $(listItem).addClass("showItem");

                    }

                    else {

                        setTimeout(function () { $(listItem).addClass("showItem"); }, 100 * i);

                    }

                });

            }

            if ($(window).width() <= 767) {

                $('#header').addClass("subopen menu-open");

                setTimeout(function () {

                    $('.fullScreenMenu .navbar-content').addClass("showfade");

                }, 500);

            }

            else {

                $('#header').addClass("menu-open subopen");



                topScrollPos = window.pageYOffset || document.documentElement.scrollTop;



                //$('.fullScreenMenu #header-center-kdm').attr("tabindex", "-1");                

                //$('body.fullScreenMenuOpen #SiteGridContainer').attr("tabindex", "- 1");



                $('.fullScreenMenu #header-center-kdm').addClass("unTab");

                $('body.fullscreenMenuMode #SiteGridContainer').addClass("unTab");

                $('.fullscreenMenuMode footer').addClass("unTab");



                setTimeout(function () {

                    $('.fullScreenMenu .navbar-content').addClass("showfade");

                }, 500);

            }



            $("#header.fullScreenMenu .menu-nav .closed").css("opacity", "0");

            $('.fullScreenMenu #header-center-kdm').addClass("hideKDM");

            $(".fullScreenMenu #navbar-collapse-main").addClass("in");

            $("body.fullscreenMenuMode").addClass("fullscreenMenuOpen");

            if ($("body").hasClass("fullscreenMenuMode")) {

                //$(".menu-nav span.open,.menu-nav .open").css("display", "inline-block");

                $(".menu-nav span.open,.menu-nav .open").delay(150).css("display", "inline-block");

                $(".submenu,.menu-nav").slideDown("slow", function () {

                    $(".submenu li").each(function (index) {

                        if ($(window).width() > 550) {

                            $(this).css("visibility", "visible");

                            $(this).delay(50 * index).fadeIn();

                        }

                        else {

                            $(this).css("visibility", "visible");

                            $(this).delay(50 * index).fadeIn();

                        }

                    });

                });

            }

            else {

                $(".submenu,.menu-nav span.open,.menu-nav .open").slideDown("slow", function () {

                    $(".submenu li").each(function (index) {

                        if ($(window).width() > 550) {

                            $(this).css("visibility", "visible");

                            $(this).delay(50 * index).fadeIn();

                        }

                        else {

                            $(this).css("visibility", "visible");

                            $(this).delay(50 * index).fadeIn();

                        }

                    });

                });

            }



        }

        else {

            console.log("#nav-toggle not active");  

            //alert(lastFocusedElement.type);

            

            var shouldCloseMenu = true;

            if (lastFocusedElement.type == "button" || event.target.type == "button") {                

                if ($(lastFocusedElement).parent().hasClass("has-megamenu") || $(event.target).parent().hasClass("has-megamenu")) {

                    console.log("mega:" + lastFocusedElement);

                    shouldCloseMenu = false;

                }

            }

            if (shouldCloseMenu) {

                $(".MenuFadeIn li").removeClass("showItem");

                $("#nav-toggle").attr("aria-expanded", "false");

                $(".menu-nav").attr("aria-expanded", "false");

                $(".menu-nav").attr("aria-label", "פתח תפריט ניווט");

                $('.fullScreenMenu .navbar-content').removeClass("showfade");

                $('.fullScreenMenu #header-center-kdm').removeClass("hideKDM");

                $("#header.fullScreenMenu .menu-nav .closed").css("opacity", "1");

                $("body.fullscreenMenuMode").removeClass("fullscreenMenuOpen");

                $(".fullScreenMenu #navbar-collapse-main").removeClass("in");

                $('#header').removeClass("menu-open subopen");



                //$('.fullScreenMenu #header-center-kdm').attr("tabindex", "0");

                //$('.fullScreenMenuOpen #SiteGridContainer').attr("tabindex", "0");

                $('.fullScreenMenu #header-center-kdm').removeClass("unTab");

                $('.fullscreenMenuMode #SiteGridContainer').removeClass("unTab");

                $('.fullscreenMenuMode footer').removeClass("unTab");



                $(".menu-nav").removeClass("clickForScr");



                //lastFocusedElement.focus();

                $('html,body').animate({ scrollTop: topScrollPos }, 'slow');



                if ($("body").hasClass("fullscreenMenuMode")) {

                    $(".menu-nav span.open,.menu-nav .open").delay(150).css("display", "none");

                    $(".submenu").slideUp("slow", function () {

                        $(".submenu li").each(function (index) {

                            //$(this).css("visibility", "hidden");

                            if ($(window).width() < 550) {

                                $(".languages").fadeOut();

                                $("#header #header-center-kdm > a:first-child").delay(2000).css("visibility", "visible");



                                $('#header').removeClass("subopen");



                            }

                        });

                    });

                }

                else {

                    $(".submenu,.menu-nav span.open,.menu-nav .open").slideUp("slow", function () {

                        $(".submenu li").each(function (index) {

                            //$(this).css("visibility", "hidden");

                            if ($(window).width() < 550) {

                                $(".languages").fadeOut();

                                $("#header #header-center-kdm > a:first-child").delay(2000).css("visibility", "visible");



                                $('#header').removeClass("subopen");



                            }

                        });

                    });

                }

            }

          

        }

    }





    $("#header .menu-nav").keyup(function (event) {

        //event.stopPropagation();

        if (event.keyCode != 9 && event.keyCode != 16 && event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 17 ) {

            //openCloseMenu(event);

            //openCloseMenu(event);

            if (event.keyCode == 27) {

                if ($("#header").hasClass("menu-open")) {

                    openCloseMenu(event);

                }

            }

            else {

                openCloseMenu(event);

            }                              

        }

    });



    /**open sub-menu**/

    $(".submenu > li.has-sub i, .megaMenuSection i.opensub").click(function (e) {

        console.log("has sub clicked");

        console.log(e.target);

        if ($(this).parent().hasClass("sub-open")) {

            //$(this).parent().find(".menu-sub").slideUp();

            $(this).next(".menu-sub:first").slideUp();

            $(this).parent().removeClass("sub-open");

            $(this).removeClass("fa-angle-up");

            $(this).addClass("fa-angle-down");

            //$(this).parent().find('i').removeClass("fa-angle-up");

            //$(this).parent().find('i').addClass("fa-angle-down");

            e.stopPropagation();

        }

        else {

            //$(this).parent().find(".menu-sub").slideDown();

            $(this).next(".menu-sub:first").slideDown();

            //$(this).nextAll(':has(.menu-sub):first').slideDown();

            $(this).parent().addClass("sub-open");

            $(this).removeClass("fa-angle-down");

            $(this).addClass("fa-angle-up");

            //$(this).parent().find('i').removeClass("fa-angle-down");

            //$(this).parent().find('i').addClass("fa-angle-up");

            e.stopPropagation();

        }



    });

    $(".submenu > li.has-sub i").keyup(function (e) {

        console.log("has sub keyup");

        if ($(this).parent().hasClass("sub-open")) {

            $(this).parent().find(".menu-sub").slideUp();

            $(this).parent().removeClass("sub-open");

            $(this).parent().find('i').removeClass("fa-angle-up");

            $(this).parent().find('i').addClass("fa-angle-down");

            e.stopPropagation();

        }

        else {

            $(this).parent().find(".menu-sub").slideDown();

            $(this).parent().addClass("sub-open");

            $(this).parent().find('i').removeClass("fa-angle-down");

            $(this).parent().find('i').addClass("fa-angle-up");

            e.stopPropagation();

        }



    });





    $(".submenu li").each(function () {

        if ($(this).hasClass("active") && $(this).hasClass("has-sub")) {

            $(this).find(".menu-sub").first().slideDown();

            $(this).find("i.opensub").first().removeClass("fa-angle-down");

            $(this).find("i.opensub").first().addClass("fa-angle-up");

            $(this).addClass("sub-open");

        }

    });

    //$(".menu > li").each(function () {

    //    if ($(this).hasClass("active") && $(this).hasClass("has-sub")) {

    //        $(this).find(".menu-sub").slideDown();

    //        $(this).addClass("sub-open");

    //    }

    //});





    /******OPEN FULLSCREEN MENU****/

    $(document).ready(function () {







        //$(".flex-direction-nav .flex-next").each(function (){

        //	$(this).html("לתמונה הבאה")

        //});

        //$(".flex-direction-nav .flex-prev").each(function () {

        //	$(this).html("לתמונה הקודמת")

        //});

        $('.blueimp-gallery')

            .on('open', function (event) {

                console.log("gallery open");



            })

            .on('opened', function (event) {

                var currentGallery = $(this);

                // Gallery opened event handler

                $(currentGallery).find("a.close").focus();

                var close = $(currentGallery).find("a.close").length;

                //$(currentGallery).find("a.close").css("color","red");

            })

            .on('slide', function (event, index, slide) {

                // Gallery slide event handler

            })

            .on('slideend', function (event, index, slide) {

                // Gallery slideend event handler

            })

            .on('slidecomplete', function (event, index, slide) {

                // Gallery slidecomplete event handler

            })

            .on('close', function (event) {

                // Gallery close event handler

            })

            .on('closed', function (event) {

                // Gallery closed event handler

            });

        //$(".owl-carousel .owl-nav div").keydown(function (e) {

        //	console.log("nav button clicked: " + e.keyCode);

        //	if (e.keyCode == 13) {

        //		$(this).trigger("click");

        //	}				

        //});

        $(".blueimp-gallery .close").keydown(function (e) {

            if (e.keyCode == 13) {

                $(this).trigger("click");

            }

        });

        //$(".owl-carousel .owl-item .item a.slide-bg-layer").keyup(function (e) {

        //	var button = $(this);

        //	//console.log("click:" + e.keyCode);

        //	if (e.keyCode == 13) {

        //		$(button).trigger("click");

        //	}

        //});







        if ($(window).innerWidth() > 767) {

            $("#header.fullScreenMenu .navbar-content .submenu li.has-sub").mouseenter(function () {

                $(this).siblings().addClass("menuLiFade");

            });

            $("#header.fullScreenMenu .navbar-content .submenu li.has-sub").mouseleave(function () {

                $(this).siblings().removeClass("menuLiFade");

            });

        }

    });





    /**Sliders**/



    if ($('#home-gallery .slides').length > 0) {

        //$('#home-gallery').flexslider({

        //    animation: "fade",

        //    maxItems: 1,

        //    slideshow: true,

        //    slideshowSpeed: 4000,

        //    keyboard: true,

        //    directionNav: false,

        //    controlNav: true,

        //    touch: true,

        //    useCSS: false,

        //    keyboard: true,

        //    multipleKeyboard: true,

        //    start: function (slider) {

        //        slider.resize();

        //        $('.pause').click(function () {

        //            if (!$(this).hasClass("play")) {

        //                slider.pause();

        //                $(this).attr("aria-pressed", "true");

        //                $(this).attr("aria-label", "הפעל גלרייה");

        //                $(this).addClass("play");

        //            }

        //            else {

        //                $(this).attr("aria-pressed", "false");

        //                $(this).attr("aria-label", "עצור גלרייה");

        //                $(this).removeClass("play");

        //                slider.play();

        //            }

        //            //e.preventDefault();

        //        });

        //    }

        //});

    }





    $('#top-gallery:not(.showArrows)').flexslider({

        animation: "fade",

        maxItems: 1,

        slideshow: true,

        slideshowSpeed: 4000,

        directionNav: false,

        controlNav: true,

        touch: true,

        useCSS: false,

        start: function (slider) {

            slider.resize();

        }

    });

    $('#top-gallery.showArrows').flexslider({

        animation: "fade",

        maxItems: 1,

        slideshow: true,

        slideshowSpeed: 4000,

        directionNav: true,

        controlNav: false,

        prevText: "",

        nextText: "",

        touch: true,

        useCSS: false,

        start: function (slider) {

            slider.resize();

        }

    });



    $('.flexslider-box').each(function () {

        if ($(this).find(".slider-item").length > 1) {

            if (window.innerWidth > 991) {

                $(this).flexslider({

                    selector: ".slides > li.slider-item:not(.visible-xs)",

                    animation: "fade",

                    maxItems: 1,

                    slideshow: true,

                    slideshowSpeed: 4000,

                    directionNav: $(this).find(".slider-item").hasClass("IsCarousel") ? true : false,

                    controlNav: $(this).find(".slider-item").hasClass("IsCarousel") ? false : true,

                    touch: true,

                    useCSS: false,

                    start: function (slider) {

                        slider.resize();

                    }

                });

            }

            else {

                $(this).flexslider({

                    selector: ".slides > li.slider-item:not(.hidden-xs)",

                    animation: "fade",

                    maxItems: 1,

                    slideshow: true,

                    slideshowSpeed: 4000,

                    directionNav: $(this).find(".slider-item").hasClass("IsCarousel") ? true : false,

                    controlNav: $(this).find(".slider-item").hasClass("IsCarousel") ? false : true,

                    touch: true,

                    useCSS: false,

                    start: function (slider) {

                        slider.resize();

                    }

                });

            }



        }

    });



    $('.gallery-slider').not(".no-arrows").flexslider({

        animation: "fade",

        maxItems: 1,

        slideshow: false,

        slideshowSpeed: 4000,

        directionNav: true,

        controlNav: false,

        prevText: "",

        nextText: "",

        touch: true,

        useCSS: false,

        start: function (slider) {

            slider.resize();

        }

    });

    $('.gallery-slider.no-arrows').flexslider({

        animation: "fade",

        maxItems: 1,

        slideshow: true,

        slideshowSpeed: 4000,

        directionNav: false,

        controlNav: false,

        prevText: "",

        nextText: "",

        touch: true,

        useCSS: false,

        start: function (slider) {

            slider.resize();

        }

    });

    /**END Sliders**/



    /**open info-card**/

    $("#contact-details-box .button-holder").click(function () {

        if (!$(this).hasClass("open")) {

            $(".contact-info-box").slideDown();

            $("#contact-details-box a").css("visibility", "hidden");

            $(this).addClass("open");

            $("i.fa-angle-left").show();



        }

        else {

            $(".contact-info-box").slideUp(function () {

                $("#contact-details-box a").css("visibility", "visible").hide().fadeIn();

            });

            $(this).removeClass("open");



            $("i.fa-angle-left").hide();

        }

    });



    /**END - open info-card**/









    /**open sub menu in header option 2**/

    var isIpad = navigator.userAgent.indexOf("iPad") != -1;

    console.log(isIpad);

    if (($(window).width() > 991) && (isIpad < 1)) {



        $("#header2 ul.menu li.has-sub").hover(function (e) {

            //console.log("a hover");

            $(this).addClass("open");

            if (!$(this).parent().find(".menu-sub").hasClass("open")) {

                $(this).find(".menu-sub").fadeIn();

                $(this).find(".menu-sub").addClass("open");

            }

            return false;

            //e.stopPropagation();

        }).on("mouseleave", function (e) {

            //console.log("mouseleave");

            $(this).removeClass("open");

            $(this).find(".menu-sub").fadeOut();

            $(this).find(".menu-sub").removeClass("open");

            //e.stopPropagation();

            return false;

        });





        $("#header2 ul.menu li:not(.has-sub) > a").focus(function (e) {

            $(this).parent().siblings().removeClass("open");

            $(this).parent().siblings().find(".menu-sub").fadeOut();

            $(this).parent().siblings().find(".menu-sub").removeClass("open");

        });



        $("#header2 ul.menu li.has-sub > a").focus(function (e) {

            //console.log("link focused");

            $(this).parent().addClass("open");

            if (!$(this).closest("li").find(".menu-sub").hasClass("open")) {

                $(this).parent().find(".menu-sub").fadeIn();

                $(this).parent().find(".menu-sub").addClass("open");

            }

            $(this).parent().siblings().removeClass("open");

            $(this).parent().siblings().find(".menu-sub").fadeOut();

            $(this).parent().siblings().find(".menu-sub").removeClass("open");

            return false;

            //e.stopPropagation();

        }).on("blur", function (e) {

            //console.log("blur:  " + document.activeElement.localName);

            //$(this).parent().removeClass("open");

            //$(this).parent().find(".menu-sub").fadeOut();

            //$(this).parent().find(".menu-sub").removeClass("open");

            //e.stopPropagation();

            return false;

        });





        //$(".menu-sub a").on("blur", function (e) {

        //	console.log("blur:  " + document.activeElement.localName);

        //	$(this).closest("li").removeClass("open");

        //	$(this).parent().parent().fadeOut();

        //	$(this).parent().parent().removeClass("open");

        //	e.stopPropagation();

        //	return false;

        //});

        $("#header2 ul.menu li.has-sub").keydown(function (e) {

            //console.log(e.keyCode +":keydown");

            //if (e.keyCode != 9) {

            if (!$(this).hasClass("open")) {

                $(this).addClass("open");

                if (!$(this).parent().find(".menu-sub").hasClass("open")) {

                    $(this).find(".menu-sub").fadeIn();

                    $(this).find(".menu-sub").addClass("open");

                }

            }

            //console.log($(this) , "siblings");

            $(this).siblings().removeClass("open");

            $(this).siblings().find(".menu-sub").fadeOut();

            $(this).siblings().find(".menu-sub").removeClass("open");



            //    return false;

            //}

            //e.stopPropagation();

        }).on("keyup", function (e) {

            //console.log(e.keyCode + ":keyup");

            //if (e.keyCode == 27 || e.keyCode == 9) {

            //e.preventDefault();

            //$(this).removeClass("open");

            //$(this).find(".menu-sub").fadeOut();

            //$(this).find(".menu-sub").removeClass("open");

            //return false;

            //}

            //else if (e.keyCode == 9) {

            //    return false;

            //}

        });





    }

    else {

        $("#header2 ul.menu li.has-sub").click(function () {

            if (!$(this).hasClass("open")) {

                $(this).addClass("open");

                $(this).find(".menu-sub").slideDown();

                $(this).find('i').removeClass("fa-angle-down");

                $(this).find('i').addClass("fa-angle-up");

            }

            else {

                $(this).removeClass("open");

                $(this).find(".menu-sub").slideUp();

                $(this).find('i').removeClass("fa-angle-up");

                $(this).find('i').addClass("fa-angle-down");

            }



        });

        $("#header2 ul.menu li.has-sub a").click(function () {

            if ($(this).attr("disabled") == "disabled") {

                if (!$(this).parent().hasClass("open")) {

                    $(this).parent().addClass("open");

                    $(this).parent().find(".menu-sub").slideDown();

                    $(this).next().removeClass("fa-angle-down");

                    $(this).next().addClass("fa-angle-up");

                }

                else {

                    $(this).parent().removeClass("open");

                    $(this).parent().find(".menu-sub").slideUp();

                    $(this).next().removeClass("fa-angle-up");

                    $(this).next().addClass("fa-angle-down");

                }

            }

        });



    }



    if (window.innerWidth <= 1024) {

        $(".skip-link.screen-reader-text").keyup(function (event) {

            if ($(this).attr("href") == "#menu") {

                if (event.keyCode != 9 && event.keyCode != 16) {

                    $(".menu-nav").focus();

                }

            }

        });

    }

    /**tablet open menu - header option 2**/

    $("#header2 .nav-menu-anim").click(function () {

        if (!$(this).hasClass("open")) {

            checkOpenShopBoxes();

            $(this).find("#nav-toggle").addClass("active");

            $(this).parent().find(".menu").slideDown();

            $(this).addClass("open");

            if ($("header").hasClass("search-open")) {

                $(".searchBtn").trigger('click');

                //$("#header2").removeClass("headerHasSearch");

            }



            $("#header2").addClass("open");

            if ($(window).width() > 550) {

                $(this).parent().find(".opened").css("display", "inline-block");

                $(this).parent().find(".closed").hide();

            }

            $("#header2 .languages").fadeIn();

            if ($(window).width() <= 991) {

                $(".MenuFadeIn li").each(function (i) {

                    $(this).parent().find(".MenuFadeIn").fadeIn(250);

                    $(this).parent().find(".MenuFadeIn").addClass("showMenu");

                    var listItem = $(this);

                    if (i == 0) {

                        setTimeout(function () { $(listItem).addClass("showItem"); }, 400);

                    }

                    else if (i == 1) {

                        setTimeout(function () { $(listItem).addClass("showItem"); }, 500);

                    }

                    else {

                        setTimeout(function () { $(listItem).addClass("showItem"); }, 100 * (i + 1));

                    }

                });

            }

        }

        else {

            if ($(window).width() <= 991) {

                $(".MenuFadeIn li").each(function (i) {

                    $(this).removeClass("showItem");

                });

            }

            $(this).find("#nav-toggle").removeClass("active");

            $(this).parent().find(".menu").slideUp();

            $(this).removeClass("open");

            $("#header2").removeClass("open");

            if ($(window).width() > 550) {

                $(this).parent().find(".opened").hide();

                $(this).parent().find(".closed").css("display", "inline-block");



            }

            $("#header2 .languages").fadeOut();

        }

        if (typeof afterNavMenuAnimClicked === 'function') {

            eval(afterNavMenuAnimClicked());

        }

    });

    $("#header2 .menu-nav").keyup(function (event) {

        if (event.keyCode != 9 && event.keyCode != 16) {

            if (!$(this).hasClass("open")) {

                if ($(window).width() <= 1024) {

                    $(this).find("#nav-toggle").addClass("active");

                    $(this).parent().find(".menu").slideDown();

                    $(this).addClass("open");

                }

                if ($("header").hasClass("search-open")) {

                    $(".searchBtn").trigger('click');

                    //$("#header2").removeClass("headerHasSearch");

                }



                $("#header2").addClass("open");

                if ($(window).width() > 550) {

                    $(this).parent().find(".opened").css("display", "inline-block");

                    $(this).parent().find(".closed").hide();

                }

                $("#header2 .languages").fadeIn();

                if ($(window).width() <= 991) {

                    $(".MenuFadeIn li").each(function (i) {

                        $(this).parent().find(".MenuFadeIn").fadeIn(250);

                        $(this).parent().find(".MenuFadeIn").addClass("showMenu");

                        var listItem = $(this);

                        if (i == 0) {

                            setTimeout(function () { $(listItem).addClass("showItem"); }, 400);

                        }

                        else if (i == 1) {

                            setTimeout(function () { $(listItem).addClass("showItem"); }, 500);

                        }

                        else {

                            setTimeout(function () { $(listItem).addClass("showItem"); }, 100 * (i + 1));

                        }

                    });

                }

            }

            else {

                if ($(window).width() <= 991) {

                    $(".MenuFadeIn li").each(function (i) {

                        $(this).removeClass("showItem");

                    });

                }

                $(this).find("#nav-toggle").removeClass("active");

                $(this).parent().find(".menu").slideUp();

                $(this).removeClass("open");

                $("#header2").removeClass("open");

                if ($(window).width() > 550) {

                    $(this).parent().find(".opened").hide();

                    $(this).parent().find(".closed").css("display", "inline-block");



                }

                $("#header2 .languages").fadeOut();

            }

        }

    });









    /**datepicker**/



    $(".normal-form input").each(function () {

        if ($(this).attr("data-datepicker") == "true") {

            $(this).datetimepicker({

                format: 'd MM yyyy',

                linkFormat: 'yyyy-mm-ddThh:ii:ssZ',

                weekStart: 1,

                language: 'en',

                todayBtn: 0,

                autoclose: 1,

                todayHighlight: 1,

                startView: 2,

                minView: 2,

                forceParse: 0,

                pickerPosition: "bottom-left"

            });

        }

    });





});









/**Find active tag on blog**/

$(".blog-tag").each(function () {

    var url = window.location.search;

    let params = new URLSearchParams(url);

    let tagID = params.get("TagID");

    //url = url.replace("?TagID=", "");

    var id = $(this).attr('id');

    if (id == tagID) {

        $(this).addClass("active");

        $(".blog-tags-group-" + id).addClass("active");

        var parentID = $(this).attr("data-parent-id");

        if (parentID != "") {

            $(".blog-tags-group-" + parentID).addClass("active");

            $("#" + parentID).addClass("active");

        }

    }

    else if (tagID != id && id == "0" && window.location.search.indexOf("TagID") < 0) {

        $(this).addClass("active");

    }

});







/**move up elements**/





function scrollElements(item) {

    var wH = $(window).height(),

        wS = $(window).scrollTop();

    var hT = $(item).offset().top + 100,

        hH = $(item).outerHeight()

    if (wS + wH > hT) {

        if (!$(item).hasClass('shown')) {

            $(item).find(".section-animation-item").each(function (index) {

                if (!$(this).hasClass("grid-box")) {

                    $(this).addClass("up");

                    $(this).addClass('shown');

                    $(item).addClass('shown');

                }



                else {

                    /**Fade in grid boxes one by one**/

                    $(this).addClass("opacity");

                }

            });

            fadeElements($(item).find(".section-animation-item.opacity"));

            $(item).find(".grid-ComplexGalleryItem").each(function (index) {

                var element = $(this);

                setTimeout(function () {

                    $(element).addClass('shown');

                    $(item).addClass('shown');

                }, 500);



            });



        }

    }

}



var sdegree = 0;



$(document).ready(function () {

    if ($(window).width() > 550) {

        $(".section-animation-list").each(function () {

            scrollElements($(this));

        });

    }

});



$(window).scroll(function () {

    var wH = $(window).height(),

        wS = $(this).scrollTop();



    if ($(window).width() > 550) {

        $(".section-animation-list").each(function () {

            scrollElements($(this));

        });

        if ($("#nav-toggle").hasClass("active")) {

            //$('#header .menu-nav').delay(1000).queue(function () {

            //    if (!$(this).hasClass("clickForScr")) {

            //        $(this).trigger('click');

            //        $('#header .menu-nav').clearQueue();

            //    }   

            //});

        }

        $(".grid-ComplexGalleryItem").each(function () {



        });



    }



    /**on scroll create header background + change size**/

    if (wS > 4 && $(window).width() > 550) {

        $("#header").addClass("bg");

        $("#header2.menuFixed").addClass("bg");

        $("header.shopHeader").addClass("bg");

        if (window.location.pathname != "/") {

            $("#header2.fixedMenu").addClass("internalPageBg");

            $("#header").addClass("internalPageBg");

        }



        $("#home-gallery .opacity-layer").css({

            "z-index": "4"

        });

        if ($("#header2").length > 0) {

            $("#header2").addClass("bg");

        }

    }

    else if (wS > 1 && $("header.shopHeader").length > 0 && $(window).width() < 550) {

        $("header.shopHeader").addClass("bg");

    }

    else if ($("#header2.fixedMenu").length > 0 && wS > 4) {

        if (window.location.pathname != "/") {

            $("#header2.fixedMenu").addClass("internalPageBg");

        }

    }

    else {

        /**on internal pages header doesnt change on scroll**/

        if (window.location.pathname == "/") {

            $("#header").removeClass("bg");

            if ($("#header2".length > 0)) {

                $("#header2").removeClass("bg");

            }

        }

        else {

            $("#header2.fixedMenu").removeClass("internalPageBg");

            $("#header").removeClass("internalPageBg");

        }

        $("#header2.menuFixed").removeClass("bg");

        $("header.shopHeader").removeClass("bg");

        $("#home-gallery .opacity-layer").css({

            "z-index": "0"

        });

    }

    if ($('.grid-boxes .section-animation-item').length > 0) {

        var hT = $('.grid-boxes .section-animation-item').first().offset().top,

            hH = $('.grid-boxes .section-animation-item').first().outerHeight()

    }





});



$(document).ready(function () {

    var wH = $(window).height(),

        wS = $(this).scrollTop();



    if (wS > 4 && $(window).width() > 550) {

        $("header.shopHeader").addClass("bg");

    }

    else if (wS > 1 && $("header.shopHeader").length > 0 && $(window).width() < 550) {

        $("header.shopHeader").addClass("bg");

    }

    else {

        $("header.shopHeader").removeClass("bg");

    }

});

$(document).ready(function () {

    $('.gallery-cubes-modal').on('shown.bs.modal', function (e) {

        $(".flex-prev").append("<span class='scr-reader-only' aria-label='עבור לתמונה הקודמת'>עבור לתמונה הקודמת</span>");

        $(".flex-next").append("<span class='scr-reader-only' aria-label='עבור לתמונה הבאה'>עבור לתמונה הבאה</span>");

    });

});







$(window).load(function () {



    $(".owl-carousel").each(function () {

        var owlStage = $(this).find(".owl-stage-outer");

        $(this).find(".owl-controls").insertBefore(owlStage);

    });

    $("#home-gallery").find("iframe").attr("tabindex", "-1");



    $(".flex-prev").append("<span class='scr-reader-only' aria-label='עבור לתמונה הקודמת'>עבור לתמונה הקודמת</span>");

    $(".flex-next").append("<span class='scr-reader-only' aria-label='עבור לתמונה הבאה'>עבור לתמונה הבאה</span>");



    $(".owl-prev").append("<span class='scr-reader-only' aria-label='עבור לתמונה הקודמת'>עבור לתמונה הקודמת</span>");

    $(".owl-next").append("<span class='scr-reader-only' aria-label='עבור לתמונה הבאה'>עבור לתמונה הבאה</span>");



    $(".owl-item").focus(function () {

        console.log("focused");

    });

    /**on EDGE - disabled buttons workareound**/

    $(".menu a").click(function () {

        if ($(this).attr("disabled") == "disabled") {

            return false;

        }

    });

    $("#home-gallery .flex-control-nav li a").attr("tabindex", "0");





    $("#home-gallery .flex-control-nav li a").each(function (index) {

        $(this).attr("aria-label", "עבור לתמונה מספר " + parseInt(index + 1));

    });



    $(".owl-carousel .owl-prev").attr("tabindex", "0");

    $(".owl-carousel .owl-next").attr("tabindex", "0");



    /**Fade in top picture**/

    //if (!$("#SiteGrid").hasClass("blog-grid")) {

    //    $("#GridTop").css("visibility", "visible").hide().fadeIn();

    //}      



    /**END Fade in top picture**/









    /**Check if blog**/

    if ($("#BlogModule").html() != "" && $("#BlogModule").length > 0) {

        if (isStatic) {

            $(".GridTop").addClass("blog");

        } else {

            $("#GridTop").addClass("blog");

        }

        

    }



    /**Fade in short grid elements - one by one**/

    if ($("#gridshort-view").html() != "" && $("#gridshort-view").length > 0) {

        $("#GridContent").addClass("short-grid");

        $("#gridshort-view").addClass("shown");

        fadeElements("#gridshort-view.shown > div");

    }

    /**Fade in lobbyview elements - one by one**/

    if ($("#lobbyview").html() != "" && $("#lobbyview").length > 0) {

        $("#lobbyview").addClass("shown");

        fadeElements("#LobbyModule .grid-box");

    }







    /**parallax sections**/

    if ($(".grid-image-section").length > 0) {

        $(".grid-image-section").each(function () {

            var currentIMG = $(this);

            var image_content_top_position = $(currentIMG).offset().top;

            var image_content_height = $(currentIMG).height();

            var image_height = $(currentIMG).find(".image-section-data img").height();

            if (isMobile && $(currentIMG).find(".image-section-data img.visible-xs").length) {

                image_height = $(currentIMG).find(".image-section-data img.visible-xs");

            }

            //var imageSrc = $('.slider-bg.stellar-bg').css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];



            $(window).scroll(function () {

                var scroll_position = $(window).scrollTop();

                var window_height = $(window).height();

                var parallax_start = ((window_height + scroll_position) - image_content_top_position);

                var parallax_end = (window_height + image_content_height);





                if (parallax_start > 0 && parallax_start < parallax_end) {

                    var scroll_ratio = (image_height - image_content_height) / (parallax_end);

                    $(currentIMG).find(".image-section-data img").css({ "margin-top": 0 - (parallax_start * scroll_ratio) * 0.9 });

                }



            });

        });

        //var image_content_top_position = $(".grid-image-section").offset().top;

        //var image_content_height = $(".grid-image-section").height();

        //var image_height = $(".image-section-data img").height();



        //var imageSrc = $('.slider-bg.stellar-bg').css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];



        //$(window).scroll(function () {

        //    var scroll_position = $(window).scrollTop();

        //    var window_height = $(window).height();

        //    var parallax_start = ((window_height + scroll_position) - image_content_top_position);

        //    var parallax_end = (window_height + image_content_height);





        //    if (parallax_start > 0 && parallax_start < parallax_end) {

        //        var scroll_ratio = (image_height - image_content_height) / (parallax_end);

        //        $(".image-section-data img").css({ "margin-top": 0 - (parallax_start * scroll_ratio) * 0.9 });

        //    }



        //});

    }







});



/**END parallax section**/









$(document).ready(function () {





    $("#home-gallery .flex-control-paging li a").focus(function () {

        $(this).trigger("click");

    });





    //var maxHeight = $('ul.slides').height();



    //$('.flexslider .slides img').each(function () {

    //    slideHeight = $(this).height();

    //    $(this).css('padding-top', (maxHeight - slideHeight) / 2);

    //});

    $(".owl-carousel .owl-item .item .slide-bg-layer").click(function () {

        $(".blueimp-gallery").attr("aria-hidden", "false");

    });

    $(".blueimp-gallery>.close").click(function () {

        $(".blueimp-gallery").attr("aria-hidden", "true");

        $(".gallery-cubes .image-link-container").attr("aria-hidden", "true");

    });





    if (window.innerWidth < 991 && window.innerWidth > 767) {

        if ($(".grid-box-image .hideUntilHover").length > 0) {

            $(".grid-box-image .hideUntilHover p").each(function () {

                var text = $(this).html();

                var shortText = "";

                var wordCount = text.split(" ");

                if (wordCount.length > 45) {

                    $(wordCount).each(function (index) {

                        if (index < 45) {

                            if (index == 44) {

                                shortText += wordCount[index] + "...";

                            }

                            else {

                                shortText += wordCount[index] + " ";

                            }

                        }

                    });

                    //console.log(shortText);              

                    $(this).html(shortText);



                }



            });

        }

    }









    if (window.innerWidth < 1171 && window.innerWidth > 767) {

        // Exit early if .grid-rows has the class no-cut

        if ($(".grid-rows").hasClass("no-cut")) return;



        $(".grid-rows .grid-row-text").each(function () {

            var text = "";

            var shortText = "";



            $(this).find("p").each(function () {

                text += $(this).html();

            });



            var wordCount = text.split(" ");



            if (wordCount.length > 28) {

                $(wordCount).each(function (index) {

                    if (index < 28) {

                        if (index === 27) {

                            shortText += wordCount[index] + "...";

                        } else {

                            shortText += wordCount[index] + " ";

                        }

                    }

                });



                $(this).find("p").each(function (index) {

                    $(this).html("");

                    if (index === 0) {

                        $(this).append(shortText);

                    }

                });

            }

        });

    }



    if (window.innerWidth < 1025 && window.innerWidth > 767) {

        //var boxHeight = $(".grid-row .grid-row-image-container").height();

        var boxHeight = $(".grid-row-section .grid-row-cell-text").height();



        $(".grid-row-section .box-image-animation img").css("height", boxHeight);

    }





    //if (window.innerWidth > 992) {

    //	$(".BlogArticleSummary").each(function () {

    //		var text = $(this).html();

    //		var shortText = "";

    //		var wordCount = text.split(" ");

    //		console.log(wordCount.length);

    //		if (wordCount.length > 60) {

    //			$(wordCount).each(function (index) {

    //				if (index < 60) {

    //					if (index == 59) {

    //						shortText += wordCount[index] + "...";

    //					}

    //					else {

    //						shortText += wordCount[index] + " ";

    //					}

    //				}

    //			});

    //			$(this).html(shortText);



    //		}

    //		//}

    //	});



    //}

    //else if (window.innerWidth > 767) {

    //	$(".BlogArticleSummary").each(function () {

    //		var text = $(this).html();

    //		var shortText = "";

    //		var wordCount = text.split(" ");

    //		console.log(wordCount.length);

    //		if (wordCount.length > 40) {

    //			$(wordCount).each(function (index) {

    //				if (index < 40) {

    //					if (index == 39) {

    //						shortText += wordCount[index] + "...";

    //					}

    //					else {

    //						shortText += wordCount[index] + " ";

    //					}

    //				}

    //			});

    //			$(this).html(shortText);



    //		}

    //		//}

    //	});



    //}



    /****LIMIT TEXT-Title IN NEW BLOG ARTICLES LAYOUT***/

    var limitTextTitleInBLog = 50;

    if ($(".BlogArticleContent").length > 0) {

        if (window.innerWidth < 992) {

            limitTextTitleInBLog = 12;

        }

        $(".BlogArticleContent").each(function () {

            var text = "";

            var shortText = "";

            $(this).find(".BlogArticleTitle").each(function () {

                text += $(this).html();

            });

            //console.log(text);

            var wordCount = text.split(" ");

            //console.log(wordCount.length);

            if (wordCount.length > limitTextTitleInBLog) {

                console.log("wordCount.length: " + wordCount + "limitTextTitleInBLog: " + limitTextTitleInBLog);

                $(wordCount).each(function (index) {

                    if (index < limitTextTitleInBLog) {

                        if (index == (limitTextTitleInBLog - 1)) {

                            shortText += wordCount[index] + "...";

                        }

                        else {

                            shortText += wordCount[index] + " ";

                        }

                    }

                });

                //console.log(shortText);

                $(this).find(".BlogArticleTitle").each(function (index) {

                    $(this).html("");

                    if (index == 0) {

                        $(this).append(shortText);

                    }

                });

            }



        });

    }



    /****LIMIT TEXT IN NEW BLOG ARTICLES LAYOUT***/

    var limitTextInBLog = 50;

    if ($(".BlogArticleContent").length > 0) {

        if (window.innerWidth < 992) {

            limitTextInBLog = 40;

        }

        $(".BlogArticleContent").each(function () {

            var text = "";

            var shortText = "";

            if (!$(this).find(".BlogArticleSummary").hasClass("noLimitText")) {

                $(this).find(".BlogArticleSummary").each(function () {

                    text += $(this).html();

                });

                //console.log(text);

                var wordCount = text.split(" ");

                //console.log(wordCount.length);

                if (wordCount.length > limitTextInBLog) {

                    $(wordCount).each(function (index) {

                        if (index < limitTextInBLog) {

                            if (index == (limitTextInBLog - 1)) {

                                shortText += wordCount[index] + "...";

                            }

                            else {

                                shortText += wordCount[index] + " ";

                            }

                        }

                    });

                    //console.log(shortText);

                    $(this).find(".BlogArticleSummary").each(function (index) {

                        $(this).html("");

                        if (index == 0) {

                            $(this).append(shortText);

                        }

                    });

                }

            }

        });

    }





});







$(document).ready(function () {

    if (window.innerWidth < 768) {

        if ($(".mobile-strip").length > 0) {

            //$(".mobile-strip select").change(function (e) {

            //    var optionSelected = $("option:selected", this);

            //    var href = optionSelected.attr("data-href");

            //    //console.log(window.location);

            //    window.location.replace(href);                

            //});

            $(".mobile-strip").click(function () {

                //$(".mobile-strip .select-wrapper").slideToggle();

                $(this).find(".select-wrapper").slideToggle();

            });

        }

    }

    //$("#home-gallery ol.flex-control-nav.flex-control-paging li").each(function () {

    //    $(this).attr("tabindex", "1");

    //});

    $(".bootstrap-datetimepicker-widget > ul.list-unstyled .datepicker .datepicker-days .table-condensed thead tr").attr("tabindex", "0");











});





// convet canvas into file

$(document).ready(function () {

    if ($('.js-signature').length > 0) {

        if ($(window).width() > 767) {

            $('.js-signature').jqSignature();

        }

        else {

            $('.js-signature').jqSignature({ width: 220 });

        }

        $('.js-signature').on('jq.signature.changed', function () {

            $("#signature-error").hide();

        });

    }

})







$('.js-signature').on('jq.signature.changed', function () {

    var elemName = $(this).attr("data-id");

    $(".fileUploaderSignature-error[for='fileUploader-" + elemName.replace('name-', '') + "']").hide();

    var canvas = $(this).find("canvas")[0];

    var tempSignature = dataURItoBlob(canvas.toDataURL());

    var signature = new File([tempSignature], "Signature" + elemName.replace('name-', '') + ".png", { type: "image/png", lastModified: new Date().getTime() });

    var container = new DataTransfer();

    container.items.add(signature);

    $("#" + elemName).find("input.fileUploaderSignature")[0].files = container.files;

});



function clearCanvas(FormUniqueID, SignatureField) {

    $("#dynamic-form-" + FormUniqueID + " .js-signature-" + SignatureField).jqSignature('clearCanvas');

    $("#dynamic-form-" + FormUniqueID + " .fileUploaderSignature-" + SignatureField).val('');

}



//function isCanvasBlank(canvas) {

//    const context = canvas.getContext('2d');

//    const pixelBuffer = new Uint32Array(

//        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer

//    );



//    return !pixelBuffer.some(color => color !== 0);

//}



function dataURItoBlob(dataURI) {

    // convert base64/URLEncoded data component to raw binary data held in a string

    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0)

        byteString = atob(dataURI.split(',')[1]);

    else

        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array

    var ia = new Uint8Array(byteString.length);

    for (var i = 0; i < byteString.length; i++) {

        ia[i] = byteString.charCodeAt(i);

    }

    return new Blob([ia], { type: mimeString });

}



/**SET SLIDER HEIGHT ON TABLET & MOBILE DEVICES**/



/**Check For ANDROID - fix height of slider on mobile**/

var ua = navigator.userAgent.toLowerCase();

var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

var url = window.location.href;





var viewportHeight = $(window).height();

$(document).ready(function () {

    setHeight();

});

function setHeight() {

    var HEIGHT_CHANGE_TOLERANCE = 100; // Approximately URL bar height in Chrome on tablet



    $(window).resize(function () {

        if (Math.abs(viewportHeight - $(window).height()) > HEIGHT_CHANGE_TOLERANCE) {

            viewportHeight = $(window).height();

            update();

        }

    });



    function update() {

        if ($(".slider-bg.stellar-bg").length > 0) {

            if (isAndroid) {

                $('#home-gallery .slider-bg.stellar-bg').css('height', (viewportHeight) + 'px');

                $('#home-gallery').css('height', (viewportHeight) + 'px');

            }

            else {

                $('#home-gallery .slider-bg.stellar-bg').css('height', (viewportHeight) + 'px');

                $('#home-gallery').css('height', (viewportHeight) + 'px');

            }

        }

        if ($(".TopVideo").length > 0) {

            if (isAndroid) {

                $('#home-gallery').css('height', (viewportHeight) + 'px');

                $('.TopVideo').css('height', (viewportHeight) + 'px');

                $('#home-gallery video').css('height', (viewportHeight * 1.3) + 'px');

            }

            else {

                $('#home-gallery').css('height', (viewportHeight) + 'px');

                $('.TopVideo').css('height', (viewportHeight) + 'px');

                $('#home-gallery video').css('height', (viewportHeight * 1.3) + 'px');

            }

        }

    }

    update();

}



function reBuildVideoSrc(VideoSrc) {

    var newSrc = "";

    if (VideoSrc.indexOf("?") > -1) {

        newSrc = VideoSrc + "&autoplay=1&muted=1";

        if (newSrc.includes("youtube")) {

            newSrc = VideoSrc + "&autoplay=1&mute=1";

        }

    }

    else {

        newSrc = VideoSrc + "?autoplay=1&muted=1";

        if (newSrc.includes("youtube")) {

            newSrc = VideoSrc + "?autoplay=1&mute=1";

        }

    }

    return newSrc; 



}

function openItemVideo(VideoSrc) {

    $('#video-content-modal').addClass("videoInPop");

    var newSrc = reBuildVideoSrc(VideoSrc);

    $('#video-content-modal #PopUpData iframe').attr("src", newSrc);

    $("#video-content-modal").modal('show');

}

$('#video-content-modal').on('hidden.bs.modal', function (e) {

    $(this).find("#PopUpData iframe").attr("src", "");

});



function openItemVideoInsideImg(VideoSrc, ImgID) {

    var newSrc = reBuildVideoSrc(VideoSrc);

    $("#videoInsideImg-" + ImgID).addClass("active");

    $("#videoInsideImg-" + ImgID + " iframe").attr("src", newSrc);

    $("#videoInsideImg-" + ImgID).find(".close").focus();

}



$(".videoInsideImg .close").click(function () {

    closeVideoInsideImg();

})



function closeVideoInsideImg() {

    console.log("closeVideoInsideImg");

    $(".videoInsideImg").removeClass("active");

    $(".videoInsideImg iframe").attr("src", "");

}



function openVideoPop(content) {

    $('#multi-content-modal #PopUpData').html(content);

    $('#multi-content-modal').addClass("contentInPopUp videoInPop");

    var src = $('#multi-content-modal #PopUpData iframe').attr("src");

    console.log(src);

    // content without an iframe src: skip the autoplay rewrite but still open the popup (src.indexOf used to throw before modal('show'))

    if (src) {

        var newSrc = "";

        if (src.indexOf("?") > -1) {

            newSrc = src + "&autoplay=1";

        }

        else {

            newSrc = src + "?autoplay=1";

        }

        $('#multi-content-modal #PopUpData iframe').attr("src", newSrc);

    }

    $("#multi-content-modal").modal('show');

}



function openTextPop(content, itemID) {

  

    $('#multi-content-modal #PopUpData').html(content);

    $('#multi-content-modal').addClass("contentInPopUp textInPop");

    $("#multi-content-modal").modal('show');

    if (itemID != undefined && itemID != null) {

        $('#multi-content-modal.textInPop').attr("data-id", itemID);

    }

}



$('#multi-content-modal').on('hidden.bs.modal', function (e) {

    $(this).find("#PopUpData").html("");

});







$(document).ready(function () {



    $(".owl-carousel .owl-item .item").focus(function () {

        var active = $(this).parent().hasClass("active");

        if (!active) {

            var element = $(this);

            var index1 = $(this).closest('.owl-carousel').find(".owl-item .item").index(element);

            var imgsrc = $(element).find("img").attr("src");

            //var count = $(".owl-carousel .owl-item:not(.cloned) .item").length;

            //if (index1 > count) {

            //    index1 -= count;

            //}

            //if (index1 <= 0) {

            //    index1 += count;

            //}           

            //var index2 = $(element).normalize(index1, true) - Math.ceil(count / 2);

            console.log("index1:" + index1);

            var owl = $(this).closest('.owl-carousel');

            $(this).closest('.owl-carousel').find(".owl-item:not(.cloned)").each(function (index) {

                var current = $(this);

                if ($(current).find(".topImg img").attr('src') == imgsrc) {

                    $(owl).trigger('to.owl.carousel', [index1, 500, true]);

                    $(current).closest('.owl-carousel').find(".owl-item .item").removeClass("focused");

                    $(current).find(".item").addClass("focused");

                }

                //if (index1 == index) {

                //    $(owl).trigger('to.owl.carousel', [index1, 500, true]);

                //    $(this).closest('.owl-carousel').find(".owl-item .item").removeClass("focused");

                //    $(current).find(".item").addClass("focused");

                //    //$(current).find(".item").css("outline", "-webkit-focus-ring-color auto 5px;");

                //    return false;

                //}

            });

        }

    });



    if (window.innerWidth > 991) {



        $("#header.fullScreenMenu .submenu li.has-sub>a").focus(function () {

            $(this).parent().addClass("sub-open");

        });

        //$(".searchSubmitWrapper").click(function () {

        //	$("form#searchFormHeader").submit();

        //})

    }

    //   $("#searchFormHeader").submit(function () {

    //       if (window.location.search.indexOf("test") > -1) {

    //           alert("test");

    //       }

    //       var inputValue = $(this).find("input[name=q]").val();

    //       console.log("reached search form");

    //       if (inputValue != "") {

    //           if (inputValue.indexOf("'") > -1) {

    //               //$(this).find("input[name=q]").val(inputValue.replace("'", "%27"));

    //               $(this).find("input[name=q]").val(encodeURI(inputValue));

    //           }

    //		$(this).find(".error").hide();

    //		return true;

    //	}

    //	else {

    //		$(this).find(".error").show();

    //		return false;

    //	}

    //});

    //var forms = document.getElementById('searchFormHeader');

    $('#searchFormHeader').submit(function (event) {

        event.preventDefault();

        console.log("testtttt");

        var inputValue = $(this).find("input[name=q]").val();

        if (inputValue != "") {

            //inputValue = encodeURIComponent(inputValue);

            inputValue = inputValue.replace("׳", "%27");

            //$(this).find("input[name=q]").val(inputValue);

            //inputValue.replace("'", "%27")

            $(this).find(".error").hide();

            //return true;

        }

        else {

            $(this).find(".error").show();

            return false;

        }

        window.location = window.location.origin + "/Search/?q=" + inputValue;

        //window.open(window.location.origin + "/Search/?q=" + inputValue);

    });



    $('#searchFormCategory').submit(function (event) {

        event.preventDefault();

        var inputValue = $(this).find("input[name=q]").val();

        var Category = $(this).find("input[name=category]").val();

        var BoxMode = $(this).find("input[name=BoxMode]").val();

        //var SearchCatalog = $(this).find("input[name=SearchCatalog]").val();

        if (inputValue != "") {

            inputValue = inputValue.replace("׳", "%27");

            $(this).find(".error").hide();



        }

        else {

            $(this).find(".error").show();

            return false;

        }



        window.location = window.location.origin + "/SearchCategory/?q=" + inputValue + "&Category=" + Category + "&BoxMode=" + BoxMode;

        //window.location = window.location.origin + "/SearchCategory/?q=" + inputValue + "&Category=" + Category + "&BoxMode=" + BoxMode + "&SearchCatalog=" + SearchCatalog;



    });

});



//function testSearch() {

//    //alert($("#searchFormInput").val().replace("'", "%27"));

//    //alert($("#searchFormInput").val().replace("‘’'", "%27") + "--test2");



//    var valueAfterReplace = $("#searchFormInput").val().replace("׳", "%27").replace(/[\u2018\u2019\u201C\u201D]/g, "%27").replace("ל", "n").replace("”", '%27').replace("“", '%27').replace("’", "%27").replace("‘", "%27").replace(/[\u2018\u2019]/g, "%27").replace(/[\u201C\u201D]/g, '%27').replace(/[\u2013\u2014]/g, '%27').replace(/[\u2026]/g, '%27');

//    alert(valueAfterReplace + "--test8");

//}





function submitSearch() {

    $('#searchFormInput').val(encodeURIComponent($('#searchFormInput').val()));

    //if (window.location.search.indexOf("test") > -1) {

    //    alert("test");

    //}

    //console.log("reached search form");

    //var inputValue = $(inputElement).closest("#searchFormHeader").find("input[name=q]").val();

    //if (inputValue != "") {

    //    if (inputValue.indexOf("'") > -1) {

    //        //alert("'");

    //        $(inputElement).closest("#searchFormHeader").find("input[name=q]").val(inputValue.replace("'", "%27"));

    //        //$(inputElement).closest("#searchFormHeader").find("input[name=q]").val(encodeURIComponent(inputValue));

    //    }

    //    $(inputElement).closest("#searchFormHeader").find(".error").hide();

    //    $(inputElement).closest("#searchFormHeader").submit();

    //    return true;

    //}

    //else {

    //    $(inputElement).closest("#searchFormHeader").find(".error").show();

    //    return false;

    //}

}







function checkOpenShopBoxes() {

    closeCart();

    closeUserInfo();

    //if ($(".headerShopLoginUserLoggedIn").hasClass("openBox")) {

    //    $(".headerShopLoginUserLoggedIn").removeClass("openBox");

    //}

    //if ($(".headerShopLogin").hasClass("active")) {

    //    $(".headerShopLogin").removeClass("active");

    //}

}

function openSearch() {

    var headerHeight = $("#header2").outerHeight();

    checkOpenShopBoxes();

    $("#searchFormHeader").toggle();

    $(".searchBtn .close-search").toggle();

    $(".search-btn-svg").toggle();

    $(".search.desktop").toggle();





    if ($("#header2").hasClass('hasAutoComplete') && $("header").hasClass('search-open')) {

        $('.hasAutoComplete #quick-search-container').hide()

    }

    $("header").toggleClass("search-open");

    var formHeight = $("header #searchFormHeader").outerHeight();

    //$("#header2").css("height", headerHeight);

    $("header #searchFormHeader").css("bottom", (-1) * formHeight);

    setTimeout(function () {

        $("#searchFormHeader").toggleClass("active");

    }, 150);

    $(".search-open form#searchFormHeader input#searchFormInput").focus();

}



function openSearchDesktop() {

    if ($("#header2").length > 0) {

        var headerHeight = $("#header2").outerHeight();

        var searchHeight = $("#header2").height();

    }

    else {

        var headerHeight = $("#header").outerHeight();

        var searchHeight = $("#header").height();

    }

    if ($("#header-top-strip").length > 0) {

        searchHeight = searchHeight - $("#header-top-strip").outerHeight();

    }

    checkOpenShopBoxes();



    $("#header2").css("height", headerHeight);

    $(".search.desktop").css("height", searchHeight);

    $(".search.desktop").toggle();

    if (!$("#header2").hasClass('hasAutoComplete')) {

        $("#header2 #header-container").toggle();

    } else if ($("header").hasClass('search-open')) {

        $('.hasAutoComplete #quick-search-container').hide()

    }

    $("#searchFormHeader").toggle();

    $(".searchBtn .close-search").toggle();

    $(".search-btn-svg").toggle();

    $("header").toggleClass("search-open");

    var hasBG = $("header").find("#header").hasClass("bg");

    if ($("header").hasClass("search-open") && !hasBG) {

        $("header").find("#header").addClass("bg");

        $("header").find("#header").addClass("searchBg");

    }

    else if ($("header").find("#header").hasClass("searchBg")) {

        $("header").find("#header").removeClass("bg");

        $("header").find("#header").removeClass("searchBg");

    }

    setTimeout(function () {

        $("#searchFormHeader").toggleClass("active");

    }, 150);



    $(".search-open form#searchFormHeader input#searchFormInput").focus();

}

//function changeItemQuantity(id, newQuantity) {



//}





function QuantityPropertyPlus(propertyID, propertyGroupID) {

    var step = 1;

    var q = 1;

    var element = $(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input");

    q = parseInt($(element).val());

    step = parseInt($(element).attr("step"));

    q = q + step;

    var max = $("#propertyGroupContainer_" + propertyGroupID).attr("data-max");

    var allSelectedPropertiesCount = $("input[name=propertyGroup_" + propertyGroupID + "]").attr("data-val");

    var currentValues = JSON.parse($("input[name=propertyGroup_" + propertyGroupID + "]").val());

    var newValuesList = {};





    if (parseInt(max) >= parseInt(allSelectedPropertiesCount) + step) {

        $(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input").val(q);

        var quantityVal = parseInt($(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input").attr("data-val")) + 1;

        $(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input").attr("data-val", quantityVal);

        $("input[name=propertyGroup_" + propertyGroupID + "]").attr("data-val", parseInt(allSelectedPropertiesCount) + step);

        //newValuesList[propertyID] = q;

        $(".propertyQuantityContainer").each(function () {

            var inputValue = $(this).find("input").val();

            var pID = $(this).find("input").attr("data-id");

            newValuesList[pID] = inputValue;

        });

        var newValuesListData = JSON.stringify(newValuesList);

        $("input[name=propertyGroup_" + propertyGroupID + "]").val(newValuesListData);

        calculatePropertiesQuantityPrice();

    }



}

function QuantityPropertyMinus(propertyID, propertyGroupID) {

    var step = 1;

    var q = 1;

    var element;

    var element = $(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input");

    q = parseInt($(element).val());

    step = parseInt($(element).attr("step"));

    var min = $("#propertyGroupContainer_" + propertyGroupID).attr("data-min");

    var allSelectedPropertiesCount = $("input[name=propertyGroup_" + propertyGroupID + "]").attr("data-val");

    var newValuesList = {};

    if (q > 0) {

        //if (parseInt(allSelectedPropertiesCount) > parseInt(min)) {

        $(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input").val(q - step);

        var quantityVal = parseInt($(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input").attr("data-val")) - 1;

        $(".itemContent .property-quantity .propertyQuantityContainer#property" + propertyID + "_Quantity input").attr("data-val", quantityVal);

        q = q - step;

        //changeQuantity(id, quantityVal);

        $("input[name=propertyGroup_" + propertyGroupID + "]").attr("data-val", parseInt(allSelectedPropertiesCount) - step);

        $(".propertyQuantityContainer").each(function () {

            var inputValue = $(this).find("input").val();

            var pID = $(this).find("input").attr("data-id");

            newValuesList[pID] = inputValue;

        });

        var newValuesListData = JSON.stringify(newValuesList);

        $("input[name=propertyGroup_" + propertyGroupID + "]").val(newValuesListData);

        calculatePropertiesQuantityPrice();

        //}

    }

}



function calculatePropertiesQuantityPrice() {

    var extraPrice = 0;

    var currentPrice = $("#CatalogItemView .itemContent").find(".finalPrice").attr("data-price");

    if (currentPrice != undefined)

        currentPrice = currentPrice.replace(",", "");

    var decimals = $("#CatalogItemView .itemContent").find(".finalPrice").attr("data-decimals");

    var discountPercent = $("#CatalogItemView .itemContent .item-price").attr("data-discount-percent");

    var discountMultiply = 1;

    var currentDiscountPrice = $("#CatalogItemView .itemContent").find(".itemBeforeDiscountPrice.hasDiscount").length > 0 ? $("#CatalogItemView .itemContent").find(".itemBeforeDiscountPrice.hasDiscount").attr("data-price") :0;

   

    $("#CatalogModule .property-quantity .propertyQuantityContainer input[type='number']").each(function () {

        var value = $(this).val();

        extraPrice = extraPrice + parseInt($(this).attr("data-price") * parseInt(value));

    });

    if (currentPrice != undefined && currentPrice.indexOf(".") > -1) {       

        if (extraPrice != undefined) { 

            if (currentDiscountPrice != 0) {

                $("#CatalogItemView .itemContent").find(".itemBeforeDiscountPrice.hasDiscount").html(parseFloat(parseFloat(currentDiscountPrice) + parseFloat(extraPrice)).toFixed(parseInt(decimals)));

            }

            if (discountPercent != undefined && discountPercent != "" && parseFloat(discountPercent) > 0) {

                extraPrice = extraPrice * (1 - discountPercent / 100);

            }

            var totalPrice = parseFloat(parseFloat(currentPrice) + parseFloat(extraPrice)).toFixed(parseInt(decimals));

            $("#CatalogItemView .itemContent").find(".finalPrice").html(totalPrice);

            if ($(".fixedAddToCartStrip").length > 0) {

                $("#CatalogItemView .fixedAddToCartStrip").find(".finalPrice").html(totalPrice);

                if (totalPrice > 0) {

                    $("#CatalogItemView .fixedAddToCartStrip").find(".item-price").show();

                }

                else {

                    $("#CatalogItemView .fixedAddToCartStrip").find(".item-price").hide();

                }



            }

        }



    }

    else {

        if (extraPrice != undefined) {

            if (currentDiscountPrice != 0) {

                $("#CatalogItemView .itemContent").find(".itemBeforeDiscountPrice.hasDiscount").html(parseFloat(parseFloat(currentDiscountPrice) + parseFloat(extraPrice)));

            }

            if (discountPercent != undefined && discountPercent != "" && parseFloat(discountPercent) > 0) {

                extraPrice = extraPrice * (1 - discountPercent / 100);     

            }            

            var totalPrice = parseFloat(parseFloat(currentPrice) + parseFloat(extraPrice));

            $("#CatalogItemView .itemContent").find(".finalPrice").html(totalPrice);

            if ($(".fixedAddToCartStrip").length > 0) {

                $("#CatalogItemView .fixedAddToCartStrip").find(".finalPrice").html(totalPrice);

                if (totalPrice > 0) {

                    $("#CatalogItemView .fixedAddToCartStrip").find(".item-price").show();

                }

                else {

                    $("#CatalogItemView .fixedAddToCartStrip").find(".item-price").hide();

                }

            }

        }

    }



}







function QuantityMinusInHeader(id) {

    var step = 1;

    var q = 1;

    var element;

    element = $(".cartItemsTable.hasQuantitySelection .cartItem[data-cartitem=" + id + "] .item-quantity input");

    q = parseFloat($(element).val());

    step = parseFloat($(element).attr("step"));



    var isWeight = $(element).closest(".item-quantity.quantity-wrapper").attr("data-weight") == "True";

    var isWeightCalc = $(element).closest(".item-quantity.quantity-wrapper").attr("data-weightCalc") == "True";

    if (!isWeight && isWeightCalc) {

        step = 1;

    }



    var minVal = parseFloat($(element).parent().attr("data-min"));

    //if ($(element).attr("step").indexOf(".") > -1) {

    //    minVal = parseFloat($(element).attr("step")) * minVal;

    //}

    if (q > -1 && q > parseFloat(minVal)) {

        $("#cartItem_" + id).addClass("LockItem");

        $(".cartItemsTable.hasQuantitySelection div[data-cartitem='" + id + "']").addClass("LockItem");



        if ($(element).val().indexOf(".") > -1 || $(element).attr("step").indexOf(".") > -1) {

            q = parseFloat(q - step).toFixed(1);

        }

        else {

            q = parseInt(q - step);

        }



        $(element).val(q);

        var quantityVal = parseFloat($(element).attr("data-val")) - 1;

        $(element).attr("data-val", quantityVal);



        changeQuantity(id, quantityVal, element);

        var catalogItemID = $(".cartItemsTable.hasQuantitySelection .cartItem[data-cartitem=" + id + "]").attr("data-catalogitem");

        $(".item-quantity.catalogItemBoxQuantity.quantityConnectedToCart[data-item=" + catalogItemID + "] .item-quantity-options input").val(quantityVal * step);

        $(".item-quantity.catalogItemBoxQuantity.quantityConnectedToCart[data-item=" + catalogItemID + "] .item-quantity-options input").attr("data-val", quantityVal);



    }

    setTimeout(function () {

        $("#cartItem_" + id).removeClass("LockItem");

        $(".cartItemsTable.hasQuantitySelection div[data-cartitem='" + id + "']").removeClass("LockItem");

    }, 2000);

}

function QuantityPlusInHeader(id, max, button) {

    console.log("D")

    $("#cartItem_" + id).addClass("LockItem");

    $(".cartItemsTable.hasQuantitySelection div[data-cartitem='" + id + "']").addClass("LockItem");



    var step = 1;

    var q = 1;

    var element;



    element = $(".cartItemsTable.hasQuantitySelection .cartItem[data-cartitem=" + id + "] .item-quantity input");

    q = parseFloat($(element).val());

    step = parseFloat($(element).attr("step"));



    var isWeight = $(element).closest(".item-quantity.quantity-wrapper").attr("data-weight") == "True";

    var isWeightCalc = $(element).closest(".item-quantity.quantity-wrapper").attr("data-weightCalc") == "True";

    if (!isWeight && isWeightCalc) {

        step = 1;

    }



    q = q + step;



    if (max != "0" && max != undefined) {

        if (parseFloat(max) < parseFloat($(element).attr("data-val")) + 1) {

            console.log("limit");

            $(button).parent().find(".quantityLimitError").addClass("active");

            //$(".item-quantity.catalogItemBoxQuantity[data-item='" + id + "']").find(".AddToCartMsg").removeClass("active");

            setTimeout(function () {

                $(button).parent().find(".quantityLimitError").removeClass("active");

                $("#cartItem_" + id).removeClass("LockItem");

                $(".cartItemsTable.hasQuantitySelection div[data-cartitem='" + id + "']").removeClass("LockItem");

            }, 2000);



            return false;

        }

        else {

            $(button).parent().find(".quantityLimitError").removeClass("active");

        }

    }



    $(element).val(q);

    var quantityVal = parseFloat($(element).attr("data-val")) + 1;

    $(element).attr("data-val", quantityVal);

    var catalogItemID = $(".cartItemsTable.hasQuantitySelection .cartItem[data-cartitem=" + id + "]").attr("data-catalogitem");

    $(".item-quantity.catalogItemBoxQuantity.quantityConnectedToCart[data-item=" + catalogItemID + "] .item-quantity-options input").val(quantityVal * step);

    $(".item-quantity.catalogItemBoxQuantity.quantityConnectedToCart[data-item=" + catalogItemID + "] .item-quantity-options input").attr("data-val", quantityVal);

    changeQuantity(id, quantityVal, element);



    setTimeout(function () {

        $("#cartItem_" + id).removeClass("LockItem");

        $(".cartItemsTable.hasQuantitySelection div[data-cartitem='" + id + "']").removeClass("LockItem");

    }, 2000);

} 





$(document).ready(function () {

    if (window.innerWidth > 991 && $('.cartSubTotal').length > 0) {

        var footerHeight = $('#SiteFooter').outerHeight() + $('footer').outerHeight() - 100;

        $('.cartSubTotal').affix({

            offset: {

                top: $('.cartSubTotal').offset().top,

                bottom: $('#GridBottom').outerHeight() > 0 ? footerHeight + $('#GridBottom').outerHeight() : footerHeight

            }

        });

    }

});



//$(window).scroll(function () {

//    if ($('.cartSubTotal').length > 0) {

//        if ($('.cartSubTotal').hasClass("affix")) {

//            $('.cartSubTotal.affix').css("top", headerHeight);

//        }      

//    }

//});



function forgotPassword() {

    $("#forgot-password-modal").modal('show');

}

function openCart() {    

    ViewCartDataLayer();

    if (window.location.href.indexOf("/0/Checkout") == -1) {

        closeUserInfo();

        if ($("header").hasClass("search-open")) {

            $(".searchBtn").trigger('click');

        }

        $(".headerShop").toggleClass("active");

        $(".headerShop:not(.side-cart)").css("top", $("#header-container").height());

        if ($(".headerShop").hasClass("active")) {

            $(".headerShop").focus();

        }

        if ($(".headerShop").hasClass("side-cart")) {

            $("#headerShopSideBG").toggleClass("active");

        }

        else {

            $("#SiteGridContainer").toggleClass("cart-active");

        }

    }

    else {

        window.location = "/0/Cart";

    }



}







function closeCart(e) {

    $(".headerShop").removeClass("active");

    $("#SiteGridContainer").removeClass("cart-active");

    if ($(".headerShop").hasClass("side-cart")) {

        $("#headerShopSideBG").removeClass("active");

    }

    else {

        $("#SiteGridContainer").removeClass("catalog-active");

    }

    //$("#openCartBtn").focus();

}

function closeCatalog() {

    $("#headerCatalogSideFilter, #headerCatalogSideFilterBG").toggleClass("active");

}



function closeUserInfo() {

    $(".headerShopLogin").removeClass("active");

    $(".headerShopLoginUserLoggedIn").removeClass("openBox");

    $("#SiteGridContainer").removeClass("profile-active");

    //$(".userBtn button").focus();

}



function closeCtalog() {

    $("%headerCatalogSideFilter").removeClass("active");

    $("#SiteGridContainer").removeClass("catalog-active");

}

var closeMenu;

function openCartForItemsAdded(selectedTimeOut) {



    closeUserInfo();

    if ($("header").hasClass("search-open")) {

        $(".searchBtn").trigger('click');

    }

    $(".headerShop").addClass("active");



    if ($(".headerShop").hasClass("side-cart")) {

        $("#headerShopSideBG").addClass("active");

    }

    else {

        $("#SiteGridContainer").addClass("cart-active");

    }

    var timeOut = 2500;

    if (selectedTimeOut != undefined && selectedTimeOut != null) {

        timeOut = selectedTimeOut;

    }

    if ($(".headerShop").hasClass("side-cart")) {

        timeOut = 4500;

    }

    closeMenu = setTimeout(function () {

        if ($('.cart:hover').length == 0) {

            $(".headerShop").removeClass("active");

            if ($(".headerShop").hasClass("side-cart")) {

                $("#headerShopSideBG").removeClass("active");

            }

            else {

                $("#SiteGridContainer").removeClass("cart-active");

            }

        }

        clearFunction();

    }, timeOut);

}



function clearFunction() {

    clearTimeout(closeMenu);

}













function openUserInfo() {

    closeCart();

    if ($("header").hasClass("search-open")) {

        $(".searchBtn").trigger('click');

    }

    if ($(".headerShopLogin").hasClass("userLoggedIn")) {

        $(".headerShopLoginUserLoggedIn:not(.mobile)").toggleClass("openBox");

        $("#SiteGridContainer").toggleClass("profile-active");

    }

    else {

        $(".headerShopLogin").toggleClass("active");

        $(".headerShopLogin").css("top", headerHeight);

        $("#SiteGridContainer").toggleClass("profile-active");

    }

}

function openUserInfoMobile() {

    closeCart();

    if ($("header").hasClass("search-open")) {

        $(".searchBtn").trigger('click');

    }

    if ($(".headerShopLogin").hasClass("userLoggedIn")) {

        $(".headerShopLoginUserLoggedIn.mobile").toggleClass("openBox");

        $("#SiteGridContainer").toggleClass("profile-active");

    }

    else {

        $(".headerShopLogin").toggleClass("active");

        $(".headerShopLogin").css("top", headerHeight);

        $("#SiteGridContainer").toggleClass("profile-active");

    }

}

function isElementPartiallyInViewport(el) {

    //special bonus for those using jQuery

    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];



    var rect = el.getBoundingClientRect();

    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }

    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);



    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap

    var vertInView = (rect.top <= windowHeight - 50) && ((rect.top + rect.height) >= 0);

    var horInView = (rect.left <= windowWidth - 50) && ((rect.left + rect.width) >= 0);



    return (vertInView && horInView);

}

$(window).scroll(function () {

    if ($(".mobile-subTotal").length > 0) {

        if ($(".cartSubTotal .totalSumItems .shopBtn.goToCheckout").css("display") != "none") {

            if (isElementPartiallyInViewport($(".cartSubTotal .totalSumItems .shopBtn.goToCheckout"))) {

                $(".mobile-subTotal").addClass("notFixed");

            }

            else {

                $(".mobile-subTotal").removeClass("notFixed");

            }

        }

        else {

            if (isElementPartiallyInViewport($(".cartSubTotal .totalSumItems.totalPrice"))) {

                $(".mobile-subTotal").addClass("notFixed");

            }

            else {

                $(".mobile-subTotal").removeClass("notFixed");

            }

        }

    }

});

$(document).ready(function () {



    $(document).keydown(function (e) {

        var elementClicked = e.keyCode;

        //console.log(elementClicked);

        //if (elementClicked == 27) {

        //    closeCart();

        //    closeUserInfo(); 

        //}

    });



    $('#shop-modal-minimum').on('hidden.bs.modal', function (e) {

        window.location = "/0/Cart";

    });

    $('#catalog-quickview-modal').on('show.bs.modal', function (e) {

        $(this).find(".modal-body").animate({ scrollTop: 0 }, "fast");

    });



    $("#SiteGridContainer").click(function (e) {

        var elementClicked = e.target.id;

        closeCart();



        closeUserInfo();

        if (elementClicked == "openCartBtn" || elementClicked == "openCartBtnMobile") {



        }

    });



    $("#headerCatalogSideFilterBG").click(function () {

        closeCatalog();

    });

    if ($(".headerShopLoginUserLoggedIn").length > 0) {

        if (window.innerWidth > 1024) {

            var elementHeight = $(".headerShopLoginUserLoggedIn").height();

            var headerHeight = $("#header-container").height();

            var userBtn = $(".userBtn.navShopBtn").height();

            var bottomPos = -1 * (elementHeight + userBtn - 4);

            $(".headerShopLoginUserLoggedIn").css("bottom", bottomPos);

        }

        else if (window.innerWidth > 767) {

            var elementHeight = $(".headerShopLoginUserLoggedIn.mobile").height();

            var headerHeight = $("#header-container").height();

            var userBtn = $(".userBtn.navShopBtn.mobile").height();

            var bottomPos = -1 * (elementHeight + userBtn - 4);

            $(".headerShopLoginUserLoggedIn.mobile").css("bottom", bottomPos);

        }



    }





    $('.blueimp-gallery').on('close', function (event) {

        var focusedElement = $(this).attr("data-focus");

        var owlID = $(this).attr("id").replace("blueimp-gallery-", "");

        $(".owl-carousel[data-id=" + owlID + "] .item[data-index=" + focusedElement + "] a").focus();

        //$(".owl-carousel[data-id=" + owlID + "]").trigger('to.owl.carousel', 3);        

    });

    //$(".owl-carousel .owl-item a.slide-bg-layer").focus(function () {

    //    if (!$(this).closest(".owl-item").hasClass("active")) {

    //        var owlCarousel = $(this).closest(".owl-carousel");



    //        console.log($(this).closest(".item").data('position'));

    //        $(owlCarousel).find(".owl-item").removeClass("focused");



    //        $(this).closest(".owl-item").addClass("focused");

    //        $(owlCarousel).trigger("to.owl.carousel", [parseInt($(this).closest(".item").data('position')), 200, true]);

    //    }

    //});



    $(document).on('focus', '.owl-item a', function (e) {

        var $owl = $(this).closest(".owl-carousel");

        //console.log("position:" + $(this).closest(".item").data('index'));        

        $owl.trigger('to.owl.carousel', [$(this).closest(".item").data('index'), 200, true]);

    });



    $('.owl-carousel').each(function () {

        var $owl = $(this);

        $owl.find(".owl-item .item").each(function (index) {

            $(this).attr('data-position', index);

        });

    });

    //$(document).on('focus', '.owl-item a.slide-bg-layer', function () {

    //    $owl.trigger('to.owl.carousel', $(this).data('position'));

    //});



    $(".owl-next").keydown(function (event) {

        if (event.keyCode == 13) {

            $(this).trigger("click");

        }

    });

    $(".owl-prev").keydown(function (event) {

        if (event.keyCode == 13) {

            $(this).trigger("click");

        }

    });

    $('.blueimp-gallery').on('open', function (event) {

        var focused = document.activeElement;

        var focused = $(focused).closest(".item").attr("data-index");

        $(this).attr("data-focus", focused);

        console.log(focused);

    });

    $(".blueimp-gallery>.prev").keydown(function (e) {

        if (e.keyCode == 13) {

            $(this).trigger('click');

        }

    });

    $(".blueimp-gallery>.next").keydown(function (e) {

        if (e.keyCode == 13) {

            $(this).trigger('click');

        }

    });

    $("#userPassword").keydown(function (e) {

        if (e.keyCode == 13) {

            $(this).closest("form").find(".shopBtn").trigger('click');

        }

    });

});



$(window).load(function () {

    if ($("#home-gallery .flex-control-nav").length > 0) {

        if ($(".iconsBoxLeft").length > 0) {

            $("#home-gallery .flex-control-nav").insertBefore(".iconsBoxLeft");

        }

        else if ($(".iconsBoxRight").length > 0) {

            $("#home-gallery .flex-control-nav").insertBefore(".iconsBoxRight");

        }

    }

});

$('.forgot-password-modal').on('hidden.bs.modal', function (e) {

    $("form#passwordRecovery").removeClass("success");

    $(".forgotPassTitle").show();

    $(".successLoginTitle").hide();

});





function startVideoOnScroll(grid) {

    var originalSrc = $(grid).find("iframe").attr("src");

    if (originalSrc!= undefined) {

        $(grid).find("iframe").attr("data-ogsource", originalSrc);

        var src = $(grid).find("iframe").attr("src").split('?')[0];

        if ($(grid).find("iframe").attr("data-playing") != "true") {

            if ($(grid).find("iframe").attr("src").indexOf("loop=0") >= 0) {

                var newSrc = src + "?autoplay=1&loop=0&byline=0&portrait=0&title=0&autopause=0";

                if (originalSrc.indexOf("vimeo") >= 0) {

                    newSrc += "&muted=1";

                }

                else {

                    newSrc += "&mute=1";

                }

                if ($(grid).find("iframe").attr("src").indexOf("controls=1") >= 0) {

                    newSrc += "&controls=1";

                }

                else {

                    newSrc += "&controls=0";

                }

            }

            else {

                var newSrc = src + "?autoplay=1&loop=1&byline=0&portrait=0&title=0&autopause=0";

                if (originalSrc.indexOf("playlist") >= 0) {

                    var playlistID = "";

                    var playlistSrc = originalSrc.split("playlist=")[1];

                    if (playlistSrc.indexOf("&") >= 0) {

                        playlistID = playlistSrc.split("&")[0];

                    } else {

                        playlistID = playlistSrc;

                    }

                    newSrc += "&playlist=" + playlistID;

                }

                if (originalSrc.indexOf("vimeo") >= 0) {

                    newSrc += "&muted=1";

                }

                else {

                    newSrc += "&mute=1";

                }

                if ($(grid).find("iframe").attr("src").indexOf("controls=1") >= 0) {

                    newSrc += "&controls=1";

                }

                else {

                    newSrc += "&controls=0";

                }

            }

        }





        $(grid).find("iframe").attr("src", newSrc);

        $(grid).find("iframe").attr("data-playing", "true");

    }

   



}

function stopVideoOnScroll(grid) {

    var originalSrc = $(grid).find("iframe").attr("data-ogsource");

    $(grid).find("iframe").attr("src", originalSrc);

    $(grid).find("iframe").attr("data-playing", "false");

}



/***HANDLING VIDEO GRIDS***/

$(document).ready(function () {

    $(".gridHasVideo").each(function () {

        if (isElementPartiallyInViewport($(this))) {

            startVideoOnScroll($(this));

        }

    });

    $(".gridHasVideoHvr").mouseenter(function () {

        startVideoOnScroll($(this));

    });

    $(".gridHasVideoHvr").mouseleave(function () {

        stopVideoOnScroll($(this));

    });

});



$(window).scroll(function () {

    $(".gridHasVideo").each(function () {

        if (isElementPartiallyInViewport($(this))) {

            startVideoOnScroll($(this));

        }

    });

});





function moveToCheckoutStages(stageID, viaBtn) {

    var StageNum = parseInt(stageID);

    var prevStage = StageNum - 1;

    if ($(".checkoutStage[data-stage=" + StageNum + "]").attr("data-ok") == "true" || viaBtn) {

        var HasErrors = false;



        if ($(".checkoutStage[data-stage=" + prevStage + "] .input-data").length > 0 || $(".checkoutStage[data-stage=" + (prevStage - 1) + "] .input-data").length > 0) {

            var validator = $("#checkout-form").validate();

            validator.form();

        }



        $(".checkoutStage[data-stage=" + prevStage + "] .error").each(function () {

            if ($(this).css("display") != "none" && $(this).parent().parent().parent().css("display") != "none") {

                HasErrors = true;

            }

        });

        $(".checkoutStage[data-stage=" + (prevStage - 1) + "] .error").each(function () {

            if ($(this).css("display") != "none" && $(this).parent().parent().parent().css("display") != "none") {

                HasErrors = true;

            }

        });

        if (stageID == 2) {

            var propertyGroupsCount = $(".propertyGroup").length;

            var propertyGroupsErrorsCount = 0;

            $(".propertyGroup").each(function () {

                var pID = $(this).attr("data-id");

                var GroupName = $(this).attr("name");

                var value = $("*[name=" + GroupName + "]:checked").val();

                if (value == undefined) {

                    var value = $("*[name=" + GroupName + "]").val();

                }



                if (($(this).attr("required") != undefined && ($(this).val() == null || $(this).val() == 0)) || (this.type == "radio" && $(this).attr("required") != undefined && value == null)) {

                    if (this.type == "radio") {

                        $(".propertyError[data-id=" + pID + "]").show();

                        var headerHeight = $("#header2").length > 0 ? $("#header2").outerHeight() : $("#header").outerHeight();

                        $('html,body').animate({ scrollTop: $(".propertyError[data-id=" + pID + "]").offset().top - (headerHeight + 30) }, 'slow');

                        propertyGroupsErrorsCount++;

                    }

                    else {

                        $(this).next().show();

                        propertyGroupsErrorsCount++;

                    }



                }

                else {

                    if (this.type == "radio") {

                        $(".propertyError[data-id=" + pID + "]").hide();

                    }

                    else {

                        if (this.type == "textarea") {

                            if ($("#propertyGroup_" + pID + "-error").css("display") == "block") {

                                $("#propertyGroup_" + pID + "-error").next().hide();

                            }

                            else {

                                $(this).next().hide();

                            }

                        }

                        else {

                            $(this).next().hide();

                            $(".propertyError[data-id=" + pID + "]").hide();

                        }

                    }

                }

            });

            if (propertyGroupsErrorsCount > 0) {

                HasErrors = true;

            }

        }



        if (!HasErrors || prevStage == 0) {

            $(".checkoutStage").removeClass("active");



            if (StageNum > 0) {

                $(".itemFirstDetails").addClass("shortLayout");

                $("#GridWrap").addClass("shortLayout");

                var slider1 = $(".flexslider.large").data('flexslider');



                if ($(".flexslider.large").length > 0) {

                    slider1.resize();

                }

                if (prevStage > 0) {

                    $(".checkoutStage[data-stage=" + prevStage + "]").attr("data-ok", "true");

                }

            }

            else {

                $(".itemFirstDetails").removeClass("shortLayout");

                $("#GridWrap").removeClass("shortLayout");

                var slider2 = $(".flexslider.large").data('flexslider');

                slider2.resize();

            }

            $("section.selectOptions.singleItemSection").addClass("active");



            $(".checkoutStage").each(function () {

                var Stage = $(this).attr("data-stage");

                var StageAllowed = $(this).attr("data-ok");

                if (Stage == stageID && (StageAllowed == "true" || viaBtn)) {

                    if (viaBtn) {

                        $(this).attr("data-ok", "true");

                    }

                    else if ($(".paymentDetails.checkoutStage").attr("data-ok") == "true") {

                        $(".paymentDetails.checkoutStage").attr("data-ok", "false");

                    }

                    $(this).addClass("active");

                }

            });

            if (StageNum == 2) {

                checkBeforeAddTocart(false);

                ///check if stage 2 and update the details on item content accordingly - add the properties selected

            }

        }

    }

}

function openAddToCartOptions(button, itemID, catalogID, itemName, itemPrice, categories, max, quantity, event) {

    if (!checkIfAllRequiredPropertiesSelected()) {

        return false;

    }



    $(button).parent().addClass("inactive");

    $(button).parent().next().addClass("active");

    $(button).closest(".item-quantity.catalogItemBoxQuantity").addClass("active");

    QuantityPlusAddToCartFirstTime(button, itemID, catalogID, itemName, itemPrice, categories, quantity, max, event);

}

function closeAddToCartOptions(button) {

    $(button).parent().removeClass("inactive");

    $(button).parent().next().removeClass("active");

    $(button).closest(".item-quantity.catalogItemBoxQuantity").removeClass("active");

}



$(document).ready(function () {

    if ($(".subTotalStrip").length > 0) {

        setTimeout(function () {

            $(".subTotalStripWrapper").addClass("active");

        }, 350);

    }





    if (($("#CatalogView").outerHeight() / $('body').outerHeight() * 100) > 60 && $('.catagories-fixed').length > 0) {

        var headerHeight = $("#header2").outerHeight();

        var headerTopHeight = $("#header2 .header-top").outerHeight();

        if (window.innerWidth < 767) {

            headerTopHeight = 0;

        }



        $('.catagories-fixed').css("top", headerHeight + headerTopHeight);

        $('.catagories-fixed').affix({

            offset: {

                top: $('.catagories-fixed').offset().top,

                bottom: $('#GridBottom').outerHeight() > 0 ? $('#GridBottom').outerHeight() + $('footer').outerHeight() : $('footer').outerHeight()

            }

        });

    }

});





function openMegaMenu(megaMenuID) {

    $(".megaMenuSection").addClass("menu-available");

    $(".megaMenuSection:not(.megaMenuGroupSection)").each(function () {

        var currentMegaMenuID = $(this).attr("id").split("-")[1];

        if (currentMegaMenuID == megaMenuID) {

            $(this).addClass("menu-active");

        }

        else {

            $(this).removeClass("menu-active");

        }

    });

}

function closeMegaMenu() {

    $(".megaMenuSection").removeClass("menu-available");

    $(".megaMenuSection").removeClass("menu-active");

}

function openMegaMenuGroup(megaMenuID, megaMenuGroupID) {

    $(".megaMenuSection").addClass("menu-available");

    $(".megaMenuGroupSection").each(function () {

        var currentMegaMenuID = $(this).attr("id").split("-")[1];

        var currentMegaGroupMenuID = $(this).attr("id").split("-")[2];

        if (currentMegaGroupMenuID == megaMenuGroupID && megaMenuID == currentMegaMenuID) {

            $(this).addClass("menu-active");



        }

        else {

            $(this).removeClass("menu-active");

        }

    });

}

function closeMegaMenuGroup() {

    //$(".megaMenuSection").removeClass("menu-available");

    $(".megaMenuGroupSection").removeClass("menu-active");

    // $(".megaMenuSection").removeClass("menu-active");

}





$(document).ready(function () {

    $(".filtersList:not(.side-filters) .filters-title").click(function () {

        $(this).toggleClass("active");

        $(this).next().toggleClass("active");

        $(this).parent().siblings().find(".filters-list-wrapper").removeClass("active");

        $(this).parent().siblings().find(".filters-title").removeClass("active");

    });

    $(".filtersList.side-filters .filters-title, #headerCatalogSideFilter .filters-title").click(function () {

        $(this).toggleClass("active");

        $(this).next().toggleClass("active");

    });



    $(".filtersList.side-filters .filters-box:first-child > button").trigger('click');





    $('#catalog-quickview-modal').on('show.bs.modal', function (e) {

        window.location.hash = "modal";

    });



    $(window).on('hashchange', function (event) {

        if (window.location.hash != "#modal") {

            $('#catalog-quickview-modal').modal('hide');

        }

    });



});





function LoadAllPages(pageNum, mode) {

    if (window.location.search != "") {

        if (window.location.href.search(/\pageNum=\d{1,}/) > 0) {

            var newURL = window.location.href.replace(/\pageNum=\d{1,}/, "pageNum=" + pageNum);

            window.location = newURL;

        }

        else {

            var newURL = window.location.href + "&pageNum=" + pageNum;

            window.location = newURL;

        }

    }

    else {

        window.location = window.location + "?pageNum=" + pageNum;

    }

}









function OpenQuickAlertItemAdded() {

    var seconds = new Date().getTime() / 1000;

    console.log("OpenQuickAlertItemAdded: ", seconds);

    setQuickAlertPos();

    $(".navQuickAlert").addClass("active");

    closeQuickAlert = setTimeout(function () {

        $(".navQuickAlert").removeClass("active");

        $(".navQuickAlert").html("");

    }, 2500);

}





function setQuickAlertPos() {

    var cBtnTop = 0;

    if ($("#header2").length > 0) {

        var cBtnTop = $("#header2").outerHeight() + $("#header2").position().top;

    }

    else {

        var cBtnTop = $("#header").outerHeight() + $("#header").position().top;

    }



    $(".cartBtn.navShopBtn").each(function () {

        if ($(this).is(":visible")) {

            cBtnLeft = $(this).first().offset().left; //get left position of the '.cartBtn.navShopBtn' visible element

        }

    })



    $(".navQuickAlert").css("top", cBtnTop);

    if (($(window).width() / 2) < cBtnLeft) {

        $(".navQuickAlert").addClass("rightMode");

        var rightPos = $(window).width() - (cBtnLeft + $(".cartBtn.navShopBtn").width());

        $(".navQuickAlert").css("right", rightPos);

    }

    else {

        $(".navQuickAlert").addClass("leftMode");

        $(".navQuickAlert").css("left", cBtnLeft);

    }

}



function showSecondImage(elem) {

    if (window.outerWidth > 767) {

        var a = $(elem).attr("data-second-image");

        if (a != "")

            $(elem).attr("src", a);

    }

}



function showFirstImage(elem) {

    if (window.outerWidth > 767) {

        var a = $(elem).attr("data-first-image");

        if (a != "")

            $(elem).attr("src", a);

    }

}



/*toggle new delivery address CheckoutPage*/

let billingDetailCheckout = $('.billingDetailsWrapper .checkoutInputsWrapper');

$('input[name="billingOption"]').on('change', function () {

    if ($('input[name="billingOption"]:checked').val() == "equal") {

        billingDetailCheckout.removeClass('open');

    } else {

        billingDetailCheckout.addClass('open');

    }

});



function openDeliverySelectionPop(popupAlreadyOpen, isOriginalText) {

    if (isOriginalText == "True" || isOriginalText == "true" || isOriginalText == true) {

        $(".selectDeliveryBtnsInner .firstStepHeadline, .select-delivery-wrapper .firstStepHeadline").text($(".selectDeliveryBtnsInner .firstStepHeadline.delivery-pop-title").attr("data-original"));

    }

    else {

        $(".selectDeliveryBtnsInner .firstStepHeadline, .select-delivery-wrapper .firstStepHeadline").text($(".selectDeliveryBtnsInner .firstStepHeadline.delivery-pop-title").attr("data-addToCart"));

    }

    if ($(window).width() < 767) {

        if ($("#UserSelectedPOS").val() == "true") {

            $(".firstStepHeadline").show();

        }

    }

    if (popupAlreadyOpen == "True" || popupAlreadyOpen == "true" || popupAlreadyOpen == true) {

        $(".selectDeliveryStep[data-step='1']").fadeIn();

        $(".selectPickUpPoint, .selectDeliveryOptions, .approveChangedItems, .chooseDestination, .selectDateOrder").hide();



        if (typeof UpdateFields === "function") {

            UpdateFields("","","","",true);

        }

        $(".selectDeliveryBtns").show();

    }

    if ($(window).width() > 767) {

        $(".selectDeliveryPop").modal('show');

    }

    else {

        $("body").addClass("selectDeliveryProcessOpen");

        $(".selectDeliveryProcess").addClass("open");

        $("#header2").addClass("DeliveryProcessOn")

    }

    closeCart();

 

}

function closeDeliverymMobilePop() {

    $(".selectDeliveryProcess").removeClass("open");

    $("body").removeClass("selectDeliveryProcessOpen");

    $("#header2").removeClass("DeliveryProcessOn");

}

function selectDeliveryMethod(step, deliveryType) {

    console.log("step: " + step + " deliveryType:" + deliveryType);

    $("#noDeliveryAddressError").hide()

    $(".selectDeliveryStep").hide();

    $(".selectDeliveryStep[data-step='" + step + "']").fadeIn();

    if (step == 2) {

        if (deliveryType == 1) {

            $(".selectDeliveryOptions").show();

            $(".selectPickUpPoint").hide();

        }

        else {

            $(".selectPickUpPoint").show();

            $(".selectDeliveryOptions").hide();

        }

    }

}

//$(document).ready(function () {

//    $('.selectDeliveryPop').on('hidden.bs.modal', function (e) {

//        $(".selectDeliveryStep").hide();

//        $(".selectDeliveryStep[data-step='1']").fadeIn();

//        if (window.location.pathname.indexOf("/0/Checkout") !== -1) {

//            // In order to prevent change address before the user actually approved it

//            location.reload()

//        }

//    });

//});



function InitializedOwlPop() {

    $("#multi-content-modal").addClass("owl-active");

}



function loadingStart() {

    $("body").addClass("loading");

}



function loadingEnd() {

    $("body").removeClass("loading");

}



$(document).ready(function () {

    $("#multi-content-modal").on("shown.bs.modal", function () {

        if ($("#multi-content-modal").find(".popup-gallery-owl-inner").length > 0) {

            $('.popup-gallery-owl-inner').owlCarousel({

                center: false,

                items: 1,

                loop: true,

                margin: 0,

                autoplay: false,

                dots: true,

                nav: false,

                navText: ["", ""],

                onInitialized: InitializedOwlPop,

                responsive: {

                    991: {

                        items: 1,

                    },

                    768: {

                        items: 1,

                    },

                    300: {

                        loop: true,

                        items: 1,

                        center: false,

                        mouseDrag: true,

                        touchDrag: true

                    }

                }

            })

        }

    });

    $("#multi-content-modal").on("hidden.bs.modal", function () {

        $("#multi-content-modal").removeClass("owl-active owl-modal contentInPopUpGallery");

    });

})



function InitializedOwlPop() {

    $("#multi-content-modal").addClass("owl-active");

}





function SaarTest() {

    console.log("Saar Test");

}



function AccessabilityFocusContent() {    

    if ($('#allSectionsWrapper section:first-child .section-animation-item:first-child a').length > 0) {

        $('#allSectionsWrapper section:first-child .section-animation-item:first-child a').focus();

    }

    else {

        $('#allSectionsWrapper').focus();

    }

}









var getUrlParameter = function getUrlParameter(sParam) {

    var sPageURL = window.location.search.substring(1),

        sURLVariables = sPageURL.split('&'),

        sParameterName,

        i;



    for (i = 0; i < sURLVariables.length; i++) {

        sParameterName = sURLVariables[i].split('=');



        if (sParameterName[0] === sParam) {

            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);

        }

    }

    return false;

};





/*** TEST MODE ***/



var cookieExpDays = 7;

var testMode = false;

var exitTestModeBtn = `<a href="javascript:void(0)" onclick="exitTestMode()" class="exitTestMode">Exit Test Mode</a>`



if (getUrlParameter("test") == "1") {

    setCookie("test", "yes", cookieExpDays);

}



function setCookie(cname, cvalue, exdays) {

    if (cvalue == "yes") {

        testMode = true;

    }

    const d = new Date();

    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}



function getCookie(cname) {

    let name = cname + "=";

    let decodedCookie = decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {

        let c = ca[i];

        while (c.charAt(0) == ' ') {

            c = c.substring(1);

        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);

        }

    }

    return "";

}





if (getCookie("test") == "yes") {

    testMode = true;

}



function exitTestMode() {

    setCookie("test", "no", cookieExpDays);

    var newURL = removeParam("test", url)

    window.location.replace(

        newURL,

    );

}





function removeParam(key, sourceURL) {

    var rtn = sourceURL.split("?")[0],

        param,

        params_arr = [],

        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";

    if (queryString !== "") {

        params_arr = queryString.split("&");

        for (var i = params_arr.length - 1; i >= 0; i -= 1) {

            param = params_arr[i].split("=")[0];

            if (param === key) {

                params_arr.splice(i, 1);

            }

        }

        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");

    }

    return rtn;

}



if (testMode) {

    $("body").append(exitTestModeBtn);

    $("body").addClass("testMode");

}



function checkIfAllRequiredPropertiesSelected() {

    var propertyGroupsErrorsCount = 0;

    $(".propertyGroup").each(function () {

        var pID = $(this).attr("data-id");

        var GroupName = $(this).attr("name");

        var value = $("input[name=" + GroupName + "]:checked").val();

        if (($(this).attr("required") != undefined && $(this).val() == null) || (this.type == "radio" && $(this).attr("required") != undefined && value == null)) {

            if (this.type == "radio") {

                $(".propertyError[data-id=" + pID + "]").show();

                propertyGroupsErrorsCount++;

            }

            else {

                $(this).next().show();

                propertyGroupsErrorsCount++;

            }

        }

        else {

            if (this.type == "radio") {

                $(".propertyError[data-id=" + pID + "]").hide();

            }

            else {

                $(this).next().hide();

            }

        }

    });



    $(".propertyGroupContainer").each(function () {

        if ($(this).attr("data-min") != undefined && $(this).attr("data-min") != "" && $(this).attr("data-min") != "0") {

            var min = $(this).attr("data-min");

            var currentValue = $(this).find(".propertyGroup").attr("data-val");

            if (parseInt(currentValue) < min) {

                $(this).find(".propertyError").show();

                propertyGroupsErrorsCount++;

            }

            else {

                $(this).find(".propertyError").hide();

            }

        }

    });



    // Ingredient validation - supports checkbox/radio AND the +/- quantity steppers.

    // A group can render both at once: EnableQuantitySelection with MaxSelection 1 still

    // renders radios plus the hidden .ingredientGroupQuantity input, whose data-val stays

    // 0 forever - so routing on "a hidden input exists" failed every such group. Sum what

    // is actually rendered instead, and only treat a group as quantity-based when the

    // steppers themselves are on the page.

    $(".ingredientGroupSelection").each(function () {

        var min = parseInt($(this).attr("data-min")) || 0;

        var pID = $(this).attr("data-id");

        var quantityInputs = $(this).find(".ingredientQuantityContainer input[type=number]");

        var valuesChecked = $(this).find(".ingredientGroup:checked").length;

        quantityInputs.each(function () {

            valuesChecked += parseInt($(this).val()) || 0;

        });

        // Quantity groups have their own .ingredientError naming how many to pick;

        // checkbox/radio groups only have the generic .propertyError.

        var ingredientError = $(".ingredientError[data-id=" + pID + "]");

        var errorElement = (quantityInputs.length > 0 && ingredientError.length > 0) ?

            ingredientError : $(".propertyError[data-id=" + pID + "]");

        if (min > 0 && valuesChecked < min) {

            errorElement.show();

            propertyGroupsErrorsCount++;

        }

        else {

            errorElement.hide();

        }

    });



    if (propertyGroupsErrorsCount == 0) {

        return true;

    }

    else {

        return false;

    }

}

function checkIfAllRequiredPropertiesSelected_origin_before_ingrediants_quantities() {

    var propertyGroupsErrorsCount = 0;

    $(".propertyGroup").each(function () {

        var pID = $(this).attr("data-id");

        var GroupName = $(this).attr("name");

        var value = $("input[name=" + GroupName + "]:checked").val();

        if (($(this).attr("required") != undefined && $(this).val() == null) || (this.type == "radio" && $(this).attr("required") != undefined && value == null)) {

            if (this.type == "radio") {

                $(".propertyError[data-id=" + pID + "]").show();

                propertyGroupsErrorsCount++;

            }

            else {

                $(this).next().show();

                propertyGroupsErrorsCount++;

            }



        }

        else {

            if (this.type == "radio") {

                $(".propertyError[data-id=" + pID + "]").hide();

            }

            else {

                $(this).next().hide();

            }

        }

    });

    $(".propertyGroupContainer").each(function () {

        if ($(this).attr("data-min") != undefined && $(this).attr("data-min") != "" && $(this).attr("data-min") != "0") {

            var min = $(this).attr("data-min");

            var currentValue = $(this).find(".propertyGroup").attr("data-val");

            if (parseInt(currentValue) < min) {

                $(this).find(".propertyError").show();

                propertyGroupsErrorsCount++;

            }

            else {

                $(this).find(".propertyError").hide();

            }

        }

    });



    $(".ingredientGroupSelection").each(function () {

        var min = $(this).attr("data-min");

        var pID = $(this).attr("data-id");

        var GroupName = $(this).attr("name");

        var valuesChecked = $(this).find(".ingredientGroup:checked").length;

        if (valuesChecked < min) {

            $(".propertyError[data-id=" + pID + "]").show();

            propertyGroupsErrorsCount++;

        }

        else {

            $(".propertyError[data-id=" + pID + "]").hide();

        }

    });



    if (propertyGroupsErrorsCount == 0) {

        return true;

    }

    else {

        return false;

    }





}



function openHistoryOrderPopup(orderItemID) {

    historyOrderItemID = orderItemID

    $("#history-order-modal").modal('show');



    $("#history-order-modal .beforeAddedToCart").show();

    $("#history-order-modal .orderAddedToCart").hide();

    $("#history-order-modal .orderAddedToCartFail").hide();



}



function RemoveAllItemsFromCartPopup(engLang) {

    $("#cart-remove-items").modal('show');

}



$("#SiteGridContainer").click(function (e) {

    if ($("#nav-toggle").hasClass("active")) {

        $("#nav-toggle").trigger('click');

    }

});



