/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  if (Array.isArray(tweets)) {
    return tweets.forEach(tweet => {
        $('#tweet-container').prepend(createTweetElement(tweet));
      });
  }
  return $('#tweet-container').prepend(createTweetElement(tweets));
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const datePassed = timeago.format(tweet.created_at);
  let $tweet = `
    <article class="feed">
        <header>
        <div class="icon">
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
        </div>
        <p class="username">${tweet.user.handle}</p>
        </header>
        <div class="tweet-main">
          <p class="tweet">${escape(tweet.content.text)}</p>
        </div>
        <footer>
        <p>${datePassed}</p>
        <div class="action-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
        </div>
        </footer>
    </article>`
  return $tweet;
};

const hideMessages = function() {
  $(".error-message-one").hide();
  $(".error-message-two").hide();
  $(".tweeted").hide();
  return;
}

const submitTweet = function() {
  const $form = $('#tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const data = $form.serialize();
    const tweetLength = $(this).children('textarea#tweet-text').val().length;
    if (tweetLength > 140) {
      hideMessages()
      return $(".error-message-one").slideDown()
    }
    if (tweetLength === 0) {
      hideMessages()
      return $(".error-message-two").slideDown()
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      success: (data => {
        hideMessages() 
        $(".tweeted").slideDown(function() {
          setTimeout(() => {$(".tweeted").slideUp()}, 5000)
        })
        loadNewTweet()
        $('textarea').val('')
        $('.counter').text(140)
      })
    })
  })
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (data) => {
      renderTweets(data);
    }
  })
};

const loadNewTweet = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (data) => {
      renderTweets(data[data.length - 1]);
    }
  })
};

$(document).ready(function() {
  hideMessages();
  loadTweets();
  submitTweet();
});

