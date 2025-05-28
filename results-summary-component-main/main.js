async function main() {
    loadAttributeData();
}

function loadAttributeData() {
    fetch('data.json').then(response => {
        if (!response.ok) {
            throw new Error("Failed to load attribute data JSON");
        }
        return response.json();
    }).then(json => {
        const querySelectorAllResult = document.querySelectorAll('.attribute-container');

        if (querySelectorAllResult.length === 0) {
            throw new Error("Error accessing html attribute container element");
        }

        const attributeContainer = querySelectorAllResult[0];
        for (const jsonElement of json) {
            const html = `
            <img class='attribute-image' src=${jsonElement['icon']} />
            <label class='attribute-label'>${jsonElement['category']}</label>
            <label class='score-label'>${jsonElement['score']} / 100</label>
            `;
            const createdElement = document.createElement('div');
            createdElement.className = 'attribute';
            createdElement.innerHTML = html;
            createdElement.style.backgroundColor = jsonElement['background-color'];
            attributeContainer.appendChild(createdElement);
        }
    }).catch(error => {
        console.error("Error loading attribute data JSON", error);
    });
}

// Start up application
document.addEventListener('DOMContentLoaded', main);