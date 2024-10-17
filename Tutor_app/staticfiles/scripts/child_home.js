$(document).ready(function() {
    //nav for small devices handling
    $('#closeDropdown').on('click', function () {
        $('#mobileNavbar').collapse('hide');
    });

    // Close dropdown when clicking outside or scrolling
    $(document).on('click touchstart scroll', function (e) {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('#mobileNavbar').collapse('hide');
        }
    });



    //sidebar code
    $('.planning').hide();
    $('.assignments').hide();

    $('#sidebar ul li, #mobileNavbar ul li').on('click', function(event) {
        event.preventDefault();

        $('#sidebar ul li a').removeClass('active text-danger');
        $(this).find('a').addClass('active');

        const clickedText = $(this).find('a').text().trim();

        if (clickedText === 'Planning') {
            $('.dashboard').fadeOut(500);
            $('.planning').fadeIn(500);
	    $('.assignments').fadeOut(500);
        } else if (clickedText === 'Dashboard') {
            $('.dashboard').fadeIn(500);
            $('.planning').fadeOut(500);
	    $('.assignments').fadeOut(500);
        } else if (clickedText === 'Assignments') {
	    $('.dashboard').fadeOut(500);
	    $('.planning').fadeOut(500);
	    $('.assignments').fadeIn(500);
	}

        console.log(clickedText + ' clicked');
    });



    //Handling of assignments
    const assignments = {
	'Geometry Basics': {
	    title: 'Geometry Basics',
	    description: 'Complete exercises on angles and shapes.',
	    dueDate: 'October 10, 2024',
	    status: 'In Progress',
	},
	'Fractions and Decimals': {
	    title: 'Fractions and Decimals',
	    description: 'Solve fraction addition and subtraction problems.',
	    dueDate: 'October 12, 2024',
	    status: 'Due Soon',
	},
	'Algebra Basics': {
	    title: 'Algebra Basics',
	    description: 'Solve basic algebra equations.',
	    dueDate: 'October 15, 2024',
	    status: 'Completed',
	    feedback: 'Great job on solving the equations!',
	},
    };

    // Handle View Details button clicks
    $('button[data-title]').on('click', function () {
	const title = $(this).data('title');
	viewAssignmentDetails(title);
    });

    function viewAssignmentDetails(title) {
	const assignment = assignments[title];
	$('#assignmentTitle').text(assignment.title);
	$('#assignmentDescription').text(assignment.description);
	$('#assignmentDueDate').text(assignment.dueDate);
	$('#assignmentStatus').text(assignment.status);

	// Show or hide the "Submit Assignment" button based on status
	if (assignment.status === 'In Progress') {
	    $('#submitAssignmentBtn').show();
	} else {
	    $('#submitAssignmentBtn').hide();
	}

	$('#assignmentDetailsModal').modal('show');
    }

    // Handle Assignment Submission
    $('#submitAssignmentBtn').on('click', function (event) {
	event.preventDefault();
	$('#assignmentSubmissionModal').modal('show');
    });

    $('#assignmentSubmissionForm').on('submit', function (event) {
	event.preventDefault();
	const formData = new FormData();
	formData.append('file', assignmentFile);
	formData.append('assignmentTitle', 'Geometry Basics');
	//Do an ajax to send the data


	alert('Assignment submitted successfully!');
	$('#assignmentSubmissionModal').modal('hide');
    });
});
