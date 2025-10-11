// DoIzpita.si - Driving Schools List JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDrivingSchoolsList();
});

// Sample data for driving schools
const drivingSchoolsData = [
    {
        id: 1,
        name: "Avtošola Ljubljana Center",
        rating: 4.8,
        reviews: 127,
        recommended: true,
        cities: ["Ljubljana", "Domžale", "Kamnik"],
        vehicles: ["VW Golf", "Škoda Octavia", "BMW 1"],
        categories: ["B", "A", "A1", "BE"],
        instructors: [
            { name: "Marko Novak", rating: 4.9, available: true },
            { name: "Ana Horvat", rating: 4.7, available: false },
            { name: "Petra Kos", rating: 4.8, available: true },
            { name: "Janez Kralj", rating: 4.6, available: true }
        ],
        pricing: {
            hourly: 25,
            package30: 680,
            savings: 70
        },
        contact: {
            phone: "01 234 567",
            email: "info@avtosola-lj.si"
        }
    },
    {
        id: 2,
        name: "Varna Vožnja Maribor",
        rating: 4.5,
        reviews: 89,
        recommended: false,
        cities: ["Maribor", "Slovenska Bistrica"],
        vehicles: ["Renault Clio", "Ford Fiesta"],
        categories: ["B", "A1", "BE"],
        instructors: [
            { name: "Igor Pavlič", rating: 4.6, available: true },
            { name: "Maja Zupan", rating: 4.4, available: true },
            { name: "Tomaž Novak", rating: 4.3, available: false }
        ],
        pricing: {
            hourly: 22,
            package30: 620,
            savings: 40
        },
        contact: {
            phone: "02 987 654",
            email: "info@varna-voznja.si"
        }
    },
    {
        id: 3,
        name: "Avtošola Celje Plus",
        rating: 4.2,
        reviews: 64,
        recommended: false,
        cities: ["Celje", "Žalec", "Velenje"],
        vehicles: ["Škoda Fabia", "Opel Corsa"],
        categories: ["B", "A", "C", "D"],
        instructors: [
            { name: "Tomaž Krek", rating: 4.3, available: true },
            { name: "Sandra Lukič", rating: 4.1, available: true },
            { name: "Miha Zupančič", rating: 4.0, available: false }
        ],
        pricing: {
            hourly: 20,
            package30: 550,
            savings: 50
        },
        contact: {
            phone: "03 456 789",
            email: "info@avtosola-celje.si"
        }
    }
];

let filteredSchools = [...drivingSchoolsData];
let currentSort = 'rating';

function initializeDrivingSchoolsList() {
    renderDrivingSchools(filteredSchools);
    initializeFilters();
    initializeSorting();
    initializeSchoolInteractions();
}

// Render driving schools
function renderDrivingSchools(schools) {
    const container = document.getElementById('drivingSchoolsList');
    if (!container) return;

    container.innerHTML = schools.map(school => createSchoolCard(school)).join('');
    
    // Update results count
    updateResultsCount(schools.length);
}

// Create school card HTML
function createSchoolCard(school) {
    const availableInstructors = school.instructors.filter(i => i.available).length;
    const stars = generateStars(school.rating);
    
    return `
        <div class="col-12 mb-4">
            <div class="card border-0 shadow-sm h-100 driving-school-card" data-school-id="${school.id}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="d-flex align-items-start justify-content-between mb-2">
                                <div>
                                    <h5 class="fw-bold mb-1">${school.name}</h5>
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="rating-stars text-warning me-2">
                                            ${stars}
                                        </div>
                                        <span class="fw-semibold text-warning">${school.rating}</span>
                                        <span class="text-muted ms-1">(${school.reviews} ocen)</span>
                                        ${school.recommended ? '<span class="badge bg-success ms-2">PRIPOROČENO</span>' : ''}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="info-item mb-2">
                                        <i class="bi bi-geo-alt text-primary me-2"></i>
                                        <strong>Kraji:</strong> ${school.cities.join(', ')}
                                    </div>
                                    <div class="info-item mb-2">
                                        <i class="bi bi-car-front text-primary me-2"></i>
                                        <strong>Vozni park:</strong> ${school.vehicles.join(', ')}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-item mb-2">
                                        <i class="bi bi-award text-primary me-2"></i>
                                        <strong>Kategorije:</strong> ${school.categories.join(', ')}
                                    </div>
                                    <div class="info-item mb-2">
                                        <i class="bi bi-people text-primary me-2"></i>
                                        <strong>Inštruktorji:</strong> ${school.instructors.length} (${availableInstructors} prostih)
                                    </div>
                                </div>
                            </div>

                            <!-- Instructors Preview -->
                            <div class="instructors-preview mb-3">
                                <h6 class="fw-semibold mb-2">Inštruktorji</h6>
                                <div class="row g-2">
                                    ${school.instructors.slice(0, 2).map(instructor => `
                                        <div class="col-md-6">
                                            <div class="instructor-card bg-light p-2 rounded small">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>${instructor.name}</strong>
                                                        <div class="text-warning small">${generateStars(instructor.rating)} ${instructor.rating}</div>
                                                    </div>
                                                    <span class="badge ${instructor.available ? 'bg-success' : 'bg-warning'}">${instructor.available ? 'Prost' : 'Zaseden'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <button class="btn btn-sm btn-outline-primary mt-2" onclick="toggleInstructors(${school.id})">
                                    <i class="bi bi-eye me-1"></i>Prikaži vse (${school.instructors.length})
                                </button>
                                
                                <div class="collapse mt-3" id="instructors${school.id}">
                                    <div class="row g-2">
                                        ${school.instructors.slice(2).map(instructor => `
                                            <div class="col-md-6">
                                                <div class="instructor-card bg-light p-2 rounded small">
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <strong>${instructor.name}</strong>
                                                            <div class="text-warning small">${generateStars(instructor.rating)} ${instructor.rating}</div>
                                                        </div>
                                                        <span class="badge ${instructor.available ? 'bg-success' : 'bg-warning'}">${instructor.available ? 'Prost' : 'Zaseden'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="pricing-section text-end">
                                <div class="price-card bg-light p-3 rounded mb-3">
                                    <h6 class="fw-semibold mb-2">Cene</h6>
                                    <div class="price-item d-flex justify-content-between mb-1">
                                        <span class="small">Ura vožnje:</span>
                                        <span class="fw-semibold">€${school.pricing.hourly}</span>
                                    </div>
                                    <div class="price-item d-flex justify-content-between mb-1">
                                        <span class="small">Komplet (30h):</span>
                                        <span class="fw-semibold">€${school.pricing.package30}</span>
                                    </div>
                                    <div class="price-item d-flex justify-content-between">
                                        <span class="small text-success">Prihranek:</span>
                                        <span class="fw-semibold text-success">€${school.pricing.savings}</span>
                                    </div>
                                </div>
                                
                                <div class="contact-info mb-3">
                                    <div class="small text-muted mb-1">
                                        <i class="bi bi-telephone me-1"></i>
                                        ${school.contact.phone}
                                    </div>
                                    <div class="small text-muted">
                                        <i class="bi bi-envelope me-1"></i>
                                        ${school.contact.email}
                                    </div>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary" onclick="reserveSchool(${school.id})">
                                        <i class="bi bi-calendar-plus me-1"></i>
                                        Rezerviraj
                                    </button>
                                    <button class="btn btn-outline-primary" onclick="showSchoolDetails(${school.id})">
                                        <i class="bi bi-info-circle me-1"></i>
                                        Več info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star"></i>';
    }
    
    return stars;
}

// Initialize filters
function initializeFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const searchInput = document.getElementById('searchInput');

    // Add event listeners
    [cityFilter, categoryFilter, priceFilter, ratingFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

// Initialize sorting
function initializeSorting() {
    const sortSelect = document.querySelector('select[data-sort]') || document.querySelector('.form-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applySorting();
        });
    }
}

// Initialize school interactions
function initializeSchoolInteractions() {
    // Click tracking for analytics
    document.addEventListener('click', function(e) {
        if (e.target.matches('.driving-school-card *')) {
            const card = e.target.closest('.driving-school-card');
            if (card) {
                const schoolId = card.getAttribute('data-school-id');
                trackSchoolInteraction(schoolId, e.target.tagName);
            }
        }
    });
}

// Apply filters
function applyFilters() {
    const cityFilter = document.getElementById('cityFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    const ratingFilter = document.getElementById('ratingFilter')?.value || '';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';

    filteredSchools = drivingSchoolsData.filter(school => {
        // City filter
        if (cityFilter && !school.cities.some(city => 
            city.toLowerCase().includes(cityFilter.toLowerCase()))) {
            return false;
        }

        // Category filter
        if (categoryFilter && !school.categories.includes(categoryFilter.toUpperCase())) {
            return false;
        }

        // Price filter
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(Number);
            if (max && (school.pricing.hourly < min || school.pricing.hourly > max)) {
                return false;
            }
            if (priceFilter === '30+' && school.pricing.hourly <= 30) {
                return false;
            }
        }

        // Rating filter
        if (ratingFilter) {
            const minRating = parseFloat(ratingFilter.replace('+', ''));
            if (school.rating < minRating) {
                return false;
            }
        }

        // Search filter
        if (searchInput && !school.name.toLowerCase().includes(searchInput)) {
            return false;
        }

        return true;
    });

    applySorting();
}

// Apply sorting
function applySorting() {
    filteredSchools.sort((a, b) => {
        switch (currentSort) {
            case 'rating':
                return b.rating - a.rating;
            case 'price-asc':
                return a.pricing.hourly - b.pricing.hourly;
            case 'price-desc':
                return b.pricing.hourly - a.pricing.hourly;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    renderDrivingSchools(filteredSchools);
}

// Clear all filters
function clearFilters() {
    document.getElementById('cityFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('searchInput').value = '';
    
    filteredSchools = [...drivingSchoolsData];
    applySorting();
}

// Update results count
function updateResultsCount(count) {
    const resultText = document.querySelector('.text-muted strong');
    if (resultText) {
        resultText.textContent = count;
    }
}

// Toggle instructors visibility
function toggleInstructors(schoolId) {
    const collapseElement = document.getElementById(`instructors${schoolId}`);
    if (collapseElement) {
        const collapse = new bootstrap.Collapse(collapseElement, {
            toggle: true
        });
    }
}

// Reserve school
function reserveSchool(schoolId) {
    const school = drivingSchoolsData.find(s => s.id === schoolId);
    if (school) {
        DoIzpita.showAlert(`Preusmerjam na rezervacijo za ${school.name}...`, 'info');
        
        // Simulate redirect to reservation page
        setTimeout(() => {
            // In a real app, this would redirect to reservation
            console.log('Redirecting to reservation for school:', schoolId);
        }, 1500);
    }
}

// Show school details
function showSchoolDetails(schoolId) {
    const school = drivingSchoolsData.find(s => s.id === schoolId);
    if (school) {
        // Create and show detailed modal
        createSchoolDetailModal(school);
    }
}

// Create school detail modal
function createSchoolDetailModal(school) {
    const modalHTML = `
        <div class="modal fade" id="schoolDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${school.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Osnovni podatki</h6>
                                <p><strong>Ocena:</strong> ${school.rating}/5 (${school.reviews} ocen)</p>
                                <p><strong>Kraji:</strong> ${school.cities.join(', ')}</p>
                                <p><strong>Kategorije:</strong> ${school.categories.join(', ')}</p>
                                <p><strong>Vozni park:</strong> ${school.vehicles.join(', ')}</p>
                            </div>
                            <div class="col-md-6">
                                <h6>Kontakt</h6>
                                <p><strong>Telefon:</strong> ${school.contact.phone}</p>
                                <p><strong>E-pošta:</strong> ${school.contact.email}</p>
                                
                                <h6 class="mt-3">Cene</h6>
                                <p><strong>Ura vožnje:</strong> €${school.pricing.hourly}</p>
                                <p><strong>Komplet (30h):</strong> €${school.pricing.package30}</p>
                                <p class="text-success"><strong>Prihranek:</strong> €${school.pricing.savings}</p>
                            </div>
                        </div>
                        
                        <h6 class="mt-4">Vsi inštruktorji</h6>
                        <div class="row">
                            ${school.instructors.map(instructor => `
                                <div class="col-md-6 mb-2">
                                    <div class="card">
                                        <div class="card-body p-2">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>${instructor.name}</strong>
                                                    <div class="text-warning small">${generateStars(instructor.rating)} ${instructor.rating}</div>
                                                </div>
                                                <span class="badge ${instructor.available ? 'bg-success' : 'bg-warning'}">${instructor.available ? 'Prost' : 'Zaseden'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zapri</button>
                        <button type="button" class="btn btn-primary" onclick="reserveSchool(${school.id}); bootstrap.Modal.getInstance(document.getElementById('schoolDetailModal')).hide();">
                            <i class="bi bi-calendar-plus me-1"></i>
                            Rezerviraj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('schoolDetailModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('schoolDetailModal'));
    modal.show();
}

// Track school interactions for analytics
function trackSchoolInteraction(schoolId, element) {
    console.log('School interaction:', { schoolId, element });
    // In a real app, this would send analytics data
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global use
window.DrivingSchools = {
    applyFilters,
    clearFilters,
    reserveSchool,
    showSchoolDetails,
    toggleInstructors
};