
$(document).ready(() => {
  const $body = $('body');
  // separate container div for tweets, appended to the body
  const $tweetContainer = $('<div id="tweet-container"></div>');
  $body.append($tweetContainer);
 // $body.html(''); // => clears body (or any tag)

 //function creates a tweet element
 const createTweetElement = (tweet) => {
  const $tweet = $('<div class="tweet"></div>');
  const text = `@${tweet.user}: ${tweet.message}`;
  const timestamp = moment(tweet.created_at).fromNow(); // format time stamp

  $tweet.text(text);
  $tweet.append(`<span class="timestamp">(${timestamp})</span>`); // display time stamp

  return $tweet;
 };

 // function for showing new tweets
 const showNewTweets = () => {
  const latestTweets = streams.home.slice(-4); // Get the 4 latest tweets
  latestTweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet); // Prepend new tweets to the top
  });
 };

 // first new tweet display
 showNewTweets();

 //Keep updating UI with new tweets
 setInterval(() => {
  showNewTweets();
 }, 7000); // updates every 7 seconds
// make a function for this
/*
  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $body.append($tweets);
*/
});
