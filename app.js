$(document).ready(function(){
	/**
	 * Api Key For Access HTTPS NASA
	 * @type {String}
	 */
	const api_key = "pXLCGER04yZYFN2PkmkMbEGqF9pbHdlCLP7E4WDl";

	function getArticle()
	{
			var url = "https://api.nasa.gov/planetary/apod?api_key="+api_key;
			
			// Create Animation Loading
			_animation("display_result"," Wait ...");
			// Disabled Button
			btn_search.disabled = true;
			// Clear  Display Error
			_printTo("display_error","");
			_printTo("btn_search","Loading...");

			// Start AJAX with GET
			_loadDoc(url,function(res)
			{
				    // check if response is 404
					if (res===false)
					{
						alert("Uppzz ! Sorry Something is wrong ! Response From Server 404 !");
						_refresh(_baseUrl());
						return;
					}

					// Enabled button
					btn_search.disabled = false;
					// Set to focus 
					_focus("txt_input");

					_printTo("btn_search","Go");

					// Parse response as JSON
					var obj  = JSON.parse(res);

					// If parse JSON as object is true
					if (obj)
					{	
						_writeLog(obj.length);

						var img;
						var date;
						var explanation;
						var title;
						var media_type;
						var sv;
						var copyright;

						var result_final = "";
						var template = "";

						
						// Here we start collage the object JSON to template
						
						img 		= obj.url ? obj.url : "img-not-found.jpg";
						date 		= obj.date ? obj.date : "-";
						explanation = obj.explanation ? obj.explanation : "-";
						title 		= obj.title ? obj.title : "-";
						media_type 	= obj.media_type ? obj.media_type : "-";
						sv  		= obj.service_version ? obj.service_version : "-";
						copyright   = obj.copyright ? obj.copyright : "-";

						template    =  "No                : 1 </br>"
									 +"Date  		    : <strong>"+date + "</strong> </br>"
									 +"Media 			: <strong>"+media_type + "</strong> </br>"
									 +"Service Version  : <strong>"+sv+"</strong> </br>"
									 +"Copyright        : <strong>"+copyright+"</strong> </br>"
									 +"Image 			: <strong>"+_image(img)+"</strong> </br>" 
									 +"Detail			: <i><p>"+explanation+"</p></i> </br>";
						
						result_final = _article(title,template);

					
						 var end_result = "<center><button class='button is-default' id='btn_down'>Go Down</button></center></br></br>"
						 					+result_final;
						
						// After finish, then innerHTML to display_result
						_printTo("display_result",end_result+"<div id='down_body'></div>");
						// clear input text
						_clear("txt_input");

						_onClick("btn_down",function(){
							_scroll("down_body");
						});
						
					}
			});
		
		
	}

	_onClick("btn_search",function(){
		getArticle();
	});

	function _image(u)
	{
		return '<center><img src="'+u+'" width="300" height="300" class="image is-thumbnail"></center>';
	}

	function _article(t,b)
	{
		return '<article class="message is-primary"><div class="message-header"> <p>'+t+'</p> <button class="delete" aria-label="delete"></button></div> <div class="message-body"> '+b+'</div> </article>'; 
	}

	_focus("txt_input");
	_setValue("txt_input",5);


	_keyCustom(function(){
		getArticle();
	},_keyCode.enter);

});
