// Add button onSubmit(), validate fields, capture values, wrap into JSON, post newAdmin to /Admins/create.
function addAdmin(form) {
    console.log("addAdmin clicked")
        event.preventDefault();
      
        // Super basic validation - increase errorCount variable if any fields are blank
        var errorCount = 0;
        $('.addAdmin').each(function(index, val) {
          if($(this).val() === '') { 
              errorCount++; 
              // toggle this.class red border
              console.log(this)
              this.className = "redBorder";
            } else {
                this.classList.remove("redBorder")
            }
        });
    console.log("errorCount: " + errorCount);
    
      
        // Check and make sure errorCount's still at zero
        if(errorCount === 0) {
      
          // If it is, compile all Admin info into one object
          var newAdmin = {
            'created': Date.now,
            'modified': Date.now,
            'firstName': $('.firstName').val(),
            'lastName': $('.lastName').val(),
            'email': $('.email').val(),
            'phone': $('.phone').val(),
            'password': $('.password').val()
          }
      
      console.log(newAdmin)
      
          // Use AJAX to post the object to our newAdmin service
          $.ajax({
            type: 'POST',
            data: newAdmin,
            url: '/signup',
            dataType: 'JSON'
          }).done(function( response ) {
    
    console.log(response);
    
      // Reloads the current page
      window.location.replace("/users")
    
          });
        }
        else {
          // If errorCount is more than 0, error out
          alert('Please fill in all fields');
          return false;
        }
      };