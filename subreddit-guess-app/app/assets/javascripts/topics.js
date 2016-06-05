var data = [];
var score = 0;
var subredditList = ["askreddit", "askscience", "aww", "creepy", "dataisbeautiful", "earthporn", "food", "funny", "futurology", "getmotivated", "gifs", "internetisbeautiful", "jokes", "lifeprotips", "mildlyinteresting", "nosleep", "nottheonion", "pics", "science", "showerthoughts", "twoxchromosomes", "upliftingnews", "mildlyinfuriating", "engineeringporn", "mechanical_gifs", "techsupportgore", "shittyrobots", "cablefail", "shittylifehacks", "oddlysatisfying", "sweatypalms", "heavyseas", "subredditsimulator"];

var topList = ["day", "week", "month", "year", "all"];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function displayResults() {
  var $el = $('#subreddit-topics');
  $el.html('');
  var $opts = $('#subreddit-options');
  $opts.html('');

  data = data.data.children;

  var index = Math.floor(Math.random()*data.length);

  topic = data[index].data;

  var html = "";
  html += '<li>';
  html += '<div class="topic-ups">Upvotes: ' + topic.ups + '</div>';
  if ( (topic.thumbnail.length > 0) && (topic.thumbnail != "self") ) {
    html += '<div class="topic-thumbnail"><a href="' + topic.url + '" target="_blank"><img src="' + topic.thumbnail + '"></a></div>';
  }
  html += '<div class="topic-title"><h2>' + topic.title + '</h2></div>';
  // html += '<div class="topic-subreddit"><p>' + topic.subreddit + '</p></div>';
  html += '</li>'
  $el.append(html);

  var subreddit = topic.subreddit.toLowerCase();

  var subredditIndex = subredditList.indexOf(subreddit);
  subredditList.splice(subredditIndex, 1);
  shuffle(subredditList);

  var guessList = [subredditList[0], subredditList[1], subredditList[3], subreddit];
  shuffle(guessList);

  guessList.forEach(function(guess) {
    var htmlForm = "";
    htmlForm += '<div><input type="radio" name="sub" value="' + guess + '" id="' + guess + '"><label for="' + guess + '">' + guess + '</label></div>';
    $opts.append(htmlForm);
  });

};

function fetchResults() {

  var subreddit = subredditList[Math.floor(Math.random()*subredditList.length)];

  var top = topList[Math.floor(Math.random()*topList.length)];

  $.ajax({
    url: 'https://www.reddit.com/r/' + subreddit + '/top.json?sort=top&t=' + top ,
    method: 'get',
    headers: {
      accept: 'application/json'
    }
  }).then(function(res) {
    data = res;
    displayResults();
  });
};

function submitForm() {
  $('#subreddit-guess-form').on('submit', function(e) {
    $(":submit").attr("disabled", true);
    e.preventDefault();
    debugger;
    if ($('input:checked').val() === topic.subreddit.toLowerCase()) {
      score += 1;
      $('#response').text('Correct!').css({'color': 'green'});
    } else {
      score -= 1;
      $('#response').text('Wrong :(').css({'color': 'red'});
    }
    $('#score').text(score);
    setTimeout(function() {
      $('#response').text('');
      fetchResults();
      $(":submit").removeAttr("disabled");
    }, 2000);
  });
}


$(document).on('page:change', function() {
  // fetch initial data
  fetchResults();
  submitForm();
  // $('#subreddit-guess-form').on('submit', function(e) {
  //   if $('#subreddit').val() === topic.subreddit
  // })
});
