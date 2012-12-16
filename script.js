/*
 * Conditional uncomment technique
 * --------------------------------------------------------------
 * Show content (in this example slides of a slideshow)
 * only if there is enough horizontal space (e.g. 900px) for them
 * by uncommenting the html. Why would you like to do this? Because you
 * want to save traffic on mobile devices and make the site loading faster.
 * You perhaps also don't want to place image paths or other
 * content in your javascript files for conditional loading.
 *
 * This technique lets you put your html where it belongs to and
 * not inside an external js or json file.
 * You want to see the effect? Make your browserwindow smaller than 900px
 * in width and then make it bigger, at least 901px wide. You'll see that
 * the comments around the images will disappear.
 */


/* First we need this awesome little "jQuery uncomment" plugin
 * Author: Romuald Brunet <romuald@chivil.com>
 * http://chivil.com/uncomment/
 */
(function($) {
  $.fn.uncomment = function(recurse) {
    $(this).contents().each(function() {
      if ( recurse && this.hasChildNodes() ) {
      	$(this).uncomment(recurse);
			} else if ( this.nodeType == 8 ) {
				// Need to "evaluate" the HTML content,
				// otherwise simple text won't replace
				var e = $('<span>' + this.nodeValue + '</span>');
				$(this).replaceWith(e.contents());
			}
		});
	};
})(jQuery);


/*
 * Next up a very simple slideshow approach, just to demonstrate the behavior
 * Simple jQuery Slideshow
 * http://codepen.io/MoritzGiessmann/pen/kIGvs
 * @author @MoritzGiessmann
 */

$(document).ready(function() {

  $(".slideshow :first-child").appendTo(".slideshow");
  setInterval(function() {
    $(".slideshow :first-child")
        .hide()
        .appendTo(".slideshow")
        .fadeIn(2000);
    }, 4000);


/*
 * Now we check how much space we have and uncomment the images (could also be
 * HTML or whatever)
 */

  function uncommentIfBigEnough () {
    $('.window-size').text('Client width: ' + document.documentElement.clientWidth+'px');

    if (document.documentElement.clientWidth > 900) {
      $('.slideshow').uncomment(true); // uncomments everything inside of the given element
    }
  }

  // Initial function call
  uncommentIfBigEnough();

  // Call if window gets resized
  $(window).resize(function(){
    uncommentIfBigEnough();
  });

  //Todo: initialize once

});