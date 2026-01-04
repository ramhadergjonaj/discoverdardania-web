/* 
   File: destinations.js
   Description: Logic for filtering and rendering destinations.
*/

const destinations = [
    {
        id: 1,
        name: "Rugova Canyon",
        location: "Peja Region",
        description: "A breathtaking 25km canyon with dramatic cliffs rising up to 1,000 meters. Perfect for hiking, via ferrata, and rock climbing adventures.",
        image: "assets/hero-rugova.jpg",
        category: "adventure",
        rating: 4.9,
    },
    {
        id: 2,
        name: "Mirusha Waterfalls",
        location: "Klina",
        description: "A series of 12 stunning waterfalls and crystal-clear pools carved through limestone canyon over thousands of years.",
        image: "assets/mirusha-falls.jpg",
        category: "nature",
        rating: 4.8,
    },
    {
        id: 3,
        name: "Sharri Mountains",
        location: "Southern Kosovo",
        description: "UNESCO-protected national park with alpine meadows, glacial lakes, and traditional mountain villages. Home to unique flora and fauna.",
        image: "assets/sharri-mountains.jpg",
        category: "nature",
        rating: 4.9,
    },
    {
        id: 4,
        name: "Brezovica",
        location: "Sharri Range",
        description: "Premier mountain resort offering world-class skiing in winter and scenic hiking trails in summer with panoramic views.",
        image: "assets/brezovica.jpg",
        category: "adventure",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Gjakova Old Bazaar",
        location: "Gjakova",
        description: "One of the oldest and largest bazaars in the Balkans, featuring Ottoman architecture, traditional crafts, and authentic cuisine.",
        image: "assets/gjakova-bazaar.jpg",
        category: "culture",
        rating: 4.6,
    },
    {
        id: 6,
        name: "Germia Park",
        location: "Pristina",
        description: "A 62-hectare urban forest park just outside Pristina, perfect for hiking, picnics, and outdoor recreation year-round.",
        image: "assets/germia-park.jpg",
        category: "nature",
        rating: 4.5,
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('destinations-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resultsCount = document.getElementById('results-count');

    const renderDestinations = (filtered) => {
        grid.innerHTML = '';
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem;">No destinations found in this category.</div>';
        }
        filtered.forEach((dest, index) => {
            const card = document.createElement('article');
            card.className = 'dest-card animate-fade-up';
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="dest-img-wrapper">
                    <img src="${dest.image}" alt="${dest.name}" class="dest-img">
                    <span class="dest-badge">${dest.category}</span>
                    <div class="dest-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="hsl(38, 80%, 55%)" stroke="hsl(38, 80%, 55%)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        ${dest.rating}
                    </div>
                    <div class="dest-overlay">
                        <div style="display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.8); font-size: 0.875rem; margin-bottom: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${dest.location}
                        </div>
                        <h3 style="color: white; font-size: 1.5rem;">${dest.name}</h3>
                    </div>
                </div>
                <div class="dest-content">
                    <p style="font-size: 0.875rem; color: var(--muted-foreground); line-height: 1.6;">${dest.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });
        if(resultsCount) resultsCount.textContent = `${filtered.length} destination${filtered.length !== 1 ? 's' : ''}`;
    };

    renderDestinations(destinations);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderDestinations(category === 'all' ? destinations : destinations.filter(d => d.category === category));
        });
    });
});