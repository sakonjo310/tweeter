/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]


const renderTweets = function(tweetsArr) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    return tweetsArr.forEach(tweet => {
        $('#tweet-container').append(createTweetElement(tweet));
      });
}

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
        <p class="tweet">${tweet.content.text}</p>
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
}

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (data) => {
      renderTweets(data);
    }
  })

}


$(document).ready(function() {
  loadTweets();

  const $form = $('#tweet-form');

  $form.on('submit', function(event) {
    event.preventDefault();
    const data = $form.serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      success: () => {
        console.log(data);
      }
    })
  })


});

