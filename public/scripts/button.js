$(document).ready(function() {
  let headerButton = $("#btn-header");
  const upDownLoop = () => {
    headerButton.animate(
      { top: "55px" },
      {
        duration: 800,
        complete: function() {
          headerButton.animate(
            { top: "50px" },
            { duration: 800, complete: upDownLoop }
          );
        }
      }
    );
  };
  // loop the btn-header
  upDownLoop();
  headerButton.click(function() {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });

  let $scrollUpButton = $("#btn-scroll-top");

  $(document).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $scrollUpButton.addClass("show");
    } else {
      $scrollUpButton.removeClass("show");
    }
  });

  $scrollUpButton.on("click", function(e) {
    e.preventDefault();
    $(document).scrollTop(0);
    $(".new-tweet").show("slow");
    $(".new-tweet textarea").focus();
  });
});
