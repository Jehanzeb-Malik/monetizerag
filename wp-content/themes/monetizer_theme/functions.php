<?php

/**
 * Register our sidebars and widgetized areas.
 *
 */

function monetizer101_widgets_init() {
    register_sidebar(array(
        'name' => __('Main Widget Area', 'monetizer101'),
        'id' => 'sidebar-1',
        'description' => __('Appears in the footer section of the site.', 'monetizer101'),
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));

    register_sidebar(array(
        'name' => __('Secondary Widget Area', 'monetizer101'),
        'id' => 'sidebar-2',
        'description' => __('Appears on posts and pages in the sidebar.', 'monetizer101'),
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
}

if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => 'Home Left Sidebar',
        'id' => 'Home-Left-sidebar',
        'description' => 'Appears as the sidebar on the left hand side on categories page',
        'before_widget' => '<div style="height: 20px"></div>',
        'after_widget' => '',
        'before_title' => '',
        'after_title' => '',
    ));
}

if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => 'Home Main Sidebar',
        'id' => 'Home-Main-sidebar',
        'description' => 'Appears on the home page with slider etc',
        'before_widget' => '<div style="height: 20px"></div>',
        'after_widget' => '',
        'before_title' => '',
        'after_title' => '',
    ));
}

if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => 'Home Department Sidebar',
        'id' => 'Home-Department-sidebar',
        'description' => 'Appears on the home page below slider and shows department products',
        'before_widget' => '<div style="height: 20px"></div>',
        'after_widget' => '',
        'before_title' => '',
        'after_title' => '',
    ));
}

add_action('widgets_init', 'monetizer101_widgets_init');

add_action('wp_enqueue_scripts', 'monetizer101_include_resources');

function monetizer101_include_resources() {

    wp_register_script('mustache.js', get_template_directory_uri() . '/js/mustache.js');
    wp_enqueue_script('mustache.js');

    wp_register_script('kendo.web.min', get_template_directory_uri() . '/js/kendo.web.min.js');
    wp_enqueue_script('kendo.web.min');

    wp_register_script('hoverIntent', get_template_directory_uri() . '/js/hoverIntent.js');
    wp_enqueue_script('hoverIntent');

    wp_register_script('superfish', get_template_directory_uri() . '/js/superfish.js');
    wp_enqueue_script('superfish');

    wp_register_script('script', get_template_directory_uri() . '/js/script.js');
    wp_enqueue_script('script');

    wp_enqueue_style('kendo.common.min', get_template_directory_uri() . '/css/kendo.common.min.css');
    wp_enqueue_style('kendo.default.min', get_template_directory_uri() . '/css/kendo.default.min.css');
    wp_enqueue_style('stylesheet', get_template_directory_uri() . '/css/stylesheet.css');
    wp_enqueue_style('fontello', get_template_directory_uri() . '/css/fontello.css');
    wp_enqueue_style('fontello-codes', get_template_directory_uri() . '/css/fontello-codes.css');
    wp_enqueue_style('fontello-embedded', get_template_directory_uri() . '/css/fontello-embedded.css');
    wp_enqueue_style('superfish', get_template_directory_uri() . '/css/superfish.css');
    wp_enqueue_style('template-404', get_template_directory_uri() . '/css/template-404.css');
    wp_enqueue_style('template-How_it_works', get_template_directory_uri() . '/css/template-How_it_works.css');
}


?>