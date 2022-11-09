/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweetsArr) {
  return tweetsArr.forEach(tweet => {
      $('#tweet-container').prepend(createTweetElement(tweet));
    });
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
          <p class="tweet">${tweet.content.text}</p>
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

const submitTweet = function() {
  const $form = $('#tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const data = $form.serialize();
    const tweetLength = $(this).children('textarea#tweet-text').val().length;
    if (tweetLength > 140) {
      return alert("Tweet too long!")
    }
    if (tweetLength === 0) {
      return alert("Please write something:D")
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
    })
    .then($('textarea').val(''))
    .then(loadTweets());
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


$(document).ready(function() {
  loadTweets();
  submitTweet();
});

