var sportList = ["fencing", "soccer", "running", "skiing", "football", "rugby", "gymnastics", "basketball", "swimming", "tennis", "figure skating"];

function displaySport() {
    $("#images").empty();
    var sport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=Snq5Oh1LrFS5MwvOL6QKRYSMSwarUvMf&limit=10"

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var imageUrl = results[i].images.fixed_height_still.url;
                var sportImage = $("<img>");
                var sportsDiv = $("<div>");

                var rating = results[i].rating;
                sportImage.addClass("classGif");
                var p = $("<p>Rating: " + results[i].rating + "</p>");

                var sportImage = $("<img src = '" + results[i].images.fixed_height.url + "' />");
                // Prepending the sportImage to the images div
                sportsDiv.append(p, sportImage);
                $("#images").prepend(sportsDiv);

            }
        })
}
// putting existing button on the page 

function renderButtons() {
    $("#gif-button").empty();


    for (var i = 0; i < sportList.length; i++) {
        var a = $("<button>");
        a.addClass("sport");
        a.attr("data-name", sportList[i]);
        a.text(sportList[i]);
        $("#gif-button").append(a);
    }
}
// adding new sport button to the page 

$("#add-sport").on("click", function (event) {
    event.preventDefault();

    var sport = $("#sport-input").val().trim();
    sportList.push(sport);

    renderButtons();
    $("#sport-input").val("");
});
$(document).on("click", ".sport", displaySport);
renderButtons();

//////////////////////////// animation not working 

// $(".gif").on("click", function () {

//     var state = $(this).attr("data-state");

//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

/////////////////////////////
$(".gif").on("click", function () {
    for (var i = 0; i < response.length; i++) {
        var state = $(this).attr("data-state"); /// still OR animate 
        var stillURL = $(this).attr("data-still"); //still URL
        var animURL = $(this).attr("data-animate"); // animated URL 

        sportImage.attr({
            "src": imageUrl,
            "alt": "sport-image",
            "data-state": "still",
            "data-still": results[i].images.fixed_height_still.url,
            "data-animate": results[i].images.fixed_height.url
        });

        if (state === "still") { // if it is currently paused  //  always a string 
            $(this).attr({
                "src": animURL,
                "data-state": "animate"
            });
        } else {
            $(this).attr({
                "src": stillURL,
                "data-state": "still"

            });
        }

    }

});

renderButtons();