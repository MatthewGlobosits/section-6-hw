// got the line of code structure from github
// this is short hand for $(documnet).ready...
$(function(){
populateButtons(searchArray,"searchButton","#buttons");
})

 var searchArray = ["The Beatles", "Bruce Springsteen","The Beach Boys"];

 function populateButtons(searchArray,classToAdd,areaToAddTo){
     $(areaToAddTo).empty();
     for(var i = 0; i < searchArray.length; i++){
         var a =$("<button>");
         a.addClass(classToAdd);
         a.attr("data-type", searchArray[i]);
         a.text(searchArray[i]);
         $(areaToAddTo).append(a);

     }

 }

 $(document).on("click",".searchButton",function(){
     var type = $(this).data("type");
  
     var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=zmFE7T6prF31NJ8TI9e63vjmJmBXHQyt";
     $.ajax({url:queryUrl,method:"GET"})
     .done(function(response){
         console.log(response);
        for(var i = 0; i < response.data.length; i ++){
            var searchDiv = $("<div class='search-item'>");
            var rating = response.data[i].rating;
            var p =$("<p>").text("Rating: "+rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr('src',still);
            image.attr("data-still",still);
            image.attr("data-animated",animated);
            image.attr("data-state","still");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").append(searchDiv);
        }
     })
 })