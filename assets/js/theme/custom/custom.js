var isMobile = false;

$(document).ready(function(){

  /* Js for Wishlist Button */
  $('.wishList').click(function (e) {
      e.preventDefault();
      if (!$('#commonwishlist').length) {
          $('<form id="commonwishlist" method="post" style="display:none;" action="' + $(this).attr('data-href') + '"><input type="submit" value="submit"></form>').appendTo('body');
      } else {
          $('#commonwishlist').attr('action', $(this).attr('data-href'));
      }
      $('#commonwishlist input').click();
  });
  /* Js for Wishlist Button */


  /* Js for Open/Close of Filter on click of Filter Icon */
  $('.mobileFixed').click(function() {
    $("#facetedSearch-navList").toggleClass("is-open");
  });
  /* Js for Open/Close of Filter on click of Filter Icon */

  /* Mobile Toggle button js */
  $(".header-center .mobileMenu-toggle-open-inner").click(function(){
    $("body, .header-wrapper").addClass("overlay");
    $(".header-left").css("left","0");
  });
  $(".header-center .mobileMenu-toggle-close-inner").click(function(){
    $("body, .header-wrapper").removeClass("overlay");
    $(".header-left").css("left","-100%");
  });
  $(".header-left .mobileMenu-toggle-open-inner").click(function(){
    $("body, .header-wrapper").addClass("overlay");
    $(".header-middle").css("right","0");
  });
  $(".header-left .mobileMenu-toggle-close-inner").click(function(){
    $("body, .header-wrapper").removeClass("overlay");
    $(".header-middle").css("right","-100%");
  });
  $(".header-center-stacked .mobileMenu-toggle-open-inner, .header-stacked-social .mobileMenu-toggle-open-inner").click(function(){
    $("body, .header-wrapper").addClass("overlay");
    $(".header-stacked").css("left","0");
  });
  $(".header-center-stacked .mobileMenu-toggle-close-inner, .header-stacked-social .mobileMenu-toggle-close-inner").click(function(){
    $("body, .header-wrapper").removeClass("overlay");
    $(".header-stacked").css("left","-100%");
  });
  $(".menu-icon").click(function(){
    $(this).toggleClass("is-open");
    $(this).next(".navPage-subMenu, .navPage-childList").toggleClass("is-open");
  });
  /* Mobile Toggle button js */


  /* Js for Position of Filter Icon when Header is transparent and Sticky for Category Like Pages */
  function setMobileFilterIconPosition() {
    var posFilterIcon = $(".header").outerHeight() + 30;

    if($(".header").hasClass("transparent-header")) {
      $(".mobileFixed").addClass("mobileFixed--transparent-header");
      $(".mobileFixed--transparent-header").css("top", posFilterIcon);
    }

    if($(".header").hasClass("sticky-header")) {
      $(".mobileFixed").addClass("mobileFixed--sticky-header");
      $(".mobileFixed--sticky-header").css("top", posFilterIcon);
    }
  }
  /* Js for Position of Filter Icon when Header is transparent and Sticky for Category Like Pages */


  /* Newsletter Popup js */
  if ($.cookie("popupShownOnceAlready")) {
    $("#newsletter-popup.popup-active-with-cookie").addClass("hide-popup");
    $("#newsletter-popup.popup-active-with-cookie").removeClass("show-popup");

    $("#dialog .close").click(function (e) {
      e.preventDefault();
      $("#newsletter-popup").addClass("hide-popup");
      $("#newsletter-popup").removeClass("show-popup");
    });
  }
  else {
    // and now we create 1 day cookie
    $.cookie("popupShownOnceAlready", true, {path: '/', expire: 1});
    var $myDiv = $(".default--template");
    if ($myDiv.length){
      var id = "#dialog";
      var winH = $(window).height();
      var winW = $(window).width();
      $(id).css("top",  winH/2-$(id).height()/2);
      $(id).css("left", winW/2-$(id).width()/2-35);
      $(id).fadeIn(2000);

     $("#dialog .close").click(function (e) {
      e.preventDefault();
      $("#newsletter-popup").addClass("hide-popup");
      $("#newsletter-popup").removeClass("show-popup");
     });

     // AFTER COOKIE EXPIRES RUN THIS CODE
     $("#newsletter-popup.popup-active-with-cookie").addClass("show-popup");
     $("#newsletter-popup.popup-active-with-cookie").removeClass("hide-popup");
     // END AFTER COOKIE EXPIRES RUN THIS CODE
    }
  }

  $(window).on("unload", function(e) {
    deleteCookie("popupShownOnceAlready");
  });
  /* Newsletter Popup js */

  /* Js for Select Option on selection for PDP */

  $('[id*="attribute_rectangle"]').click(function() {
    var selectedTextRectangle = $(this).next(".form-option").find(".form-option-variant").text();
    $(this).parent().parent().find(".form-label [data-option-value]").text(selectedTextRectangle);
  });

  /* Js for Select Option on selection for PDP */


  /* Transparent Header Js for Carousel */

  function adjustCarouselAndSearchDropdown() {
    var top_banner_height = $(".global-banner.top").length ? $(".global-banner.top").outerHeight() : 0;
    var top_marketing_banner_height = $(".banners[data-banner-location=top]").length ? $(".banners[data-banner-location=top]").outerHeight() : 0;

    var carouselContentHeight = 0,
          carouselMargin = 0,
          slickArrowTopAdjusted = 0,
          slickArrowTopAdjustedInPercent = 0;

    carouselMargin = top_banner_height + top_marketing_banner_height - 1;

    if($('.header').hasClass('transparent-header')) {
      $(".default--template .heroCarousel--transparent-header").css("margin-top", carouselMargin+"px");

      $('.default--template .heroCarousel').on('init afterChange beforeChange', function() {
        carouselContentHeight = $(this).find(".heroCarousel-content").outerHeight()/100;
        slickArrowTopAdjusted = 50 + (carouselMargin/100) + carouselContentHeight + ($(".header-wrapper").outerHeight())/100;
        slickArrowTopAdjustedInPercent = slickArrowTopAdjusted+"%";

        if ($(window).width() > 550) {
          $(this).find(".slick-prev, .slick-next").css("top", slickArrowTopAdjustedInPercent);
        } else {
          $(this).find(".slick-prev, .slick-next").removeAttr("style");
        }
      });

      $('.default--template .heroCarousel').on('breakpoint', function(event, slick, breakpoint) {
        carouselContentHeight = $(this).find(".heroCarousel-content").outerHeight()/100;
        slickArrowTopAdjusted = 50 + (carouselMargin/100) + carouselContentHeight + ($(".header-wrapper").outerHeight())/100;
        slickArrowTopAdjustedInPercent = slickArrowTopAdjusted+"%";

        if ($(window).width() > 550) {
          $(this).find(".slick-prev, .slick-next").css("top", slickArrowTopAdjustedInPercent);
        } else {
          $(this).find(".slick-prev, .slick-next").removeAttr("style");
        }
      });
    }
  }
  
  /* Transparent Header Js for Carousel */


  /* Sticky Header JS */
    function stickyHeader() {
      var main_header = $(".header.sticky-header").outerHeight();
      $(".body--with-sticky_header").css("padding-top", main_header);
      if($('body').hasClass('body--with-transparent_header')) {
        $(".body--with-sticky_header").css("padding-top",0);
      }

      if(!$('body').hasClass('default--template') && $('body').hasClass('body--with-sticky_header')) {
        $(".body--with-sticky_header").css("padding-top", main_header);
      }

      $(window).scroll(function() {
        if ($(this).scrollTop() > 340) {
          if(!$('body').hasClass('default--template') && $('body').hasClass('body--with-sticky_header')) {
            if ($('body').hasClass('product--template')) {
              $(".body--with-sticky_header").css("padding-top", 2 * main_header);
            }
            // else{
            //   $(".body--with-sticky_header").css("padding-top", 0);
            // }
          }
        }
        else if (!$('body').hasClass('default--template')) {
          $(".body--with-sticky_header").css("padding-top", main_header);
        }
      });
    }
  /* Sticky Header JS */

  /* Only for Transparent Header JS */
  function headerTransparentButNotSticky() {
    var headerTransparentButNotStickyVar = (!$(".header").hasClass("sticky-header") && $(".header").hasClass("transparent-header")) ? true : false; 

    if (headerTransparentButNotStickyVar) {
      var headerTransparentButNotStickyHeight = $(".header").outerHeight();
      $(".default--template .body").css("margin-top", "-"+headerTransparentButNotStickyHeight+"px");
    }
  }
  /* Only for Transparent Header JS */


  /* Footer Toggle js */
  footerToggle();
  adjustCarouselAndSearchDropdown();
  stickyHeader();
  headerTransparentButNotSticky();
  setMobileFilterIconPosition();
  handleWindowResize();

  window.addEventListener("resize", function() {
    handleWindowResize();
    adjustCarouselAndSearchDropdown();
    stickyHeader();
    headerTransparentButNotSticky();
    setMobileFilterIconPosition();

    if ($(window).width() > 800) {
      $(".footer .footer-info-col.footer-info-col--small .footer-info-heading").parent().find(".footer-info-list").removeAttr("style");
      $(".footer .footer-info-col.footer-info-col--small .footer-info-heading").removeClass("toggle-active");
      $(".facetedSearch-toggle.mobileFixed").removeClass("active");
      $("body, .header-wrapper").removeClass("overlay");
      $(".header-middle, .header-left").removeAttr("style");
    }
  });
  /* Footer Toggle js */

  /* Js for closing filter menu in mobile device */
  $(document).on("click", '.accordion--navList.mobileOnly .close', function(event) {
    $('#facetedSearch-navList').removeClass('is-open');
    $('.facetedSearch-toggle.toggleLink').removeClass('is-open');
  });
  /* Js for closing filter menu in mobile device */


  /* List/Grid View Toggle */
  $( "a.toggle-link" ).click(function(e) {
      e.preventDefault();
  });

  $("a.toggle-link").on("click", function() {
    $("a.toggle-link").not(this).removeClass("active");
    $(this).addClass("active");

    if ($("a.toggle-link.grid").hasClass("active")) {
      $(".gridView").show();
      $(".listView").hide();
    } else if ($("a.toggle-link.list").hasClass("active")) {
      $(".listView").show();
      $(".gridView").hide();
    } else {
      $(".listView").removeAttr("style");
      $(".gridView").removeAttr("style");
    }

  });
  /* List/Grid View Toggle */


  /* Hide list-grid view if no products */
  if($('li.product').length === 0) {
    $('.grid-list-view.toggle').hide();
    $('form.actionBar').hide();
  }
  /* Hide list-grid view if no products */


  /* Compare button for list-grid view */
  var attr, match;

  $(".card-figcaption-buttons input[type=checkbox][data-compare-id]").change(function() {
    if ($(this).is(':checked')) {
      $(this).parent().attr("data-tooltip", "Added To Compare");
      $(this).parent().find(".icon").removeClass("not-compared");
      attr = $(this).attr("data-compare-id");

      match = $(".listItem-buttons input[type=checkbox][data-compare-id]").filter(function() {
        return $(this).attr('data-compare-id') == attr
      });

      match.prop('checked', true);
      match.parent().attr("data-tooltip", "Added To Compare");
      match.parent().find(".icon").removeClass("not-compared");
    }
    else {
      $(this).parent().attr("data-tooltip", "Compare");
      $(this).parent().find(".icon").addClass("not-compared");
      attr = $(this).attr("data-compare-id");

      match = $(".listItem-buttons input[type=checkbox][data-compare-id]").filter(function() {
        return $(this).attr('data-compare-id') == attr
      });

      match.prop('checked', false);
      match.parent().attr("data-tooltip", "Compare");
      match.parent().find(".icon").addClass("not-compared");
    }
  });

  $(".listItem-buttons input[type=checkbox][data-compare-id]").change(function() {
    if ($(this).is(':checked')) {
      $(this).parent().attr("data-tooltip", "Added To Compare");
      $(this).parent().find(".icon").removeClass("not-compared");
      attr = $(this).attr("data-compare-id");

      match = $(".card-figcaption-buttons input[type=checkbox][data-compare-id]").filter(function() {
        return $(this).attr('data-compare-id') == attr
      });

      match.prop('checked', true);
      match.parent().attr("data-tooltip", "Added To Compare");
      match.parent().find(".icon").removeClass("not-compared");
    }
    else {
      $(this).parent().attr("data-tooltip", "Compare");
      $(this).parent().find(".icon").addClass("not-compared");
      attr = $(this).attr("data-compare-id");

      match = $(".card-figcaption-buttons input[type=checkbox][data-compare-id]").filter(function() {
        return $(this).attr('data-compare-id') == attr
      });

      match.prop('checked', false);
      match.parent().attr("data-tooltip", "Compare");
      match.parent().find(".icon").addClass("not-compared");
    }
  });
  /* Compare button for list-grid view */


  /* Sidebar Categories Toggle */
  $(".sidebar-categories .navList-item.secondLevelCategory-item.has-children").each(function() {
    $(this).append($('<span class="down-arrow"><i class="icon"><svg><use xlink:href="#icon-arrow-down" /></svg></i></span>'));
  });

  $(".sidebar-categories .navList-item.secondLevelCategory-item.has-children span.down-arrow").on("click", function() {
    $(this).toggleClass("active");
    $(this).parent().toggleClass("active");
    $(this).parent().parent().find(".navList.thirdLevelCategories").toggleClass("visible").slideToggle(150);
  });
  /* Sidebar Categories Toggle */

  /* Product Page Details Toggle */
    $(".productDetailsView-section .productView-title").click(function() {
      $(this).toggleClass("toggle-active").parent().find(".productView-description").slideToggle(250);
    });
    $("#productReview_link").click(function() {
      $(".productView-reviewTabLink .productView-title").addClass("toggle-active").parent().find(".productView-description").slideDown(250);
    });   
  /* Product Page Details Toggle */

});

function handleWindowResize() {
    isMobile = window.outerWidth < 801;
}

/* Footer Toggle Js */
function footerToggle() {
    $(".footer .footer-info-col.footer-info-col--small .footer-info-heading").click(function(e) {
        e.preventDefault();
        if (isMobile) {
          $(this).toggleClass("toggle-active").parent().find(".footer-info-list").slideToggle(250);     
        } else {
            $(".footer .footer-info-col.footer-info-col--small .footer-info-heading").parent().find(".footer-info-list").removeAttr("style");
            $(".footer .footer-info-col.footer-info-col--small .footer-info-heading").removeClass("toggle-active");
        }
    });
    return false;
}
/* Footer Toggle Js */

/* Filter Icon and Transparent Sticky Header Scroll Js */
$(window).scroll(function() {
    if ($(this).scrollTop() > 340) {
      $('.mobileFixed').addClass('active');
    } else {
      $('.mobileFixed').removeClass('active');
    }

    var headerTransparentSticky = (($(".header").hasClass("transparent-header") && $(".header").hasClass("sticky-header")) || $(".header").hasClass("sticky-header")) ? true : false;
    if (headerTransparentSticky) {
      if ($(window).scrollTop() > 11) {
        $(".header").addClass("sticky");
      } else {
        $(".header").removeClass("sticky");
      }
    }
});

/* Filter Icon and Transparent Sticky Header Scroll Js */

/* Multiple Swatches Js */
$(".form-option-wrapper").each(function(){
    var swatch_limit = $(this).find(".form-option.form-option-swatch span.form-option-variant").length;
    if(swatch_limit > 1){
        $(this).find(".form-option.form-option-swatch").addClass("multiple-swatch");       
    }
});
/* Multiple Swatches Js */

$(window).on('load', function() {
  $(".productCarousel-slide.slick-slide").each(function() {
    $(this).removeAttr("aria-hidden");
  });

  setTimeout(function() {
    const firstSlide = $(".heroCarousel").find(".slick-slide .heroCarousel-slide--first");

    if(firstSlide.find(".heroCarousel-content").hasClass("animate__animated animate__fadeIn")) {
      firstSlide.find(".heroCarousel-content").removeClass("animate__animated animate__fadeIn");
      firstSlide.find(".heroCarousel-content").addClass("animate__animated animate__fadeIn");
    } else {
      firstSlide.find(".heroCarousel-content").addClass("animate__animated animate__fadeIn");
    }
  }, 1000);

});

$(".hp-products-section .tab").on("click", function() {
  const getTabIdx = $(this).index();
  $(".hp-products-section .tabs-contents .tab-content.animation-enabled").removeClass("animate__animated animate__fadeIn");
  const activeTabContent = $(".hp-products-section .tabs-contents .tab-content.animation-enabled").eq(getTabIdx).addClass("animate__animated animate__fadeIn");
});

$(".heroCarousel").on("swipe", function(event, slick, direction) {
  $(".slick-slide").find(".heroCarousel-content").removeClass("animate__animated animate__fadeIn");
  $(".slick-current").find(".heroCarousel-content").addClass("animate__animated animate__fadeIn");
});

$('.heroCarousel').on('afterChange', function(event, slick, currentSlide, nextSlide) {
  $(".slick-slide").find(".heroCarousel-content").removeClass("animate__animated animate__fadeIn");
  $(".slick-current").find(".heroCarousel-content").addClass("animate__animated animate__fadeIn");
});

var animation_elements_arr = [$('.hp-recent-blogs.animation-enabled .blog-post'), $('.hp-categories-section .section-content.animation-enabled'), $('.hp-categories-section .section-content.animation-enabled'), $('.banner-wrapper.animation-enabled'), $('.hp-sidebyside-banner .banner-inner.animation-enabled'), $('.hp-parallax-banner.animation-enabled'), $('.hp-products-section .tabs-contents .tab-content.animation-enabled:first-child')];

$.each(animation_elements_arr, function(i) {
  var animation_element = animation_elements_arr[i];

  if (animation_element && animation_element.length > 0) {

    function check_if_in_view() {
      var window_height = $(window).height();
      var window_top_position = $(window).scrollTop();
      var window_bottom_position = (window_top_position + window_height);
    
      $.each(animation_element, function() {
        var element = $(this);
        var element_height = element.outerHeight();
        var element_top_position = element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        // check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
          element.addClass('animate__animated animate__fadeIn');
        } else {
          element.removeClass('animate__animated animate__fadeIn');
        }
      });
    }

    $(window).on('scroll resize', check_if_in_view);
    $(window).trigger('scroll');
  }  
});

/* Account Dropdown js start */
  $(".navPages-list.navPages-list--user .navPages-item > .navPages-action").on("click", function() {
    $(this).siblings(".menu-icon").toggleClass("is-open");
  });
/* Account Dropdown js end */

  $(".navPages-list.navPages-list-mobile .navPages-item > .navPages-action").on("click", function() {
    $(this).siblings(".navPage-subMenu").toggleClass("is-open");
    $(this).siblings(".menu-icon").toggleClass("is-open");
  });

  var animation=getCookie("Animation");
  if(!animation){
      setCookie('Animation','N');
  } else{
    $(".header-wrapper").removeClass("animate__animated animate__fadeIn");
    $(".global-banner-text").removeClass("animate__animated animate__fadeIn");
  }
  function setCookie( c_name, value, exdays ) {
      var c_value = escape(value);
      if (exdays || exdays==-1) {
          var exdate = new Date();
          exdate.setDate( exdate.getDate() + exdays );
          c_value += '; expires=' + exdate.toUTCString()+'; path=/'; 
      }
      document.cookie = c_name + '=' + c_value+'; path=/'; 
  }
  function getCookie( c_name ) {
      var i, x, y, cookies = document.cookie.split( ';' );
  
      for ( i = 0; i < cookies.length; i++ ) {
          x = cookies[i].substr( 0, cookies[i].indexOf( '=') );
          y = cookies[i].substr( cookies[i].indexOf( '=') + 1 );
          x = x.replace( /^\s+|\s+$/g, '' );
  
          if ( x === c_name ) {
              return unescape( y );
          }
      }
  }  