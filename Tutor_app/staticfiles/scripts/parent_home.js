document.addEventListener('DOMContentLoaded', function() {
    const manageChildAccountsLink = document.getElementById('manageAccountsLink');
    const childAccountsSection = document.getElementById('manageChildAccounts'); // Use the correct ID

    manageChildAccountsLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor click behavior
        console.log('clicked');
        
        // Toggle the display of the child accounts section
        if (childAccountsSection.style.display === 'none' || childAccountsSection.style.display === '') {
            childAccountsSection.style.display = 'block'; // Show section
        } else {
            childAccountsSection.style.display = 'none'; // Hide section
        }
    });
});
