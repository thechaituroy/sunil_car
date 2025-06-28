// Template Name: Logistic
// Version: 1.0.0
// Author: Webstrot 


/************ TABLE OF CONTENTS ***************

  01. preloader js
  02. header js
  03. button animation js
  04. outer height js
  05. counter js
  06. scramble Text js
  07. menu toggle js
  08. owlCarousel js
  10. header outer height js
  11. menu dropdown js

**********************************************/

// preloader js
$(window).on('load', function () {
    $("#status").fadeOut();
    $("#preloader").delay(450).fadeOut("slow");
});


// header js
$(document).ready(function () {
  const header = $(".logisticHeader");
  const toggleClass = "headerActive";

  // Check if there's a saved scroll position in localStorage
  const savedScrollPosition = localStorage.getItem("scrollPosition");

  if (savedScrollPosition && parseInt(savedScrollPosition) > 150) {
      header.addClass(toggleClass);
  }

  $(window).scroll(function () {
      const currentScroll = $(window).scrollTop();
      if (currentScroll > 150) {
          header.addClass(toggleClass);
      } else {
          header.removeClass(toggleClass);
      }

      // Save the current scroll position in localStorage
      localStorage.setItem("scrollPosition", currentScroll.toString());
  });
});


// button animation js
$(document).ready(function () {
  const images = $('.mgHover');

  images.on('mousemove', function(e) {
      const span = $(this).find('span');
      const { offsetX: x, offsetY: y } = e.originalEvent,
          { offsetWidth: width, offsetHeight: height } = this;

      move = 20;
      xMove = x / width * (move * 2) - move;
      yMove = y / height * (move * 2) - move;

      span.css('transform', `translate(${xMove}px, ${yMove}px)`);
  });

  images.on('mouseleave', function() {
      $(this).find('span').css('transform', '');
  });
});

var buttons = document.querySelectorAll('.primaryBtn, .secondaryBtn, .logisticShipBtn');
buttons.forEach(function (button) {
  button.addEventListener('mousemove', function (e) {
    var x = e.pageX - button.offsetLeft;
    var y = e.pageY - button.offsetTop;
    button.style.setProperty('--x', x + 'px');
    button.style.setProperty('--y', y + 'px');
  });
});


// outer height js
$(document).ready(function () {
  $('.mgHeight').each(function () {
      const $imageContainer = $(this);
      const $span = $imageContainer.find('span');

      // Get the outer height of the <span> element
      const spanOuterHeight = $span.outerHeight();

      // Set the height of the .hover-image container to match the <span> element
      $imageContainer.css('height', spanOuterHeight + 'px');
  });
});

// counter js
(function($) {
    $.fn.countTo = function(options) {
      options = options || {};
  
      return $(this).each(function() {
        // set options for current element
        var settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data("from"),
            to: $(this).data("to"),
            speed: $(this).data("speed"),
            refreshInterval: $(this).data("refresh-interval"),
            decimals: $(this).data("decimals")
          },
          options
        );
  
        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;
  
        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};
  
        $self.data("countTo", data);
  
        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);
  
        // initialize the element with the starting value
        render(value);
  
        function updateTimer() {
          value += increment;
          loopCount++;
  
          render(value);
  
          if (typeof settings.onUpdate == "function") {
            settings.onUpdate.call(self, value);
          }
  
          if (loopCount >= loops) {
            // remove the interval
            $self.removeData("countTo");
            clearInterval(data.interval);
            value = settings.to;
  
            if (typeof settings.onComplete == "function") {
              settings.onComplete.call(self, value);
            }
          }
        }
  
        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };
  
    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null // callback method for when the element finishes updating
    };
  
    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);
  
  jQuery(function($) {
    // custom formatting example
    $(".count-number").data("countToOptions", {
      formatter: function(value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      }
    });
  
    // start all the timers
    $(".timer").each(count);
  
    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
  });


  // scramble Text js
  document.querySelectorAll('.codedText').forEach((t)=>{
    const arr1 = t.innerHTML.split('')
    const arr2 = []
    arr1.forEach( (char,i)=> arr2[i] = randChar() ) //fill arr2 with random characters
    t.onpointerover = ()=>{
      const tl = gsap.timeline()
      let step = 0
      tl.fromTo(t, {
        innerHTML:arr2.join(''),
      },{
        duration:arr1.length/20, //duration based on text length
        ease:'power4.in',
        delay:0.1,
        onUpdate:()=>{
          const p = Math.floor(tl.progress()*(arr1.length)) //whole number from 0 - text length
          if (step != p) { //throttle the change of random characters
            step = p
            arr1.forEach( (char,i)=> arr2[i] = randChar() )
            let pt1 = arr1.join('').substring(p, 0),
                pt2 = arr2.join('').substring(arr2.length-p, 0)
            if (t.classList.contains('fromRight')) {
              pt1 = arr2.join('').substring(arr2.length-p, 0)
              pt2 = arr1.join('').substring(arr1.length-p)
            }
            t.innerHTML = pt1 + pt2 //update text
          }
          
        }
      })
    }
  })
  
  function randChar(){
    let c = "abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`"
    c = c[Math.floor(Math.random() * c.length)]
    return (Math.random()>0.5)? c : c.toUpperCase()
  }

  // menu toggle js
  $('.menu-toggle').on('click', function(){
    $('body').toggleClass('open');
  });

  // Search js
  $('.control').on('click', function(){
    $('body').addClass('search-active');
    $('.input-search').focus();
  });
  
  $('.icon-close').on('click', function(){
    $('body').removeClass('search-active');
  });




// owlCarousel js
  $('.owlCarouselOurProcess').owlCarousel({
    loop:false,
    margin:15,
    responsiveClass:true,
    dotsContainer: '.ourProcessDots',
    responsive:{
        0:{
            items:1,
        },
        991:{
            items:2,
        },
        992:{
            items:2,
        },
        1200:{
          items:2,
        }
    }
});

 $(document).ready(function ($) {
  var owl = $(".owlCarouselOurProcess");
  owl.owlCarousel();
  $(".next-btn").click(function () {
     owl.trigger("next.owl.carousel");
  });
  $(".prev-btn").click(function () {
     owl.trigger("prev.owl.carousel");
  });
  $(".prev-btn").addClass("disabled");
  $(owl).on("translated.owl.carousel", function (event) {
     if ($(".owl-prev").hasClass("disabled")) {
        $(".prev-btn").addClass("disabled");
     } else {
        $(".prev-btn").removeClass("disabled");
     }
     if ($(".owl-next").hasClass("disabled")) {
        $(".next-btn").addClass("disabled");
     } else {
        $(".next-btn").removeClass("disabled");
     }
  });
});

$(document).ready(function($) {
  var owlBanner1 = $(".logisticBannerSlider");
  owlBanner1.owlCarousel({
      items: 1, 
      loop: true,
      nav: false, 
  });

  owlBanner1.on('changed.owl.carousel', function(event) {
      // Find the current and previous items
      var current = $(event.target).find('.item.active');
      var previous = $(event.target).find('.item.active').prev();

      // Remove animation classes from the current slide
      current.find('.slide-content').removeClass('in').addClass('out');

      // Add animation classes to the previous slide
      previous.find('.slide-content').addClass('in').removeClass('out');
  });
});


// header outer height js
$(document).ready(function($) {
  // When the window resizes
    var headerHeight = $('.logisticHeader').outerHeight();
    var newHeight = headerHeight + 100;
    $('.logisticBannerSliderSec').css('padding-top', headerHeight); 
    $('.logisticBannerShipInner').css('padding-top', newHeight + 'px');
    $('.logisticError').css('margin-top', headerHeight + 'px');
    var newHeight = 'calc(100vh - ' + headerHeight + 'px)';
    $('.logisticError').css('height', newHeight); 
});

$(document).ready(function($) {
    var headerTrackHeight = $('.logisticTrackHeader').outerHeight();
    $('.logisticTrackBanner').css('padding-top', headerTrackHeight); 
});

// menu dropdown js
$(document).ready(function(){
  $(" .dropdown").hover(            
      function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
          $(this).toggleClass('open');        
      },
      function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
          $(this).toggleClass('open');       
      }
  );
});







