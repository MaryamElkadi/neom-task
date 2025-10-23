// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const demoModal = document.getElementById('demoModal');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            demoModal.classList.add('open');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            demoModal.classList.remove('open');
        });
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', function() {
            demoModal.classList.remove('open');
        });
    }

    // Close modal when clicking outside
    demoModal.addEventListener('click', function(e) {
        if (e.target === demoModal) {
            demoModal.classList.remove('open');
        }
    });

    // Toast functionality
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
            toast.querySelector('.toast-close').addEventListener('click', function() {
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

    // Toast demo buttons
    const successToastBtn = document.getElementById('successToast');
    const errorToastBtn = document.getElementById('errorToast');
    const infoToastBtn = document.getElementById('infoToast');

    if (successToastBtn) {
        successToastBtn.addEventListener('click', function() {
            showToast('Operation completed successfully!', 'success');
        });
    }

    if (errorToastBtn) {
        errorToastBtn.addEventListener('click', function() {
            showToast('An error occurred while processing your request.', 'error');
        });
    }

    if (infoToastBtn) {
        infoToastBtn.addEventListener('click', function() {
            showToast('New features are available in the latest update.', 'info');
        });
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => {
                nav.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close alerts when close button is clicked
    const alertCloses = document.querySelectorAll('.alert-close');
    alertCloses.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.nexus-alert').style.display = 'none';
        });
    });
});