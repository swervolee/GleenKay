$(document).ready(function() {
	// Close the mobile navbar when 'closeMenu' is clicked
	$('#closeMenu').on('click', () => $('#mobileNavbar').collapse('hide'));

	// Close the mobile navbar when clicking outside or on scroll
	$(document).on('click touchstart scroll', (e) => {
		if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
			$('#mobileNavbar').collapse('hide');
		}
	});

	// Initially hide all sections
	const hideSections = () => {
		$('.singular, .payments, .dashboard').hide();
	};	
	hideSections();
	$('.dashboard').show();

	// Helper function to toggle sections
	const toggleSections = (sectionToShow) => {
		hideSections();
		$(sectionToShow).fadeIn(500);
	};

	// Sidebar navigation handling
	$('#sidebar ul li').on('click', function(event) {
		event.preventDefault();

		// Remove active classes from all links and add to clicked one
		$('#sidebar ul li a').removeClass('active text-danger');
		$(this).find('a').addClass('active');

		const clickedText = $(this).find('a').text().trim();

		// Toggle corresponding sections based on clicked text
		switch (clickedText) {
			case 'Manage Child Accounts':
				toggleSections('.singular');
				break;
			case 'Dashboard':
				toggleSections('.dashboard');
				break;
			case 'Payment History':
				toggleSections('.payments');
				break;
		}

		console.log(`${clickedText} clicked`);
	});

	// Navbar navigation handling
	$('.navbar-nav li').on('click', function(event) {
		event.preventDefault();

		// Remove active classes and set active on clicked nav item
		$('.navbar-nav li a').removeClass('active text-danger');
		$(this).find('a').addClass('active');

		const clickedText = $(this).find('a').text().trim();

		// Toggle sections based on clicked text
		switch (clickedText) {
			case 'Manage Child Accounts':
				toggleSections('.singular');
				break;
			case 'Dashboard':
				toggleSections('.dashboard');
				break;
			case 'Payment History':
				toggleSections('.payments');
				break;
		}

		console.log(`${clickedText} clicked`);
	});

	// Open booking modal with child name
	function openBookingModal(childName, childId) {
		$('#childName').val(childName);
		$('#childNameDisplay').text(childName);
		$('#childNameDisplay').data('id', childId);
		$('#bookLessonForm').attr('action', `booking/${childId}`);
		$('#bookingModal').modal('show');
	}

	// Close the booking modal
	function closeBookingModal() {
		$('#bookingModal').modal('hide');
	}

	// Flash a message after booking
	function flashy() {
		$('#flashMessage').removeClass('d-none').hide().fadeIn(300);

		// Hide the message after 5 seconds
		setTimeout(() => {
			$('#flashMessage').fadeOut(300, () => {
				$(this).addClass('d-none');
			});
		}, 5000);
	}

	// Show or hide the input field for custom math area
	function toggleInput() {
		const mathAreaSelect = $('#mathArea');
		const otherMathAreaContainer = $('#otherMathAreaContainer');

		if (mathAreaSelect.val() === 'other') {
			otherMathAreaContainer.show();
		} else {
			otherMathAreaContainer.hide();
		}
	}

	// Handle lesson booking submission
	function bookLesson(event) {
		/*event.preventDefault();
	$('#bookLessonForm').attr('action', `child/${('#childNameDisplay').data('id')}`);
				const childName = $('#childName').val();
				const subject = 'Math';
				const date = $('#date').val();
				const time = $('#time').val();
				const mathArea = $('#mathArea').val() === 'other' ? $('#otherMathArea').val() : $('#mathArea').val();

				console.log({
						childName,
						subject,
						date,
						time,
						mathArea
				});*/

		// Close the booking modal
		this.reset();
		closeBookingModal();
		flashy();
	}

	// Expose functions to global scope
	window.openBookingModal = openBookingModal;
	window.closeBookingModal = closeBookingModal;

	// Event listeners for math area dropdown
	$('#mathArea').on('change', toggleInput);
	$('#bookLessonForm').on('submit', bookLesson);


	//Deleting child account code

});
