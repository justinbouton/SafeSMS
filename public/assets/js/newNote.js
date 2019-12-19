// On key up check for enter. If enter newNote()
$("#newNote").keyup(function () {
    // check for val if true allow enter press  
    
        if (event.keyCode === 13) {
          event.preventDefault()
          newNote()
        };
    });
    
    $("#newNoteSend").click(function () {
      event.preventDefault()
      newNote()
    });
    
    function newNote() {
      var noteBody = $('#newNote').val()
      var pathArray = window.location.pathname.split('/');
      var url = pathArray[2];

      alert(noteBody)
      alert(url)
    
      // If it is, compile all user info into one object
      var newNote = {
        'created': Date.now,
        'earthquakeId': url,
        'noteBody': noteBody
      }
    
      // Use AJAX to post the object to our newUser service
      $.ajax({
        type: 'POST',
        data: newNote,
        url: '/notes/newNote',
        dataType: 'JSON'
      }).done(function (response) {
        });
        // Reloads the current page
        window.location.reload()
    };