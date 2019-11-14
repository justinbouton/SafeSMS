// On key up check for enter. If enter sendMessage()
$("#newMessage").keyup(function () {
  if (event.keyCode === 13) {
    event.preventDefault()
    sendMessage()
  };
});

$("#newMessageSend").click(function () {
  event.preventDefault()
  sendMessage()
});

function sendMessage() {
  var messageBody = $('#newMessage').val()
  var pathArray = window.location.pathname.split('/');
  var url = pathArray[2];

  // If it is, compile all user info into one object
  var newMessage = {
    'messageAdmin': true,
    'created': Date.now,
    'userId': url,
    'messageBody': messageBody
  }

  // Use AJAX to post the object to our newUser service
  $.ajax({
    type: 'POST',
    data: newMessage,
    url: '/users/newMessage',
    dataType: 'JSON'
  }).done(function (response) {
    });
    // Reloads the current page
    window.location.reload()
};