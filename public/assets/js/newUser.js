// Add button onSubmit(), validate fields, capture values, wrap into JSON, post newUser to /users/create.
function addUser(form) {
console.log("addUser clicked")
    event.preventDefault();
  
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('.addUser').each(function(index, val) {
      if($(this).val() === '') { 
          errorCount++; 
          // toggle this.class red border
          console.log(this)
          this.className += " redBorder";
        } else {
            this.classList.remove("redBorder")
        }
    });
console.log("errorCount: " + errorCount);

  
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
  
      // If it is, compile all user info into one object
      var newUser = {
        'created': Date.now,
        'modified': Date.now,
        'firstName': $('.firstName').val(),
        'lastName': $('.lastName').val(),
        'email': $('.email').val(),
        'phone': $('.phone').val()
      }
  
  console.log(newUser)
  
      // Use AJAX to post the object to our newUser service
      $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/newUser',
        dataType: 'JSON'
      }).done(function( response ) {

console.log(response);

  // Reloads the current page
  window.location.reload()

      });
    }
    else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
    }
  };

  // TEST setAdmin 
  $('#isAdmin').click(function () {
    event.preventDefault()
    var a = "btn-outline-success";
    var b = "btn-success";
    var state = this.className.indexOf(a) > -1; $(this).toggleClass(a, !state).toggleClass(b, state)
  //   $(this).toggle.val("yes");
  });


  // TEST userEdit
  $('#settings').click(function () {
    event.preventDefault()

    let edit = document.getElementsByClassName('clicktoedit');
    let edited = document.getElementsByClassName('edit');

  // if element class = clicktoedit change to class edit else change class to clicktoedit
  if (edited.length != 0) {
    // Loop through each clicktoedit element and add 
    for (let item of edit) {
      item.classList.remove('edit')
    };
  } else {
    // Loop through each clicktoedit element and add 
      for (let item of edit) {
        item.classList.add('edit')
      };
  };
    
  });