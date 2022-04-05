"use strict";
(function ($) {
  $.fn.testimonialDisplay = function (options) {
    var settings = $.extend(
      {
        slideName: {
          fontsize: "medium",
          fontWeight: "bold",
          color: "red",
        },

        animationSpeed: 1000,
        pause: 3000,
        timer: null,
      },
      options
    );
    var width = 720;
    var slider = $(".slides");
    var prevBtn = $("#btn-prev");
    var nextBtn = $("#btn-next");

    return this.each(function () {
      autoplay();
      setSlideNameProperties();

      addRatingToFeedback();

      function autoplay() {
        settings.timer = setInterval(function () {
          $("#btn-next").trigger("click");
        }, settings.pause);
      }

      slider.hover(
        function () {
          if (settings.timer) {
            clearInterval(settings.timer);
            settings.timer = null;
          }
        },
        function () {
          autoplay();
        }
      );

      // Handle clicks on the next button
      nextBtn.on("click", (e) => {
        e.preventDefault();
        slider.animate(
          {
            left: -width,
          },
          settings.animationSpeed,
          "swing",
          function () {
            slider.children("li:first").appendTo(slider);
            slider.css("left", 0);
          }
        );
      });

      // Handle clicks on the previous button
      prevBtn.on("click", (e) => {
        e.preventDefault();
        slider.children("li:last").prependTo(slider);
        slider.css("left", -width);

        slider.animate(
          {
            left: 0,
          },
          settings.animationSpeed,
          "swing"
        );
      });

      function setSlideNameProperties() {
        var slideName = $(".slide .name");
        slideName.css({
          "font-size": settings.slideName.fontSize,
          "font-weight": settings.slideName.fontWeight,
          color: settings.slideName.color,
        });
      }

      function addRatingToFeedback() {
        var ratingElements = $(".rating");
        for (let i = 0; i < ratingElements.length; i++) {
          let ratingNumber = $(ratingElements[i]).text();
          $(ratingElements[i]).text("");
          $(ratingElements[i]).append(generateRatingStars(ratingNumber));
        }
      }

      function generateRatingStars(rating) {
        var output = "";
        output +=
          rating == 0
            ? "<i class='far fa-star'></i>"
            : rating > 0 && rating < 1
            ? "<i class='fas fa-star-half-alt'></i>"
            : "<i class='fas fa-star'></i>";
        output +=
          rating > 1 && rating < 2
            ? "<i class='fas fa-star-half-alt'></i>"
            : rating >= 2
            ? "<i class='fas fa-star'></i>"
            : "<i class='far fa-star'></i>";

        output +=
          rating > 2 && rating < 3
            ? "<i class='fas fa-star-half-alt'></i>"
            : rating >= 3
            ? "<i class='fas fa-star'></i>"
            : "<i class='far fa-star'></i>";

        output +=
          rating > 3 && rating < 4
            ? "<i class='fas fa-star-half-alt'></i>"
            : rating >= 4
            ? "<i class='fas fa-star'></i>"
            : "<i class='far fa-star'></i>";

        output +=
          rating > 4 && rating < 5
            ? "<i class='fas fa-star-half-alt'></i>"
            : rating >= 5
            ? "<i class='fas fa-star'></i>"
            : "<i class='far fa-star'></i>";
        return output;
      }
    });
  };
})(jQuery);
