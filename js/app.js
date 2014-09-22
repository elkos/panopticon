//get hackers counter
function get_counter() {
  $.ajax({
    url: 'https://www.hackerspace.gr/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Network/Leases',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false
  }).done(function(json) {
    var count = json.query.pages[168].revisions[0]["*"];
    var splitted = count.split(" ");
    var random_no = Math.floor((Math.random()*10)+2);
    var skadalia = [
      'thieves',
      'ghosts',
      'rats',
      'mosquitos',
      'resistors',
      'capacitors',
      'supermodels',
      'astronauts',
      'aliens',
      'M$ users',
      'books',
      'Justin Bieber fans',
      'unicorns',
      'nyan cats'
    ];
    var random_text = Math.floor(Math.random()*skadalia.length);
    if ( isNaN(splitted[0]) ) {
      $('.counter.panel').attr("id","close");
      $('#openornot').html('0 hackers and ' + random_no + ' ' + skadalia[random_text] + ' in space, means that space is now closed!');
    } else if (splitted[0] == "0") {
      $('#counter').html(splitted[0]);
      $('.counter.panel').attr("id","close");
      $('#openornot').html('hackers and ' + random_no + ' ' + skadalia[random_text] + ' in space, means that space is now closed!');
    } else if (splitted[0] == "-1") {
      $('#counter').html("");
      $('.counter.panel').attr("id","close");
      $('#openornot').html('Cannot determine if the space is open or closed. Please check again later.');
    } else {
      $('#counter').html(splitted[0]);
      $('.counter.panel').attr("id","open");
      $('#openornot').html('hackers and ' + random_no + ' ' + skadalia[random_text] + ' in space, means that space is now open!');
    }
  });
};

// Display All future events in ical file as list.
function displayEvents(events, events_current, limit) {
  // Foreach event
  for ( var i=0; i<Math.min(limit, events.length); i++) {
    // Create a list item
    var li = document.createElement('li');
    li.setAttribute('class', 'event');
    // Add details from cal file.
    li.innerHTML = '<div class="row"><div class="seven columns"><a class="description" target="_blank" href="'+ events[i].DESCRIPTION + '">' +
    events[i].SUMMARY + '</a></div><div class="five columns event_date">' + events[i].day + ' ' + events[i].start_day + '/' +
    events[i].start_month + ' <span class="event_hour">' +events[i].start_time + ' - ' + events[i].end_time + '</span></div></div>';
    // Add list item to list.
    document.getElementById('calendar').appendChild(li);
  }
  for ( var j=0; j<Math.min(limit,events.length); j++) {
    // Create a list item
    var li = document.createElement('li');
    li.setAttribute('class', 'event');
    // Add details from cal file.
    li.innerHTML = '<div class="row"><div class="seven columns"><div class="now_tag">now</div><a class="description" target="_blank" href="'+ events_current[j].DESCRIPTION + '">' +
    events_current[j].SUMMARY + '</a></div><div class="five columns event_date">' + events_current[j].day + ' ' + events_current[j].start_day + '/' +
    events_current[j].start_month + ' <span class="event_hour">' +events_current[j].start_time + ' - ' + events_current[j].end_time + '</span></div></div>';
    document.getElementById('calendar_current').appendChild(li);
  }
}

// get upcoming events
var a, b;
function get_events() {
  var ical_url = 'https://www.hackerspace.gr/archive/hsgr.ics';
  new ical_parser(ical_url, function(cal) {
    a = cal.getFutureEvents();
    b = cal.getCurrentEvents();
    displayEvents(a,b,6);
  });
}

function get_news() {
  $('#news').FeedEk({
    FeedUrl : 'https://www.hackerspace.gr/wiki/index.php?title=News&action=feed&feed=rss',
    MaxCount : 5,
    ShowDesc : false,
    ShowPubDate:true,
    TitleLinkTarget:'_blank'
  });
};


$(document).ready(function() {
  //$('#loading').toggle();
  get_counter();
  get_events();
  get_news();

  L.mapbox.accessToken = 'pk.eyJ1IjoiY29temVyYWRkIiwiYSI6ImxjQjFHNFUifQ.ohrYy34a8ZIZejrPSMWIww';
  var map = L.mapbox.map('map', 'comzeradd.jimaooe5',{
      zoomControl: false
  }).setView([38.01697, 23.73140], 15);


  var refreshId = setInterval(function() {
    get_counter();
  }, 100000);
});
