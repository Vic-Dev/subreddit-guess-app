var data = [];

function displayResults() {
  var $el = $('#subreddit-topics');
  $el.html('');

  data = data.data.children;

  index = Math.floor(Math.random()*data.length);

  topic = data[index].data;

  var html = "";
  html += '<li>';
  html += '<div class="topic-title"><h2>' + topic.title + '</h2></div>';
  html += '<div class="topic-ups">' + topic.ups + '</div>';
  if (topic.thumbnail.length > 0) {
    html += '<a href="' + topic.url + '" target="_blank"><img src="' + topic.thumbnail + '"></a>';
  }
  html += '<div class="topic-subreddit"><p>' + topic.subreddit + '</p></div>';
  html += '</li>'
  $el.append(html);

  // data.forEach(function(topic) {
  //   topic = topic.data;
  //   var html = "";
  //   html += '<li>';
  //   html += '<div class="topic-title"><h2>' + topic.title + '</h2></div>';
  //   html += '<div class="topic-ups">' + topic.ups + '</div>';
  //   html += '<img src="' + topic.thumbnail + '">';
  //   html += '<div class="topic-subreddit"><p>' + topic.subreddit + '</p></div>';
  //   html += '<div class="topic-url"><a href="' + topic.url + '">URL</div>';
  //   html += '</li>'
  //   $el.append(html);
  // });
};

function fetchResults() {
  // What subreddits to include?
  // mildlyinteresting, Art, AskReddit askscience aww creepy dataisbeautiful DIY EarthPorn explainlikeimfive food funny Futurology GetMotivated gifs IAmA InternetIsBeautiful Jokes LifeProTips mildlyinteresting nosleep nottheonion photoshopbattles pics science Showerthoughts tifu todayilearned TwoXChromosomes UpliftingNews

  var subredditList = ["askreddit", "askscience", "aww", "creepy", "dataisbeautiful", "EarthPorn", "food", "funny", "Futurology", "getmotivated", "gifs", "internetisbeautiful", "jokes", "lifeprotips", "mildlyinteresting", "nosleep", "nottheonion", "photoshopbattles", "pics", "science", "showerthoughts", "twoxchromosomes", "upliftingnews", "mildlyinfuriating", "engineeringporn", "mechanical_gifs", "techsupportgore", "shittyrobots", "cablefail", "shittylifehacks", "oddlysatisfying", "sweatypalms", "heavyseas"];

  var topList = ["day", "week", "month", "year", "all"];

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


$(document).on('page:change', function() {
  // fetch initial data
  fetchResults();
  var article = {
  }
});
