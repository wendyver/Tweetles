
$(document).ready(() => {
  const $body = $('body');
  // separate container div for tweets, appended to the body
  const $tweetContainer = $('<div id="tweet-container"></div>');
  const $newTweetForm = $('<form id="new-tweet-form"></form>');
 const $newTweetInput = $('<input type="text" id="new-tweet-input" placeholder="Write Something...">');
 const $submitButton = $('<button type="submit">TWEET</button>');
  
 // $body.html(''); // => clears body (or any tag)

 //styling / css
 const style = `
 body {
  background-color: #6A5ACD; /* set background color for the entire body */
 }
 #new-tweet-form {
  position: fixed;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background: #DB7093;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
 }
  #tweet-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto; /* Center Horizontally */
  padding-top: 60px; /* Adjust Spacing */
  background-color: #B0E0E6; /* background directly behind the tweets */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* adds shadow effect */
  }
`;

$('<style>').text(style).appendTo('head');

$newTweetForm.append($newTweetInput).append($submitButton);
$body.append($tweetContainer); // append tweet container to body
 $tweetContainer.append($newTweetForm); // append form to tweet container

 // moment function
const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
}

 //function creates a tweet element
 const createTweetElement = (tweet) => {
  const $tweet = $('<div class="tweet"></div>');
  const $username = $(`<span class="username">@${tweet.user}</span>`).on('click', () => {
    showUserTimeLine(tweet.user);
  });
  const $message = $('<span class="message"></span>').text(`: ${tweet.message}`);
  const $timestamp =$('<span class="timestamp"></span>').text(` (${formatTimestamp(tweet.created_at)})`); // format time stamp

  $tweet.append($username).append($message).append($timestamp); // display time stamp

  return $tweet;
 };


 // function for showing new tweets
 const showNewTweets = () => {
  $tweetContainer.find('.tweet').remove();
  streams.home.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet); // Append new tweets to the top
  });
 };

 //add new tweets to streams
const addNewTweet = (text) => {
  const newTweet = {
    user: "YOU",
    message: text,
    created_at: new Date()
  };
  streams.home.push(newTweet);
  if (!streams.users['YOU']) {
    streams.users['YOU'] = [];
  }
  streams.users['YOU'].push(newTweet);
  showNewTweets();
};

 // user timeline function
const showUserTimeLine = (username) => {
  $tweetContainer.find('.tweet').remove();
  streams.users[username].forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet);
  });
};

 showNewTweets();

 // new tweet event listener
 $newTweetForm.on('submit', (event) => {
  event.preventDefault();
  const newTweetText = $newTweetInput.val();
  addNewTweet(newTweetText);
  $newTweetInput.val('') // clear input after submitting
});

//Keep updating UI with new tweets
setInterval(() => {
  showNewTweets();
 }, 7000); // updates every 7 seconds




 




  
  

  
});
/*
  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $body.append($tweets);
*/



