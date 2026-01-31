<?php
/**
 * Plugin Name: Zip Code Areas
 * Description: Zip Code Areas Custom Plugin
 * Author: Analucia M.
 * Version: 1.0.5
 * License: GPL v2 or later
 * Author URI: https://analucia.dev/
 * Text Domain: zip
 *
 * @package zip
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ZIP_PLUGIN_VERSION', '1.0.5' );
define( 'ZIP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'ZIP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'ZIP_MISSING_ACF_MESSAGE', '"Zip Code Areas" plugin requires "Advanced Custom Fields Pro" to run. Please download and activate it or contact your web developer.' );

// Load.
require_once ZIP_PLUGIN_PATH . '/inc/zip-acf.php';
require_once ZIP_PLUGIN_PATH . '/inc/zip-code-areas.php';
require_once ZIP_PLUGIN_PATH . '/inc/zip-files.php';
