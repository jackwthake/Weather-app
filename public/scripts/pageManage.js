$(document).ready(() => {
  var fahrenheit = true;
  var lastInput = '';

  if(fahrenheit)
    $('#labels').html('<span class="label label-danger text-center">Fahrenheit</span>');
  else
    $('#labels').html('<span class="label label-danger text-center">Celsius</span>');

  $('#c').click(() => {
    fahrenheit = false;
    $('#labels').html('<span class="label label-danger text-center">Celsius</span>');

    if(lastInput != '') {
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + lastInput + "&units=metric&APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
        type: 'GET',
        dataType: 'jsonp',
        success: (data) => {
          var widget = show(data);

          $('#show').html(widget);
          $("#city").val('');
        }
      });
    }
  });

  $('#f').click(() => {
    fahrenheit = true;
    $('#labels').html('<span class="label label-danger text-center">Fahrenheit</span>');

    if(lastInput != '') {
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + lastInput + "&units=imperial&APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
        type: 'GET',
        dataType: 'jsonp',
        success: (data) => {
          var widget = show(data);

          $('#show').html(widget);
          $("#city").val('');
        }
      });
    }
  });

  $('#submit-weather').click(() => {
    var city = $("#city").val();

    if(city != '' && !fahrenheit) {
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric&APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
        type: 'GET',
        dataType: 'jsonp',
        success: (data) => {
          var widget = show(data);

          $('#show').html(widget);
          lastInput = $("#city").val();
          $("#city").val('');
        }
      });
    } else if(city != '' && fahrenheit) {
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial&APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
        type: 'GET',
        dataType: 'jsonp',
        success: (data) => {
          var widget = show(data);

          $('#show').html(widget);
          lastInput = $("#city").val();
          $("#city").val('');
        }
      });
    }
  });
});

var show = function(data) {
  return "<h3 class='text-center'><strong>Weather</strong>: " + data.weather[0].main + "." + "</h3>" +
         "<h3 class='text-center '><strong>Description</strong>: " + data.weather[0].description + "." + "</h3>" +
         "<h3 class='text-center'><strong>Low</strong>: " + data.main.temp_min + "&deg;" +"</h3>" +
         "<h3 class='text-center'><strong>Temperature</strong>: " + data.main.temp + "&deg;" + "</h3>" +
         "<h3 class='text-center'><strong>High</strong>: " + data.main.temp_max + "&deg;" + "</h3>" +
         "<h3 class='text-center'><strong>Cloudiness</strong>: " + data.clouds.all + "%" + "</h3>" +
         "<h3 class='text-center'><strong>Atmospheric pressure</strong>: " + data.main.pressure + " hPa" + "</h3>";
}
