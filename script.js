// Element data (subset of the most common elements)
const elements = [
    { id: 1, symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'nonmetal', atomicMass: 1.008, position: [0, 0] },
    { id: 2, symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'noble-gas', atomicMass: 4.003, position: [0, 17] },
    { id: 3, symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'alkali-metal', atomicMass: 6.94, position: [1, 0] },
    { id: 4, symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'alkaline-earth-metal', atomicMass: 9.012, position: [1, 1] },
    { id: 5, symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'metalloid', atomicMass: 10.81, position: [1, 12] },
    { id: 6, symbol: 'C', name: 'Carbon', atomicNumber: 6, category: 'nonmetal', atomicMass: 12.011, position: [1, 13] },
    { id: 7, symbol: 'N', name: 'Nitrogen', atomicNumber: 7, category: 'nonmetal', atomicMass: 14.007, position: [1, 14] },
    { id: 8, symbol: 'O', name: 'Oxygen', atomicNumber: 8, category: 'nonmetal', atomicMass: 15.999, position: [1, 15] },
    { id: 9, symbol: 'F', name: 'Fluorine', atomicNumber: 9, category: 'halogen', atomicMass: 18.998, position: [1, 16] },
    { id: 10, symbol: 'Ne', name: 'Neon', atomicNumber: 10, category: 'noble-gas', atomicMass: 20.180, position: [1, 17] },
    { id: 11, symbol: 'Na', name: 'Sodium', atomicNumber: 11, category: 'alkali-metal', atomicMass: 22.990, position: [2, 0] },
    { id: 12, symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, category: 'alkaline-earth-metal', atomicMass: 24.305, position: [2, 1] },
    { id: 13, symbol: 'Al', name: 'Aluminum', atomicNumber: 13, category: 'post-transition-metal', atomicMass: 26.982, position: [2, 12] },
    { id: 14, symbol: 'Si', name: 'Silicon', atomicNumber: 14, category: 'metalloid', atomicMass: 28.085, position: [2, 13] },
    { id: 15, symbol: 'P', name: 'Phosphorus', atomicNumber: 15, category: 'nonmetal', atomicMass: 30.974, position: [2, 14] },
    { id: 16, symbol: 'S', name: 'Sulfur', atomicNumber: 16, category: 'nonmetal', atomicMass: 32.06, position: [2, 15] },
    { id: 17, symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, category: 'halogen', atomicMass: 35.45, position: [2, 16] },
    { id: 18, symbol: 'Ar', name: 'Argon', atomicNumber: 18, category: 'noble-gas', atomicMass: 39.948, position: [2, 17] },
    { id: 19, symbol: 'K', name: 'Potassium', atomicNumber: 19, category: 'alkali-metal', atomicMass: 39.098, position: [3, 0] },
    { id: 20, symbol: 'Ca', name: 'Calcium', atomicNumber: 20, category: 'alkaline-earth-metal', atomicMass: 40.078, position: [3, 1] },
    { id: 26, symbol: 'Fe', name: 'Iron', atomicNumber: 26, category: 'transition-metal', atomicMass: 55.845, position: [3, 7] },
    { id: 29, symbol: 'Cu', name: 'Copper', atomicNumber: 29, category: 'transition-metal', atomicMass: 63.546, position: [3, 10] },
    { id: 30, symbol: 'Zn', name: 'Zinc', atomicNumber: 30, category: 'transition-metal', atomicMass: 65.38, position: [3, 11] },
    { id: 47, symbol: 'Ag', name: 'Silver', atomicNumber: 47, category: 'transition-metal', atomicMass: 107.868, position: [4, 10] },
    { id: 79, symbol: 'Au', name: 'Gold', atomicNumber: 79, category: 'transition-metal', atomicMass: 196.967, position: [5, 10] }
];

// Chemical reactions database
const reactions = {
    'H-O': {
        result: 'H₂O',
        name: 'Water',
        description: 'Hydrogen reacts with oxygen to form water. This is a combustion reaction that releases energy.',
        type: 'combustion',
        animation: 'explosion'
    },
    'Na-Cl': {
        result: 'NaCl',
        name: 'Sodium Chloride (Salt)',
        description: 'Sodium reacts violently with chlorine to form table salt. This is an ionic bond formation.',
        type: 'ionic',
        animation: 'crystallization'
    },
    'H-Cl': {
        result: 'HCl',
        name: 'Hydrochloric Acid',
        description: 'Hydrogen and chlorine combine to form a strong acid commonly used in industry.',
        type: 'synthesis',
        animation: 'gas'
    },
    'Ca-O': {
        result: 'CaO',
        name: 'Calcium Oxide (Lime)',
        description: 'Calcium burns in oxygen to form quicklime, an important industrial chemical.',
        type: 'oxidation',
        animation: 'explosion'
    },
    'Fe-O': {
        result: 'Fe₂O₃',
        name: 'Iron Oxide (Rust)',
        description: 'Iron oxidizes in the presence of oxygen to form rust, a common corrosion process.',
        type: 'oxidation',
        animation: 'crystallization'
    },
    'Mg-O': {
        result: 'MgO',
        name: 'Magnesium Oxide',
        description: 'Magnesium burns brightly in oxygen to produce magnesium oxide and light.',
        type: 'combustion',
        animation: 'explosion'
    },
    'C-O': {
        result: 'CO₂',
        name: 'Carbon Dioxide',
        description: 'Carbon burns in oxygen to produce carbon dioxide, a greenhouse gas.',
        type: 'combustion',
        animation: 'gas'
    },
    'N-H': {
        result: 'NH₃',
        name: 'Ammonia',
        description: 'Nitrogen and hydrogen combine under pressure to form ammonia, used in fertilizers.',
        type: 'synthesis',
        animation: 'gas'
    },
    'S-O': {
        result: 'SO₂',
        name: 'Sulfur Dioxide',
        description: 'Sulfur burns in oxygen to form sulfur dioxide, a gas with a pungent smell.',
        type: 'combustion',
        animation: 'gas'
    },
    'K-H': {
        result: 'KH',
        name: 'Potassium Hydride',
        description: 'Potassium reacts with hydrogen to form a hydride compound.',
        type: 'synthesis',
        animation: 'crystallization'
    }
};

// Application state
let currentPage = 'periodic';
let selectedElements = [];
let searchQuery = '';
let selectedCategory = null;

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const periodicTable = document.getElementById('periodic-table');
const elementSearch = document.getElementById('element-search');
const clearSearchBtn = document.getElementById('clear-search');
const legendItems = document.querySelectorAll('.legend-item');
const dropZone = document.getElementById('drop-zone');
const selectedElementsContainer = document.getElementById('selected-elements');
const simulateBtn = document.getElementById('simulate-reaction');
const clearReactionBtn = document.getElementById('clear-reaction');
const reactionResult = document.getElementById('reaction-result');
const reactionOutput = document.getElementById('reaction-output');
const elementList = document.getElementById('element-list');
const elementModal = document.getElementById('element-modal');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-message');
const animationContainer = document.getElementById('animation-container');

// Initialize the application
function init() {
    setupNavigation();
    generatePeriodicTable();
    generateElementList();
    setupEventListeners();
    setupDragAndDrop();
}

// Navigation setup
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.dataset.page;
            switchPage(targetPage);
        });
    });
}

function switchPage(pageName) {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    document.getElementById(`${pageName}-page`).classList.add('active');
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    currentPage = pageName;
}

// Periodic table generation
function generatePeriodicTable() {
    periodicTable.innerHTML = '';
    
    // Create 18x7 grid
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 18; col++) {
            const element = elements.find(el => el.position[0] === row && el.position[1] === col);
            const cell = document.createElement('div');
            
            if (element) {
                cell.className = `element-card ${element.category}`;
                cell.innerHTML = `
                    <div class="number">${element.atomicNumber}</div>
                    <div class="symbol">${element.symbol}</div>
                `;
                cell.addEventListener('click', () => showElementDetails(element));
                cell.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify(element));
                });
                cell.draggable = true;
            } else {
                cell.className = 'element-card empty';
            }
            
            periodicTable.appendChild(cell);
        }
    }
}

// Element list generation for reaction page
function generateElementList() {
    elementList.innerHTML = '';
    
    elements.forEach(element => {
        const card = document.createElement('div');
        card.className = `element-card ${element.category}`;
        card.innerHTML = `
            <div class="number">${element.atomicNumber}</div>
            <div class="symbol">${element.symbol}</div>
            <div style="font-size: 8px; margin-top: 2px;">${element.name}</div>
        `;
        card.addEventListener('click', () => addElementToReaction(element));
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(element));
        });
        card.draggable = true;
        
        elementList.appendChild(card);
    });
}

// Event listeners setup
function setupEventListeners() {
    // Search functionality
    elementSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterElements();
    });
    
    clearSearchBtn.addEventListener('click', () => {
        elementSearch.value = '';
        searchQuery = '';
        filterElements();
    });
    
    // Legend filtering
    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            selectedCategory = selectedCategory === category ? null : category;
            filterElements();
            updateLegendSelection();
        });
    });
    
    // Reaction simulation
    simulateBtn.addEventListener('click', simulateReaction);
    clearReactionBtn.addEventListener('click', clearReaction);
    
    // Modal close
    document.querySelector('.modal-close').addEventListener('click', () => {
        elementModal.classList.add('hidden');
    });
    
    // Chat functionality
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Close modal when clicking outside
    elementModal.addEventListener('click', (e) => {
        if (e.target === elementModal) {
            elementModal.classList.add('hidden');
        }
    });
}

// Drag and drop setup
function setupDragAndDrop() {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        try {
            const elementData = JSON.parse(e.dataTransfer.getData('text/plain'));
            addElementToReaction(elementData);
        } catch (error) {
            console.error('Invalid drag data');
        }
    });
}

// Element filtering
function filterElements() {
    const elementCards = document.querySelectorAll('#periodic-table .element-card');
    
    elementCards.forEach(card => {
        const symbol = card.querySelector('.symbol')?.textContent;
        const element = elements.find(el => el.symbol === symbol);
        
        if (!element) return;
        
        let visible = true;
        
        // Search filter
        if (searchQuery) {
            const searchMatch = element.name.toLowerCase().includes(searchQuery) ||
                              element.symbol.toLowerCase().includes(searchQuery) ||
                              element.atomicNumber.toString().includes(searchQuery);
            visible = visible && searchMatch;
        }
        
        // Category filter
        if (selectedCategory) {
            visible = visible && element.category === selectedCategory;
        }
        
        if (visible) {
            card.classList.remove('hidden');
            if (searchQuery) {
                card.classList.add('highlighted');
            } else {
                card.classList.remove('highlighted');
            }
        } else {
            card.classList.add('hidden');
            card.classList.remove('highlighted');
        }
    });
}

function updateLegendSelection() {
    legendItems.forEach(item => {
        if (item.dataset.category === selectedCategory) {
            item.style.background = 'rgba(59, 130, 246, 0.2)';
        } else {
            item.style.background = 'transparent';
        }
    });
}

// Element details modal
function showElementDetails(element) {
    const detail = document.getElementById('element-detail');
    detail.innerHTML = `
        <div class="element-detail-header">
            <div class="element-card-large ${element.category}">
                <div class="number">${element.atomicNumber}</div>
                <div class="symbol" style="font-size: 2rem;">${element.symbol}</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem;">${element.name}</div>
            </div>
        </div>
        <div class="element-properties">
            <h3>Properties</h3>
            <div class="property-grid">
                <div class="property">
                    <span class="property-label">Atomic Mass:</span>
                    <span class="property-value">${element.atomicMass} u</span>
                </div>
                <div class="property">
                    <span class="property-label">Category:</span>
                    <span class="property-value">${element.category.replace('-', ' ')}</span>
                </div>
                <div class="property">
                    <span class="property-label">Atomic Number:</span>
                    <span class="property-value">${element.atomicNumber}</span>
                </div>
            </div>
        </div>
    `;
    
    elementModal.classList.remove('hidden');
}

// Reaction functionality
function addElementToReaction(element) {
    if (selectedElements.length < 2 && !selectedElements.find(el => el.symbol === element.symbol)) {
        selectedElements.push(element);
        updateSelectedElements();
        updateSimulateButton();
    }
}

function updateSelectedElements() {
    selectedElementsContainer.innerHTML = '';
    
    selectedElements.forEach((element, index) => {
        const card = document.createElement('div');
        card.className = `element-card ${element.category}`;
        card.innerHTML = `
            <div class="number">${element.atomicNumber}</div>
            <div class="symbol">${element.symbol}</div>
            <button class="remove-element" onclick="removeElement(${index})" style="position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; cursor: pointer;">×</button>
        `;
        selectedElementsContainer.appendChild(card);
    });
    
    if (selectedElements.length === 0) {
        selectedElementsContainer.innerHTML = '<p>Drop elements here or click from the list below</p>';
    }
}

function removeElement(index) {
    selectedElements.splice(index, 1);
    updateSelectedElements();
    updateSimulateButton();
}

function updateSimulateButton() {
    simulateBtn.disabled = selectedElements.length < 2;
}

function simulateReaction() {
    if (selectedElements.length < 2) return;
    
    const element1 = selectedElements[0];
    const element2 = selectedElements[1];
    const reactionKey = `${element1.symbol}-${element2.symbol}`;
    const reverseKey = `${element2.symbol}-${element1.symbol}`;
    
    const reaction = reactions[reactionKey] || reactions[reverseKey];
    
    if (reaction) {
        displayReactionResult(reaction, element1, element2);
        createReactionAnimation(reaction.animation);
    } else {
        displayNoReaction(element1, element2);
    }
}

function displayReactionResult(reaction, element1, element2) {
    reactionOutput.innerHTML = `
        <div class="reaction-equation">
            <span class="reactant">${element1.symbol}</span>
            <span class="plus">+</span>
            <span class="reactant">${element2.symbol}</span>
            <span class="arrow">→</span>
            <span class="product">${reaction.result}</span>
        </div>
        <div class="reaction-info">
            <h4>${reaction.name}</h4>
            <p><strong>Type:</strong> ${reaction.type}</p>
            <p><strong>Description:</strong> ${reaction.description}</p>
        </div>
    `;
    reactionResult.classList.remove('hidden');
}

function displayNoReaction(element1, element2) {
    reactionOutput.innerHTML = `
        <div class="reaction-equation">
            <span class="reactant">${element1.symbol}</span>
            <span class="plus">+</span>
            <span class="reactant">${element2.symbol}</span>
            <span class="arrow">→</span>
            <span class="product">No Reaction</span>
        </div>
        <div class="reaction-info">
            <p>These elements do not readily react under normal conditions.</p>
        </div>
    `;
    reactionResult.classList.remove('hidden');
}

function createReactionAnimation(animationType) {
    animationContainer.innerHTML = '';
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    switch (animationType) {
        case 'explosion':
            createExplosionAnimation(centerX, centerY);
            break;
        case 'gas':
            createGasAnimation(centerX, centerY);
            break;
        case 'crystallization':
            createCrystalAnimation(centerX, centerY);
            break;
    }
    
    // Create bubbles for all reactions
    createBubbles(centerX, centerY);
}

function createExplosionAnimation(x, y) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        animationContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function createGasAnimation(x, y) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'gas-particle';
        particle.style.left = (x + Math.random() * 100 - 50) + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDelay = Math.random() * 1 + 's';
        animationContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
}

function createCrystalAnimation(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'crystal-particle';
        particle.style.left = (x + Math.random() * 80 - 40) + 'px';
        particle.style.top = (y + Math.random() * 60 - 30) + 'px';
        particle.style.animationDelay = Math.random() * 0.8 + 's';
        animationContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

function createBubbles(x, y) {
    for (let i = 0; i < 25; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 20 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (x + Math.random() * 200 - 100) + 'px';
        bubble.style.top = (y + Math.random() * 100 - 50) + 'px';
        bubble.style.animationDelay = Math.random() * 1 + 's';
        animationContainer.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), 2000);
    }
}

function clearReaction() {
    selectedElements = [];
    updateSelectedElements();
    updateSimulateButton();
    reactionResult.classList.add('hidden');
    animationContainer.innerHTML = '';
}

// Chat functionality
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hydrogen')) {
        return "Hydrogen is the lightest and most abundant element in the universe. It's highly reactive and commonly forms water when combined with oxygen!";
    } else if (lowerMessage.includes('water') || lowerMessage.includes('h2o')) {
        return "Water (H₂O) is formed when hydrogen and oxygen react. This is one of the most important chemical reactions for life on Earth!";
    } else if (lowerMessage.includes('reaction') || lowerMessage.includes('react')) {
        return "Chemical reactions involve the breaking and forming of bonds between atoms. Try dragging elements to the reaction zone to see them interact!";
    } else if (lowerMessage.includes('periodic table')) {
        return "The periodic table organizes all known elements by their atomic number and properties. Each column represents elements with similar characteristics!";
    } else if (lowerMessage.includes('gold') || lowerMessage.includes('au')) {
        return "Gold (Au) is a noble metal that doesn't react easily with other elements. That's why it doesn't tarnish and has been valued throughout history!";
    } else if (lowerMessage.includes('salt') || lowerMessage.includes('nacl')) {
        return "Table salt (NaCl) forms when sodium and chlorine react. It's an ionic compound where electrons are transferred between atoms!";
    } else {
        return "That's an interesting chemistry question! I can help you learn about elements, reactions, and chemical properties. What would you like to explore?";
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);

// Global function for removing elements (needed for onclick handlers)
window.removeElement = removeElement;