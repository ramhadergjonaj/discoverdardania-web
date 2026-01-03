document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Validate Name
            const name = document.getElementById('name');
            if (name.value.length < 2) {
                showError(name, 'Name is too short');
                isValid = false;
            } else {
                clearError(name);
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }

            if (isValid) {
                alert('Message sent successfully! (Demo)');
                form.reset();
            }
        });
    }
});

function showError(input, msg) {
    const small = input.parentElement.querySelector('small');
    input.style.borderColor = 'red';
    small.innerText = msg;
    small.style.display = 'block';
}

function clearError(input) {
    const small = input.parentElement.querySelector('small');
    input.style.borderColor = '#ddd';
    small.style.display = 'none';
}