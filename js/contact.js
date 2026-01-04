/* 
   File: contact.js
   Description: Form validation and submission logic for the Contact page.
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-form');

    // Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Error spans
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset errors
        [nameError, emailError, subjectError, messageError].forEach(err => err.style.display = 'none');
        let isValid = true;

        // Validate logic
        if (nameInput.value.trim().length < 2) {
            nameError.style.display = 'block';
            isValid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            emailError.style.display = 'block';
            isValid = false;
        }

        if (subjectInput.value.trim().length < 3) {
            subjectError.style.display = 'block';
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            messageError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // "Send" the form (Simulated)
            console.log("Form submitted:", { 
                name: nameInput.value, 
                email: emailInput.value 
            });

            // UI Transition to Success
            formContainer.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Reset button logic
    resetBtn.addEventListener('click', () => {
        form.reset();
        successMessage.style.display = 'none';
        formContainer.style.display = 'block';
    });
});