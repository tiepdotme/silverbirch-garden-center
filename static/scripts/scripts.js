document.documentElement.className = "js";

$( "#navToggle" ).click(function() {
  $( "body" ).toggleClass( "nav-open" );
  $( ".navicon" ).toggleClass( "fa-bars fa-times" );
});
