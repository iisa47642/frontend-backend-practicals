const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    list.innerHTML = notes.map((note, i) =>
        `<li class="card" style="margin-bottom: 0.5rem; padding: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <span>${note}</span>
            <button class="button error outline" style="padding: 0.25rem 0.5rem;" onclick="deleteNote(${i})">&#10005;</button>
        </li>`
    ).join('');
}

function addNote(text) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(text);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        addNote(text);
        input.value = '';
    }
});

loadNotes();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker зарегистрирован:', registration.scope);
        } catch (err) {
            console.error('Ошибка регистрации ServiceWorker:', err);
        }
    });
}