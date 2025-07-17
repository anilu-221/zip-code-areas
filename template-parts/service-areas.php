<?php
/**
 * Template for service area shortcode.
 *
 * @package zip
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Variables.
$file = get_field( 'csv_file', 'option' );
?>

<!--Form--> 
<div id="zip-form">
	<form method="post" id="sa-form" action="">
		<!--ZIP CODE-->
		<label for="zipcode"><strong>Enter your zipcode: </strong> </label>
		<input style="width:200px" type="text" name="zipcode" id="zipcode" required="required">
		<!--BUTTON--> 
		<input type="submit" value="Enter">
	</form>
</div>

<!--AJAX Result--> 
<div id="sa-result"></div>
