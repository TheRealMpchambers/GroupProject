$(document).ready(function(){
	console.log("ready");

	$("form").on("submit", function(event) {
		event.preventDefault();
	});

	$("#submitBtn").on("click", function(event){
		var keyword = $("#keywordIn").val().trim();
		var startDate = moment($("#startDateIn").val().trim(), "MM/DD/YYYY").format();
		var endDate = moment($("#startDateIn").val().trim(), "MM/DD/YYYY").add(1, "day").format();
		var city = $("#cityIn").val().trim();

		var tmUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=s13JIGsAVU63A3yIEMWPlQSQt5ldZz7x&format=json&keyword=" + keyword + "&startDateTime=" + startDate + "&endDateTime= " + endDate + "&city=" + city;

		$.ajax({
			method: "GET",
		  	url: tmUrl,
		  	async: true,
		 	dataType: "json",

		}).then(function(results){
			console.log(results);
			$("#events").empty();
			for (i = 0; i < results._embedded.events.length; i++){
				tRow = $("<tr>");
				event = $("<td>");
				event.text(results._embedded.events[i].name);
				venue = $("<td>");
				venue.text(results._embedded.events[i]._embedded.venues[0].name);
				date = $("<td>");
				date.text(results._embedded.events[i].dates.start.localDate)
				ticketPrice = $("<td>");
				if (typeof results._embedded.events[i].priceRanges !== "undefined"){
					ticketPrice.text("$" + results._embedded.events[i].priceRanges[0].min);
				} else {
					ticketPrice.text("N/A");
				}
				link = $("<td>");
				tmLink = $("<a>").text("Buy Tickets");
				tmLink.attr("href", results._embedded.events[i].url);
				link.append(tmLink);
				tRow.append(event, venue, date, ticketPrice, link);
				$("#events").append(tRow)
			}
		});

		var placesUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + city + "&key=AIzaSyCoqQeit3I0Arb3_C-BdKSsFYX_yokU4f4";

		$.ajax({
			method: "GET",
			url: placesUrl,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
				"x-frame-options": "SAMEORIGIN"
		}
		}).then(function(data){
			console.log("MAPSSSS", data);
			$("#restaurants").empty();
			for (i = 0; i < 5; i++){
				tRow = $("<tr>");
				rName = $("<td>");
				rName.text(data.results[i].name);
				rAddress = $("<td>");
				rAddress.text(data.results[i].formatted_address);
				rRating = $("<td>");
				rRating.text(data.results[i].rating);
				rPrice = $("<td>");
				rPrice.text(data.results[i].price_level);
				tRow.append(rName, rAddress, rRating, rPrice);
				$("#restaurants").append(tRow);
			}
		});

	});
	
});	
