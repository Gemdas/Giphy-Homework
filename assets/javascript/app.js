$(document).ready(function() {
	var searchQuery;
    var currentQuery;
	var currentPlay;
	var topics= ["Andy Warhol", "Diego Rivera", "Francisco de Goya", "Frida Kahl", "Georges Seurat", "Henri Rousseau", "Jack Vettriano", "Jackson Pollock", "Joan Mir\xF3", "Leonardo da Vinci", "Marc Chagall", "Mary Cassatt", "Norman Rockwell", "Pablo Picasso", "Paul C\xE9zanne", "Paul Gauguin", "Pierre Auguste Renoir", "Wassily Kandinsky", "Winslow Homer", "\xC9douard Manet"];
	renderButtons();
	function renderButtons() {
	    $("#Button-Row").empty();
	    for (var i = 0; i < topics.length; i++) {
	        var button=$("<button>");
	        button.addClass("Generate-Gallery");
	        button.data("Artist", topics[i]);
	        button.addClass("btn spacing");
	        button.text(topics[i]);
	        $("#Button-Row").append(button);
	    }
	}
	$("#add-artist").on("click", function() {
        event.preventDefault();
        var input=$("#artist-input").val();
        if (topics.indexOf(input)===-1&&input!="")
        {
          topics.push(input);
          topics.sort();
          renderButtons();
        }
    });
    $(document).on("click", ".Generate-Gallery", function() {
    	if(currentQuery===$(this).data("Artist"))
    		return;
    	searchQuery=$(this).data("Artist");
        currentQuery=$(this).data("Artist");
    	currentPlay=undefined;
    	$("#Gallery").empty();
    	$("#Gallery").append("<h1 class='col-md-12'>"+searchQuery+"<h1>");
    	while (searchQuery.indexOf(" ")!=-1)
    	{
    		searchQuery=searchQuery.replace(" ","+");
    	}		
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+encodeURI(searchQuery) + "&limit=10&api_key=dc6zaTOxFJmzC";
    	$.ajax({
      		url: queryURL,
     		 method: 'GET'
    	}).done(function(response) {
    		//iterates through placing the images
    		for (var i = 0; i < response.data.length; i++) {
    			var entry=$("<div>");
    			var img= $("<img>");
    			$(entry).addClass("Canvas col-md-3");
    			$(entry).append("<h2> rating: "+ response.data[i].rating+ "<h2>");
    			$(img).attr("src", response.data[i].images.fixed_width_still.url);
    			$(img).data("giphyData", response.data[i]);
    			$(img).addClass("Play");
    			$(entry).append(img);
    			$("#Gallery").append(entry);
    		}	
    	});
    });
    //click function on gif
    $(document).on("click", ".Play", function() {
    	//stops current running gif
    	if(currentPlay!=undefined)
    	{
    		$(currentPlay).attr("src", $(currentPlay).data("giphyData").images.fixed_width_still.url);
    	}
    	//checks to see if click was on currently running gif and removes its info
    	if(currentPlay===this)
    	{
    		currentPlay=undefined;
    		return;
    	}
    	//starts the new playing gif
    	currentPlay=this;
    	$(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
    });
    //preview gif by hovering
    $(document).on("mouseenter", ".Play", function() {
    	if(currentPlay===this)
    	{
    		return;
    	}
    	$(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
    });
    //ends preview 
    $(document).on("mouseleave", ".Play", function() {
    	if(currentPlay===this)
    	{
    		return;
    	}
    	$(this).attr("src", $(this).data("giphyData").images.fixed_width_still.url);
    });
});