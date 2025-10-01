/**
 * Rating System Handler
 * Handles the fake rating system with prank modal functionality
 */

class RatingSystem {
    constructor() {
        this.modal = null;
        this.starButtons = [];
        this.currentRating = 0;
        this.maxRating = 5;

        this.init();
    }


    init() {
        try {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupRatingSystem());
            } else {
                this.setupRatingSystem();
            }
        } catch (error) {
            console.error('Failed to initialize rating system:', error);
        }
    }

    setupRatingSystem() {
        try {
            this.modal = document.getElementById('prankModal');

            if (!this.modal) {
                console.warn('Rating system modal not found. Skipping rating system initialization.');
                return;
            }

            this.starButtons = document.querySelectorAll('.star-rating button');

            if (this.starButtons.length === 0) {
                console.warn('Star rating buttons not found. Skipping rating system initialization.');
                return;
            }

            this.setupStarButtons();

            this.setupModalEventListeners();

            this.makeFunctionsGlobal();

            console.log('Rating system initialized successfully');
        } catch (error) {
            console.error('Error setting up rating system:', error);
        }
    }

    setupStarButtons() {
        try {
            this.starButtons.forEach((button, index) => {
                const rating = index + 1;

                button.addEventListener('click', (e) => this.handleStarClick(e, rating));

                button.addEventListener('mouseenter', () => this.handleStarHover(rating));
                button.addEventListener('mouseleave', () => this.handleStarLeave());
            });
        } catch (error) {
            console.error('Error setting up star buttons:', error);
        }
    }


    setupModalEventListeners() {
        try {
            this.modal.addEventListener('click', (e) => this.handleModalClick(e));

            document.addEventListener('keydown', (e) => this.handleModalKeydown(e));

            const closeButton = this.modal.querySelector('button');
            if (closeButton) {
                closeButton.addEventListener('click', (e) => this.closeModal(e));
            }
        } catch (error) {
            console.error('Error setting up modal event listeners:', error);
        }
    }


    handleStarClick(event, rating) {
        try {
            event.preventDefault();
            event.stopPropagation();

            this.currentRating = rating;
            this.showModal();
        } catch (error) {
            console.error('Error handling star click:', error);
        }
    }


    handleStarHover(rating) {
        try {
            this.starButtons.forEach((button, index) => {
                if (index < rating) {
                    button.style.color = '#fbbf24'; // amber-400
                } else {
                    button.style.color = '#9ca3af'; // stone-600
                }
            });
        } catch (error) {
            console.error('Error handling star hover:', error);
        }
    }


    handleStarLeave() {
        try {
            this.starButtons.forEach((button, index) => {
                if (index < this.currentRating) {
                    button.style.color = '#fbbf24';
                } else {
                    button.style.color = '#a8a29e';
                }
            });
        } catch (error) {
            console.error('Error handling star leave:', error);
        }
    }


    showModal() {
        try {
            if (!this.modal) {
                console.warn('Modal element not found');
                return;
            }

            this.modal.classList.remove('hidden');
            this.modal.classList.add('flex', 'items-center', 'justify-center');

            // Focus management for accessibility
            const closeButton = this.modal.querySelector('button');
            if (closeButton) {
                closeButton.focus();
            }

            // Prevent body scroll
            document.body.classList.add('overflow-hidden');

            this.announceToScreenReader('Rating modal opened');

            console.log(`User rated the post: ${this.currentRating} stars`);
        } catch (error) {
            console.error('Error showing modal:', error);
        }
    }


    closeModal(event) {
        try {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (!this.modal) {
                console.warn('Modal element not found');
                return;
            }

            this.modal.classList.add('hidden');
            this.modal.classList.remove('flex', 'items-center', 'justify-center');

            document.body.classList.remove('overflow-hidden');

            const ratingSection = document.querySelector('.star-rating');
            if (ratingSection) {
                ratingSection.focus();
            }

            this.announceToScreenReader('Rating modal closed');
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }


    handleModalClick(event) {
        try {
            if (event.target === this.modal) {
                this.closeModal(event);
            }
        } catch (error) {
            console.error('Error handling modal click:', error);
        }
    }


    handleModalKeydown(event) {
        try {
            if (event.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal(event);
            }
        } catch (error) {
            console.error('Error handling modal keydown:', error);
        }
    }

    /**
     * Make functions globally accessible for backward compatibility
     */
    makeFunctionsGlobal() {
        try {
            // Make functions available globally for inline onclick handlers
            if (typeof window !== 'undefined') {
                window.ratePost = (rating) => this.handleStarClick({ preventDefault: () => { }, stopPropagation: () => { } }, rating);
                window.closeModal = (event) => this.closeModal(event);
            }
        } catch (error) {
            console.error('Error making functions global:', error);
        }
    }

    /**
     * Announce changes to screen readers
     */
    announceToScreenReader(message) {
        try {
            let announcer = document.getElementById('screen-reader-announcer');
            if (!announcer) {
                announcer = document.createElement('div');
                announcer.id = 'screen-reader-announcer';
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.style.position = 'absolute';
                announcer.style.left = '-10000px';
                announcer.style.width = '1px';
                announcer.style.height = '1px';
                announcer.style.overflow = 'hidden';
                document.body.appendChild(announcer);
            }

            announcer.textContent = message;
        } catch (error) {
            console.error('Error announcing to screen reader:', error);
        }
    }

    getCurrentRating() {
        return this.currentRating;
    }

    resetRating() {
        try {
            this.currentRating = 0;
            this.starButtons.forEach(button => {
                button.style.color = '#a8a29e'; // stone-600 (original)
            });
        } catch (error) {
            console.error('Error resetting rating:', error);
        }
    }


    destroy() {
        try {
            this.starButtons.forEach((button, index) => {
                button.removeEventListener('click', this.handleStarClick);
                button.removeEventListener('mouseenter', this.handleStarHover);
                button.removeEventListener('mouseleave', this.handleStarLeave);
            });

            if (this.modal) {
                this.modal.removeEventListener('click', this.handleModalClick);
            }

            document.removeEventListener('keydown', this.handleModalKeydown);

            if (typeof window !== 'undefined') {
                delete window.ratePost;
                delete window.closeModal;
            }
        } catch (error) {
            console.error('Error destroying rating system:', error);
        }
    }
}

// Initialize rating system when script loads
try {
    const ratingSystem = new RatingSystem();

    // Make it globally accessible for debugging if needed
    if (typeof window !== 'undefined') {
        window.ratingSystem = ratingSystem;
    }
} catch (error) {
    console.error('Failed to create rating system instance:', error);
}
