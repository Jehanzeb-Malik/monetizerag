<?php
/*
  Plugin Name: Widget Plugin
  Description: A simple plugin that adds a simple widget
  Version: 1.0
  Author: Abdur Rahman
  Author URI: http://www.wpexplorer.com/
  License: GPL2
 */


function wp_my_plugin_load() {
    register_widget('wp_my_plugin');
}

class wp_my_plugin extends WP_Widget {

    function wp_my_plugin() {
        /* Widget settings. */
        $widget_ops = array('classname' => 'wp_my_plugin', 'description' => __('Display custom widget', 'wp_my_plugin'));

        /* Widget control settings. */
        $control_ops = array('width' => 300, 'height' => 350, 'id_base' => 'wp_my_plugin-widget');

        /* Create the widget. */
        $this->WP_Widget('wp_my_plugin-widget', __('wp my plugin', 'wp_my_plugin'), $widget_ops, $control_ops);
    }

    /*
     * display the widget on the screen.
     * @param $args
     * @param $instance
     */

    function form($instance) {


        /* Set up some default widget settings. */
        $defaults = array('title' => __('Title', 'wp_my_plugin'), 'name' => __('', 'wp_my_plugin'), 'page' => '');
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>

        <p>

            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Select the Widget required:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%; display: none;" />
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('name'); ?>"><?php _e('Select API Widget:', 'wp_my_plugin'); ?></label>
            <select name="<?php echo $this->get_field_name('name'); ?>" id="<?php echo $this->get_field_id('name'); ?>" onchange="document.getElementById('<?php echo $this->get_field_id('title'); ?>').value = this[selectedIndex].text;">
                <?php
                foreach ($this->widget_lists() as $val => $title) {

                    echo '<option value="' . $val . '" ' . (($instance['name'] == $val) ? 'selected' : '') . '>' . $title . '</option>';
                }
                ?>
            </select>

        </p>
        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        $instance['title'] = strip_tags($new_instance['title']);
        $instance['name'] = strip_tags($new_instance['name']);
        $instance['page'] = $new_instance;

        $instance['title1'] = strip_tags($new_instance['title1']);
        $instance['select1'] = strip_tags($new_instance['select1']);


        return $instance;
    }

    function widget($args, $instance) {
        extract($args);

        $title = apply_filters('widget_title', $instance['title']);
        $name = $instance['name'];
        $page = $instance['page'];
        $title = $instance['title'];
        if ($title == '') {
            echo '<div>
                 <h3><a href="#">No title</a></h3>
                <div>';
        }

        foreach ($this->widget_lists() as $key => $value) {
            if ($value == $title) {
                $abc = $key;
                break;
            }
        }

        /* Before widget (defined by themes). */
        /** @noinspection PhpUndefinedVariableInspection */
        if ($title && $title != ' ') {
            echo $before_widget;
        }

        /* Display the widget title if one was input (before and after defined by themes). */
        if ($title && $title != ' ') {
            /** @noinspection PhpUndefinedVariableInspection */
            $title = $before_title . $title . $after_title;
        }
        /* Display name from widget settings if one was input. */

        if ($name && !empty($name)) {
            $func_name = 'load_' . $abc;
            $this->$func_name($page, $title);
        }
        /* After widget (defined by themes). */
        /** @noinspection PhpUndefinedVariableInspection */
        if ($title && $title != ' ') {
            echo $after_widget;
        }
    }

    /*
     * Update the widget settings.
     * @return array
     */

//************************************************************************************************************************************************************
//***********************************************************    Widget lists    ******************************************************************************
//************************************************************************************************************************************************************


    function widget_lists() {
        $lists = array(
            'Monetizer101_Home_Slider' => 'Monetizer101 Home Page Slider',
            'Monetizer101_Home_Department' => 'Monetizer101 Home Page Department box',
            'all_sellers' => 'All Sellers Widget',
            'product_filter_category_basic' => 'Product Filter Category Basic',
            'product_filter_search_basic' => 'Product Filter Search Basic',
            'product_viewer' => 'Product Viewer',
            'category_basic' => 'Category Basic',
            'search_basic' => 'Search Basic',
            'category_header' => 'Category Header Widget',
            'best_seller' => 'Best Sellers Widget',
            'product_popover' => 'Product Popover'
        );
        return $lists;
    }

    ///////////////////////// Product Filter Category Basic \\\\\\\\\\\\\\\\\\\\\\\\

    function load_product_filter_category_basic($page, $title) {

        include('View/product_filter_category_basic.html');
        
        wp_deregister_script('product_filter_category_basic_script');
        wp_register_script('product_filter_category_basic_script', plugins_url() . '/widget-plugin/Script/product_filter_category_basic.js', array('jquery'));
        wp_enqueue_script('product_filter_category_basic_script');

        wp_enqueue_style('product_filter_category_basic_style', plugins_url() . '/widget-plugin/Style/product_filter_category_basic.css');
    }

    ///////////////////////// Product Filter Category Basic \\\\\\\\\\\\\\\\\\\\\\\\

    function load_product_filter_search_basic($page, $title) {

        include('View/product_filter_search_basic.html');
        
        wp_deregister_script('product_filter_search_basic_script');
        wp_register_script('product_filter_search_basic_script', plugins_url() . '/widget-plugin/Script/product_filter_search_basic.js', array('jquery'));
        wp_enqueue_script('product_filter_search_basic_script');

        wp_enqueue_style('product_filter_search_basic_style', plugins_url() . '/widget-plugin/Style/product_filter_search_basic.css');
    }

    ///////////////////////// Monetizer101 Product Viewer \\\\\\\\\\\\\\\\\\\\\\\\

    function load_product_viewer($page, $title) {

        include('View/product_viewer.html');
        
        wp_deregister_script('product_viewer_script');
        wp_register_script('product_viewer_script', plugins_url() . '/widget-plugin/Script/product_viewer.js', array('jquery'));
        wp_enqueue_script('product_viewer_script');

        wp_deregister_script('hover_intent');
        wp_register_script('hover_intent', plugins_url() . '/widget-plugin/Script/hoverIntent.js', array('jquery'));
        wp_enqueue_script('hover_intent');

        wp_enqueue_style('product_viewer_style', plugins_url() . '/widget-plugin/Style/product_viewer.css');
        wp_enqueue_style('superfish_vertical', plugins_url() . '/widget-plugin/Style/superfish-vertical.css');
    }

    ///////////////////////// Monetizer101 Home Slider \\\\\\\\\\\\\\\\\\\\\\\\

    function load_Monetizer101_Home_Slider($page, $title) {

        include('View/Monetizer101_Home_Slider.html');

        wp_deregister_script('Monetizer101_Home_Slider');
        wp_register_script('Monetizer101_Home_Slider', plugins_url() . '/widget-plugin/Script/Monetizer101_Home_Slider.js', array('jquery'));
        wp_enqueue_script('Monetizer101_Home_Slider');

        wp_deregister_script('flexslider');
        wp_register_script('flexslider', plugins_url() . '/widget-plugin/Script/jquery.flexslider-min.js', array('jquery'));
        wp_enqueue_script('flexslider');

        wp_enqueue_style('Monetizer101_Home_Slider_Style', plugins_url() . '/widget-plugin/Style/Monetizer101_Home_Slider.css');
        wp_enqueue_style('flexslider_style', plugins_url() . '/widget-plugin/Style/flexslider.css');
    }

    ///////////////////////// Monetizer101 Home Department \\\\\\\\\\\\\\\\\\\\\\\\

    function load_Monetizer101_Home_Department($page, $title) {

        include('View/Monetizer101_Home_Department.html');

        wp_deregister_script('Monetizer101_Home_Department_Script');
        wp_register_script('Monetizer101_Home_Department_Script', plugins_url() . '/widget-plugin/Script/Monetizer101_Home_Department.js', array('jquery'));
        wp_enqueue_script('Monetizer101_Home_Department_Script');

        wp_register_style('Monetizer101_Home_Department_Style', plugins_url() . '/widget-plugin/Style/Monetizer101_Home_Department.css');
        wp_enqueue_style('Monetizer101_Home_Department', plugins_url() . '/widget-plugin/Style/Monetizer101_Home_Department.css');
    }

    ///////////////////////// Monetizer101 All Sellers \\\\\\\\\\\\\\\\\\\\\\\\

    function load_all_sellers($page, $title) {

        include('View/all_sellers.html');
        
        wp_deregister_script('all_sellers_script');
        wp_register_script('all_sellers_script', plugins_url() . '/widget-plugin/Script/all_sellers.js', array('jquery'));
        wp_enqueue_script('all_sellers_script');
        

        wp_deregister_script('hover_intent');
        wp_register_script('hover_intent', plugins_url() . '/widget-plugin/Script/hoverIntent.js', array('jquery'));
        wp_enqueue_script('hover_intent');

        wp_enqueue_style('all_sellers_style', plugins_url() . '/widget-plugin/Style/all_sellers.css');
        wp_enqueue_style('superfish_vertical', plugins_url() . '/widget-plugin/Style/superfish-vertical.css');
    }

    ///////////////////////// Category Basic \\\\\\\\\\\\\\\\\\\\\\\\

    function load_category_basic($page, $title) {

        include('View/category_basic.html');

        wp_deregister_script('category_script');
        wp_register_script('category_script', plugins_url() . '/widget-plugin/Script/category_basic.js', array('jquery'));
        wp_enqueue_script('category_script');

        wp_enqueue_style('category_style', plugins_url() . '/widget-plugin/Style/category_basic.css');
    }

    ///////////////////////// Search Basic \\\\\\\\\\\\\\\\\\\\\\\\

    function load_search_basic($page, $title) {

        include('View/search_basic.html');

        wp_deregister_script('search_basic_script');
        wp_register_script('search_basic_script', plugins_url() . '/widget-plugin/Script/search_basic.js', array('jquery'));
        wp_enqueue_script('search_basic_script');

        wp_enqueue_style('search_basic_style', plugins_url() . '/widget-plugin/Style/search_basic.css');
    }

    ///////////////////////// Sub Category Basic \\\\\\\\\\\\\\\\\\\\\\\\

    function load_sub_category_basic($page, $title) {

        include('View/sub_category_basic.html');

        wp_deregister_script('sub_category_script');
        wp_register_script('sub_category_script', plugins_url() . '/widget-plugin/Script/sub_category_basic.js', array('jquery'));
        wp_enqueue_script('sub_category_script');

        wp_enqueue_style('sub_category_style', plugins_url() . '/widget-plugin/Style/category_basic.css');
    }

    ///////////////////////// Category Header \\\\\\\\\\\\\\\\\\\\\\\\

    function load_category_header($page, $title) {

        include('View/category_header.html');

        wp_deregister_script('category_header_script');
        wp_register_script('category_header_script', plugins_url() . '/widget-plugin/Script/category_header.js', array('jquery'));
        wp_enqueue_script('category_header_script');

        wp_enqueue_style('category_header_style', plugins_url() . '/widget-plugin/Style/category_header.css');
    }

    ///////////////////////// Best Seller \\\\\\\\\\\\\\\\\\\\\\\\

    function load_best_seller($page, $title) {

        include('View/best_seller.html');

        wp_deregister_script('best_seller_script');
        wp_register_script('best_seller_script', plugins_url() . '/widget-plugin/Script/best_seller.js', array('jquery'));
        wp_enqueue_script('best_seller_script');

        wp_deregister_script('flexslider');
        wp_register_script('flexslider', plugins_url() . '/widget-plugin/Script/jquery.flexslider-min.js', array('jquery'));
        wp_enqueue_script('flexslider');

        wp_enqueue_style('best_seller_style', plugins_url() . '/widget-plugin/Style/best_seller.css');
        wp_enqueue_style('flexslider_style', plugins_url() . '/widget-plugin/Style/flexslider.css');
    }

    ///////////////////////// Product Popover \\\\\\\\\\\\\\\\\\\\\\\\

    function load_product_popover($page, $title) {

        include('View/product_popover.html');

        wp_deregister_script('product_popover_script');
        wp_register_script('product_popover_script', plugins_url() . '/widget-plugin/Script/product_popover.js', array('jquery'));
        wp_enqueue_script('product_popover_script');

        wp_enqueue_style('product_popover_style', plugins_url() . '/widget-plugin/Style/product_popover.css');
    }

}

add_action('wp_footer', 'print_my_scripts');

function print_my_scripts() {
    wp_print_scripts('unslider');
}

add_action('init', 'register_widget_scripts');

function register_widget_scripts() {

}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("wp_my_plugin");'));
?>