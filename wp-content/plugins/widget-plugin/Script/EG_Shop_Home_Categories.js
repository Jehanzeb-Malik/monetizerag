/**
 * @version		1.3
 * @package		SimpleTabs
 * @author    Fotis Evangelou - http://nuevvo.com/labs/simpletabs
 * @copyright	Copyright (c) 2009-2011 Fotis Evangelou / Nuevvo Webware Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// Main SimpleTabs function
var kmrSimpleTabs = {
    sbContainerClass: "simpleTabs",
    sbNavClass: "simpleTabsNavigation",
    sbContentClass: "simpleTabsContent",
    sbCurrentNavClass: "current",
    sbCurrentTabClass: "currentTab",
    sbIdPrefix: "tabber",
    init: function() {
        if (!document.getElementsByTagName)
            return false;
        if (!document.getElementById)
            return false;

        var containerDiv = document.getElementsByTagName("div");

        for (var i = 0; i < containerDiv.length; i++) {
            if (containerDiv[i].className == kmrSimpleTabs.sbContainerClass) {

                // assign a unique ID for this tab block and then grab it
                containerDiv[i].setAttribute("id", kmrSimpleTabs.sbIdPrefix + [i]);
                var containerDivId = containerDiv[i].getAttribute("id");

                // Navigation
                var ul = containerDiv[i].getElementsByTagName("ul");

                for (var j = 0; j < ul.length; j++) {
                    if (ul[j].className == kmrSimpleTabs.sbNavClass) {

                        var a = ul[j].getElementsByTagName("a");
                        for (var k = 0; k < a.length; k++) {
                            a[k].setAttribute("id", containerDivId + "_a_" + k);
                            // get current
                            if (kmrSimpleTabs.readCookie('simpleTabsCookie')) {
                                var cookieElements = kmrSimpleTabs.readCookie('simpleTabsCookie').split("_");
                                var curTabCont = cookieElements[1];
                                var curAnchor = cookieElements[2];
                                if (a[k].parentNode.parentNode.parentNode.getAttribute("id") == kmrSimpleTabs.sbIdPrefix + curTabCont) {
                                    if (a[k].getAttribute("id") == kmrSimpleTabs.sbIdPrefix + curTabCont + "_a_" + curAnchor) {
                                        a[k].className = kmrSimpleTabs.sbCurrentNavClass;
                                    } else {
                                        a[k].className = "";
                                    }
                                } else {
                                    a[0].className = kmrSimpleTabs.sbCurrentNavClass;
                                }
                            } else {
                                a[0].className = kmrSimpleTabs.sbCurrentNavClass;
                            }

                            a[k].onclick = function() {
                                kmrSimpleTabs.setCurrent(this, 'simpleTabsCookie');
                                return false;
                            }
                        }
                    }
                }

                // Tab Content
                var div = containerDiv[i].getElementsByTagName("div");
                var countDivs = 0;
                for (var l = 0; l < div.length; l++) {
                    if (div[l].className == kmrSimpleTabs.sbContentClass) {
                        div[l].setAttribute("id", containerDivId + "_div_" + [countDivs]);
                        if (kmrSimpleTabs.readCookie('simpleTabsCookie')) {
                            var cookieElements = kmrSimpleTabs.readCookie('simpleTabsCookie').split("_");
                            var curTabCont = cookieElements[1];
                            var curAnchor = cookieElements[2];
                            if (div[l].parentNode.getAttribute("id") == kmrSimpleTabs.sbIdPrefix + curTabCont) {
                                if (div[l].getAttribute("id") == kmrSimpleTabs.sbIdPrefix + curTabCont + "_div_" + curAnchor) {
                                    div[l].className = kmrSimpleTabs.sbContentClass + " " + kmrSimpleTabs.sbCurrentTabClass;
                                } else {
                                    div[l].className = kmrSimpleTabs.sbContentClass;
                                }
                            } else {
                                div[0].className = kmrSimpleTabs.sbContentClass + " " + kmrSimpleTabs.sbCurrentTabClass;
                            }
                        } else {
                            div[0].className = kmrSimpleTabs.sbContentClass + " " + kmrSimpleTabs.sbCurrentTabClass;
                        }
                        countDivs++;
                    }
                }

                // End navigation and content block handling	
            }
        }
    },
    // Function to set the current tab
    setCurrent: function(elm, cookie) {

        this.eraseCookie(cookie);

        //get container ID
        var thisContainerID = elm.parentNode.parentNode.parentNode.getAttribute("id");

        // get current anchor position
        var regExpAnchor = thisContainerID + "_a_";
        var thisLinkPosition = elm.getAttribute("id").replace(regExpAnchor, "");

        // change to clicked anchor
        var otherLinks = elm.parentNode.parentNode.getElementsByTagName("a");
        for (var n = 0; n < otherLinks.length; n++) {
            otherLinks[n].className = "";
        }
        elm.className = kmrSimpleTabs.sbCurrentNavClass;

        // change to associated div
        var otherDivs = document.getElementById(thisContainerID).getElementsByTagName("div");
        var RegExpForContentClass = new RegExp(kmrSimpleTabs.sbContentClass);
        for (var i = 0; i < otherDivs.length; i++) {
            if (RegExpForContentClass.test(otherDivs[i].className)) {
                otherDivs[i].className = kmrSimpleTabs.sbContentClass;
            }
        }
        document.getElementById(thisContainerID + "_div_" + thisLinkPosition).className = kmrSimpleTabs.sbContentClass + " " + kmrSimpleTabs.sbCurrentTabClass;

        // get Tabs container ID
        var RegExpForPrefix = new RegExp(kmrSimpleTabs.sbIdPrefix);
        var thisContainerPosition = thisContainerID.replace(RegExpForPrefix, "");

        // set cookie
        this.createCookie(cookie, 'simpleTabsCookie_' + thisContainerPosition + '_' + thisLinkPosition, 1);
    },
    // Cookies
    createCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else
            var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: function(name) {
        this.createCookie(name, "", -1);
    },
    // Loader
    addLoadEvent: function(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }

    // END
};

// Load SimpleTabs
kmrSimpleTabs.addLoadEvent(kmrSimpleTabs.init);






function onApiLoad()
{
//    alert("working") ;
    AffiliateManager.getCategories({
        isoCurrencyCode: sessionStorage.isoCurrencyCode
    }, function(jsResponse) {

        var output = Mustache.render(jQuery("#shop_departments").html(), jsResponse.data);
            //console.log(jsResponse.data);
        jQuery("#tabber12_div_0").html(output);
        //on click
        jQuery(document).on('click', '.cat-list-elem', function(e) {
            e.preventDefault();
            //    console.log(jQuery(this));
            //  alert(jQuery(this).text());


            var url = document.URL;
            var count = 0;
            var department = 0;
            var merchant = 0;

            if (url.indexOf("department") > -1) {
                department = 1;
            }

            for (var i = 0; i < url.length; i++)
            {
                if (url[i] === '&')
                {

                    count = count + 1;
                    // console.log(count);
                }
            }
            console.log(count);
            if (count === 1)
            {
                var temp = url.split("?");
                var temp2 = temp[1].split("&");

                var url2 = temp[0] + "?page_id=26" + "&Department=" + jQuery(this).text();
                console.log(url2);
                window.location.href = url2;
            }
            else if (count === 2)
            {
                var temp = url.split("?");
                var temp2 = temp[1].split("&");
                var url2 = temp[0] + "?page_id=26" + "&Department=" + jQuery(this).text();
                console.log(url2);
                window.location.href = url2;
            }
            else if (count === 0)
            {
                url = url + "&Department=" + jQuery(this).text();
                console.log(url);
                window.location.href = url;//isSet
            }
        });
    });






    ShopManager.getMerchants({
        isoCurrencyCode: sessionStorage.isoCurrencyCode
    }, function(jsResponse) {
        var output = Mustache.render(jQuery("#shop_merchants").html(), jsResponse.data);
         //  console.log(jsResponse);
        jQuery("#tabber12_div_1").html(output);
        //on click
        jQuery(document).on('click', '.merc-list-elem', function(e) {
            e.preventDefault();
            // console.log(jQuery(this));
            //alert(jQuery(this).text());

            var url = document.URL;
            var count = 0;

            for (var i = 0; i < url.length; i++)
            {
                if (url[i] === '&')
                {

                    count = count + 1;
                    // console.log(count);
                }
            }
            console.log(count);
            if (count === 1)
            {
                var temp = url.split("?");
                var temp2 = temp[1].split("&");

                var url2 = temp[0] + "?page_id=28" + "&Merchant=" + jQuery(this).text();
                console.log(url2);
                window.location.href = url2;
            }
            else if (count === 2)
            {
                var temp = url.split("?");
                var temp2 = temp[1].split("&");
                var url2 = temp[0] + "?page_id=28" + "&Merchant=" + jQuery(this).text();
                console.log(url2);
                window.location.href = url2;
            }
            else if (count === 0)
            {
                url = url + "&Merchant=" + jQuery(this).text();
                console.log(url);
                window.location.href = url;//isSet
            }

        });
    });
}

jQuery(document).ready(function() {

    var url = document.URL;
    // getting value from url
    console.log("url: " + url);
    url = decodeURIComponent(url);
    url = url.split("?");
    // url[0], url[1] = parameters
    console.log(url);
    var params = url[1].split("&");
    console.log(params);
    var dept = params[1].split("=");
    console.log(dept[1]);

    //PRINT ON THE DIV
    var divid = document.getElementById('print_title').innerHTML;
    document.getElementById('print_title').innerHTML = dept[1];
    console.log(divid);

});




//jQuery(document).ready(function(){
//    console.log("in fun");
//    jQuery(document).on('click', '.cat-list-elem', function(e){
//        e.preventDefault();
//        console.log(jQuery(this));
//        alert('working');
//    });
//});
