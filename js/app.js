function initSwiper() {
  /*=============== SWIPER JS ===============
   */
  let swiperCards = new Swiper(".card__content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      968: {
        slidesPerView: 3,
      },
    },
  });

  const slider = document.querySelector(".logo-slider");
  if (slider) {

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentSlide = 0;
    const slides = slider.querySelectorAll("img");
    const slideWidth = slides[0].clientWidth; // Get the width of a single slide

    // Function to move to the next slide
    function nextSlide() {
      currentSlide++;
      slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

      if (currentSlide === slides.length - 1) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }

      if (currentSlide > 0) {
        prevBtn.disabled = false;
      }
    }

  }

}

// Function to update UI based on selected language
function updateUI(lang) {
  updateText(lang);
  updateInputValues(lang);
  $("body").attr("dir", lang === "en" ? "ltr" : "rtl");
  $("body").css("text-align", lang === "ar" ? "start" : "");
  $(".edit-padding").css("padding-right", lang === "ar" ? "0" : "");
  // Update Owl Carousel rtl property based on body direction
  const rtl = $("body").attr("dir") === "rtl";
  $(".brand-image .owl-carousel")
    .trigger("destroy.owl.carousel")
    .owlCarousel({
      loop: true,
      rtl: rtl,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        200: {
          items: 2,
        },
        400: {
          items: 3,
        },
        600: {
          items: 4,
        },
        1000: {
          items: 5,
        },
      },
      // Add other options as needed
    });

  $("#offers-slider .owl-carousel")
    .trigger("destroy.owl.carousel")
    .owlCarousel({
      loop: true,
      rtl: rtl,
      margin: 15,
      nav: true,
      autoWidth: true,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
    });

  $("#products-slider .owl-carousel")
    .trigger("destroy.owl.carousel")
    .owlCarousel({
      loop: true,
      margin: 15,
      rtl: rtl,
      autoWidth: true,
      nav: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
      },
    });
}

// Function to save language in local storage
function saveLanguageToLocalStorage(lang) {
  localStorage.setItem("userLanguage", lang);
}

// Function to get language from local storage
function getLanguageFromLocalStorage() {
  return localStorage.getItem("userLanguage") || "en";
}

// Update UI based on selected language stored in local storage
function detectLang(params) {
  const selectedLang = getLanguageFromLocalStorage();
  updateUI(selectedLang);
}

function handelLanguageSelect(params) {
  // Attach change event listener to language select dropdown
  $("#languageSelect").on("change", function () {
    const lang = $(this).val();
    updateUI(lang);
    saveLanguageToLocalStorage(lang); // Save language to local storage
  });
}

// Function to include Arabic CSS and Owl Carousel scripts
function includeArabicResources() {
  const arabicLink = $("link[href='css/style-rtl.css']");
  const owlRTLScript = $("script[src='js/owlrtl.js']");

  if (!arabicLink.length) {
    $("head").append('<link rel="stylesheet" href="css/style-rtl.css">');
  }

  if (!owlRTLScript.length) {
    const owlLTRScript = $("script[src='js/owl.ltr.js']");
    owlLTRScript.remove();
    $("head").append('<script src="js/owlrtl.js"></script>');
  }
}

function onTranslate(params) {
  // Handle language change using translate buttons
  $(".translate").click(function () {
    const lang = $(this).attr("id");
    $(".lang").each(function (index, ele) {
      $(this).text(arrlang[lang][$(this).attr("key")]);
    });

    if (lang === "en") {
      $("body").css("direction", "ltr");
      // Set placeholders and button value for English
      $("#input1").attr("placeholder", "first name");
      // Add other input placeholders as needed
      // Similarly, update button value
    } else if (lang === "ar") {
      $("body").css("direction", "rtl");
      $("body").css("text-align", "start");
      $(".edit-padding").css("padding-right", "0");
      // Set placeholders and button value for Arabic
      $("#input1").attr("placeholder", "الاسم الاول");
      // Add other input placeholders as needed
      // Similarly, update button value
    }

    includeArabicResources();
    saveLanguageToLocalStorage(lang); // Save language to local storage
  });
}

function onBodyAttributeChange(params) {
  // Listen for changes to body direction attribute
  $("body").on("attributechange", function () {
    // Update the UI when body direction changes
    const lang = $("#languageSelect").val();
    updateUI(lang);
  });
}

function init() {
  try {
    initSwiper();

  } catch (error) {

  }

  try {
    detectLang();

  } catch (error) {

  }
  try {
    handelLanguageSelect();

  } catch (error) {

  }
  try {
    onTranslate();

  } catch (error) {

  }
}
$(document).ready(function () {
  init();
});
