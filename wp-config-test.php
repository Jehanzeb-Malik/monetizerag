<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'w_shop');

/** MySQL database username */
define('DB_USER', 'w_shop_usr');

/** MySQL database password */
define('DB_PASSWORD', 'fJM+Fe_V1K@<');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '/$-.N_1m@5|F]yUpV72%ptmD-EPvCSmSuKva|b0/j2H=5z]Q.qM)%6Ow]Cblo$2l');
define('SECURE_AUTH_KEY',  'p?4*v5dzh7A>x4EwnG4BX_v-mj<P$&mDX!.[*STUv_HA^mtg21501W]w[G_-pfMP');
define('LOGGED_IN_KEY',    'u}ScwG-h%z`EtjW-}J]EX/+b4&@+h>RMLkS;WX]u5/Q_3|w{%>;YfPxn#%V80HV*');
define('NONCE_KEY',        'B{.r:$8f%a-e >t]y_iqAyJtUkr3p|x*(oe3Q(vm)-s/l{5mweJ2lu=G]-*Gk&lp');
define('AUTH_SALT',        '*0~JekY1@|+[g2oA9jwNYz-eG#R?JZE]|_l63j mLw3Yo[@{&1|K@$Yy=Ilqo=+Q');
define('SECURE_AUTH_SALT', 'N00O+QsAp-it ) x|>hw}!Yi?_9Db.(gw4%82o;lz>@@%+]D9mjcXzN-!!c_T]=%');
define('LOGGED_IN_SALT',   '()v*FOi~A W$p=uOrDP|LfJBE!h/9bQ:?vH)Cg)?w_mqT,;7C#5/p+pMQx@w;Obt');
define('NONCE_SALT',       'Vs+z-w#,4h>=pX<NJ23y[a-Fj+(gVHK/H}}2|vLJ7Zw$J_DyK?bL;c@T77JR))3d');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
