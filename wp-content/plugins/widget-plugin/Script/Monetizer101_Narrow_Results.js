jQuery(document).ready(function() {
    
    var faqTab = jQuery('.faq-row-handle'),
    faqTabContainer = jQuery('.faq-row-container');
    
    if(faqTab.length){

        faqTab.off('click').on('click', function(){
            var faqRow = jQuery(this).parent(),
            faqContent = jQuery(this).parent().find('.faq-row-content');

            faqTabContainer.find('.faq-row').not(faqRow).removeClass('open');
            
            faqContent.stop().slideToggle('slow', function() {
                faqRow.toggleClass('open', faqContent.is(':visible'));
            });
        }); 
    }
});