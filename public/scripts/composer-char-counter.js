$(document).ready(function() {
    const $textarea = $('#tweet-text')
    $textarea.on('input', function() {
        const tweetLength = $(this).val().length;
        $(this).nextAll('.counter').text(140 - tweetLength);
        if (tweetLength > 140) {
            $(this).nextAll('.counter').css("color", "red");
        }
    })
  });