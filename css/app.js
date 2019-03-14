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


                var sportImage = $("<img>");
                //////////////////////////
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("data-still", results[i].images.fixed_height_still.url);
                sportImage.attr("data-animate", results[i].images.fixed_height.url);
                sportImage.addClass("gif");
                sportImage.attr("data-state", "still");
                ////////////////////////
                var sportsDiv = $("<div>");

                var p = $("<p>Rating: " + results[i].rating + "</p>");
                sportsDiv.append(p, sportImage);
                $("#images").prepend(sportsDiv);

            }
        })
}
// putting  button on the page 

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
    if (sport === "") {
        return false;
    } else {
        sportList.push(sport);

        renderButtons();
        $("#sport-input").val("");
    }
});
$(document).on("click", ".sport", displaySport);
renderButtons();

//////////////////////////// animation not working 

$("#images").on("click", ".gif", function () {

    var state = $(this).attr("data-state"); /// still OR animate 

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

renderButtons();