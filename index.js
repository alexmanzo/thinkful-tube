const youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';

function getAPIData(searchTerm, callback) {
  const query = {
    maxResults: '50',
    part: 'snippet',
    q: `${searchTerm}`,
    key: 'AIzaSyBiKLJOIR-lW3S41-BWXkZHqyONmBkXG9k',
    type: 'video'
  }

  $.getJSON(youtubeSearchURL, query, callback);

}


function renderResult(result) {
      return `
    <div>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
        <img src="${result.snippet.thumbnails.medium.url}">
      </a>
    </div>
  `;
}


function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  const totalResultsNum = `<p>Your search returned <span class="resultsNum">${data.pageInfo.totalResults}</span> results.</p>`;
  $('.js-output').prop('hidden', false);
  $('.js-results-num').html(totalResultsNum);
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
