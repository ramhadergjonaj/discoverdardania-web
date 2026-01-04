/* 
   File: booking.js
   Description: Logic for price calculation and form handling in the Vanilla booking page.
*/

const BASE_PRICE = 25;

const optionsData = {
    transport: {
        none: { label: "No transport", price: 0 },
        shared: { label: "Shared minibus", price: 15 },
        private: { label: "Private transfer", price: 45 }
    },
    food: {
        none: { label: "No meals", price: 0 },
        lunch: { label: "Lunch included", price: 12 },
        full: { label: "Full board", price: 30 }
    },
    accommodation: {
        none: { label: "Day trip only", price: 0 },
        guesthouse: { label: "Local guesthouse", price: 35 },
        hotel: { label: "3-star hotel", price: 65 }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const container = document.getElementById('booking-container');
    const successScreen = document.getElementById('success-screen');
    const successText = document.getElementById('success-text');
    const successSummary = document.getElementById('success-summary');
    const restartBtn = document.getElementById('restart-booking');

    const destSelect = document.getElementById('destination');
    const dateInput = document.getElementById('date');
    const peopleInput = document.getElementById('people');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');

    // Date Restriction
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.setAttribute('min', today);

    // Displays
    const basePriceDisplay = document.getElementById('base-price-display');
    const extraItems = document.getElementById('extra-items');
    const totalDisplay = document.getElementById('total-price-display');

    let selection = { transport: 'none', food: 'none', accommodation: 'none' };

    const updatePrice = () => {
        const people = parseInt(peopleInput.value) || 1;
        let total = BASE_PRICE * people;

        extraItems.innerHTML = '';
        basePriceDisplay.textContent = `€${BASE_PRICE * people}`;

        ['transport', 'food', 'accommodation'].forEach(key => {
            const opt = optionsData[key][selection[key]];
            if (opt.price > 0) {
                const rowPrice = opt.price * people;
                total += rowPrice;
                const row = document.createElement('div');
                row.className = 'summary-row';
                row.innerHTML = `<span>${opt.label}</span> <span>€${rowPrice}</span>`;
                extraItems.appendChild(row);
            }
        });
        totalDisplay.textContent = `€${total}`;
    };

    // Card Click Logic
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const group = card.parentElement.getAttribute('data-group');
            const id = card.getAttribute('data-id');
            card.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selection[group] = id;
            updatePrice();
        });
    });

    peopleInput.addEventListener('input', updatePrice);

    if (minusBtn && plusBtn) {
        minusBtn.addEventListener('click', () => { if (peopleInput.value > 1) { peopleInput.value--; updatePrice(); } });
        plusBtn.addEventListener('click', () => { if (peopleInput.value < 20) { peopleInput.value++; updatePrice(); } });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const booking = {
            destination: destSelect.value,
            date: dateInput.value,
            people: peopleInput.value,
            totalPrice: totalDisplay.textContent,
            name: nameInput.value
        };

        container.style.display = 'none';
        successScreen.style.display = 'block';
        successText.textContent = `Thank you, ${booking.name}! Reference: for ${booking.destination}.`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    restartBtn.addEventListener('click', () => {
        form.reset();
        container.style.display = 'grid';
        successScreen.style.display = 'none';
        updatePrice();
    });

    // Check URL params for redirects from Tours page
    const urlParams = new URLSearchParams(window.location.search);
    const destParam = urlParams.get('dest');
    if (destParam && destSelect) {
        for (let i = 0; i < destSelect.options.length; i++) {
            if (destSelect.options[i].value === destParam) {
                destSelect.selectedIndex = i;
                break;
            }
        }
    }

    updatePrice();
});