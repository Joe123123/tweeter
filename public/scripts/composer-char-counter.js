$(document).ready(function() {
  $("textarea.tweetText").on("input", function() {
    let num = 140 - $(this).val().length;
    let $counter = $(this)
      .next()
      .children(".counter");
    $counter.text(num);
    if (num < 0) {
      $counter.addClass("orange-text");
    } else {
      $counter.removeClass("orange-text");
      $counter.removeClass("red-text");
    }
  });

  // press key return to submit
  $("textarea.tweetText").keydown(function(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      $(".new-tweet input").addClass("pressed");
    }
  });

  $("textarea.tweetText").keyup(function(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      $("#form-new-tweet").submit();
      $(".new-tweet input").removeClass("pressed");
      // blur the form after submission
      $(this).blur();
    }
  });
});
