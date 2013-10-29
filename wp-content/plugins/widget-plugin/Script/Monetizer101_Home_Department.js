

   console.log('dfasfsdfgsf');
   alert('working');
   



jQuery(document).ready(function() {
    console.log(faqTab);
    var faqTab = jQuery('.faq-row-handle'),
    faqTabContainer = jQuery('.faq-row-container');
    console.log('test');
    if(faqTab.length){

    faqTab.off('click').on('click', function(){
    var faqRow = jQuery(this).parent(),
    faqContent = jQuery(this).parent().find('.faq-row-content');

    faqTabContainer.find('.faq-row').not(faqRow).removeClass('open');
    console.log('test');
    faqContent.stop().slideToggle('slow', function() {
    faqRow.toggleClass('open', faqContent.is(':visible'));
    });
    });
    console.log('test');
    
    }

    });