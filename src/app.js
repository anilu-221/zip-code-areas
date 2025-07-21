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
		var btnText        = serviceAreasFile.btnText;
		var btnUrl         = serviceAreasFile.btnUrl;
		
		
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
					nonce: serviceAreasObj.nonce,
					zipcode: zipCode,
				},
				success: function (result) {
					//If there is an uploaded file
					if( csvArray != false ){
						// General Service.
						if ( 'General Service' == serviceType ) {
							for ( let value of csvArray ) {
									//If zipcode is found
									if( value[0] == result ){

										$('#sa-result').html(`

										<br>
										<p style="font-weight: 700;">${gSuccess} ${value[0]} in ${value[1] }.</p>
										<a class="button" href="${btnUrl}"> ${btnText} </a>

										`);

										break;
									}   else{
										//If it is not found
										$('#sa-result').html(`<br><p> ${gError} </p>`);
									}
							}
						}

						// Several Services.
						if ( 'Several Services' == serviceType ) {
							let columns  = csvArray[0];
							let category = formSelect.val();
							let servicesArray = [];
							let areaName = '';

							// Populate services array based on category.
							for ( let values of csvArray ) {
								if( values[0] == result ) {
									areaName = values[1];
									let index = 0;
									for ( let item of values ) {
										if ( item == 1) {
											let serviceName = columns[index];
											if ( 'all' == category ) {
												let capService = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
												servicesArray.push( capService );
											} else {
												for ( let serviceField of serviceColumns ) {
													let serviceCategory = serviceField['service_category'];
													if ( serviceCategory == category ) {
														if ( serviceName == serviceField['service_title'] ) {
															let capService = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
															servicesArray.push( capService );
														}

													}
													

												}
											}
										}
										index++;
										
									}
									
								}
							}

							// Add results to HTML.
							// Check lenght of services Array
							if ( servicesArray.length > 1 ) {
								if ( 'all' == category ) {
									$('#sa-result').html(`
										<p style="margin:12px 0;"> <span>We offer the following services in <span style="font-weight:700;">${areaName }</span>: </span></p>
										<ul style="margin-bottom:12px">
										${servicesArray.map(service => `<li>${service}</li>`).join('')}
										</ul>
										<a class="button zip-button" href="${btnUrl}"> ${btnText} </a>
									`);
								} else {
									$('#sa-result').html(`
										<p style="margin:12px 0;"> <span>We offer the following <span style="font-weight:700;">${category }</span> services in <span style="font-weight:700;">${areaName }</span>: </span></p>
										<ul>
										${servicesArray.map(service => `<li>${service}</li>`).join('')}
										</ul>
										<a class="button zip-button" href="${btnUrl}"> ${btnText} </a>
									`);
								}
							} else {
								if ( 'all' == category ) {
									$('#sa-result').html(`
											<p style="margin:12px 0;">We don't offer services in ${result }.</p>
									`);
								} else {
									$('#sa-result').html(`
											<p style="margin:12px 0;">We don't offer ${category } services in ${result }.</p>
									`);
								}

							}

	
							

						}
					}
					else{
						$('#sa-result').html('ERROR: upload csv file with zip codes');
					}

				}
			});
		});
	}
);
