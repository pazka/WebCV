(function($){
  $(function(){
    $(document).ready(function(){
      $('.parallax').parallax();
    });

    $('.chips').material_chip();
    $('.chips').on('chip.select', function(e, chip){

    });

    $('.chips-initial').material_chip({
    });

    $('.chips-placeholder').material_chip({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });$

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 150, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
      }
    );
  }); // end of document ready
})(jQuery); // end of jQuery name space

Array.prototype.insert = function (index, item) {
this.splice(index, 0, item);
};

//some css
var orNavSize = [$('.navItem').outerWidth(),$('.navItem').outerHeight()];
//important to save the position otherwise the the elem is subjet to shrinking if the mouseleave is properly recorded
$('.navItem').hover(function(event){
    $(this).stop().animate({
        height: event.type === "mouseenter" ? (orNavSize[1] + 10)+"px" : orNavSize[1],
        width: event.type === "mouseenter" ? (orNavSize[0] + 10)+"px" : orNavSize[0]}, 30,
    function() {
    // Animation complete.
  });
});
