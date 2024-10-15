$(document).ready(function() {	
	// Define sections to toggle
	const sections = ['.dashboard', '.planning', '.payments', '.work-dashboard'];

	// Initially hide all sections except the dashboard
	$(sections.join(',')).hide();
	$('.dashboard').show();

	// Helper function to show/hide sections based on clicked text
	function toggleSection(clickedText) {
		// Hide all sections by default
		$(sections.join(',')).fadeOut(500);

		// Show the relevant section based on the clicked text
		switch (clickedText) {
			case 'Planning':
				$('.planning').fadeIn(500);
				break;
			case 'Dashboard':
				$('.dashboard').fadeIn(500);
				break;
			case 'Work Dashboard':
				$('.work-dashboard').fadeIn(500);
				break;
			case 'Paychecks':
				$('.payments').fadeIn(500);
				break;
			default:
				console.log('Unknown section:', clickedText);
		}
	}

	// Sidebar navigation click handling
	$('#sidebar ul li').on('click', function() {
		$('#sidebar ul li a').removeClass('active text-danger');
		$(this).find('a').addClass('active');

		const clickedText = $(this).find('a').text().trim();
		toggleSection(clickedText);

		console.log(`${clickedText} clicked`);
	});

	// Handle navigation items in the navbar
	$('.navbar-nav li').on('click', function(event) {
		$('#sidebar ul li a').removeClass('active text-danger');
		$(this).find('a').addClass('active');

		const clickedText = $(this).find('a').text().trim();
		toggleSection(clickedText);
		console.log(`${clickedText} clicked`);
	});
});
