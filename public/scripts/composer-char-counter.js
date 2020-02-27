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

  $("textarea.tweetText").keydown(function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });

  $("textarea.tweetText").keyup(function(e) {
    if (e.keyCode === 13) {
      $("#form-new-tweet").submit();
    }
  });
});
