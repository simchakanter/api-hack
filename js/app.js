var startupIterator = 1;
var startupResults;

$(document).ready(function() {
  console.log("Startup iterator is " + startupIterator);
  $('.angel-category').click(function(){
    startupResults = getStartups($(this).data("tag-id"));
    console.log($(this).data("tag-id"));
    $('#splash').hide();
  });
  $(".prev").click(function() {
    startupIterator--;
    console.log("Startup iterator is " + startupIterator);
  });
  $('.next').click(function() {
    startupIterator++;
    while (startupResults.startups[startupIterator].company_url === undefined && startupIterator < startupResults.startups.length) {
      console.log("No website available, advancing...");
      startupIterator++;
    }
    console.log("Startup iterator is " + startupIterator);
    console.log("Display " + startupResults.startups[startupIterator].company_url);
    $('iframe').attr('src', startupResults.startups[startupIterator].company_url);
  });
});

function getStartups(tag) {
  var request = {
    id: tag,
    order: 'desc'
  };
  $.ajax({
    url: 'https://api.angel.co/1/tags/' + tag + '/startups',
    data: request,
    dataType: 'jsonp'
  })
  .done(function(result) {
    console.log("Data was received");
    console.log(result.startups);
    console.log(result.startups[startupIterator].company_url);
    startupResults = result;
    $('iframe').attr('src', result.startups[startupIterator].company_url);
  });
}