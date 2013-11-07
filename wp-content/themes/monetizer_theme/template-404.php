<!--include global $wpdb;-->

<?php
/* Template Name:  404 page not found
 */
?>
<?php get_header(); ?>

<div id="main">
    <div id="error_msg">

        <p id="one">404</p>
        <p id="two">PAGE</p>
        <p id="three">NOT FOUND</p>
        <p id="four">The page you were looking for could not be found. Please 
            try the search below to find what you are looking for.</p>
        <p id="five">

            <input id="search" type="text" name="SEARCH" placeholder="Search for a product or a brand">
        <div id="drop-down-list1-404" style="float: left; position: absolute; top: 350px; left: 666px;">
            <ul class="sf-menu" id="departments-dropdown-404">
                <li class="current">
                    <input class="styled-list" value="SEARCH ALL"  style="background:  url('<?php bloginfo('template_directory'); ?>/images/button-1.png') no-repeat 100% #ed7500; padding: 10px 48px 30px 14px;
                           font-family: calibri; color:white; font-size: 18px; font-weight: bold; width: 143px;" type="button"></input>
                </li>
            </ul>
        </div>

        <label class="search-label1-404" style=" position: absolute; top: 350px;  position: absolute;
               left: 788px;
               display: inline-block;
               padding: 12px 16px 11px 16px;
               background-color: #346ea0;
               margin: 0px 5px 0px 26px;">
            <i class="icon-search" style="color: white; font-size: 13px;"></i></label>
        </p>

    </div>

</div>


<?php get_footer(); ?>