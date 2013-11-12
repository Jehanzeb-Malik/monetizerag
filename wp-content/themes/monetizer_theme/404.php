<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage monetizer_theme
 */
?>
<?php get_header(); ?>

<div id="not-found-widget-wrapper">
    <div id="widget-container">
        <span style="float: left; display: block; width: 260px; height: 104px; color: #005794; font-size: 138px; line-height: 105px; font-family: Arial; font-weight: bold;">404</span>
        <span style="float: left; display: block; width: 175px; height: 104px; color: #808080; font-size: 63px; line-height: 58px; font-family: 'helvetica_neuethin';">PAGE<p style="display: block; line-height: 2px; font-family: 'helvetica_neuethin'; font-size: 29px;">NOT FOUND</p></span>
        <div id="not-found-message">The page you were looking for could not be found.Please try the search below to find what you are looking for.</div>
        <div id="not-found-search">
            <input id="not-found-search-input" value="Search for a product or brand" onclick="javascript:if(this.value == 'Search for a product or brand'){this.value='';}" onfocus="javascript: if (this.defaultValue==this.value)this.value = '';" onblur="javascript:if(this.value == ''){this.value = 'Search for a product or brand';}"/>
            <div id="drop-down-search" style="float: left;">
                <ul class="sf-menu" id="not-found-search-dropdown">
                    <li class="current">
                        <input class="styled-list" readonly placeholder="SEARCH ALL" style="background:  url('<?php // bloginfo('template_directory'); ?>/images/button-1.png') no-repeat 100%; padding: 2px 10px;"></input>
                    </li>
                </ul>
            </div>
            <div id="page-not-found-search-btn"></div>
        </div>
    </div>
</div>

<?php get_footer(); ?>