<?php
/**
 * Functions for zip code area functionality.
 *
 * @package zip
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**Localize Script for AJAX Call and CSV File*/
function zip_ajax_localize() {
	// CSV File.
	$file = get_field( 'csv_file', 'option' );

	// AJAX Call Localize.
	wp_localize_script(
		'zip_scripts',
		'serviceAreasObj',
		array(
			'url'   => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'sa_nonce' ),
			'hook'  => 'zip_service_area',
		)
	);

	// ACF Field (localize uploaded csv file).
	$csv = false;
	if ( $file ) {
		// Convert CSV to array.
		$csv = array_map( 'str_getcsv', file( $file ) );

		// Get variables.
		$service_type  = get_field( 'services', 'option' );
		$cat_cols      = get_field( 'category_columns', 'option' );
		$services_cols = get_field( 'services_columns', 'option' );
		$g_success     = get_field( 'general_success_message', 'option' );
		$g_error       = get_field( 'general_error_message', 'option' );
		$s_success     = get_field( 'several_success_message', 'option' );
		$s_error       = get_field( 'several_error_message', 'option' );
		$btn_txt       = get_field( 'success_button_text', 'option' );
		$btn_url       = get_field( 'success_button_url', 'option' );
	}

	// Localize File.
	wp_localize_script(
		'zip_scripts',
		'serviceAreasFile',
		array(
			'zipFile'        => $csv,
			'serviceType'    => $service_type,
			'catColumns'     => $cat_cols,
			'serviceColumns' => $services_cols,
			'gSuccess'       => $g_success,
			'gError'         => $g_error,
			'sSuccess'       => $s_success,
			'sError'         => $s_error,
			'btnText'        => $btn_txt,
			'btnUrl'         => $btn_url,
		)
	);
}
add_action( 'wp_enqueue_scripts', 'zip_ajax_localize', 25 );

/**AJAX Function */
function zip_service_area() {
	// Nonce.
	// check_ajax_referer( 'sa_nonce' ); //phpcs:ignore.

	// Variables.
	$zip_code = $_POST['zipcode']; //phpcs:ignore
	$zip_file = get_field( 'zip_code_csv_file', 'option' );
	echo $zip_code; //phpcs:ignore
	// Die.
	wp_die();
}

add_action( 'wp_ajax_nopriv_zip_service_area', 'zip_service_area' );
add_action( 'wp_ajax_zip_service_area', 'zip_service_area' );

/**Shortcode Function*/
function zip_service_areas_shortcode() {
	ob_start();
	get_template_part( '/template-parts/service', 'areas' );
	return ob_get_clean();
}

add_shortcode( 'zip_zipcode', 'zip_service_areas_shortcode' );
