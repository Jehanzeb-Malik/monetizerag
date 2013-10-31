<?php
/*
 * Template Name:  Categories View
 */
?>
<?php get_header(); ?>

<div id="left-sidebar">
    <?php dynamic_sidebar('Categories Left Content Area'); ?>
</div>
<div id="main-content-area">
    <?php dynamic_sidebar('Categories Main Content Area'); ?>
</div>
<div class="clear-both"></div>

<?php get_footer(); ?>