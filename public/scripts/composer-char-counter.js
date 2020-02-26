$(document).ready(function() {
  $("textarea.tweetText").on("input", function() {
    let num = 140 - this.value.length;
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
});
