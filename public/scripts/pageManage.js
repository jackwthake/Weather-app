$(document).ready(() => {
  var fahrenheit = true;
  var lastInput = '';

    $('#c').click(() => {
      fahrenheit = false;

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

  getPresetData('london', 1);
  getPresetData('stoockholm', 2);
  getPresetData('paris', 3);
});

var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var show = function(data) {
  description = data.weather[0].description;
  city = data.name;
  description = capitalizeFirstLetter(description);
  city = capitalizeFirstLetter(city)
  return "<h3 class='text-center'><strong>" + city + "</strong></h3>" +
         "<h3 class='text-center'><strong>" + description + "." + "</strong></h3>" +
         "<h3 class='text-center'><strong>" + data.main.temp_min + "&deg; | " + data.main.temp + "&deg; | " + data.main.temp_max + "&deg;</strong></h3>";
}

var getPresetData = function(city, slideNum) {
  var cityData;
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric&APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      showPresetWeather(data, slideNum);
    }
  });

  return cityData
}

var showPresetWeather = function(data, slideNum) {
  description = data.weather[0].description;
  city = data.name;
  description = capitalizeFirstLetter(description);
  city = capitalizeFirstLetter(city);
  $('#slide-' + slideNum + '-content').html('<h1>' + city + '</h1>' + 
                                            '<h3>'+ description +'</h3>' +
                                            '<h3>'+ data.main.temp_min + '&deg; | <strong>' + data.main.temp + '&deg;</strong> | ' + data.main.temp_min + '&deg;' + '</h3>');
}