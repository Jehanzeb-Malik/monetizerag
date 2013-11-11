<?php
/**
 * The Header for the theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage monetizer_theme
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
    <!--<![endif]-->
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width">
        <title><?php wp_title('|', true, 'right'); ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
        <!--[if lt IE 9]>
        <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
        <![endif]-->

        <?php wp_head(); ?>
        <script type="text/javascript">
            var monetizer_site_url = "<?php echo bloginfo('siteurl'); ?>";
            var shopId = "<?php echo bloginfo('siteurl'); ?>/";
            var InitData = { 
                'shopId': 1,
                'baseUrl': "<?php echo bloginfo('siteurl'); ?>/" 
            };
        </script>
    </head>

    <body <?php body_class(); ?>>
        <div id="window">
        </div>
        <script id="monetizer101-api" data-main="<?php echo bloginfo('siteurl'); ?>/js/api/monetizer101-api.js" data-onload="onReady()" data-log='{"level":"INFO"}' src="<?php echo bloginfo('siteurl'); ?>/js/require.js"> </script>
        <div id="wrapper">
            <div id="top-bar">
                <div id="blue-bar-wrapper">
                    <p class="blue-bar-label">
                        <img class="blue-bar-icon" src="<?php bloginfo('template_directory'); ?>/images/header-heart.png" width="24px" height="24px">
                        <span class="blue-bar-text">FIND THE BEST PRODUCTS</span>
                    </p>
                    <p class="blue-bar-label">
                        <img class="blue-bar-icon" src="<?php bloginfo('template_directory'); ?>/images/header-percent.png" width="24px" height="24px">
                        <span class="blue-bar-text">DISCOUNTS UP TO 70% OFF</span>
                    </p>
                    <p class="blue-bar-label">
                        <img class="blue-bar-icon" src="<?php bloginfo('template_directory'); ?>/images/header-percent.png" width="24px" height="24px">
                        <span class="blue-bar-text">HUNDREDS OF SELLERS & STORES</span>
                    </p>
                </div>
            </div>
            <div id="header">
                <div id="header-content-wrapper">
                    <?php if (!isset($_GET['referrer'])) { ?>
                        <div id="top-bar2">
                            <a href="<?php echo bloginfo('siteurl'); ?>" id="logo1">
                                <img id="affiliate-logo" src="<?php bloginfo('template_directory'); ?>/images/logo.png" width="239px" height="25px">
                            </a>
                            <div id="drop-down-lists">
                                <div class="dropdown-container" id="drop-down-list2">
                                    <input class="search-input" id="search-input-list2" value="Search all" onclick="javascript:if(this.value == 'Search all'){this.value='';}" onfocus="javascript: if (this.defaultValue==this.value)this.value = '';" onblur="javascript:if(this.value == ''){this.value = 'Search all';}"/>
                                    <button class="search-button-header" id="search-button-header-all"></button>
                                </div>

                                <div class="dropdown-container" id="drop-down-list3">
                                    <input class="search-input" id="search-input-list3" value="Search a product or brand" onclick="javascript:if(this.value == 'Search a product or brand'){this.value='';}" onfocus="javascript: if (this.defaultValue==this.value)this.value = '';" onblur="javascript:if(this.value == ''){this.value = 'Search a product or brand';}"/>
                                    <button class="search-button-header" id="search-button-header-product-brand"></button>
                                </div>
                            </div>
                            <div id="how-does-it-work">
                                <span>
                                    ?
                                </span> 
                                <p>
                                    <a href="<?php echo bloginfo('siteurl'); ?>/how-it-works/" style="color:black;">How does it works?</a>
                                </p>
                            </div>
                        </div>

                        <div id="top-bar3">
                            <ul id="menu">
                                <li><a href="">FASHION</a></li>
                                <li><a href="">BEAUTY & HEALTH</a></li>
                                <li><a href="">ELECTRONICS</a></li>
                                <li><a href="">HOME & GARDEN</a></li>
                                <li><a href="">FREE TIME</a></li>
                                <li><a href="">TOYS & GIFT</a></li>
                            </ul>
                            <a href="<?php echo bloginfo('siteurl'); ?>/all-sellers" class="menu-label">
                                <span>SHOP BY SELLER</span>
                            </a>

                        </div>
                    <?php } else { ?>
                        <div id="header-iframe">
                            <div id="top-bar2">
                                <div id="drop-down-lists">
                                    <div id="drop-down-list1" style="float: left;">
                                        <ul class="sf-menu" id="departments-dropdown">
                                            <li class="current">
                                                <input class="styled-list" readonly placeholder="Shop by Departments" style="background:  url('<?php bloginfo('template_directory'); ?>/images/button-1.png') no-repeat 100%; padding: 2px 10px;"></input>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="dropdown-container" id="drop-down-list2">
                                        <input class="search-input" id="search-input-list2" value="Search all" onclick="javascript:if(this.value == 'Search all'){this.value='';}" onfocus="javascript: if (this.defaultValue==this.value)this.value = '';" onblur="javascript:if(this.value == ''){this.value = 'Search all';}"/>
                                        <button class="search-button-header" id="search-button-header-all"></button>
                                    </div>

                                    <div class="dropdown-container" id="drop-down-list3">
                                        <input class="search-input" id="search-input-list3" value="Search a product or brand" onclick="javascript:if(this.value == 'Search a product or brand'){this.value='';}" onfocus="javascript: if (this.defaultValue==this.value)this.value = '';" onblur="javascript:if(this.value == ''){this.value = 'Search a product or brand';}"/>
                                        <button class="search-button-header" id="search-button-header-product-brand"></button>
                                    </div>
                                </div>
                                <div id="how-does-it-work">
                                    <span>
                                        ?
                                    </span> 
                                    <p>
                                        <a href="<?php echo bloginfo('siteurl'); ?>/how-it-works/" style="color:black;">How does it works?</a>
                                    </p>
                                </div>
                            </div>

                            <div id="top-bar3">
                                <a href="<?php echo bloginfo('siteurl'); ?>/all-sellers" class="menu-label">
                                    <span>SHOP BY SELLER</span>
                                </a>

                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>
            <div id="draw-here"></div>
        </div>
        <div id="main" class="site-main">