$(document).ready(function() {
    const $textarea = $('#tweet-text')
    $textarea.on('input', function() {
        const maxLength = 140;
        const tweetLength = $(this).val().length;
        $(this).nextAll('.counter').text(maxLength - tweetLength);
        if (tweetLength > maxLength) {
            $(this).nextAll('.counter').css("color", "red");
        } else {
            $(this).nextAll('.counter').css("color", "#545149");
        }
    })
  });