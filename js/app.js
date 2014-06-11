var startupIterator = 0;
var startupResults;

$(document).ready(function() {
  console.log("Startup iterator is " + startupIterator);
  $('.angel-category').click(function(){
    $('.loader').show();
    getStartups($(this).data("tag-id"));
    console.log($(this).data("tag-id"));
    $('#splash').hide();
    $('.control').show();
    $('.header-logo').css('margin-left', '0');
    $('.category-name').text($(this).text());
  });
  $(".prev").click(function() {
    startupIterator--;
    console.log("Startup iterator is " + startupIterator);
    if (startupIterator >= 0) {
      loadIframe(startupIterator);
    }
  });
  $('.next').click(function() {
    startupIterator++;
    console.log("Startup iterator is " + startupIterator);
    console.log("Display " + startupResults[startupIterator].company_url);
    if (startupIterator < startupResults.length) {
      loadIframe(startupIterator);
    }
  });
});

function loadIframe(iterator) {
  $('iframe').attr('src', startupResults[iterator].company_url);
}

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
    startupResults = _.filter(result.startups, function(startup) {
      return startup.company_url !== undefined;
    });
    $(".loader").hide();
    loadIframe(startupIterator);
  });
}