$(document).ready(function() {
    //nav for small devices handling
    $('#closeDropdown').on('click', function () {
        $('#mobileNavbar').collapse('hide');
    });

    // Close dropdown on click outside the navbar
    $(document).on('click', function (event) {
        const $navbar = $('#mobileNavbar');
        if (!$navbar.is(event.target) && $navbar.has(event.target).length === 0 && $('.navbar-collapse').hasClass('show')) {
            $navbar.collapse('hide');
        }
    });

    // Close dropdown when user scrolls
    $(window).on('scroll', function () {
        $('#mobileNavbar').collapse('hide');
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

    window.showDetails = function(lessonName) {
        let details = '';
        switch (lessonName) {
            case 'Geometry Basics':
                details = `
                    <div class="modal-header airbnb-modal-header">
                        <h5 class="modal-title airbnb-modal-title">Geometry Basics</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body airbnb-modal-body">
                        <p><strong>Date:</strong> October 10, 2024</p>
                        <p><strong>Time:</strong> 10:00 AM - 11:00 AM</p>
                        <p><strong>Tutor:</strong> Mr. John Doe</p>
                        <p><strong>Topics:</strong> Angles, Shapes, Measurements</p>
                        <p><strong>Duration:</strong> 1 Hour</p>
                        <!-- Postpone Option -->
                        <div class="mt-4">
                            <h6>Postpone Class</h6>
                            <label for="postponeDate" class="form-label">Select New Date:</label>
                            <input type="date" id="postponeDate" class="form-control airbnb-input">
                            <label for="postponeTime" class="form-label mt-3">Select New Time:</label>
                            <input type="time" id="postponeTime" class="form-control airbnb-input">
                            <button class="btn btn-airbnb mt-3" id="postponeBtn">Postpone Class</button>
                        </div>
                    </div>
                `;
                break;
            case 'Fractions and Decimals':
                details = `
                    <div class="modal-header airbnb-modal-header">
                        <h5 class="modal-title airbnb-modal-title">Fractions and Decimals</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body airbnb-modal-body">
                        <p><strong>Date:</strong> October 12, 2024</p>
                        <p><strong>Time:</strong> 1:00 PM - 2:00 PM</p>
                        <p><strong>Tutor:</strong> Ms. Sarah Lee</p>
                        <p><strong>Topics:</strong> Adding/Subtracting Fractions, Converting Decimals</p>
                        <p><strong>Duration:</strong> 1 Hour</p>
                        <!-- Postpone Option -->
                        <div class="mt-4">
                            <h6>Postpone Class</h6>
                            <label for="postponeDate" class="form-label">Select New Date:</label>
                            <input type="date" id="postponeDate" class="form-control airbnb-input">
                            <label for="postponeTime" class="form-label mt-3">Select New Time:</label>
                            <input type="time" id="postponeTime" class="form-control airbnb-input">
                            <button class="btn btn-airbnb mt-3" id="postponeBtn">Postpone Class</button>
                        </div>
                    </div>
                `;
                break;
            case 'Algebra Basics':
                details = `
                    <div class="modal-header airbnb-modal-header">
                        <h5 class="modal-title airbnb-modal-title">Algebra Basics</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body airbnb-modal-body">
                        <p><strong>Date:</strong> October 15, 2024</p>
                        <p><strong>Time:</strong> 11:00 AM - 12:00 PM</p>
                        <p><strong>Tutor:</strong> Mr. Alex Brown</p>
                        <p><strong>Topics:</strong> Variables, Equations, Functions</p>
                        <p><strong>Duration:</strong> 1 Hour</p>
                        <!-- Postpone Option -->
                        <div class="mt-4">
                            <h6>Postpone Class</h6>
                            <label for="postponeDate" class="form-label">Select New Date:</label>
                            <input type="date" id="postponeDate" class="form-control airbnb-input">
                            <label for="postponeTime" class="form-label mt-3">Select New Time:</label>
                            <input type="time" id="postponeTime" class="form-control airbnb-input">
                            <button class="btn btn-airbnb mt-3" id="postponeBtn">Postpone Class</button>
                        </div>
                    </div>
                `;
                break;
        }

        $('#lessonDetailsContent').html(details);
        $('#lessonDetailsModal').modal('show');

        // Handle postponing the class with custom alert
        $('#postponeBtn').on('click', function() {
            const newDate = $('#postponeDate').val();
            const newTime = $('#postponeTime').val();
            if (newDate && newTime) {
                $('#customAlertMessage').text(`Class postponed to: ${newDate} at ${newTime}`);
                $('#customAlert').modal('show');
            } else {
                $('#customAlertMessage').text('Please select both a new date and time to postpone the class.');
                $('#customAlert').modal('show');
            }
        });



    };


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
