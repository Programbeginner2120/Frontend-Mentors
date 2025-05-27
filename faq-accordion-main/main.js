async function main() {
    console.log("Loading JavaScript for main.js...");

    initializeEventListeners();
    setupToggleButtons();
}

/**
 * Function used to initialize event listeners for page
 */
function initializeEventListeners() {
    document.querySelectorAll('.dropdown-summary').forEach(summary => {
        summary.addEventListener('click', (event) => {
            event.preventDefault();
        });
    })
}

function setupToggleButtons() {
    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const detailsElement = document.getElementById(targetId);

            // Toggle the open state
            if (detailsElement) {
                if (detailsElement.open) {
                    detailsElement.open = false;
                    button.classList.remove('dropdown-button-open');
                } else {
                    detailsElement.open = true;
                    button.classList.add('dropdown-button-open');
                }
            }
        });
    });
}

// Used to start the application
document.addEventListener('DOMContentLoaded', main);