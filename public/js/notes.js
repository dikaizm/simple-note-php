document.addEventListener('DOMContentLoaded', function() {
    // Notes card interaction
    let noteCard = document.querySelectorAll('.note-card')

    // Loop note card
    noteCard.forEach((noteCard, index) => {
        // Show/hide card attribute
        noteCard.addEventListener('mouseenter', () => {
            const noteAttr = document.getElementById(`note-attr-${index}`);
            noteAttr.classList.remove('fade-out');
            noteAttr.classList.add('fade-in');
        });
    
        noteCard.addEventListener('mouseleave', () => {
            const noteAttr = document.getElementById(`note-attr-${index}`);
            noteAttr.classList.add('fade-out');
            noteAttr.classList.remove('fade-in');
        });

        // Pass data into note modal #SHOW
        $(document).ready(function () {
            $(`#note-edit-btn-${index}`).click(function () {
              const id = $(this).data('id');
              $.ajax({
                url: 'note/edit',
                type: 'post',
                data: { id: id },
                success: function (response) {
                    let note = JSON.parse(response);

                    $('#note-id-update').val(note.id);
                    $('#note-update-btn').data('id', note.id);
                    $('#note-id-delete').val(note.id);
                    $('#note-title').html(note.title);
                    $('#note-body').html(note.body);
                    $('#note-container').show();
                }
              });
            });
        });

        // Pass data into note modal #PATCH
        $(document).ready(function () {
            $('#note-update-btn').click(function () {
              const id = $(this).data('id');
              $.ajax({
                url: 'note/update',
                type: 'post',
                data: { id: id },
                success: function (response) {
                    let note = JSON.parse(response);

                    $('#note-id-update').val(note.id);
                    $('#note-update-btn').data('id', note.id);
                    $('#note-id-delete').val(note.id);
                    $('#note-title').html(note.title);
                    $('#note-body').html(note.body);
                    $('#note-container').show();
                }
              });
            });
        });

        // NEED TO FIX
        $(document).ready(function () {
            $(`#note-view-${index}`).click(function () {
              const id = $(this).data('id');
              $.ajax({
                url: 'note/edit',
                type: 'post',
                data: { id: id },
                success: function (response) {
                    let note = JSON.parse(response);

                    $('#note-title').html(note.id);
                    $('#note-title').html(note.title);
                    $('#note-body').html(note.body);
                    $('#note-container').show();
                }
              });
            });
        });
    });

    // Modal interaction
    const modalContainer = document.getElementById("note-container");

    // Modal function
    function openModal() {
        modalContainer.style.display = 'show'
    }

    function closeModal() {
        modalContainer.style.display = 'none'
    }

    // Close note modal
    const noteClose = document.getElementById('note-close-btn');
    noteClose.addEventListener('click', closeModal)

    // Close note escape
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModal()
        }
    });
});