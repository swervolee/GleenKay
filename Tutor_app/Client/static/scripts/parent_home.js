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
});
