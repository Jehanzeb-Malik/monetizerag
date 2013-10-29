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
define('DB_NAME', 'monetizer101_db');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

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
define('AUTH_KEY',         'X7PMohKzYSgSl=f`^WX_P.@#}077TpC^S;X;RyIQGTz~zD}Rz9{]%R=4=p37d)XO');
define('SECURE_AUTH_KEY',  'SC{KW*n`tH|WN96%b$.q68NkFM4L.E{OaMZQkjqXdbcz%4V)t2^(Kd%1jBH^FXyE');
define('LOGGED_IN_KEY',    'L..IPF*p 4[&cR]0Gs46Ju !10Yxp^Qg&+;-Z+~&pwwU@<i]K%)uk29BR5P.~9x9');
define('NONCE_KEY',        'pXb1R#1,].RYI&6=X6A~VK:by~l=dwVhTQ?owga]#P-]e1Cp9<%KZ)Zz4sPGCaV6');
define('AUTH_SALT',        '~-nHkN@,Rrh~Rmh;d/aLtRGZ41N(zoFD<S&.a}[E~#G$x8wN!s7W+-?6iWrG8Y^R');
define('SECURE_AUTH_SALT', '~sOB^=)3MgZXZvhCz>>#@[?8Go= 7]~C1O<N3<1xd=yPm@P(i7aEyS7pR-@ aZ&x');
define('LOGGED_IN_SALT',   'x9wun,l:%L9VuEg#nlh7RQtU&i-8_,yv|_}V]<Qwt%UbF7LxBi,~k^}pfFq$f^(7');
define('NONCE_SALT',       'z&dXvK^(7FI`O+%u-v_6c^HZK7,|(W]J`?][Tez,-)z4&lHfTLSr.Kw8]jb*<i0I');

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
