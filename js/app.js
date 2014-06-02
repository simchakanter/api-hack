var startupIterator = 0;

$(document).ready(function() {
  console.log("Startup iterator is " + startupIterator);
  $('.angel-category').click(function(){
    getStartups($(this).data("tag-id"));
    console.log($(this).data("tag-id"));
    $('#splash').hide();
  });
  $(".prev").click(function() {
    startupIterator--;
    console.log("Startup iterator is " + startupIterator);
  });
  $('.next').click(function() {
    startupIterator++;
    console.log("Startup iterator is " + startupIterator);
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
    $('iframe').attr('src', result.startups[startupIterator].company_url);
  });
}