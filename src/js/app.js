$(document).ready(function() {
  // Menu bar navigation

  const $navBtn = $(".nav__button");
  const $menuBar = $(".nav__list");
  const $navSpan = $(".nav__decor");
  const $navButton = $(".nav__btn");
  const $navLink = $(".nav__link");
  $menuBar.hide();

  $navBtn.on("click", e => {
    $navSpan.toggleClass("nav__decor nav__decor-active");
    $navButton.fadeToggle(300);
    $menuBar.fadeToggle(500);
  });

  $navLink.on("click", function(e) {
    e.preventDefault();
    let $link = $(this).attr("href");
    $("html, body").animate({ scrollTop: $($link).offset().top + "px" }, 1000);
    return false;
  });

  // Mobile menu bar navigation

  const $mobileNavBtn = $(".mobile-nav__button");
  const $mobileMenuBar = $(".mobile-nav");
  const $mobileCloseButton = $(".mobile-nav__close");
  const $mobileNavLink = $(".mobile-nav__link");

  $mobileNavBtn.on("click", function(e) {
    e.preventDefault();
    $mobileMenuBar.removeClass("mobile-nav__non-active").addClass("mobile-nav__active");
  });

  $mobileCloseButton.on("click", function(e) {
    $mobileMenuBar.removeClass("mobile-nav__active").addClass("mobile-nav__non-active");
  });

  $mobileNavLink.on("click", function(e) {
    e.preventDefault();
    let $link = $(this).attr("href");
    $("html, body").animate({ scrollTop: $($link).offset().top + "px" }, 1000);
    setTimeout(() => {
      $mobileMenuBar.removeClass("mobile-nav__active").addClass("mobile-nav__non-active");
    }, 1000);
    return false;
  });

  // Header down btn
  
  const $downHeaderBtn = $('.header__arrow');

  $downHeaderBtn.on('click', () => {
    const $firstSectionHeight = $('.header').outerHeight();
    $("html, body").animate({ scrollTop: $firstSectionHeight + "px" }, 1000);
  });

  // Works section mobile slider

  $(".slider__works-content").slick({
    arrows: false,
    dots: false,
    autoplay: true
  });

  // Testimonials section slider

  $(".slider__content").slick({
    arrows: false,
    dots: true,
    dotsClass: "slider__dots",
    autoplay: true
  });

  // Up button
  const $upBtn = $(".js_upBtn");

  $(window).scroll(function() {
    if ($(this).scrollTop() > "200") {
      $upBtn.fadeIn();
    } else {
      $upBtn.fadeOut();
    }
  });

  $upBtn.on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });
});