

$(document).ready(function() {
    $('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: false,
        continuousVertical: false,
        scrollOverflow: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        sectionsColor : ['#ccc', '#fff'],
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){
          $('.fullpage #portada .poster div[class*="layer-"]').addClass('transitionLayer');
          $('body.loaded #fullpage > div:first-of-type.active #portada .poster').addClass('transitionLayer');


        },
        afterLoad: function(anchorLink, index){
          $('.fullpage #portada .poster div[class*="layer-"]').removeClass('transitionLayer');
          $('body.loaded #fullpage > div:first-of-type.active #portada .poster').removeClass('transitionLayer');

        },
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
});

var dragdealerActivities, dragdealerSpecialEvents;

$(function() {

$('#down').click(function(event) {
  $.fn.fullpage.moveSectionDown();
});

$('#next').click(function() {
  dragdealerActivities.setStep(dragdealerActivities.getStep()[0]  + 1);
  return false;
});
$('#prev').click(function() {
  dragdealerActivities.setStep(dragdealerActivities.getStep()[0]  - 1);
  return false;
});

dragdealerActivities = new Dragdealer('activities-carousel', {
  speed: 0.3,
  x:0,
  steps: 16,
  loose: true,
  requestAnimationFrame: true
});

/*dragdealerSpecialEvents = new Dragdealer('special-carousel', {
  speed: 0.3,
  x:0,
  loose: true,
  requestAnimationFrame: true
});*/

});

$(window).load(function() {
    updateCarousel('activities');
    //updateCarousel('special');
    setTimeout(updateCarousel('activities'), 1000);
    //setTimeout(updateCarousel('special'), 1000);
    if(!(window.ActiveXObject) && "ActiveXObject" in window){$("html").addClass("ie");}
});

window.onresize = function () {
    updateCarousel('activities');
    //updateCarousel('special');
};

var updateCarousel = function(carousel) {
    var carouselWidth = 0;
    
    // Assuming all items in a carousel have the same width
    var numItems = $('#' + carousel + '-carousel > .handle > .page').children().length;
    carouselWidth = numItems * $('#' + carousel + '-carousel > .handle > .page').children().first().outerWidth();
    carouselWidth += numItems * 20;

/*
    $('#' + carousel + '-carousel > .handle > .page').children().each(function(){
         return carouselWidth = carouselWidth + 10 + $(this).outerWidth();
    });
*/
    $('#' + carousel + '-carousel > .handle').width(carouselWidth + 150);

    dragdealerActivities.reflow();
    //dragdealerSpecialEvents.reflow();
};



/*Parallax*/

$(document).ready(function(){


  var $poster = $('.poster-wrapper'),
      $layer = $('div[class*="layer-"]'),
      w = $(window).width(), //window width
      h = $(window).height(); //window height

  $(window).on('mousemove', function(e) {
    var offsetX = 0.5 - e.pageX / w, //cursor position X
      offsetY = 0.5 - e.pageY / h, //cursor position Y
      dy = e.pageY - h / 2, //@h/2 = center of poster
      dx = e.pageX - w / 2, //@w/2 = center of poster
      theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
      angle = theta * 180 / Math.PI - 90, //convert rad in degrees
      offsetPoster = $poster.data('offset'),
      transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

    //get angle between 0-360
    if (angle < 0) {
      angle = angle + 360;
    }


    //poster transform
    $poster.css('transform', transformPoster);

    //parallax foreach layer
    $layer.each(function() {

      var $this = $(this),
        offsetLayer = $this.data('offset') || 0,
        transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

      $this.css('transform', transformLayer);
    });

  });



});
