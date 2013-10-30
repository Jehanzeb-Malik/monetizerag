$(document).ready(function() {
    
    var faqTab = $('.faq-row-handle'),
    faqTabContainer = $('.faq-row-container');
    
    if(faqTab.length){

        faqTab.off('click').on('click', function(){
            var faqRow = $(this).parent(),
            faqContent = $(this).parent().find('.faq-row-content');

            faqTabContainer.find('.faq-row').not(faqRow).removeClass('open');
            
            faqContent.stop().slideToggle('slow', function() {
                faqRow.toggleClass('open', faqContent.is(':visible'));
            });
        }); 
    }
});