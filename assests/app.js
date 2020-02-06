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
         $(areaToAddTo).prepend(a);

     }

 }

 $(document).on("click",".searchButton",function(){
     var type = $(this).data("type");
  
     var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=zmFE7T6prF31NJ8TI9e63vjmJmBXHQyt&limit=10";
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
            searchDiv.prepend(p);
            searchDiv.prepend(image);
            $("#searches").prepend(searchDiv);
        }
     })
            $(document).on("click",".searchImage",function(){
                var state = $(this).data("state");
                if(state == "still"){
                    $(this).attr("src",$(this).data("animated"));
                    $(this).attr("data-state","animated")
                }
                else {
                    $(this).attr("src",$(this).data("still"));
                }
            })
        })
          $("#search-input").on("click",function(){
              var newSearch = $("input").eq(0).val();
              searchArray.push(newSearch);
              populateButtons(searchArray,"searchButton","#buttons");
            //   return false;
          })
