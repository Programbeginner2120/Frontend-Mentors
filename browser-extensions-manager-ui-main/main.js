import { ColorState } from "./javascript/ColorState.js";
import { BrowserExtension } from './javascript/BrowserExtension.js';

// GLOBALS
let pageColorState = ColorState.LightMode;
const extensionsList = [];

async function main() {
    initializePage();
}

function initializePage() {
    _initializeColorStateButton();
    _initializeEventListeners();
    _populateExtensions();
}

function _initializeColorStateButton() {
    try {
        const pageColorStateButton = document.querySelector('.main-toolbar-color-state-button');
        if (pageColorState === ColorState.LightMode) {
            pageColorStateButton.style.backgroundImage = "url('./assets/images/icon-sun.svg')"
        } else if (pageColorState === ColorState.DarkMode) {
            pageColorStateButton.style.backgroundImage = "url('./assets/images/icon-moon.svg')"
        }
    } catch (error) {
        console.error("Error occurred while initializing color state: ", error);
    }
}

function _initializeEventListeners() {
    _initializeColorStateButtonEventListener();
    _initializeFilterButtonEventListener();
}

function _initializeColorStateButtonEventListener() {
    try {
        const pageColorStateButtonContainer = document.querySelector('.main-toolbar-color-state-button-container');
        document.addEventListener('click', (event) => {
            if (!pageColorStateButtonContainer.contains(event.target)) return;

            if (pageColorState === ColorState.LightMode) {
                pageColorState = ColorState.DarkMode;
                _toggleDarkModeToggleableElements(true);
            } else if (pageColorState === ColorState.DarkMode) {
                pageColorState = ColorState.LightMode;
                _toggleDarkModeToggleableElements(false);
            }
        });
    } catch (error) {
        console.error("Error initializing color state button event listener: ", error);
    }
}

function _initializeFilterButtonEventListener() {
    document.querySelectorAll('.extension-filter-button').forEach(button => {
        document.addEventListener('click', (event) => {
            if (!button.contains(event.target)) return;

            _toggleIsActiveOnFilterButton(button);

            const buttonText = button.innerHTML;
            if (buttonText === 'All') {
                _processAllButtonPress(button);
            } else if (buttonText === 'Active') {
                _processActiveButtonPress(button);
            } else if (buttonText === 'Inactive') {
                _processInactiveButtonPress(button);
            }
        });
    });
}

function _processAllButtonPress(button) {
    _resetVisibilityOfExtensionCards(true);
}

function _processActiveButtonPress(button) {
    _resetVisibilityOfExtensionCards(true);
    const extensionCards = document.querySelectorAll('.extension-card');
    const isActive = button.getAttribute('data-is-active') === 'true';
    if (isActive) {
        Array.from(extensionCards).filter(card => {
            const selectedExtension = extensionsList.find(extension => Number(card.getAttribute('data-id')) === extension.id);
            return !selectedExtension.isActive;
        }).forEach(card => card.classList.add('extension-card-hidden'));
    } else {
        extensionCards.forEach(card => {
            card.classList.remove('extension-card-hidden');
        });
    }
}

function _processInactiveButtonPress(button) {
    _resetVisibilityOfExtensionCards(true);
    const extensionCards = document.querySelectorAll('.extension-card');
    const isActive = button.getAttribute('data-is-active') === 'true';
    if (isActive) {
        Array.from(extensionCards).filter(card => {
            const selectedExtension = extensionsList.find(extension => Number(card.getAttribute('data-id')) === extension.id);
            return selectedExtension.isActive;
        }).forEach(card => card.classList.add('extension-card-hidden'));
    } else {
        extensionCards.forEach(card => {
            card.classList.remove('extension-card-hidden');
        });
    }
}

function _resetVisibilityOfExtensionCards(setVisible) {
    document.querySelectorAll('.extension-card').forEach(card => {
        if (setVisible) {
            card.classList.remove('extension-card-hidden');
        } else {
            card.classList.add('extension-card-hidden');
        }
    });
}

function _populateExtensions() {
    fetch('./data.json').then(response => {
        if (!response) {
            throw new Error("Error retrieving extension data");
        }
        return response.json();
    }).then(json => {
        const extensionsGrid = document.querySelector('.extensions-grid');
        json.forEach((jsonElement, index) => {
            _createExtension(extensionsGrid, jsonElement, index);
        })
    })
    .catch(error => {
        console.error("Error populating extension data: ", error);
    })
}

function _createExtension(extensionsGrid, jsonElement, index) {
    const logo = jsonElement['logo'];
    const name = jsonElement['name'];
    const description = jsonElement['description'];
    const isActive = jsonElement['isActive'];

    const createdElement = document.createElement('div');
    createdElement.setAttribute('data-id', index);
    createdElement.classList.add('extension-card');
    createdElement.innerHTML = `
    <div class='extension-card-info-container extension-card-info-container-1'>
        <div class='extension-card-info-container extension-card-info-container-2'>
            <img class='extension-card-image extension-card-image-${index}' src="${logo}" />
            <div class='extension-card-info-container extension-card-info-container-3'>
                <label class='extension-card-title extension-card-title-${index}'>${name}</label>
                <p class='extension-card-description extension-card-description-${index}'>${description}</p>
            </div>
        </div>
        <div class='extension-card-info-container extension-card-info-container-4'>
            <button class='extension-card-button remove-extension-button'>Remove</button>
            <label class="extension-toggle-switch extension-toggle-switch-${index}">
                <input type="checkbox" ${isActive ? "checked" : ""}>
                <span class="slider"></span>
            </label>
        </div>
    </div>
    `;

    extensionsGrid.appendChild(createdElement);

    const browserExtension = new BrowserExtension(index, logo, name, description, isActive);
    extensionsList.push(browserExtension);
}

function _toggleDarkModeToggleableElements(toggleToDarkMode) {
    const pageContainer = document.querySelector('.page-container');
    const mainToolbar = document.querySelector('.main-toolbar');
    const pageColorStateButtonContainer = document.querySelector('.main-toolbar-color-state-button-container');
    const pageColorStateButton = document.querySelector('.main-toolbar-color-state-button');
    const extensionFilterButtons = document.querySelectorAll('.extension-filter-button');
    const removeExtensionButtons = document.querySelectorAll('.remove-extension-button');
    if (toggleToDarkMode) {
        pageContainer.classList.add('page-container-dark-mode');
        mainToolbar.classList.add('main-toolbar-dark-mode');
        pageColorStateButtonContainer.classList.add('main-toolbar-color-state-button-container-dark-mode');
        pageColorStateButton.style.backgroundImage = "url('./assets/images/icon-moon.svg')";
        extensionFilterButtons.forEach(button => {
            button.classList.add('extension-filter-button-dark-mode');
        });
        removeExtensionButtons.forEach(button => {
            button.classList.add('remove-extension-button-dark-mode');
        });
    } else {
        pageContainer.classList.remove('page-container-dark-mode');
        mainToolbar.classList.remove('main-toolbar-dark-mode');
        pageColorStateButtonContainer.classList.remove('main-toolbar-color-state-button-container-dark-mode');
        pageColorStateButton.style.backgroundImage = "url('./assets/images/icon-sun.svg')";
        extensionFilterButtons.forEach(button => {
            button.classList.remove('extension-filter-button-dark-mode');
        });
        removeExtensionButtons.forEach(button => {
            button.classList.remove('remove-extension-button-dark-mode');
        });
    }
}

function _toggleIsActiveOnFilterButton(buttonElement) {
    Array.from(document.querySelectorAll('.extension-filter-button')).filter(elem => {
        return elem.innerHTML !== buttonElement.innerHTML;
    })
    .forEach(elem => {
        elem.setAttribute('data-is-active', false);
    });
    const isActive = buttonElement.getAttribute('data-is-active') === 'true';
    buttonElement.setAttribute('data-is-active', String(!isActive));
}

document.addEventListener('DOMContentLoaded', main);