// Add button onSubmit(), capture values, wrap into JSON, post newMessage to /users/newMessage.
function sendMessage(form) {
  console.log("newMessage clicked")
  event.preventDefault();

  // get the user id path
  var pathArray = window.location.pathname.split('/');
  var url = pathArray[2];

  console.log("url: ")
  console.log(url)

  // If it is, compile all user info into one object
  var newMessage = {
    'messageAdmin': true,
    'created': Date.now,
    'userId': url, // TODO pull _id from URL
    'messageBody': $('#newMessage').val()
  }

  console.log(newMessage)

  // Use AJAX to post the object to our newUser service
  $.ajax({
    type: 'POST',
    data: newMessage,
    url: '/users/newMessage',
    dataType: 'JSON'
  }).done(function (response) {

    console.log(response)

    // Reloads the current page
    window.location.reload()

  });
};