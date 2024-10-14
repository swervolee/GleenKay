$(document).ready(function() {
    // Function to open the lesson pick modal
    function openPickLessonModal(studentName, subject, date, time) {
        $('#modalStudentName').text(studentName);
        $('#modalSubject').text(subject);
        $('#modalDateTime').text(`${date}, ${time}`);
        $('#modalLearningArea').text(subject); // Adjust as needed for specific learning area
        $('#pickLessonModal').modal('show');
    }

    // Event handler for confirming the lesson pick
    $('#confirmPickLesson').on('click', function() {
        const studentName = $('#modalStudentName').text();
        const subject = $('#modalSubject').text();
        const dateTime = $('#modalDateTime').text();

        // Example action: Send data to server or reflect on dashboards
        console.log(`Lesson picked for ${studentName} on ${dateTime} for ${subject}`);

        // Hide the modal after confirmation
        $('#pickLessonModal').modal('hide');

        // Flash success message or update UI
        flashy();  // Assuming this function exists for showing notifications
    });

    // Close mobile navbar when close button is clicked
    $('#closeMenu').on('click', function () {
        $('#mobileNavbar').collapse('hide');
    });

    // Close the navbar when clicking outside or scrolling
    $(document).on('click touchstart scroll', function (e) {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('#mobileNavbar').collapse('hide');
        }
    });

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

        console.log(`${clickedText} clicked`);
    });
});
