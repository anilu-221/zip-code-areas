<?php
/**
 * Functions for enqueueing files.
 *
 * @package zip
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue scripts and styles for the plugin.
 */
function zip_enqueue_scripts() {
	// Css Files.
	wp_enqueue_style( 'zip_styles', ZIP_PLUGIN_URL . '/src/app.css', array(), ZIP_PLUGIN_VERSION );
	// Js Files.
	wp_enqueue_script( 'zip_scripts', ZIP_PLUGIN_URL . '/src/app.js', array( 'jquery' ), ZIP_PLUGIN_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'zip_enqueue_scripts' );
