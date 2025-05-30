import { ColorState } from "./javascript/ColorState.js";

// GLOBALS
let pageColorState = ColorState.LightMode;

async function main() {
    initializePage();
}

function initializePage() {
    _initializeColorStateButton();
    _initializeEventListeners();
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
}

function _initializeColorStateButtonEventListener() {
    try {
        const pageContainer = document.querySelector('.page-container');
        const mainToolbar = document.querySelector('.main-toolbar');
        const pageColorStateButtonContainer = document.querySelector('.main-toolbar-color-state-button-container');
        const pageColorStateButton = document.querySelector('.main-toolbar-color-state-button');
        document.addEventListener('click', (event) => {
            if (!pageColorStateButtonContainer.contains(event.target)) return;

            if (pageColorState === ColorState.LightMode) {
                pageColorState = ColorState.DarkMode;
                pageContainer.classList.add('page-container-dark-mode');
                mainToolbar.classList.add('main-toolbar-dark-mode');
                pageColorStateButtonContainer.classList.add('main-toolbar-color-state-button-container-dark-mode');
                pageColorStateButton.style.backgroundImage = "url('./assets/images/icon-moon.svg')";
            } else if (pageColorState === ColorState.DarkMode) {
                pageColorState = ColorState.LightMode;
                pageContainer.classList.remove('page-container-dark-mode');
                mainToolbar.classList.remove('main-toolbar-dark-mode');
                pageColorStateButtonContainer.classList.remove('main-toolbar-color-state-button-container-dark-mode');
                pageColorStateButton.style.backgroundImage = "url('./assets/images/icon-sun.svg')";
            }
        });
    } catch (error) {
        console.error("Error initializing color state button event listener: ", error);
    }
}

document.addEventListener('DOMContentLoaded', main);