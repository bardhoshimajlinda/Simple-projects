document.addEventListener('DOMContentLoaded', function () {
    const addNoteButton = document.getElementById('addNoteBtn');
    const cancelButton = document.getElementById('cancelBtn');
    const noteNameInput = document.getElementById('noteName');
    const noteTextarea = document.getElementById('myNote');
    const notesContainer = document.getElementById('notesContainer');

    addNoteButton.addEventListener('click', addNote);
    cancelButton.addEventListener('click', clearNote);

    function addNote() {
        const noteText = noteTextarea.value.trim();
        const noteName = noteNameInput.value.trim();

        if (noteText === '' || noteName === '') {
            alert('Please enter both note name and content.');
            return;
        }

        const currentDate = new Date().toLocaleString();

        const noteElement = document.createElement('li');
        noteElement.innerHTML = `<strong>${noteName}</strong> - ${currentDate}<br>${noteText}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            notesContainer.removeChild(noteElement);
        });

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', function () {
            const updatedText = prompt('Edit note:', noteText);
            if (updatedText !== null) {
                noteElement.innerHTML = `<strong>${noteName}</strong> - ${currentDate}<br>${updatedText}`;
            }
        });

        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);

        clearNote();
    }

    function clearNote() {
        noteNameInput.value = '';
        noteTextarea.value = '';
    }
});