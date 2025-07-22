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

		$('[data-zip-form]').each(function () {
			const $wrapper   = $(this);
			const $form      = $wrapper.find('[data-sa-form]');
			const $zipInput  = $wrapper.find('[data-zip-input]');
			const $select    = $wrapper.find('[data-service-select]');
			const $resultdiv = $wrapper.find('[data-result]');
			$form.on('submit', function (e) {
				e.preventDefault();
				const zipCode  = $zipInput.val();

				$.ajax({
					type: 'POST',
					url: serviceAreasObj.url,
					data: {
						action: serviceAreasObj.hook,
						nonce: serviceAreasObj.nonce,
						zipcode: zipCode,
					},
					success: function (result) {
						if (csvArray != false) {
							if (serviceType === 'General Service') {
								let found = false;
								for (let value of csvArray) {
									if (value[0] == result) {
										$resultdiv.html(`
											<p style="font-weight: 700;">${gSuccess} ${value[0]} in ${value[1]}.</p>
											<a class="button" href="${btnUrl}">${btnText}</a>
										`);
										found = true;
										break;
									}
								}
								if (!found) {
									$resultdiv.html(`<p>${gError}</p>`);
								}
							} else if (serviceType === 'Several Services') {
								let category = 'all';
								if ($select.length) {
									category = $select.val();
								}
								let columns       = csvArray[0];
								let servicesArray = [];
								let areaName      = '';
								let areaLink      = null;

								for (let values of csvArray) {
									if (values[0] == result) {
										areaName = values[1];
										areaLink = values[2];
										for (let i = 0; i < values.length; i++) {
											if (values[i] == 1) {
												let serviceName = columns[i];
												let capService = serviceName
													.split(' ')
													.map(word => word.charAt(0).toUpperCase() + word.slice(1))
													.join(' ');

												if (category === 'all') {
													servicesArray.push(capService);
												} else {
													for (let serviceField of serviceColumns) {
														if (
															serviceField.service_category === category &&
															serviceField.service_title === serviceName
														) {
															servicesArray.push(capService);
														}
													}
												}
											}
										}
									}
								}

								if (servicesArray.length > 0) {
										if (areaLink) {
											// Add protocol if it's missing
											if (!/^https?:\/\//i.test(areaLink)) {
												areaLink = 'https://' + areaLink;
											}
											areaName = '<a href="' + areaLink + '">' + areaName + '</a>';
										}
									///////
									let listItems = servicesArray.map(s => `<li>${s}</li>`).join('');
									let categoryText = category === 'all' ? '' : `<span style="font-weight:700;">${category}</span> `;
									$resultdiv.html(`
										<p style="margin:12px 0;">We offer the following ${categoryText}services in <span style="font-weight:700;">${result} ${areaName}</span>:</p>
										<ul>${listItems}</ul>
										<a class="button zip-button" href="${btnUrl}">${btnText}</a>
									`);
								} else {
									let msg = category === 'all'
										? `We don't offer services in ${result}.`
										: `We don't offer ${category} services in ${result}.`;
									$resultdiv.html(`<p style="margin:12px 0;">${msg}</p>`);
								}
							}
						} else {
							$resultdiv.html('ERROR: upload csv file with zip codes');
						}
					}
				});
			});
		});

	}
);
