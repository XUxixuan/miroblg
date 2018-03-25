
 $(document).ready(function(){
 	$("#form2").hide();
  $("#add").click(function(){
  $("#form2").toggle(1000);
  });
});

function craeteDiv(num){
	var html =""; 
	for(var i=0;i<num;i++)
	{
		var article = document.createElement('article')
		article.classList.add('brick')
		article.classList.add('entry')
		article.classList.add('animate-this')
		article.innerHTML = '<div class="entry-thumb"><a class="thumb-link"><img   class="newclass"  ></a></div><div class="entry-text"><div class="entry-header"><div class="entry-meta"><span class="cat-links"><h1 class="entry-title"><a class="Name">The 10 Golden Rules of Clean Simple Design.</a></h1></span></div><span class="Birthday" >Branding</span><span class="Area" >Mockup </span><span><i  onclick="like_Num(this)"  style="color:#ff99cc;" ></i></span></div><div class="entry-excerpt"></div></div>'
  		// html +='<article class="brick entry animate-this" ><div class="entry-thumb"><a class="thumb-link"><img   class="newclass"  ></a></div><div class="entry-text"><div class="entry-header"><div class="entry-meta"><span class="cat-links"><h1 class="entry-title"><a class="Name">The 10 Golden Rules of Clean Simple Design.</a></h1></span></div><span class="Birthday" >Branding</span><span class="Area" >Mockup </span><span><i  onclick="like_Num(this)"  style="color:#ff99cc;" ></i></span></div><div class="entry-excerpt"></div></div></article>';
  		document.getElementsByClassName('bricks-wrapper')[0].appendChild(article)
	}
	// setTimeout(function() {
 //        getElementsByClassName(0);
 //        document.body.width='99%';
 //        },1000)
	// setTimeout(function() {
        
 //        document.body.width='100%';
 //        },2000)
	// var div = document.getElementsByClassName('bricks-wrapper')[0];
	// div.innerHTML = html;
	// document.getElementsByClassName('entry-content')[0].appendChild(html)
	
}
new Vue({
	el:'#app',
	data: {
	message:'../static/src/img/img_15.jpg',
	imgurl:'../static/src/img/img_15.jpg'
	}
	});

$(function(){

	$("#selectbtn").click(function(){
		
		
		

		area=document.getElementById("select2").value;
		
		sex=$(".radio1:radio:checked").val();
		birthday=document.getElementById("selectdate").value;
		console.log(area,sex,birthday);
		var link="/category?birthday="+birthday+"&area="+area+"&sex="+sex+"";
		console.log(link);
		
		window.location.href=link
		

	})
})
$(function(){

	$("#selectbtn1").click(function(){
		
		
		

		area=document.getElementById("select3").value;
		
		sex=$(".radio1:radio:checked").val();
		birthday=document.getElementById("selectdate1").value;
		console.log(area,sex,birthday);
		var link="/category?birthday="+birthday+"&area="+area+"&sex="+sex+"";
		console.log(link);
		
		window.location.href=link
		

	})
})



$(function(){
	$("#form_up").click(function(){
		var a=document.getElementById("form1");
		
		

		var form = new Object();
		form.name=a.getElementsByTagName("input")[0].value;
		form.birthday=a.getElementsByTagName("input")[1].value;
		form.email=a.getElementsByTagName("input")[2].value;
		form.sex=$("input:radio:checked").val();
		form.img=a.getElementsByTagName("input")[5].name;
		form.content=a.getElementsByTagName("textarea")[0].value;
		form.country=$("#select option:selected").val()
		form.like_Num=0;
		console.log(form);
		

		var data=JSON.stringify(form);
		console.log(data);

		$.ajax({
        url: "/get_data",
        type: "POST",
        data: data,
        success: function (msg)
        {
        	 	
        	 }
        	})

	})
})
$(function(){
	$("#form_up2").click(function(){
		var a=document.getElementById("form2");
		
		
		console.log(a);
		var form = new Object();
		form.name=a.getElementsByTagName("input")[0].value;
		form.birthday=a.getElementsByTagName("input")[2].value;
		form.email=a.getElementsByTagName("input")[1].value;
		form.sex=$("input:radio:checked").val();
		form.img=a.getElementsByTagName("input")[5].name;
		form.content=a.getElementsByTagName("textarea")[0].value;
		form.country=$("#select2 option:selected").val()
		form.like_Num=0;
		console.log(form);
		

		var data=JSON.stringify(form);
		console.log(data);

		$.ajax({
        url: "/get_data",
        type: "POST",
        data: data,
        success: function (msg)
        {
        	 	alert(msg)
        	 }
        	})

	})
})

function like_Num(like_Num){
	
	// console.log(like_Num.innerText);
	// var a = parseInt(like_Num.innerText)+1;
	
	
	if (like_Num.className=="fa fa-heart-o")
	 {	
	 	
	 	like_Num.className="fa fa-heart";
		like_Num.innerText=parseInt(like_Num.innerText)+1;
		
		LIKE_NUM(like_Num.id,"+");
	 } 
	 else {
	 	var b=2
	 	like_Num.className="fa fa-heart-o";
	 	like_Num.innerText=parseInt(like_Num.innerText)-1;
	 	LIKE_NUM(like_Num.id,"-");


	 }
	



	// var b=document.getElementById("try").getElementsByTagName("i");
	// b[0].innerText=parseInt(b[0].innerText)+1;
	
	
}
function Top10(){
	var classElements = [],allElements = document.getElementsByClassName('post-background');
	var postcontent = [],allcontent = document.getElementsByClassName('post-content');
	$.ajax({
        url: "/top10",
        type: "POST",
        data: {id:"10"},
        success: function (msg)
        {
        	 	console.log(msg);

         for (var i=0; i< allElements.length; i++ )
   			{	
		   	       if (allElements[i].className == 'post-background' ) 

		   	       {
		   	       	console.log(allElements[i]);
			            allElements[i].style.backgroundImage="url("+msg[i][3]+")";
			            allcontent[i].getElementsByTagName("li")[0].innerText=msg[i][5];
			            allcontent[i].getElementsByTagName("a")[0].innerText=msg[i][2];
			            allcontent[i].getElementsByTagName("a")[1].innerText=msg[i][1];
			            allcontent[i].getElementsByTagName("i")[0].className="fa fa-heart-o";
			            allcontent[i].getElementsByTagName("i")[0].id=msg[i][0];
			            allcontent[i].getElementsByTagName("i")[0].innerText=msg[i][7];					   



        			}
  			 }
  


   						return "200";
		}
			})
				}


// Top10();

// getElementsByClassName(0);
function updata()
 {
    
    $(document).ready(function () 
    {
	var abc=1;
    var student = new Object();
    student.name="john";
    student.email="123123@qq.com";
    student.pic_adress="../static/src/img/img_20.jpg"

    student.location = "CHINA";
	student.sex="1";
	student.birthday="1995-01-14"

    var data = JSON.stringify(student)
    console.log(data)

	
	$.ajax({
        url: "/get_new",
        type: "POST",
        data: data,
        success: function (msg) 
        {
  	
   	      console.log(msg);
        }	
   
  
  	 	
    		})
	})  
    return abc;
}

function LIKE_NUM(id,b)
{	
	var student = new Object();
    student.id= id;
    student.b=b;

    

    var data = JSON.stringify(student)
    console.log(data)

	$.ajax({
        url: "/like_number",
        type: "POST",
        data: data	,
        success: function (msg) 
        {
  	
   	      console.log(msg)
        }	
   
  
  	 	
    		})

}

function Next(){
	var page=window.location.pathname.split("/")[1];
	var start=window.location.href.split("=")[1];
	if (page==""||start=="0") {
		var link="/page?start=1";
		console.log(link);
		window.location.href=link;
	}
	else
	{	var start=window.location.href.split("start=")[1];
		console.log(start)
		page=parseInt(start)+1;
		var link="/page?start="+page+"";
		console.log(link);
		window.location.href=link;
	}

	
	
}
function Prev(){
	var page=window.location.pathname.split("/")[1];
	var start=window.location.href.split("=")[1];
	if (page==""||start=="0") {
		alert("这是第一页啦")
	}
	else
	{	var start=window.location.href.split("start=")[1];
		page=parseInt(start)-1;
		var link="/page?start="+page+"";
		console.log(link);
		window.location.href=link;
	}

	
	
}


 
 function getElementsByClassName(abc) {
    var classElements = [],allElements = document.getElementsByClassName('newclass');
    var artical = [],allArtical = document.getElementsByClassName('entry-text');
    var link=[],alllink=document.getElementsByClassName('thumb-link');
    //所有div
    $(document).ready(function () {
	console.log(typeof(abc))
    var student = new Object();
    student.page=abc;

    student.location = "CHINA";
	student.sex="1";
	student.birthday="1995-01-14"

    var data = JSON.stringify(student)
    console.log(data)

	
	$.ajax({
        url: "/load_data",
        type: "POST",
        data: data,
        success: function (msg) {
        	console.log(msg);

         for (var i=0; i< allElements.length; i++ )
   {	
   	       if (allElements[i].className == 'newclass' ) {
   	       alllink[i].href="/contact/"+msg[i][0]+"";
           allElements[i].src=msg[i][5];
           allElements[i].alt=msg[i][0];
           var single=allArtical[i].getElementsByTagName("a");
           single[0].innerText=msg[i][1];
           allArtical[i].getElementsByTagName("span")[1].innerText=msg[i][2];
           allArtical[i].getElementsByTagName("span")[2].innerText=msg[i][6];
           allArtical[i].getElementsByTagName("i")[0].className="fa fa-heart-o";
           allArtical[i].getElementsByTagName("i")[0].innerText=msg[i][8];
           allArtical[i].getElementsByTagName("i")[0].id=msg[i][0];
           // s


        }
   }
  


   return "200";
    }
})
})
   
}




(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
		statsDuration  : 4000,          // stats animation duration
		mailChimpURL   : 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'
	},
		
	$WIN = $(window);


	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {
		$WIN.on('load', function() {	

	      // will first fade out the loading animation 
	    	$("#loader").fadeOut("slow", function(){

	        // will fade out the whole DIV that covers the website.
	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	};  


	/* audio controls 
	 * -------------------------------------------------- */ 
	var ssMediaElementPlayer = function() {
		$("audio").mediaelementplayer({
			features: ['playpause','progress', 'tracks','volume']
	  	});
	};


	/* FitVids
	------------------------------------------------------ */ 
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 

		
	/* pretty print
	 * -------------------------------------------------- */ 
	var ssPrettyPrint = function() {
		$('pre').addClass('prettyprint');
		$( document ).ready(function() {		
	    	prettyPrint();		
	  	}); 
	};


	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	   


	/* superfish
	 * -------------------------------------------------- */  
	var ssSuperFish = function() {
		$('ul.sf-menu').superfish({

	   	animation: { height:'show' }, // slide-down effect without fade-in
			animationOut: { height:'hide'}, // slide-up effect without fade-in			
			cssArrows: false, // disable css arrows	
			delay: 600 // .6 second delay on mouseout
			
		});
	};

	
  	/* Mobile Menu
   ------------------------------------------------------ */ 
   var ssMobileNav = function() {

   	var toggleButton = $('.menu-toggle'),
          nav = $('.main-navigation');

	   toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

	  	if (toggleButton.is(':visible')) nav.addClass('mobile');

	  	$WIN.resize(function() {
	   	if (toggleButton.is(':visible')) nav.addClass('mobile');
	    	else nav.removeClass('mobile');
	  	});

	  	$('#main-nav-wrap li a').on("click", function() {   
	   	if (nav.hasClass('mobile')) {   		
	   		toggleButton.toggleClass('is-clicked'); 
	   		nav.fadeOut();   		
	   	}     
	  	});

   }; 
   

  /* search
   ------------------------------------------------------ */ 
   var ssSearch = function() {

   	var searchWrap = $('.search-wrap');
	   var searchField = searchWrap.find('.search-field');
	   var upsubmit= searchWrap.find('.search-submit')
	   var closeSearch = $('#close-search');
	   var searchTrigger = $('.search-trigger');
	   var body = $('body');

	   searchTrigger.on('click', function(e){

	      e.preventDefault();
	      e.stopPropagation();   
	      var $this = $(this);

	      body.addClass('search-visible');
	      setTimeout(function(){
	         $('.search-wrap').find('.search-field').focus();
	      }, 100);

	   });


	   closeSearch.on('click', function(){
	      var $this = $(this);
	      
	      if(body.hasClass('search-visible')){
	         body.removeClass('search-visible');
	         setTimeout(function(){
	            $('.search-wrap').find('.search-field').blur();
	         }, 100);
	      }
	   });

	   upsubmit.on('click',  function(e){
	   	if( !$(e.target).is('.search-field') ) {   		
	   		closeSearch.trigger('click');   		
	   	}
	   });

	   searchField.on('click', function(e){
	      e.stopPropagation();
	   });

	   searchField.attr({placeholder: 'Type Your Keywords', autocomplete: 'off'});

   };
	 


	/*	Masonry
	------------------------------------------------------ */
	var ssMasonryFolio = function() {
		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded( function() {

			containerBricks.masonry( {		  
			  	itemSelector: '.entry',
			  	columnWidth: '.grid-sizer',
	  			percentPosition: true,
			  	resize: true
			});			

		});
	};


  /* animate bricks
	* ------------------------------------------------------ */
	var ssBricksAnimate = function() {

		var animateEl = $('.animate-this');

		$WIN.on('load', function() {				
			setTimeout(function() {
				animateEl.each(function(ctr) {				
						var el = $(this);
						
						setTimeout(function() {
							el.addClass('animated fadeInUp');														
						}, ctr * 200);

				});
			}, 200);				
		});

		$WIN.on('resize', function() {	
			// remove animation classes	
			animateEl.removeClass('animate-this animated fadeInUp');
		});

	};
		

  /* Flex Slider
	* ------------------------------------------------------ */
	var ssFlexSlider = function() {

		$WIN.on('load', function() {

		   $('#featured-post-slider').flexslider({
				namespace: "flex-",
		      controlsContainer: "", // ".flex-content",
		      animation: 'fade',
		      controlNav: false,
		      directionNav: true,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,		
		   });

		   $('.post-slider').flexslider({
		   	namespace: "flex-",
		      controlsContainer: "",
		      animation: 'fade',
		      controlNav: true,
		      directionNav: false,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,
		      start: function (slider) {
					if (typeof slider.container === 'object') {
						slider.container.on("click", function (e) {
							if (!slider.animating) {
								slider.flexAnimate(slider.getTarget('next'));
							}
						});
					}

					$('.bricks-wrapper').masonry('layout');								
				}
		   });

	   });
	};	


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});

	};


  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	}; 


  /* AjaxChimp
	* ------------------------------------------------------ */
	var ssAjaxChimp = function() {

		$('#mc-form').ajaxChimp({
			language: 'es',
		   url: cfg.mailChimpURL
		});

		// Mailchimp translation
		//
		//  Defaults:
		//	 'submit': 'Submitting...',
		//  0: 'We have sent you a confirmation email',
		//  1: 'Please enter a value',
		//  2: 'An email address must contain a single @',
		//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
		//  4: 'The username portion of the email address is invalid (the portion before the @: )',
		//  5: 'This email address looks fake or invalid. Please enter a real email address'

		$.ajaxChimp.translations.es = {
		  'submit': 'Submitting...',
		  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
		} 

	};
	

  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	


  /* Map
	* ------------------------------------------------------ */
	var ssGoogleMap = function() 
	{ 

		if (typeof google === 'object' && typeof google.maps === 'object')
		 {


			var latitude = 14.549072,
				 longitude = 121.046958,
				 map_zoom = 15,		 
				 main_color = '#d8ac00',
				 saturation_value = -30,
				 brightness_value = 5,
				 marker_url = null,
				 winWidth = $(window).width();	

		   // show controls
		   $("#map-zoom-in, #map-zoom-out").show();	 	 

		   // marker url
			if ( winWidth > 480 ) {
				marker_url = 'images/icon-location@2x.png';                    
		   } else {
		      marker_url = 'images/icon-location.png';            
		   }	 

			// map style
			var style = [ 
				{
					// set saturation for the labels on the map
					elementType: "labels",
					stylers: [
						{ saturation: saturation_value }
					]
				},  
			   {	// poi stands for point of interest - don't show these lables on the map 
					featureType: "poi",
					elementType: "labels",
					stylers: [
						{visibility: "off"}
					]
				},
				{
					// don't show highways lables on the map
			      featureType: 'road.highway',
			      elementType: 'labels',
			      stylers: [
			         { visibility: "off" }
			      ]
			   }, 
				{ 	
					// don't show local road lables on the map
					featureType: "road.local", 
					elementType: "labels.icon", 
					stylers: [
						{ visibility: "off" } 
					] 
				},
				{ 
					// don't show arterial road lables on the map
					featureType: "road.arterial", 
					elementType: "labels.icon", 
					stylers: [
						{ visibility: "off" }
					] 
				},
				{
					// don't show road lables on the map
					featureType: "road",
					elementType: "geometry.stroke",
					stylers: [
						{ visibility: "off" }
					]
				}, 
				// style different elements on the map
				{ 
					featureType: "transit", 
					elementType: "geometry.fill", 
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "poi",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.government",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.sport_complex",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.attraction",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.business",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit.station",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "landscape",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
					
				},
				{
					featureType: "road",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "road.highway",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}
			];
	
				
			// map options
			var map_options = {

		      	center: new google.maps.LatLng(latitude, longitude),
		      	zoom: 15,
		      	panControl: false,
		      	zoomControl: false,
		        	mapTypeControl: false,
		      	streetViewControl: false,
		      	mapTypeId: google.maps.MapTypeId.ROADMAP,
		      	scrollwheel: false,
		      	styles: style

		    	};

		   // inizialize the map
			var map = new google.maps.Map(document.getElementById('map-container'), map_options);

			// add a custom marker to the map				
			var marker = new google.maps.Marker({

				 	position: new google.maps.LatLng(latitude, longitude),
				 	map: map,
				 	visible: true,
				 	icon: marker_url
				 
				});

			// add custom buttons for the zoom-in/zoom-out on the map
			function CustomZoomControl(controlDiv, map) {
			
				// grap the zoom elements from the DOM and insert them in the map 
			 	var controlUIzoomIn= document.getElementById('map-zoom-in'),
				  	 controlUIzoomOut= document.getElementById('map-zoom-out');

				controlDiv.appendChild(controlUIzoomIn);
				controlDiv.appendChild(controlUIzoomOut);

				// Setup the click event listeners and zoom-in or out according to the clicked element
				google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
					map.setZoom(map.getZoom()+1)
				});
				google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
					map.setZoom(map.getZoom()-1)
				});
					
			}

			var zoomControlDiv = document.createElement('div');
			var zoomControl = new CustomZoomControl(zoomControlDiv, map);

			// insert the zoom div on the top right of the map
			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);

		} 

	};



  /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {	
		Top10()
		ssPreloader();
		ssMediaElementPlayer();
		ssFitVids();
		ssPrettyPrint();
		ssAlertBoxes();
		ssSuperFish();
		ssMobileNav();
		ssSearch();
		ssMasonryFolio();		
		ssBricksAnimate();
		ssFlexSlider();				
		ssSmoothScroll();
		ssPlaceholder();
		ssAjaxChimp();		
		ssBackToTop();
		ssGoogleMap();
		
	})();
 
 

})(jQuery);