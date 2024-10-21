$(document).ready(function() {
    // Expose functions to global scope
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    window.confirmDelete = confirmDelete;
    window.submitDelete = submitDelete;
    window.bookLesson = bookLesson;

    // Set user timezone in cookies
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.cookie = "user_timezone=" + userTimezone;

    // Close mobile navbar when 'closeMenu' is clicked
    $('#closeMenu').on('click', () => $('#mobileNavbar').collapse('hide'));

    // Close mobile navbar when clicking outside or on scroll
    $(document).on('click touchstart scroll', (e) => {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('#mobileNavbar').collapse('hide');
        }
    });

    // Initially hide all sections and show the dashboard
    const hideSections = () => $('.singular, .payments, .dashboard').hide();
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
        $('#sidebar ul li a').removeClass('active text-danger');
        $(this).find('a').addClass('active');

        const clickedText = $(this).find('a').text().trim();
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
        $('.navbar-nav li a').removeClass('active text-danger');
        $(this).find('a').addClass('active');

        const clickedText = $(this).find('a').text().trim();
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

    // Delete child account code
    function confirmDelete(childId, childName) {
        $('#childNameToDelete').text(childName);
        $('#deleteChildForm').attr('action', `/delete/${childId}`);
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteChildModal'));
        deleteModal.show();
    }

    function submitDelete(event) {
        event.preventDefault();
        const password = $('#confirmPassword').val();
        const deleteForm = $('#deleteChildForm');
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteChildModal'));
        const confirmDeleteButton = $('#confirmDeleteButton');
        const loadingSpinner = $('#loadingSpinner');

        if (password) {
            loadingSpinner.show();
            confirmDeleteButton.prop('disabled', true);

            fetch(deleteForm.attr('action'), {
                method: 'POST',
                body: new FormData(deleteForm[0]),
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}',
                },
            })
            .then(response => response.json())
            .then(data => {
                loadingSpinner.hide();
                confirmDeleteButton.prop('disabled', false);
                if (data['message'] === 'success') {
                    modal.hide();
                    location.reload();
                } else {
                    $('#passwordError').show();
                    $('#confirmPassword').addClass('border-danger').val('');
                }
            })
            .catch(error => {
                loadingSpinner.hide();
                confirmDeleteButton.prop('disabled', false);
                console.log(error.message);
            });
        } else {
            console.log('Enter your password');
        }
    }

    // Booking modal handling
    $('#mathArea').on('change', toggleInput);
    $('#bookLessonForm').on('submit', bookLesson);

    // Show or hide input field for custom math area
    function toggleInput() {
        const mathAreaSelect = $('#mathArea');
        const otherMathAreaContainer = $('#otherMathAreaContainer');

        if (mathAreaSelect.val() === 'other') {
            otherMathAreaContainer.show();
        } else {
            otherMathAreaContainer.hide();
        }
    }

    function openBookingModal(childName, childId) {
        $('#childNameDisplay').text(childName);
        $('#childName').val(childId); // Set the hidden input field
        const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        bookingModal.show();
        $("#bookLessonForm").attr('action', `/booking/${childId}`);
        console.log(childId);
    }

    function closeBookingModal() {
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        bookingModal.hide();
    }

    // Modify the bookLesson function to handle form submission using jQuery
    function bookLesson(event) {
        event.preventDefault(); // Prevent the default form submission
        const form = $('#bookLessonForm');
        const confirmButton = $('#confirmDeleteButton');
        const spinner = $('#loadingSpinner');

        // Unbind any existing submit event to prevent multiple requests
        form.off('submit');

        spinner.show();
        confirmButton.prop('disabled', true);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            headers: {
                'X-CSRFToken': '{{ csrf_token }}'
            },
            success: function(response) {
                closeBookingModal(); // Close the modal after successful booking
                location.reload(); // Reload to see changes
            },
            error: function() {
                alert('Error booking lesson. Please try again.');
            },
            complete: function() {
                spinner.hide();
                confirmButton.prop('disabled', false);
            }
        });
    }
});

