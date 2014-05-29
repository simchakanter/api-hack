$(document).ready(function() {
  $('.angel-category').click(function(){
    getStartups($(this).data("tag-id"));
    console.log($(this).data("tag-id"));
    $('#splash').hide();
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
    console.log(result.startups[4].company_url);
    $('iframe').attr('src', result.startups[4].company_url);
  });
}