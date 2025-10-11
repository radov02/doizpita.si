// DoIzpita.si - Progress Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProgressPage();
});

function initializeProgressPage() {
    updateProgressBar();
    initializeStepInteractions();
    initializeRatingSystem();
    loadUpcomingEvents();
    calculateCosts();
}

// Update progress bar based on completed steps
function updateProgressBar() {
    const completedSteps = document.querySelectorAll('.step-icon.completed').length;
    const totalSteps = document.querySelectorAll('.step-icon').length;
    const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
    
    const progressBar = document.querySelector('.progress-bar');
    const progressBadge = document.querySelector('.progress-percentage .badge');
    
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    if (progressBadge) {
        progressBadge.textContent = `${progressPercentage}% opravljeno`;
    }

    // Update stats
    updateStatCards(completedSteps, totalSteps);
}

// Update stat cards
function updateStatCards(completed, total) {
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        // Update completed steps
        const completedCard = statCards[0];
        const completedText = completedCard.querySelector('span');
        if (completedText) {
            completedText.textContent = `${completed}/${total} korakov`;
        }

        // Update in progress (assuming 1-2 steps are always in progress)
        const inProgressCard = statCards[1];
        const inProgressSteps = Math.max(1, Math.min(2, total - completed));
        const inProgressText = inProgressCard.querySelector('span');
        if (inProgressText) {
            inProgressText.textContent = `${inProgressSteps} ${inProgressSteps === 1 ? 'korak' : 'koraka'}`;
        }
    }
}

// Initialize step interactions
function initializeStepInteractions() {
    // Rating buttons
    document.querySelectorAll('[data-action="rate"]').forEach(button => {
        button.addEventListener('click', function() {
            const stepId = this.getAttribute('data-step');
            openRatingModal(stepId);
        });
    });

    // Action buttons
    document.querySelectorAll('[data-action="reserve"]').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            handleReservation(service);
        });
    });

    // Document buttons
    document.querySelectorAll('[data-action="download"]').forEach(button => {
        button.addEventListener('click', function() {
            const documentType = this.getAttribute('data-document');
            downloadDocument(documentType);
        });
    });
}

// Initialize rating system
function initializeRatingSystem() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn:contains("Oceni storitev")') || 
            e.target.closest('.btn:contains("Oceni storitev")')) {
            e.preventDefault();
            const stepCard = e.target.closest('.progress-step');
            if (stepCard) {
                openRatingModal(stepCard);
            }
        }
    });
}

// Open rating modal
function openRatingModal(stepElement) {
    const serviceName = stepElement.querySelector('h5').textContent;
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="ratingModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ocenite storitev</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>${serviceName}</h6>
                        <div class="rating-input mb-3">
                            <label class="form-label">Vaša ocena:</label>
                            <div class="star-rating">
                                ${[1,2,3,4,5].map(i => `
                                    <i class="bi bi-star rating-star" data-rating="${i}"></i>
                                `).join('')}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="ratingComment" class="form-label">Komentar (opcijsko):</label>
                            <textarea class="form-control" id="ratingComment" rows="3" placeholder="Delite svojo izkušnjo..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Prekliči</button>
                        <button type="button" class="btn btn-primary" onclick="submitRating()">Oddaj oceno</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('ratingModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize star rating
    initializeStarRating();
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('ratingModal'));
    modal.show();
}

// Initialize star rating functionality
function initializeStarRating() {
    const stars = document.querySelectorAll('.rating-star');
    let currentRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });
        
        star.addEventListener('click', function() {
            currentRating = index + 1;
            setRating(currentRating);
        });
    });
    
    document.querySelector('.star-rating').addEventListener('mouseleave', function() {
        if (currentRating > 0) {
            highlightStars(currentRating);
        } else {
            highlightStars(0);
        }
    });
    
    function highlightStars(count) {
        stars.forEach((star, index) => {
            if (index < count) {
                star.classList.remove('bi-star');
                star.classList.add('bi-star-fill', 'text-warning');
            } else {
                star.classList.remove('bi-star-fill', 'text-warning');
                star.classList.add('bi-star');
            }
        });
    }
    
    function setRating(rating) {
        currentRating = rating;
        highlightStars(rating);
    }
    
    // Store current rating for submission
    window.currentRating = currentRating;
}

// Submit rating
function submitRating() {
    const rating = window.currentRating || 0;
    const comment = document.getElementById('ratingComment').value;
    
    if (rating === 0) {
        DoIzpita.showAlert('Prosimo, izberite oceno.', 'warning');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('#ratingModal .btn-primary');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Oddajam...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('ratingModal'));
        modal.hide();
        DoIzpita.showAlert('Hvala za vašo oceno!', 'success');
        
        // Update the UI to show the rating was submitted
        updateServiceRating(rating, comment);
    }, 1500);
}

// Update service rating in UI
function updateServiceRating(rating, comment) {
    // This would typically update the specific service card with the new rating
    // For now, we'll just show it was completed
    console.log('Rating submitted:', { rating, comment });
}

// Handle reservation
function handleReservation(service) {
    DoIzpita.showAlert(`Preusmerjam na rezervacijo za ${service}...`, 'info');
    
    // Simulate redirect
    setTimeout(() => {
        // In a real app, this would redirect to the reservation page
        console.log(`Redirecting to reservation for: ${service}`);
    }, 1500);
}

// Download document
function downloadDocument(documentType) {
    DoIzpita.showAlert(`Prenašam dokument: ${documentType}...`, 'info');
    
    // Simulate document download
    setTimeout(() => {
        // In a real app, this would trigger an actual download
        console.log(`Downloading document: ${documentType}`);
        DoIzpita.showAlert('Dokument je bil uspešno prenešen.', 'success');
    }, 1000);
}

// Load upcoming events
function loadUpcomingEvents() {
    // This would typically fetch from an API
    const events = [
        {
            title: 'CPP predavanje #4',
            provider: 'Varna Vožnja Ljubljana',
            date: '15. 10.',
            time: '17:00 - 20:00'
        },
        {
            title: 'CPP predavanje #5',
            provider: 'Varna Vožnja Ljubljana',
            date: '20. 10.',
            time: '17:00 - 20:00'
        }
    ];
    
    // Events are already in the HTML, but this function could be used
    // to dynamically load and update them
    console.log('Upcoming events loaded:', events);
}

// Calculate and display costs
function calculateCosts() {
    const costs = {
        healthExam: 45,
        basicCpp: 120,
        advancedCpp: 180,
        theoryExam: 35,
        instructor: 375,
        practicalExam: 95
    };
    
    const paid = costs.healthExam + costs.basicCpp + costs.advancedCpp;
    const total = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    
    // Update cost display (already in HTML, but could be dynamic)
    console.log('Costs calculated:', { paid, total, remaining: total - paid });
}

// Update progress when steps are completed
function markStepCompleted(stepIndex) {
    const steps = document.querySelectorAll('.step-icon');
    if (steps[stepIndex]) {
        steps[stepIndex].classList.remove('pending', 'in-progress');
        steps[stepIndex].classList.add('completed');
        steps[stepIndex].innerHTML = '<i class="bi bi-check-lg"></i>';
        
        // Update progress bar
        updateProgressBar();
        
        DoIzpita.showAlert('Korak je bil označen kot opravljen!', 'success');
    }
}

// Start next step
function startNextStep() {
    const nextStep = document.querySelector('.step-icon.pending');
    if (nextStep) {
        nextStep.classList.remove('pending');
        nextStep.classList.add('in-progress');
        nextStep.innerHTML = '<i class="bi bi-clock"></i>';
        
        updateProgressBar();
        DoIzpita.showAlert('Naslednji korak je bil začet!', 'info');
    }
}

// Export functions for global use
window.ProgressPage = {
    markStepCompleted,
    startNextStep,
    submitRating
};