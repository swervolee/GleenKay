$(document).ready(function() {
    $('.planning').hide();

    $('#sidebar ul li, #mobileNavbar ul li').on('click', function(event) {
        event.preventDefault();

        $('#sidebar ul li a').removeClass('active text-danger');
        $(this).find('a').addClass('active');

        const clickedText = $(this).find('a').text().trim();

        if (clickedText === 'Planning') {
            $('.dashboard').fadeOut(500);
            $('.planning').fadeIn(500);
        } else if (clickedText === 'Dashboard') {
            $('.dashboard').fadeIn(500);
            $('.planning').fadeOut(500);
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
});
