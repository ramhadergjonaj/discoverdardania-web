// Të dhënat e destinacioneve
const destinations = [
    { id: 1, name: "Rugova Canyon", image: "assets/hero-rugova.jpg", desc: "Dramatic cliffs and hiking trails." },
    { id: 2, name: "Prizren", image: "assets/prizren.jpg", desc: "The historic cultural capital." },
    { id: 3, name: "Mirusha Waterfalls", image: "assets/mirusha-falls.jpg", desc: "Stunning waterfalls and pools." },
    { id: 4, name: "Brezovica", image: "assets/brezovica.jpg", desc: "Premier ski resort and hiking." },
    { id: 5, name: "Gjakova", image: "assets/gjakova-bazaar.jpg", desc: "Old Bazaar and rich history." },
    { id: 6, name: "Germia Park", image: "assets/germia-park.jpg", desc: "The green lung of Pristina." },
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    // Gjenero HTML për çdo destinacion
    grid.innerHTML = destinations.map(dest => `
        <div class="card fade-in">
            <div class="card-img-wrapper" style="height: 250px; overflow: hidden;">
                <img src="${dest.image}" alt="${dest.name}" class="card-img" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="card-content" style="padding: 1.5rem;">
                <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${dest.name}</h3>
                <p style="color: #666; margin-bottom: 1rem;">${dest.desc}</p>
                <button onclick="selectDestination(${dest.id})" class="btn btn-outline" style="width: 100%;">Explore</button>
            </div>
        </div>
    `).join('');
});

// Funksioni kur klikon butonin
function selectDestination(id) {
    // Ruan zgjedhjen në LocalStorage që ta dijë faqja Booking
    localStorage.setItem('selectedDestId', id);
    window.location.href = 'booking.html'; // Të çon te rezervimi
}