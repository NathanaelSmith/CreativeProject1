
function on() {
    document.getElementById("overlay").style.display = "block";
}
function off() {
    document.getElementById("overlay").style.display = "none";
}
function onit() {
    document.getElementById("openMessage").style.display = "block";
}
function offit() {
    document.getElementById("openMessage").style.display = "none";
}

window.onload = onit;


$(document).ready(function() {
	 $("#searchSubmit").click(function(e) {
	e.preventDefault();
	var searchWord; 
	var value = $("#searchInput").val();
	localStorage.setItem("searchWord", value);
    window.open("search.html","_self")
	});
	
	
	var value = localStorage.getItem("searchWord");
	var d = new Date();
    var n = d.toISOString().split('T')[0]+"Z";
	
	
	
	var myurl= 'https://newsapi.org/v2/everything?' +
          'q=' + value + '&' +
		  'from=' + n + '&' + 
          'sortBy=popularity&' +
          'apiKey=e66f62b4ec894cdfbca256b91f3857ea';
	$.ajax({
	    url : myurl,
	    dataType : "json",
	    success : function(json) {
		console.log(json);
		var results = "";
		for (var i=0; i<json.articles.length; i++) {
			results += '<div class="newsfeed"><div class="newsHeader">'
			results +=  json.articles[i].source.name
			results += '<div class="rank"> Rank: ' +  (i+1) + ' <i class="fa fa-long-arrow-up" aria-hidden="true"></i>'
			results += '<i class="fa fa-long-arrow-down" aria-hidden="true"></i></div></div>'
			results += '<div class = "newsBody">' + json.articles[i].title
			results += '<br><hr>' + json.articles[i].description
			results += '</div> <div class = "newsFooter"><i class="fa fa-long-arrow-right" aria-hidden="true"></i><a href="' + json.articles[i].url
			results += '">VIEW NOW <a><i class="fa fa-long-arrow-left" aria-hidden="true"></i></div></div>'
		}
		$("#searchResults").html(results);
		}
	});
});

