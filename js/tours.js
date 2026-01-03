const tours = [
    { id: 1, title: "Rugova Hiking", category: "hiking", price: 50, img: "assets/hero-rugova.jpg" },
    { id: 2, title: "Prizren Culture", category: "culture", price: 40, img: "assets/prizren.jpg" },
    { id: 3, title: "Sharri Skiing", category: "hiking", price: 80, img: "assets/brezovica.jpg" },
    // Shtoni më shumë...
];

function renderTours(category) {
    const grid = document.getElementById('tours-grid');
    const filtered = category === 'all' ? tours : tours.filter(t => t.category === category);
    
    grid.innerHTML = filtered.map(t => `
        <div class="card">
            <img src="${t.img}" class="card-img" style="height: 200px; object-fit: cover;">
            <div class="card-content">
                <h3>${t.title}</h3>
                <p>Price: €${t.price}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <span class="badge">${t.category}</span>
                    <a href="booking.html" class="btn btn-primary">Book Now</a>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => renderTours('all'));
// Expose function to global scope due to onclick inside HTML
window.filterTours = renderTours;