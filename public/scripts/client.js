/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = data => {
    const $all = $(".all-tweets");
    for (let item of data) {
      const { name, avatars, handle } = item["user"];
      const { text } = item["content"];
      const createdDate = item["created_at"];
      const daysFromCreated = Math.floor(
        (Date.now() - createdDate) / (24 * 60 * 60 * 1000)
      );
      const $tweet = $("<article>").addClass("tweet-item");
      $tweet.append(`<div class="tweets-header">
                      <img class="avatar" src=${avatars}/>
                      <div class="name">${name}</div>
                      <div class="handle">${handle}</div>
                    </div>
                    <div class="tweet-text">${escape(text)}</div>
                    <div class="tweets-footer">
                      <div class="timestamp">${daysFromCreated} days ago</div>
                      <div class="icons"><a href="#"><img src="https://img.icons8.com/material/24/000000/filled-flag--v1.png"></a><a href="#"><img src="https://img.icons8.com/material-sharp/24/000000/refresh.png"></a><a href="#"><img src="https://img.icons8.com/material-sharp/24/000000/like.png"></a></div>
                    </div>`);
      $all.append($tweet);
    }
    return $all;
  };
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then(res => {
      const $tweet = createTweetElement(res);
      $(".all-tweets").append($tweet);
    });
  };
  loadTweets();
  $("#form-new-tweet").submit(function(e) {
    e.preventDefault();
    let text = $(this)
      .children("textarea")
      .val();
    if (/^\s*$/.test(text)) {
      $(".new-tweet .warning span").text("Can not tweet empty words.");
      $(".new-tweet .warning-container").slideUp();
      $(".new-tweet .warning-container").slideDown();
      $(".input-area .counter").addClass("red-text");
    } else if (text.length > 140) {
      $(".new-tweet .warning span").text(
        "Too long. Plz enter below 140 letters."
      );
      $(".new-tweet .warning-container").slideUp();
      $(".new-tweet .warning-container").slideDown();
      $(".input-area .counter").addClass("red-text");
    } else {
      let str = $(this).serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: str
      })
        .then(() => {
          loadTweets(); // whats going on here?
          $(".all-tweets").load(location.href + " .all-tweets"); // and here?
          $(".new-tweet textarea").val("");
          $(".new-tweet .counter").text(140);
          $(".new-tweet .warning-container").slideUp();
          $(".input-area .counter").removeClass("red-text");
        })
        .catch(err => {
          alert(err);
        });
    }
  });
});
