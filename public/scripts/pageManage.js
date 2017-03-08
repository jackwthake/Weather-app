var fahrenheit = true;
var lastInput = '';

var presetCities = [
  'london',
  'stockholm',
  'paris',
  'dubai',
  'singapore',
  'new york'
];

$(function(){
        $("#city").typed({
        strings: [
          "Amsterdam", 
          "Berlin",
          "Copenhagen",
          "Oslo",
          "Rome",
          "Genevia",
          "Bern",
          "Barcelona",
          "Madrid",
          "Tokyo",
          "Beijing",
          "Hong Kong",
          "Dublin",
          "Glasgow",
          "Sydney",
          "New York",
          "Chicago",
          "Los Angeleas",
          "San Diego",
          "Portland",
          "Seattle"
        ],
        loop: true,
        shuffle: true,
        typeSpeed: 85
      });
});

$(document).ready(() => {
  updatePresetData();

  $('#f').addClass('btn-primary')

    $('#c').click(() => {
      fahrenheit = false;
      $('#c').addClass('btn-primary');
      $('#f').removeClass('btn-primary');

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

      updatePresetData();
    });

    $('#f').click(() => {
      fahrenheit = true;
      $('#f').addClass('btn-primary');
      $('#c').removeClass('btn-primary');

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

      updatePresetData();
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

  setInterval(() => {
    updatePresetData();
  }, 60000 * 15); // every 15 minutes
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

var getPresetData = function(city, tempSys, slideNum) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=" + tempSys + "&APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      showPresetWeather(data, slideNum);
      console.log('Preset City Data Received')
    }
  });
}

var showPresetWeather = function(data, slideNum) {
  description = data.weather[0].description;
  city = data.name;
  description = capitalizeFirstLetter(description);
  city = capitalizeFirstLetter(city);
  $('#slide-' + slideNum + '-content').html('<h1>' + city + '</h1>' + 
                                            '<h3>'+ description +'</h3>' +
                                            '<h3>'+ data.main.temp_min + '&deg; | <strong>' + data.main.temp + '&deg;</strong> | ' + data.main.temp_min + 
                                            '&deg;' + '</h3>');
}

var updatePresetData = function() {
  if(fahrenheit) {
    for (var i = 0; i < presetCities.length; i++) {
      getPresetData(presetCities[i], 'imperial', i + 1);
    }
  } else if(!fahrenheit) {
    for (var j = 0; j < presetCities.length; j++) {
      getPresetData(presetCities[j], 'metric', j + 1);
    }     
  }
}

// Tyepd.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

!function($){

	"use strict";

	var Typed = function(el, options){

		// chosen element to manipulate text
		this.el = $(el);
		// options
		this.options = $.extend({}, $.fn.typed.defaults, options);

		// text content of element
		this.text = this.el.text();

		// typing speed
		this.typeSpeed = this.options.typeSpeed;
		
		// add a delay before typing starts
		this.startDelay = this.options.startDelay;

		// amount of time to wait before backspacing
		this.backDelay = this.options.backDelay;

		// input strings of text
		this.strings = this.options.strings;

		// character number position of current string
		this.strPos = 0;

		// current array position
		this.arrayPos = 0;

		// current string based on current values[] array position
		this.string = this.strings[this.arrayPos];

		// number to stop backspacing on.
		// default 0, can change depending on how many chars
		// you want to remove at the time
		this.stopNum = 0;

		// Looping logic
		this.loop = this.options.loop;
		this.loopCount = this.options.loopCount;
		this.curLoop = 1;
		if (this.loop === false){
			// number in which to stop going through array
			// set to strings[] array (length - 1) to stop deleting after last string is typed
			this.stopArray = this.strings.length-1;
		}
		else{
			this.stopArray = this.strings.length;
		}

		// All systems go!
		this.build();
	}

		Typed.prototype =  {

			constructor: Typed

			, init: function(){
				// begin the loop w/ first current string (global self.string)
				// current string will be passed as an argument each time after this
				var self  = this;
			  	setTimeout(function() {
			  		// Start typing
					self.typewrite(self.string, self.strPos)
			  	}, self.startDelay);
			}

			, build: function(){
				// Insert cursor
				//this.el.after("<span id=\"typed-cursor\">|</span>");
				this.init();
			}

			// pass current string state to each function
			, typewrite: function(curString, curStrPos){

				// varying values for setTimeout during typing
				// can't be global since number changes each time loop is executed
				var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
				var self = this;

				// ------------- optional ------------- //
				// backpaces a certain string faster
				// ------------------------------------ //
				// if (self.arrayPos == 1){
				// 	self.backDelay = 50;
				// }
				// else{ self.backDelay = 500; }

				// containg entire typing function in a timeout
				setTimeout(function() {

					// make sure array position is less than array length
					if (self.arrayPos < self.strings.length){

						// start typing each new char into existing string
						// curString is function arg
                        // CUSTOM PLACEHOLDER TEXT
						self.el.attr("placeholder", curString.substr(0, curStrPos));

						// check if current character number is the string's length
						// and if the current array position is less than the stopping point
						// if so, backspace after backDelay setting
						if (curStrPos > curString.length && self.arrayPos < self.stopArray){
							clearTimeout(clear);
							var clear = setTimeout(function(){
								self.backspace(curString, curStrPos);
							}, self.backDelay);
						}

						// else, keep typing
						else{
							// add characters one by one
							curStrPos++;
							// loop the function
							self.typewrite(curString, curStrPos);
							// if the array position is at the stopping position
							// finish code, on to next task
							if (self.loop === false){
								if (self.arrayPos === self.stopArray && curStrPos === curString.length){
									// animation that occurs on the last typed string
									// fires callback function
									var clear = self.options.callback();
									clearTimeout(clear);
								}
							}
						}
					}
					// if the array position is greater than array length
					// and looping is active, reset array pos and start over.
					else if (self.loop === true && self.loopCount === false){
						self.arrayPos = 0;
						self.init();
					}
						else if(self.loopCount !== false && self.curLoop < self.loopCount){
							self.arrayPos = 0;
							self.curLoop = self.curLoop+1;
							self.init();
						}

				// humanized value for typing
				}, humanize);

			}

			, backspace: function(curString, curStrPos){

				// varying values for setTimeout during typing
				// can't be global since number changes each time loop is executed
				var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
				var self = this;

				setTimeout(function() {

					// ----- this part is optional ----- //
					// check string array position
					// on the first string, only delete one word
					// the stopNum actually represents the amount of chars to
					// keep in the current string. In my case it's 14.
					// if (self.arrayPos == 1){
					//	self.stopNum = 14;
					// }
					//every other time, delete the whole typed string
					// else{
					//	self.stopNum = 0;
					// }

					// ----- continue important stuff ----- //
					// replace text with current text + typed characters
                    // CUSTOM PLACEHOLDER TEXT
					self.el.attr("placeholder", curString.substr(0, curStrPos));

					// if the number (id of character in current string) is
					// less than the stop number, keep going
					if (curStrPos > self.stopNum){
						// subtract characters one by one
						curStrPos--;
						// loop the function
						self.backspace(curString, curStrPos);
					}
					// if the stop number has been reached, increase
					// array position to next string
					else if (curStrPos <= self.stopNum){
						clearTimeout(clear);
						var clear = self.arrayPos = self.arrayPos+1;
						// must pass new array position in this instance
						// instead of using global arrayPos
						self.typewrite(self.strings[self.arrayPos], curStrPos);
					}

				// humanized value for typing
				}, humanize);

			}

		}

	$.fn.typed = function (option) {
	    return this.each(function () {
	      var $this = $(this)
	        , data = $this.data('typed')
	        , options = typeof option == 'object' && option
	      if (!data) $this.data('typed', (data = new Typed(this, options)))
	      if (typeof option == 'string') data[option]()
	    });
	}

	$.fn.typed.defaults = {
		strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
		// typing and backspacing speed
		typeSpeed: 0,
		// time before typing starts
		startDelay: 0,
		// time before backspacing
		backDelay: 500,
		// loop
		loop: false,
		// false = infinite
		loopCount: false,
		// ending callback function
		callback: function(){ null }
	}


}(window.jQuery);