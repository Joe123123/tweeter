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
  const timeDifference = (current, previous) => {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute / 6) {
      return "just now";
    } else if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  };

  const createTweetElement = data => {
    const $all = $(".all-tweets");
    for (let item of data) {
      const { name, avatars, handle } = item["user"];
      const { text } = item["content"];
      const createdDate = item["created_at"];
      const daysStr = timeDifference(Date.now(), createdDate);
      const $tweet = $("<article>").addClass("tweet-item");
      $tweet.append(`<div class="tweets-header">
                      <img class="avatar" src=${avatars}/>
                      <div class="name">${name}</div>
                      <div class="handle">${handle}</div>
                    </div>
                    <div class="tweet-text">${escape(text)}</div>
                    <div class="tweets-footer">
                      <div class="timestamp">${daysStr}</div>
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

  // call loadTweets to display all tweets
  loadTweets();

  $(".new-tweet input").mousedown(function() {
    $(this).addClass("pressed");
  });

  $(".new-tweet input").mouseleave(function() {
    $(this).removeClass("pressed");
  });

  $(".new-tweet input").mouseup(function() {
    $(this).removeClass("pressed");
  });

  $("#form-new-tweet").submit(function(e) {
    e.preventDefault();
    let text = $(this)
      .children("textarea")
      .val();
    // show different warnings or post new tweet
    if (/^\s*$/.test(text)) {
      $(".new-tweet .warning span").text("Can not tweet empty words.");
      $(".new-tweet .warning-container").slideUp();
      $(".new-tweet .warning-container").slideDown();
      // $(".input-area .counter").addClass("red-text");
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
      }) // display all tweets and hide warning
        .then(() => {
          $(".all-tweets").load("/tweets .all-tweets", function(res) {
            const $tweet = createTweetElement(JSON.parse(res));
            $(".all-tweets").append($tweet);
          });
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
