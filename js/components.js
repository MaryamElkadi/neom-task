// Enhanced Component Library JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initModals();
    initToasts();
    initNavigation();
    initSmoothScroll();
    initComponentInteractions();
});

// Modal Management
function initModals() {
    const modals = {
        demoModal: {
            open: document.getElementById('demoModalBtn'),
            close: document.getElementById('closeDemoModal'),
            cancel: document.getElementById('cancelDemoModal'),
            modal: document.getElementById('demoModal')
        },
        successModal: {
            open: document.getElementById('successModalBtn'),
            close: document.getElementById('closeSuccessModal'),
            cancel: document.getElementById('closeSuccessModalBtn'),
            modal: document.getElementById('successModal')
        },
        formModal: {
            open: document.getElementById('formModalBtn'),
            close: document.getElementById('closeFormModal'),
            cancel: document.getElementById('cancelFormModal'),
            modal: document.getElementById('formModal')
        }
    };

    // Attach event listeners to all modals
    Object.values(modals).forEach(modalConfig => {
        if (modalConfig.open) {
            modalConfig.open.addEventListener('click', () => openModal(modalConfig.modal));
        }
        if (modalConfig.close) {
            modalConfig.close.addEventListener('click', () => closeModal(modalConfig.modal));
        }
        if (modalConfig.cancel) {
            modalConfig.cancel.addEventListener('click', () => closeModal(modalConfig.modal));
        }
        
        // Close modal when clicking outside
        if (modalConfig.modal) {
            modalConfig.modal.addEventListener('click', (e) => {
                if (e.target === modalConfig.modal) {
                    closeModal(modalConfig.modal);
                }
            });
        }
    });

    // Handle form submission
    const formModal = document.getElementById('formModal');
    if (formModal) {
        const form = formModal.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate form processing
                closeModal(formModal);
                showToast('Project created successfully!', 'success');
            });
        }
    }
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Toast Management
function initToasts() {
    const toastButtons = {
        toastSuccess: document.getElementById('toastSuccess'),
        toastError: document.getElementById('toastError'),
        toastWarning: document.getElementById('toastWarning'),
        toastInfo: document.getElementById('toastInfo')
    };

    if (toastButtons.toastSuccess) {
        toastButtons.toastSuccess.addEventListener('click', () => {
            showToast('Operation completed successfully!', 'success');
        });
    }

    if (toastButtons.toastError) {
        toastButtons.toastError.addEventListener('click', () => {
            showToast('An error occurred while processing your request.', 'error');
        });
    }

    if (toastButtons.toastWarning) {
        toastButtons.toastWarning.addEventListener('click', () => {
            showToast('Your session will expire in 5 minutes.', 'warning');
        });
    }

    if (toastButtons.toastInfo) {
        toastButtons.toastInfo.addEventListener('click', () => {
            showToast('New features are available in the latest update.', 'info');
        });
    }
}

function showToast(message, type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `nexus-toast nexus-alert-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${icons[type]} toast-icon"></i>
        <div class="toast-content">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;

    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
        toastContainer.appendChild(toast);

        // Add event listener to close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }
}

// Navigation Management
function initNavigation() {
    // Close alerts when close button is clicked
    const alertCloses = document.querySelectorAll('.alert-close');
    alertCloses.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.nexus-alert').style.display = 'none';
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smooth Scroll Enhancement
function initSmoothScroll() {
    // Add smooth scroll behavior to the whole page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle browser compatibility
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/scroll-behavior-polyfill/0.4.3/scroll-behavior-polyfill.min.js';
        document.head.appendChild(script);
    }
}

// Component Interactions
function initComponentInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.nexus-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.nexus-btn');
    buttons.forEach(button => {
        if (button.type === 'submit' || button.classList.contains('hero-btn')) {
            button.addEventListener('click', function(e) {
                if (this.classList.contains('disabled')) {
                    e.preventDefault();
                    return;
                }
                
                // Add loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.classList.add('disabled');
                
                // Reset after 2 seconds (simulate loading)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('disabled');
                }, 2000);
            });
        }
    });

    // Input validation examples
    const inputs = document.querySelectorAll('.nexus-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && this.type === 'email') {
                const isValid = this.value.includes('@') && this.value.includes('.');
                if (isValid) {
                    this.classList.remove('error');
                    this.classList.add('success');
                } else {
                    this.classList.remove('success');
                    this.classList.add('error');
                }
            }
        });
    });

    // Add intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe component sections
        const sections = document.querySelectorAll('.component-showcase');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }
}

// Utility Functions
const NexusUI = {
    // Show notification
    notify: function(message, type = 'info', duration = 5000) {
        showToast(message, type, duration);
    },
    
    // Open modal by ID
    openModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) openModal(modal);
    },
    
    // Close modal by ID
    closeModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) closeModal(modal);
    },
    
    // Create toast programmatically
    toast: function(message, type = 'info') {
        showToast(message, type);
    },
    
    // Enable/disable button
    setButtonState: function(button, disabled) {
        if (disabled) {
            button.disabled = true;
            button.classList.add('disabled');
        } else {
            button.disabled = false;
            button.classList.remove('disabled');
        }
    }
};

// Make NexusUI available globally
window.NexusUI = NexusUI;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusUI;
}