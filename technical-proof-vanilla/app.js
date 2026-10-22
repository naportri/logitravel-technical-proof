// Estado inicial precargado acorde al diseño
let items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' }
];
let historyStack = [];
let selectedIds = [];

// Elementos del DOM
const mainView = document.getElementById('mainView');
const addView = document.getElementById('addView');
const textList = document.getElementById('textList');
const textInput = document.getElementById('textInput');
const deleteBtn = document.getElementById('deleteBtn');
const undoBtn = document.getElementById('undoBtn');
const openAddViewBtn = document.getElementById('openAddViewBtn');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');

function saveState() {
    historyStack.push(JSON.stringify(items));
    undoBtn.disabled = false;
}

function render() {
    textList.innerHTML = '';
    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        
        if (selectedIds.includes(item.id)) {
            li.classList.add('selected');
        }

        // Selección múltiple por clic simple
        li.addEventListener('click', () => {
            if (selectedIds.includes(item.id)) {
                selectedIds = selectedIds.filter(id => id !== item.id);
            } else {
                selectedIds.push(item.id);
            }
            
            deleteBtn.disabled = selectedIds.length === 0;
            render();
        });

        // Doble clic para eliminar directamente
        li.addEventListener('dblclick', () => {
            saveState();
            items = items.filter(i => i.id !== item.id);
            selectedIds = selectedIds.filter(id => id !== item.id);
            deleteBtn.disabled = selectedIds.length === 0;
            render();
        });

        textList.appendChild(li);
    });
}

// Navegación entre vistas
openAddViewBtn.addEventListener('click', () => {
    mainView.classList.remove('active');
    addView.classList.add('active');
    textInput.value = '';
    
    // Al abrir la vista, el botón ADD debe estar desactivado
    addBtn.disabled = true;
    textInput.focus();
});

cancelBtn.addEventListener('click', () => {
    addView.classList.remove('active');
    mainView.classList.add('active');
});

// Validar en tiempo real si el input tiene texto para activar/desactivar el botón ADD
textInput.addEventListener('input', () => {
    const text = textInput.value.trim();
    addBtn.disabled = text === '';
});

// Agregar elemento desde la vista de añadir
function handleAddItem() {
    const text = textInput.value.trim();
    if (text === '') return;

    saveState();
    items.push({ id: Date.now(), text });
    
    addView.classList.remove('active');
    mainView.classList.add('active');
    render();
}

addBtn.addEventListener('click', handleAddItem);
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && textInput.value.trim() !== '') {
        handleAddItem();
    }
});

// Eliminar elementos seleccionados
deleteBtn.addEventListener('click', () => {
    if (selectedIds.length === 0) return;

    saveState();
    items = items.filter(i => !selectedIds.includes(i.id));
    selectedIds = [];
    deleteBtn.disabled = true;
    render();
});

// Deshacer cambios
undoBtn.addEventListener('click', () => {
    if (historyStack.length === 0) return;

    const previousState = historyStack.pop();
    items = JSON.parse(previousState);
    selectedIds = [];
    deleteBtn.disabled = true;

    if (historyStack.length === 0) {
        undoBtn.disabled = true;
    }
    render();
});

// Inicializar renderizado y estado inicial del botón ADD
addBtn.disabled = true;
render();