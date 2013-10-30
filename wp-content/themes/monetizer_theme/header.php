<?php
/**
 * The Header for our theme.
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

    </head>

    <body <?php body_class(); ?>>
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
                    <div id="top-bar2">
                        <a href="" id="logo1">
                            <img id="affiliate-logo" src="<?php bloginfo('template_directory'); ?>/images/logo.png" width="239px" height="25px">
                        </a>
                        <div id="drop-down-lists">
                            <div id="drop-down-list1" style="float: left;">
                                <ul class="sf-menu" id="departments-dropdown">
                                    <li class="current">
                                        <input class="styled-list" readonly placeholder="Shop by Departments" style="background:  url('<?php bloginfo('template_directory'); ?>/images/button-1.png') no-repeat 100%; padding: 2px 10px;"></input>
                                        <ul>
                                            <li class="current">
                                                <span class="macro-list-item">Fashion</span>
                                                <ul>
                                                    <li class="current">
                                                        <a href="#">Seasonal</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Costume & Party</a></li>
                                                            <li><a href="#">Christmas</a></li>
                                                            <li><a href="#">Halloween</a></li>
                                                            <li><a href="#">Valentine's Day</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Clothing</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Men</a></li>
                                                            <li><a href="#">Women</a></li>
                                                            <li><a href="#">Lingerie</a></li>
                                                            <li><a href="#">Beachwear</a></li>
                                                            <li><a href="#">Accessories</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Jewelry</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Jewels</a></li>
                                                            <li><a href="#">Watches</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Bags & Luggage</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Bags</a></li>
                                                            <li><a href="#">Wallet</a></li>
                                                            <li><a href="#">Luggage</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Shoes</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Men</a></li>
                                                            <li><a href="#">Women</a></li>
                                                            <li><a href="#">Kids</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Special Occasion</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Wedding Dress</a></li>
                                                            <li><a href="#">Cocktail Dress</a></li>
                                                            <li><a href="#">Accessories</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <span class="macro-list-item">Beauty & Health</span>
                                                <ul>
                                                    <li class="current">
                                                        <a href="#">Beauty</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Fragrances</a></li>
                                                            <li><a href="#">Cosmetics</a></li>
                                                            <li><a href="#">Wellness</a></li>
                                                            <li><a href="#">Accessories</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Vision Care</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Prescription</a></li>
                                                            <li><a href="#">Fashion</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <span class="macro-list-item">Electronics</span>
                                                <ul>
                                                    <li class="current"><a href="#">Computer & Software</a></li>
                                                    <li><a href="#">Cellphones & Tablets</a></li>
                                                    <li><a href="#">Audio & Video</a></li>
                                                    <li><a href="#">Photography</a></li>
                                                    <li><a href="#">Accessories</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <span class="macro-list-item">Home & Garden</span>
                                                <ul>
                                                    <li class="current">
                                                        <a href="#">Home</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Furniture</a></li>
                                                            <li><a href="#">Textiles</a></li>
                                                            <li><a href="#">Appliances</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Garden</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Flowers & Plants</a></li>
                                                            <li><a href="#">Furniture</a></li>
                                                            <li><a href="#">Accessories</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Food & Drinks</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Snack</a></li>
                                                            <li><a href="#">Confectionary</a></li>
                                                            <li><a href="#">Food Service</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Pets & Animal Gear</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <span class="macro-list-item">Free Time</span>
                                                <ul>
                                                    <li class="current"><a href="#">Books & Magazines</a></li>
                                                    <li><a href="#">Travel</a></li>
                                                    <li>
                                                        <a href="#">Sports</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Sportswear</a></li>
                                                            <li><a href="#">Shoes</a></li>
                                                            <li><a href="#">Equipment</a></li>
                                                            <li><a href="#">Outdoor Gear</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <span class="macro-list-item">Toys & Gifts</span>
                                                <ul>
                                                    <li class="current"><a href="#">Gifts Gadgets & Toys</a></li>
                                                    <li>
                                                        <a href="#">Babies & Kids</a>
                                                        <ul>
                                                            <li class="current"><a href="#">Apparel</a></li>
                                                            <li><a href="#">Toys</a></li>
                                                            <li><a href="#">Accessories</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div id="drop-down-list2"  style="float: left;">

                                <select class="styled-select" style="background:  url('<?php bloginfo('template_directory'); ?>/images/button-2.png') no-repeat 100%;">
                                    <option value="option">Search a product or brand</option>
                                    <option value="option">option</option>
                                    <option value="option">option</option>
                                    <option value="option">option</option>
                                </select>
                            </div>
                        </div>
                        <div id="how-does-it-work">
                            <span>
                                ?
                            </span> 
                            <p>
                                <a href="#" style="color:black;">How does it works?</a>
                            </p>
                        </div>
                    </div>

                    <div id="top-bar3">
                        <ul id="menu">
                            <li><a href="">FASHION</a></li>|
                            <li><a href="">BEAUTY & HEALTH</a></li>|
                            <li><a href="">ELECTRONICS</a></li>|
                            <li><a href="">HOME & GARDEN</a></li>|
                            <li><a href="">FREE TIME</a></li>|
                            <li><a href="">TOYS & GIFT</a></li>
                        </ul>
                        <a href="" class="menu-label">
                            <span>SHOP BY SELLER</span>
                        </a>

                    </div>

                </div>
            </div>
        </div>
        <div id="main" class="site-main">
