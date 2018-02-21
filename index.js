const youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';

function getAPIData(searchTerm, callback) {
  const query = {
    maxResults: '50',
    part: 'snippet',
    q: `${searchTerm}`,
    key: 'AIzaSyBiKLJOIR-lW3S41-BWXkZHqyONmBkXG9k'
  }

  $.getJSON(youtubeSearchURL, query, callback);

}

function renderResult(result) {
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
        <img src="${result.snippet.thumbnails.medium.url}">
      </a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  console.log(results)
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getAPIData(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
