
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

// append form to tweet container
$newTweetForm.append($newTweetInput).append($submitButton);
$body.append($tweetContainer).append($newTweetForm);




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

  // moment function to format time stamp
const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
  };

 // modified show new tweets function
 // let lastDisplayedTweetIndex = 0;

// show new tweets function
 const showNewTweets = () => {
  $tweetContainer.empty(); // clear existing tweets
  /*
  // get new tweets since the last displayed index
  const newTweets = streams.home.slice(lastDisplayedTweetIndex);
// update lastDTI to the latest tweet
  lastDisplayedTweetIndex = streams.home.length;
*/
  //prepend new tweets to the top of the tweet container
 // newTweets.reverse().forEach((tweet) => {
  streams.home.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet); // prepend new tweet to the top
  });
};

  //$tweetContainer.find('.tweet').remove();
 /*
  reversedTweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet); // prepend new tweets to the top
  });
 };
*/
 //add new tweets to streams function
const addNewTweet = (text) => {
  const newTweet = {
    user: "YOU",
    message: text,
    created_at: new Date()
  };
  streams.home.unshift(newTweet); // add new tweets to the beginning of streams.home

  if (!streams.users['YOU']) {
    streams.users['YOU'] = [];
  }
  streams.users['YOU'].push(newTweet);

 // show the new tweet immediately at the top
 const $tweet = createTweetElement(newTweet);
 $tweetContainer.prepend($tweet);

 $newTweetInput.val('');

 // showNewTweets(); // show the new tweet immediately
};

 // user timeline function
const showUserTimeLine = (username) => {
  $tweetContainer.empty(); // clear existing tweets
  streams.users[username].forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet); // append user's tweets to the tweet container
  });
};

 showNewTweets(); // initially show existing tweets

 // new tweet event listener
 $newTweetForm.on('submit', (event) => {
  event.preventDefault();
  const newTweetText = $newTweetInput.val().trim();
  if (newTweetText !== '') {
  addNewTweet(newTweetText); // call addNewTweet with the text
  // $newTweetInput.val('') // clear input after submitting
  }
});

//Keep updating UI with new tweets
setInterval(() => {
  showNewTweets();
 }, 7000); // updates every 7 seconds

});




