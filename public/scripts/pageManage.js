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
          lastInput = $("#city").val();
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
          lastInput = $("#city").val();
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

var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var show = function(data) {
  description = data.weather[0].description;
  description = capitalizeFirstLetter(description);

  return "<h3 class='text-center'><strong>" + description + "." + "</strong></h3>" +
         "<h3 class='text-center'><strong>" + data.main.temp_min + "&deg; | " + data.main.temp + "&deg; | " + data.main.temp_max + "&deg;</strong></h3>";
}
