

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        // Simulate form submission success with SweetAlert
        Swal.fire({
            title: 'Message Sent!',
            text: `Thank you, ${name}. We'll get back to you shortly.`,
            icon: 'success'
        });

        
        document.getElementById('contactForm').reset();
    } else {
        // Show error message if validation fails
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all the fields before submitting.',
            icon: 'error'
        });
    }
});
