jQuery(document).ready( 
	function ($) {
		// Variables from form.
		var formSelect = $( '#sa-form select' );

		var csvArray       = serviceAreasFile.zipFile;
		var serviceType    = serviceAreasFile.serviceType;
		var catColumns     = serviceAreasFile.catColumns;
		var serviceColumns = serviceAreasFile.serviceColumns;
		var gSuccess       = serviceAreasFile.gSuccess;
		var gError         = serviceAreasFile.gError;
		var sSuccess       = serviceAreasFile.sSuccess;
		var sError         = serviceAreasFile.sError;
		var btnText        = serviceAreasFile.btnText;
		var btnUrl         = serviceAreasFile.btnUrl;
		
		/*
		// Zip Form.
		$( '#sa-form' ).on( 'submit', function (e) {
			e.preventDefault();

			//Variables
			var zipCode = $( '#zipcode' ).val();

			jQuery.ajax({
				type: 'POST',
				url: serviceAreasObj.url,
				data: {
					action: serviceAreasObj.hook,
					_ajax_nonce: serviceAreasObj.nonce,
					zipcode: zipCode,
				},
				success: function (result) {
					//If there is an uploaded file
					if(zipArray != false){
						//Loop through array
						for (let value of zipArray) {
								//If zipcode is found
								if(value[0] == result){

									$('#sa-result').html(`

									<br>
									<p style="color: #259806; font-weight: 700;">${sucessMsgEng} ${value[0]} in ${value[1] }.</p>
									<a class="button" href="${btnUrlEng}"> ${btnTextEng} </a>

									`);

									break;
								}   else{
									//If it is not found
									$('#sa-result').html(`<br><p> ${errorMsgEng} </p>`);
								}
							}
					}
					else{
						$('#sa-result').html('ERROR: upload csv file with zip codes');
					}

				}
			});
		});
		*/
	}
);
