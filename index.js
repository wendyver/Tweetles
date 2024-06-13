
$(document).ready(() => {
  const $body = $('body');
  // separate container div for tweets, appended to the body
  const $tweetContainer = $('<div id="tweet-container"></div>');
  $body.append($tweetContainer);
 // $body.html(''); // => clears body (or any tag)

 //function creates a tweet element
 const createTweetElement = (tweet) => {
  const $tweet = $('<div class="tweet"></div>');
  const $username = $(`<span class="username">@${tweet.user}</span>`).on('click', () => {
    showUserTimeLine(tweet.user);
  });
  const $message = $('<span class="message"></span>').text(`:${tweet.message}`);
  const $timestamp =$('<span class="timestamp"></span>').text(`(${formatTimestamp(tweet.created_at)})`); // format time stamp

  $tweet.append($username).append($message).append($timestamp); // display time stamp

  return $tweet;
 };
// moment function
const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
}

 // function for showing new tweets
 const showNewTweets = () => {
  $tweetContainer.empty();
  streams.home.forEach((tweet) => {
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

// user timeline function
const showUserTimeLine = (username) => {
  $tweetContainer.empty();
  streams.users[username].forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet);
  })
}

  // form

  const $newTweetForm = $('<form id="new-tweet-form"></form>');
  const $newTweetInput = $('<input type="text" id="new-tweet-input" placeholder="Compose new tweet...">');
  const $submitButton = $('<button type="submit">TWEET</button>');

  $newTweetForm.append($newTweetInput).append($submitButton);
  $body.append($newTweetForm);
  
  // new tweet event listener
  $newTweetForm.on('submit', (event) => {
    event.preventDefault();
    const newTweetText = $newTweetInput.val();
    addNewTweet(newTweetText);
    $newTweetInput.val('') // clear input after submitting
  });

  //add new tweets to streams
  const addNewTweet = (text) => {
    const newTweet = {
      user: "YOU",
      message: text,
      created_at: new Date()
    };
    streams.home.push(newTweet);
    streams.users['YOU'].push(newTweet);
    showNewTweets();
  };

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


