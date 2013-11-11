jQuery(document).ready(function() {
    jQuery(document).on('click', '#filter-panelbar-price-select', function(){
        var visibleProducts = jQuery('.grid-product:visible');
        var salePrice = 0;
        for(var x = 0 ; x < visibleProducts.length ; x++){
            salePrice = parseInt(jQuery(visibleProducts[x]).find('.product-discounted-price').html().split(' ')[1], 10);
            
            if(!(salePrice >= jQuery('#filter-panelbar-price-min-amount').val() && salePrice <= jQuery('#filter-panelbar-price-max-amount').val())){
                jQuery(visibleProducts[x]).fadeOut(500);
            }
        }
    });
    jQuery('.filter-panelbar-price-amount').on('keypress', function(e){
        if(e.which != 8 && isNaN(String.fromCharCode(e.which))){
            e.preventDefault(); //stop character from entering input
        }
    });
});


function loadProductFilterPrice(){
    //    console.log(filter-panelbar-price-min-amount);
    jQuery('#filter-panelbar-price-min-amount').val(category_basic_min_price);
    jQuery('#filter-panelbar-price-max-amount').val(category_basic_max_price);
}

/* Called from "category_basic.js" or "search_basic.js" depending on the loaded page*/
function loadProductFilterSubCategories(categoryList){
    var objList = [];
    var data = {};
    
    var signLink = jQuery('.filter-panelbar-price-currency-type');
    jQuery(signLink[0]).html('&#' + getCurrencyCode(sessionStorage.isoCurrencyCode));
    jQuery(signLink[1]).html(' to &#' + getCurrencyCode(sessionStorage.isoCurrencyCode));
    
    for(var x = 0 ; x < categoryList.length ; x++){
        data = categoryList[x].split('|-|');
        var obj = {
            id: data[1],
            name: data[0]
        };
        objList.push(obj);
    }
    var output = Mustache.render(jQuery("#product_filter_sub_categories_tpl").html(), objList);
    jQuery("#product-filter-sub-category-list > ul").html(output);
    Custom.init();
    
    jQuery("#panelbar").kendoPanelBar({
        expandMode: "multiple",
        animation: {
            // fade-out closing items over 1000 milliseconds
            collapse: {
                duration: 1000,
                effects: "fadeOut"
            },
            // fade-in and expand opening items over 500 milliseconds
            expand: {
                duration: 500,
                effects: "expandVertical fadeIn"
            }
        }
    }).show();
    var panelBar = jQuery("#panelbar").data("kendoPanelBar");
}

function loadNarrowResultsWidget(){
    
//    jQuery("#panelbar").kendoPanelBar({
//        expandMode: "multiple",
//        animation: {
//            // fade-out closing items over 1000 milliseconds
//            collapse: {
//                duration: 1000,
//                effects: "fadeOut"
//            },
//            // fade-in and expand opening items over 500 milliseconds
//            expand: {
//                duration: 500,
//                effects: "expandVertical fadeIn"
//            }
//        }
//    }).show();
//    var panelBar = jQuery("#panelbar").data("kendoPanelBar");
//    Custom.init();
}

var checkboxHeight = "25";
var radioHeight = "25";

var Custom = {
    init: function() {
        
        var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
        for(a = 0; a < inputs.length; a++) {
            if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className.indexOf("styled") > -1) {
                span[a] = document.createElement("span");
                span[a].className = inputs[a].type;

                if(inputs[a].checked == true) {
                    if(inputs[a].type == "checkbox") {
                        position = "0 -" + (checkboxHeight*2) + "px";
                        span[a].style.backgroundPosition = position;
                    } else {
                        position = "0 -" + (radioHeight*2) + "px";
                        span[a].style.backgroundPosition = position;
                    }
                }
                inputs[a].parentNode.insertBefore(span[a], inputs[a]);
                inputs[a].onchange = Custom.clear;
                if(!inputs[a].getAttribute("disabled")) {
                    span[a].onmousedown = Custom.pushed;
                    span[a].onmouseup = Custom.check;
                } else {
                    span[a].className = span[a].className += " disabled";
                }
            }
        }
        inputs = document.getElementsByTagName("select");
        for(a = 0; a < inputs.length; a++) {
            if(inputs[a].className.indexOf("styled") > -1) {
                option = inputs[a].getElementsByTagName("option");
                active = option[0].childNodes[0].nodeValue;
                textnode = document.createTextNode(active);
                for(b = 0; b < option.length; b++) {
                    if(option[b].selected == true) {
                        textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
                    }
                }
                span[a] = document.createElement("span");
                span[a].className = "select";
                span[a].id = "select" + inputs[a].name;
                span[a].appendChild(textnode);
                inputs[a].parentNode.insertBefore(span[a], inputs[a]);
                if(!inputs[a].getAttribute("disabled")) {
                    inputs[a].onchange = Custom.choose;
                } else {
                    inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
                }
            }
        }
        document.onmouseup = Custom.clear;
    },
    pushed: function() {
        element = this.nextSibling;
        if(element.checked == true && element.type == "checkbox") {
            this.style.backgroundPosition = "0 -" + checkboxHeight*3 + "px";
        } else if(element.checked == true && element.type == "radio") {
            this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
        } else if(element.checked != true && element.type == "checkbox") {
            this.style.backgroundPosition = "0 -" + checkboxHeight + "px";
        } else {
            this.style.backgroundPosition = "0 -" + radioHeight + "px";
        }
    },
    check: function() {
        element = this.nextSibling;
        if(element.checked == true && element.type == "checkbox") {
            this.style.backgroundPosition = "0 0";
            element.checked = false;
        } else {
            if(element.type == "checkbox") {
                this.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
            } else {
                this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
                group = this.nextSibling.name;
                inputs = document.getElementsByTagName("input");
                for(a = 0; a < inputs.length; a++) {
                    if(inputs[a].name == group && inputs[a] != this.nextSibling) {
                        inputs[a].previousSibling.style.backgroundPosition = "0 0";
                    }
                }
            }
            element.checked = true;
        }
    },
    clear: function() {
        inputs = document.getElementsByTagName("input");
        for(var b = 0; b < inputs.length; b++) {
            if(inputs[b].type == "checkbox" && inputs[b].checked == true && inputs[b].className.indexOf("styled") > -1) {
                inputs[b].previousSibling.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
            } else if(inputs[b].type == "checkbox" && inputs[b].className.indexOf("styled") > -1) {
                inputs[b].previousSibling.style.backgroundPosition = "0 0";
            } else if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className.indexOf("styled") > -1) {
                inputs[b].previousSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
            } else if(inputs[b].type == "radio" && inputs[b].className.indexOf("styled") > -1) {
                inputs[b].previousSibling.style.backgroundPosition = "0 0";
            }
        }
    },
    choose: function() {
        option = this.getElementsByTagName("option");
        for(d = 0; d < option.length; d++) {
            if(option[d].selected == true) {
                document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
            }
        }
    }
}