<?php
/*
  Plugin Name: Widget Plugin
  Plugin URI: http://www.wpexplorer.com/
  Description: A simple plugin that adds a simple widget
  Version: 1.0
  Author: Abdur Rahman
  Author URI: http://www.wpexplorer.com/
  License: GPL2
 */


//************************************************************************************************************************************************************
//********************************************************    api_scripts_method    **************************************************************************
//************************************************************************************************************************************************************
//include(dirname(__FILE__) . '/config.php');
//add_action('wp_head', 'api_widget_style', 1);
add_action('wp_enqueue_scripts', 'api_scripts_method');

//add_action('widgets_init', 'api_widget_load');
//echo '<pre>'; print_r($_REQUEST);die();
//************************************************************************************************************************************************************
//************************************************    Adding scripts and style sheets    *********************************************************************
//************************************************************************************************************************************************************


function api_scripts_method() {

    /////////////////////////// jQuery.min \\\\\\\\\\\\\\\\\\\\\\\\\\\\
    wp_register_script('jquery.min', plugins_url() . '/widget-plugin/Script/jquery.min.js');
    wp_enqueue_script('jquery.min');

    /////////////////////////// kreon font \\\\\\\\\\\\\\\\\\\\\\\\\\\\
//    wp_enqueue_style('stylesheet', plugins_url() . '/widget-plugin/Style/stylesheet.css');
    //If template is for coupon bought
    if (is_page_template("template-widget.php")) {

        /////////////////////////// testing_widget_1 \\\\\\\\\\\\\\\\\\\\\\\\\\\\
        wp_register_script('testing_widget_1', plugins_url() . '/widget-plugin/Script/testing_widget_1.js');
        wp_enqueue_script('testing_widget_1');

        wp_enqueue_style('testing_widget_1', plugins_url() . '/widget-plugin/Style/testing_widget_1.css');
    }

    //  echo plugins_url();exit;
}

function wp_my_plugin_load() {
    register_widget('wp_my_plugin');
}

//************************************************************************************************************************************************************
//*************************************************************    wp_my_plugin     **************************************************************************
//************************************************************************************************************************************************************



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
//                } else {
//                    echo '<div>
////                 <h3><a href="#">' . $title . '</a></h3>      
//                <div>';
//                }
//        echo 'Title: '. $title;exit;


        foreach ($this->widget_lists() as $key => $value) {
            if ($value == $title) {
                $abc = $key;
                break;
            }
            // echo $key;
            //  echo $title;
        }

//                $key = array_search($title, $this->widget_lists()); {
//                    echo $key;
//                    // echo $key;
//                    //  echo $title;
//                }
//        foreach($lists as $key => $value) {
//           echo($key);
//        }
//        
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
//                echo 'key';
//                echo $key;
        if ($name && !empty($name)) {    /////////////////////////????????????????????????????????????
            //$this->define_view($name, $page, $title);
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



    /*
     * Widget lists
     * Dependancy: widget function name
     */

//************************************************************************************************************************************************************
//***********************************************************    Widget lists    ******************************************************************************
//************************************************************************************************************************************************************


    function widget_lists() {
        $lists = array(
            'testing_widget_1' => 'A testing widget 1',
            'EG_Shop_Home_Main' => 'test etst',
            'Monetizer101_Home_Slider' => 'Monetizer101 Home Page Slider',
            'Monetizer101_Home_Department' => 'Monetizer101 Home Page Department box',
            'Monetizer101_Narrow_Results' => 'Monetizer101 Narrow Results Widget'
        );
        return $lists;
    }

    /**
     * Displays the widget settings controls on the widget panel.
     * Make use of the get_field_id() and get_field_name() function
     * when creating your form elements. This handles the confusing stuff.
     * @param $instance
     */
    function load_testing_widget_1($page, $title) {
        include('View/testing_widget_1.html');
    }

    ///////////////////////// Monetizer101_Narrow_Results \\\\\\\\\\\\\\\\\\\\\\\\

    function load_Monetizer101_Narrow_Results($page, $title) {

        include('View/Monetizer101_Narrow_Results.html');
      //  echo(plugins_url().'/widget-plugin/Script/Monetizer101_Narrow_Results.js');
        
        wp_register_script('Monetizer101_Narrow_Results', plugins_url() . '/widget-plugin/Script/Monetizer101_Narrow_Results.js');
        wp_enqueue_script('Monetizer101_Narrow_Results');

        wp_enqueue_style('Monetizer101_Narrow_Results', plugins_url() . '/widget-plugin/Style/Monetizer101_Narrow_Results.css');
    }

    ///////////////////////// Monetizer101_Home_Slider \\\\\\\\\\\\\\\\\\\\\\\\

    function load_Monetizer101_Home_Slider($page, $title) {

        include('View/Monetizer101_Home_Slider.html');

        wp_register_script('Monetizer101_Home_Slider', plugins_url() . '/widget-plugin/Script/Monetizer101_Home_Slider.js');
        wp_enqueue_script('Monetizer101_Home_Slider');

        wp_enqueue_style('Monetizer101_Home_Slider', plugins_url() . '/widget-plugin/Style/Monetizer101_Home_Slider.css');
    }

    ///////////////////////// Monetizer101_Home_Department \\\\\\\\\\\\\\\\\\\\\\\\

    function load_Monetizer101_Home_Department($page, $title) {

        include('View/Monetizer101_Home_Department.html');

        wp_register_script('Monetizer101_Home_Department', plugins_url() . '/widget-plugin/Script/Monetizer101_Home_Department.js');
        wp_enqueue_script('Monetizer101_Home_Department');

        wp_enqueue_style('Monetizer101_Home_Department', plugins_url() . '/widget-plugin/Style/Monetizer101_Home_Department.css');
    }

}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("wp_my_plugin");'));
?>


