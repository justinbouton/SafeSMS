// Create on click function. If nav-item active toggle class "active", toggle class of nav-item to active when clicked.
$(function() {
    var page = window.location.pathname;
    
    $('.nav-item').filter(function(){
       return $(this).find('a').attr('href').indexOf(page) !== -1
    }).addClass('active');
  
    $(".nav a").on("click", function() {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
});