$(document).ready(function() {
    // Initially hide all sections
    $('.singular').hide();
    $('.payments').hide();

    $('#sidebar ul li').on('click', function(event) {
        event.preventDefault();

        $('#sidebar ul li a').removeClass('active text-danger');

        $(this).find('a').addClass('active');

        const clickedText = $(this).find('a').text().trim();

        
        if (clickedText === 'Manage Child Accounts') {
            $('.singular').fadeIn(300);
            $('.payments').fadeOut(300);
            $('.dashboard').fadeOut(300);
            
        } else if (clickedText === 'Dashboard') {
            $('.dashboard').fadeIn(300);
            $('.payments').fadeOut(300);
            $('.singular').fadeOut(300);
        } else if (clickedText === 'Payment History') {
            
            $('.payments').fadeIn(300);
            $('.singular').fadeOut(300);
            $('.dashboard').fadeOut(300);
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
            $('.singular').fadeIn(300);
            $('.payments').fadeOut(300);
            $('.dashboard').fadeOut(300);
        } else if (clickedText === 'Dashboard') {
            $('.dashboard').fadeIn(300);
            $('.payments').fadeOut(300);
            $('.singular').fadeOut(300);
        } else if (clickedText === 'Payment History') {
            $('.payments').fadeIn(300);
            $('.singular').fadeOut(300);
            $('.dashboard').fadeOut(300);
        }

        console.log(clickedText + ' clicked');
    });
});
