<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage monetizer_theme
 */
?>
<?php get_header(); ?>

<div id="error_msg">

    <p id="one">404</p>
    <p id="two">PAGE</p>
    <p id="three">NOT FOUND</p>
    <p id="four">The page you were looking for could not be found. Please 
        try the search below to find what you are looking for.</p>
    <p id="five">
        <input id="search" type="text" name="SEARCH" placeholder="Search for a product or a brand">
        <label class="search-label">SEARCH ALL <i class="icon-down-dir" style="color: white; font-size: 13px; padding-left: 5px;"></i></label>
        <label class="search-label1"><i class="icon-search" style="color: white; font-size: 13px;"></i></label>
    </p>

</div>

<?php get_footer(); ?>