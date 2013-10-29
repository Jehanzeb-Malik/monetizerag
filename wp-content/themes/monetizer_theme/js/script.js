jQuery(document).ready(function() {

   
    // initialise plugin
    var example = $('#example').superfish({
        //add options here if required
    });

    // buttons to demonstrate Superfish's public methods
    jQuery('.destroy').on('click', function() {
        example.superfish('destroy');
    });

    jQuery('.init').on('click', function() {
        example.superfish();
    });

    jQuery('.open').on('click', function() {
        example.children('li:first').superfish('show');
    });

    jQuery('.close').on('click', function() {
        example.children('li:first').superfish('hide');
    });
});


