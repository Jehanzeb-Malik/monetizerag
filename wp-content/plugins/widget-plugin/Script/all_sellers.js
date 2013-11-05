jQuery(document).ready(function(){
    
    });

function loadMerchants(){
    try{
        ShopManager.getMerchants({
            isoCurrencyCode: sessionStorage.isoCurrencyCode
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
        
            var merchantList = [];
            merchantList['A'] = [];
            merchantList['A'].list = [];
            merchantList['A'].show = false;
            merchantList['B'] = [];
            merchantList['B'].list = [];
            merchantList['B'].show = false;
            merchantList['C'] = [];
            merchantList['C'].list = [];
            merchantList['C'].show = false;
            merchantList['D'] = [];
            merchantList['D'].list = [];
            merchantList['D'].show = false;
            merchantList['E'] = [];
            merchantList['E'].list = [];
            merchantList['E'].show = false;
            merchantList['F'] = [];
            merchantList['F'].list = [];
            merchantList['F'].show = false;
            merchantList['G'] = [];
            merchantList['G'].list = [];
            merchantList['G'].show = false;
            merchantList['H'] = [];
            merchantList['H'].list = [];
            merchantList['H'].show = false;
            merchantList['I'] = [];
            merchantList['I'].list = [];
            merchantList['I'].show = false;
            merchantList['J'] = [];
            merchantList['J'].list = [];
            merchantList['J'].show = false;
            merchantList['K'] = [];
            merchantList['K'].list = [];
            merchantList['K'].show = false;
            merchantList['L'] = [];
            merchantList['L'].list = [];
            merchantList['L'].show = false;
            merchantList['M'] = [];
            merchantList['M'].list = [];
            merchantList['M'].show = false;
            merchantList['N'] = [];
            merchantList['N'].list = [];
            merchantList['N'].show = false;
            merchantList['O'] = [];
            merchantList['O'].list = [];
            merchantList['O'].show = false;
            merchantList['P'] = [];
            merchantList['P'].list = [];
            merchantList['P'].show = false;
            merchantList['Q'] = [];
            merchantList['Q'].list = [];
            merchantList['Q'].show = false;
            merchantList['R'] = [];
            merchantList['R'].list = [];
            merchantList['R'].show = false;
            merchantList['S'] = [];
            merchantList['S'].list = [];
            merchantList['S'].show = false;
            merchantList['T'] = [];
            merchantList['T'].list = [];
            merchantList['T'].show = false;
            merchantList['U'] = [];
            merchantList['U'].list = [];
            merchantList['U'].show = false;
            merchantList['V'] = [];
            merchantList['V'].list = [];
            merchantList['V'].show = false;
            merchantList['W'] = [];
            merchantList['W'].list = [];
            merchantList['W'].show = false;
            merchantList['X'] = [];
            merchantList['X'].list = [];
            merchantList['X'].show = false;
            merchantList['Y'] = [];
            merchantList['Y'].list = [];
            merchantList['Y'].show = false;
            merchantList['Z'] = [];
            merchantList['Z'].list = [];
            merchantList['Z'].show = false;
            merchantList['#'] = [];
            merchantList['#'].list = [];
            merchantList['#'].show = false;
            var temp = jsResponse.data;
            for(var i=0 ; i < temp.length ; i++){
                temp[i].tag = temp[i].name.charAt(0).toUpperCase();
                if(temp[i].tag == 'A'){
                    merchantList['A'].tag = 'A';
                    merchantList['A'].show = true;
                    merchantList['A'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'B'){
                    merchantList['B'].tag = 'B';
                    merchantList['B'].show = true;
                    merchantList['B'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'C'){
                    merchantList['C'].tag = 'C';
                    merchantList['C'].show = true;
                    merchantList['C'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'D'){
                    merchantList['D'].tag = 'D';
                    merchantList['D'].show = true;
                    merchantList['D'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'E'){
                    merchantList['E'].tag = 'E';
                    merchantList['E'].show = true;
                    merchantList['E'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'F'){
                    merchantList['F'].tag = 'F';
                    merchantList['F'].show = true;
                    merchantList['F'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'G'){
                    merchantList['G'].tag = 'G';
                    merchantList['G'].show = true;
                    merchantList['G'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'H'){
                    merchantList['H'].tag = 'H';
                    merchantList['H'].show = true;
                    merchantList['H'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'I'){
                    merchantList['I'].tag = 'I';
                    merchantList['I'].show = true;
                    merchantList['I'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'J'){
                    merchantList['J'].tag = 'J';
                    merchantList['J'].show = true;
                    merchantList['J'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'K'){
                    merchantList['K'].tag = 'K';
                    merchantList['K'].show = true;
                    merchantList['K'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'L'){
                    merchantList['L'].tag = 'L';
                    merchantList['L'].show = true;
                    merchantList['L'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'M'){
                    merchantList['M'].tag = 'M';
                    merchantList['M'].show = true;
                    merchantList['M'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'N'){
                    merchantList['N'].tag = 'N';
                    merchantList['N'].show = true;
                    merchantList['N'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'O'){
                    merchantList['O'].tag = 'O';
                    merchantList['O'].show = true;
                    merchantList['O'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'P'){
                    merchantList['P'].tag = 'P';
                    merchantList['P'].show = true;
                    merchantList['P'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'Q'){
                    merchantList['Q'].tag = 'Q';
                    merchantList['Q'].show = true;
                    merchantList['Q'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'R'){
                    merchantList['R'].tag = 'R';
                    merchantList['R'].show = true;
                    merchantList['R'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'S'){
                    merchantList['S'].tag = 'S';
                    merchantList['S'].show = true;
                    merchantList['S'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'T'){
                    merchantList['T'].tag = 'T';
                    merchantList['T'].show = true;
                    merchantList['T'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'U'){
                    merchantList['U'].tag = 'U';
                    merchantList['U'].show = true;
                    merchantList['U'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'V'){
                    merchantList['V'].tag = 'V';
                    merchantList['V'].show = true;
                    merchantList['V'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'W'){
                    merchantList['W'].tag = 'W';
                    merchantList['W'].show = true;
                    merchantList['W'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'X'){
                    merchantList['X'].tag = 'X';
                    merchantList['X'].show = true;
                    merchantList['X'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'Y'){
                    merchantList['Y'].tag = 'Y';
                    merchantList['Y'].show = true;
                    merchantList['Y'].list.push(temp[i]);
                }
                else if(temp[i].tag == 'Z'){
                    merchantList['Z'].tag = 'Z';
                    merchantList['Z'].show = true;
                    merchantList['Z'].list.push(temp[i]);
                }
                else{
                    merchantList['#'].tag = '#';
                    merchantList['#'].show = true;
                    merchantList['#'].list.push(temp[i]);
                }
            }
        
            //        temp.sort(compare);
            var newObj = [];
            var output = '';
            var output_header = '';
            for (var key in merchantList) {
                newObj.tag = key;
                newObj.show= merchantList[key].show;
                newObj.list = merchantList[key].list;
                
                if(newObj.show == true){
                    newObj.active = true;
                    newObj.inactive = false;
                //                    newObj.active = 'all-seller-header-active'
                } else{
                    newObj.inactive = true;
                    newObj.active = false;
                }
            
                output += Mustache.render(jQuery("#all_sellers_tpl").html(), newObj);
                output_header += Mustache.render(jQuery("#all_sellers_header_tpl").html(), newObj);
            //            if(key == '#'){
            //                jQuery("#link_box").append(output);
            //            }
            }
            jQuery("#container_all_sellers").append(output);
            jQuery("#link_box #list").html(output_header);
            
            jQuery('.all-seller-header-active').on('click', function(){
                var target = jQuery('#seller-'+jQuery(this).text());
                if (target.length)
                {
                    var top = target.offset().top;
                    jQuery('html,body').animate({
                        scrollTop: top
                    }, 1000);
                    return false;
                }
            });
            
            jQuery('.back-to-top').on('click', function(){
                var target = jQuery('#top-bar');
                if (target.length)
                {
                    var top = target.offset().top;
                    jQuery('html,body').animate({
                        scrollTop: top
                    }, 1000);
                    return false;
                }
            });
        });
    } catch (e) {
        console.log(e.message);
    }
}

function compare(a,b) {
    try{
        if (a.tag < b.tag)
            return -1;
        if (a.tag > b.tag)
            return 1;
        return 0;
    } catch (e) {
        console.log(e.message);
    }
}

function getObjectSize(obj) {
    try{
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    } catch (e) {
        console.log(e.message);
    }
}