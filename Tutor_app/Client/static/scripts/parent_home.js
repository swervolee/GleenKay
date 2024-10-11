$(document).ready(function() {
    $('#closeMenu').on('click', function () {
        $('#mobileNavbar').collapse('hide');
    });

    // Close dropdown when clicking outside or scrolling
    $(document).on('click touchstart scroll', function (e) {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('#mobileNavbar').collapse('hide');
        }
    });



    // Initially hide all sections
    $('.singular').hide();
    $('.payments').hide();

    $('#sidebar ul li').on('click', function(event) {
        event.preventDefault();

        $('#sidebar ul li a').removeClass('active text-danger');

        $(this).find('a').addClass('active');

        const clickedText = $(this).find('a').text().trim();


        if (clickedText === 'Manage Child Accounts') {
            $('.singular').fadeIn(500);
            $('.payments').fadeOut(500);
            $('.dashboard').fadeOut(500);

        } else if (clickedText === 'Dashboard') {
            $('.dashboard').fadeIn(500);
            $('.payments').fadeOut(500);
            $('.singular').fadeOut(500);
        } else if (clickedText === 'Payment History') {

            $('.payments').fadeIn(500);
            $('.singular').fadeOut(500);
            $('.dashboard').fadeOut(500);
        }

        console.log(clickedText + ' clicked');
    });

    // Click event for the navigation items
    $('.navbar-nav li').on('click', function(event) {
        event.preventDefault();

        // Remove 'active' class from all links and add to the clicked one
        $('.navbar-nav li a').removeClass('active text-danger');
        $(this).find('a').addClass('active');

        // Get the text of the clicked item
        const clickedText = $(this).find('a').text().trim();

        // Show and hide sections based on the clicked text
        if (clickedText === 'Manage Child Accounts') {
            $('.singular').fadeIn(500);
            $('.payments').fadeOut(500);
            $('.dashboard').fadeOut(500);
        } else if (clickedText === 'Dashboard') {
            $('.dashboard').fadeIn(500);
            $('.payments').fadeOut(500);
            $('.singular').fadeOut(500);
        } else if (clickedText === 'Payment History') {
            $('.payments').fadeIn(500);
            $('.singular').fadeOut(500);
            $('.dashboard').fadeOut(500);
        }

        console.log(clickedText + ' clicked');
    });


    function openBookingModal(childName) {
        $('#childName').val(childName);  // Set the hidden input value
        $('#childNameDisplay').text(childName);  // Display the child name in the modal
        $('#bookingModal').modal('show');  // Use Bootstrap to show the modal
    }

    // Function to close the booking modal
    function closeBookingModal() {
        $('#bookingModal').modal('hide');  // Use Bootstrap to hide the modal
    }

    //Function to flash message after booking lesson
    function flashy() {
	$('#flashMessage').removeClass('d-none').hide().fadeIn(300); // Show and fade in the message

	// Optional: Hide the flash message after a few seconds
	setTimeout(() => {
            $('#flashMessage').fadeOut(300, function() {
		$(this).addClass('d-none'); // Re-hide the alert after fading out
            });
	}, 5000);
    }

    flashy();
    // Function to handle lesson booking submission
    function bookLesson(event) {
        event.preventDefault();

        const childName = $('#childName').val();
        const subject = 'Math';  // Set subject to Math directly
        const date = $('#date').val();
        const time = $('#time').val();

        // Log the booking details or perform booking logic here
        console.log({
            childName,
            subject,
            date,
            time
        });

        // Close the modal after booking
        closeBookingModal();

    }


    // Expose functions globally (if needed)
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
});
