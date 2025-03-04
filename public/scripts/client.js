/// Render Tweets to the feed
const renderTweets = function(tweets) {
    return tweets.forEach(tweet => {
      const $container = $('#tweet-container');
      $container.prepend(createTweetElement(tweet));
    })
};

/// Escaping XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/// Create a Tweet
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

/// Hide error/success messages
const hideMessages = function() {
  $(".error-message-one").hide();
  $(".error-message-two").hide();
  $(".tweeted").hide();
  return;
};

/// Submit Tweet handler
const submitTweet = function() {
  const $form = $('#tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const data = $form.serialize();
    // Check if the tweet length is valid
    const tweetLength = $(this).children('textarea#tweet-text').val().length;
    if (tweetLength > 140) {
      hideMessages();
      return $(".error-message-one").slideDown(function() {
        setTimeout(() => {$(".error-message-one").slideUp()}, 3000)
      });
    }
    if (tweetLength === 0) {
      hideMessages();
      return $(".error-message-two").slideDown(function() {
        setTimeout(() => {$(".error-message-two").slideUp()}, 3000);
      });
    }
    // AJAX request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
    })
    .then(() => {
      hideMessages();
      $(".tweeted").slideDown(function() {
        setTimeout(() => {$(".tweeted").slideUp()}, 3000)
      });
      loadTweets();
      $('textarea').val('');
      $('.counter').text(140);
    })
    .catch((err) => {
      console.log(err);
    })
  })
};

/// Load tweets when you open the app
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
  })
  .then((tweets) => {
    $('#tweet-container').empty();
    renderTweets(tweets);
  })
  .catch((err) => {
    console.log(err);
  })
};


/// Show/hide the text area
const showTweetBox = function() {
  $('.writeNewTweet').on('click', function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  })
};

/// Button to scroll to the top of the page
const scrollToTop = function() {
  $('.fixedButton').on('click', function() {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
  })
};

/// Hide/show scrollTop button
const switchButtons = function() {
  $(function scrollTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 350) {
        $('.fixedButton').fadeIn();
        $('.writeNewTweet p, .writeNewTweet i').fadeOut();
      } else {
        $('.fixedButton').fadeOut();
        $('.writeNewTweet p, .writeNewTweet i').fadeIn();
      }
    })
  })
};

/// Function calls
$(document).ready(function() {
  $('.fixedButton').hide();
  $('.new-tweet').hide();
  hideMessages();
  loadTweets();
  submitTweet();
  scrollToTop();
  showTweetBox();
  switchButtons();
});

