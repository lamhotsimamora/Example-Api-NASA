$(document).ready(function(){
	/**
	 * Api Key For Access HTTPS NASA
	 * @type {String}
	 */
	const api_key = "pXLCGER04yZYFN2PkmkMbEGqF9pbHdlCLP7E4WDl";

	function getArticle()
	{
		// Get user count from input value
		var count = _getValById("txt_input");

		// check if Count equals zero then return;
		if (count==0)
		{
			_focus("txt_input");
			_printTo("display_error",'<article class="message is-small is-danger"> <div class="message-header"> <p><strong>Uppzz </strong>! <a></a></p> <button class="delete" aria-label="delete"></button> </div> <div class="message-body"> The value cant empty or should be greater than zero (0) ! </div> </article>');
			return;
		}

		// check if TRUE
		if (count)
		{
			// defined URL and API Key  and count of article
			let u = 'https://api.nasa.gov/planetary/apod?api_key='+api_key+"&count="+(count)+"";
			// Create Animation Loading
			_animation("display_result"," Wait ...");
			// Disabled Button
			btn_search.disabled = true;
			// Clear  Display Error
			_printTo("display_error","");
			_printTo("btn_search","Loading...");

			// Start AJAX with GET
			_requestGET(u,function(res)
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

						var img;
						var date;
						var explanation;
						var title;
						var media_type;
						var sv;
						var copyright;

						var result_final = "";
						var template = "";

						var k = 1;
						// Here we start collage the object JSON to template
						for (var i = 0 ; i < obj.length ; ++i)
						{
							img 		= obj[i].url ? obj[i].url : "img-not-found.jpg";
							date 		= obj[i].date ? obj[i].date : "-";
							explanation = obj[i].explanation ? obj[i].explanation : "-";
							title 		= obj[i].title ? obj[i].title : "-";
							media_type 	= obj[i].media_type ? obj[i].media_type : "-";
							sv  		= obj[i].service_version ? obj[i].service_version : "-";
							copyright   = obj[i].copyright ? obj[i].copyright : "-";

							template    =  "No                : "+k+" </br>"
										 +"Date  		    : <strong>"+date + "</strong> </br>"
										 +"Media 			: <strong>"+media_type + "</strong> </br>"
										 +"Service Version  : <strong>"+sv+"</strong> </br>"
										 +"Copyright        : <strong>"+copyright+"</strong> </br>"
										 +"Image 			: <strong>"+_image(img)+"</strong> </br>" 
										 +"Detail			: <i><p>"+explanation+"</p></i> </br>";
							k++;
							result_final += _article(title,template);

						}
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
		else
		{
			 _printTo("display_error",'<article class="message is-small is-danger"> <div class="message-header"> <p><strong>Uppzz </strong>! <a></a></p> <button class="delete" aria-label="delete"></button> </div> <div class="message-body"> You have to type the count of article ! </div> </article>');
			 _focus("txt_input");
		}
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
