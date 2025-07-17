<?php
/**
 * Functions related to ACF.
 *
 * @package zip
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Check if ACF Pro is active.
 */
function zip_notice_missing_acf() {
	if ( ! class_exists( 'ACF_Pro' ) ) {
		echo '<div class="notice notice-error"><div class="notice-title">' . esc_html( ZIP_MISSING_ACF_MESSAGE ) . '</div></div>';
	}
}
add_action( 'admin_notices', 'zip_notice_missing_acf' );

/**
 * Add options page for ACF.
 */
function zip_acf_add_options_page() {
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page(
			array(
				'page_title'      => __( 'Zip Code Areas Settings', 'zip' ),
				'menu_title'      => __( 'Zip Code Areas', 'zip' ),
				'menu_slug'       => 'zip-code-areas-settings',
				'capability'      => 'manage_options',
				'redirect'        => false,
				'icon_url'        => 'dashicons-location-alt',
				'position'        => 20,
				'update_button'   => __( 'Update Settings', 'zip' ),
				'updated_message' => __( 'Settings updated successfully.', 'zip' ),
			)
		);
	}
}
add_action( 'acf/init', 'zip_acf_add_options_page' );

/**
 * Set the ACF JSON save point.
 *
 * @param string $path The path to the ACF JSON save point.
 * @return string
 */
function zip_acf_json_save_point( $path ) {
	$path = ZIP_PLUGIN_PATH . '/acf-json';
	return $path;
}

add_filter( 'acf/settings/save_json', 'zip_acf_json_save_point' );

/**
 * Set the ACF JSON load point.
 *
 * @return string
 */
function zip_acf_json_load_point() {
	$path = ZIP_PLUGIN_PATH . '/acf-json';
	return $path;
}
add_filter( 'acf/settings/load_json', 'zip_acf_json_load_point' );
