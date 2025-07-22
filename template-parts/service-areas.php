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
$file       = get_field( 'csv_file', 'option' );
$services   = get_field( 'services', 'option' );
$categories = get_field( 'category_columns', 'option' );
?>

<!--Form--> 
<div class="zip-form-wrapper"  data-zip-form>
	<form method="post" class="sa-form" data-sa-form>
		<!--ZIP CODE-->
		<div class="zip-form-input">
			<label for="zipcode"><strong>Enter your zipcode: </strong> </label>
			<input class="zip-form-fields" type="text" name="zipcode" required  data-zip-input>
		</div>


		<!--Categories-->
		<?php
		if ( 'Several Services' === $services ) {
			?>
			<div class="zip-form-input">
				<label for="sa-form-select"><strong>Service Type</strong> </label>
				<select class="zip-form-fields" name="sa-form-select" data-service-select>
					<option value="all">All</option>
					<?php
					foreach ( $categories as $category ) {
						$cat_name  = $category['category_title'];
						$cat_title = ucfirst( $cat_name );
						?>
						<option value="<?php echo esc_attr( $cat_name ); ?>"><?php echo esc_html( $cat_title ); ?></option>
						<?php
					}
					?>
				</select>
			</div>
			<?php
		}
		?>

		<!--BUTTON--> 
		<button class="zip-form-btn" type="submit" value="Enter"> CHECK RESULTS </button>
	</form>

	<!--AJAX Result--> 
	<div class="sa-result" data-result></div>
</div>
