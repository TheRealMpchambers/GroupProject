$(document).ready(function(){
	console.log("ready");

	var keyword = "";

	var tmUrl = keyword;

	// $("#button").on("click", function(){
		$.ajax({
			method: "GET",
		  	url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=s13JIGsAVU63A3yIEMWPlQSQt5ldZz7x",
		  	async: true,
		 	dataType: "json",

		}).then(function(results){
			console.log(results);
			$("tbody").empty();
			for (i = 0; i < results._embedded.events.length; i++){
				tRow = $("<tr>");
				event = $("<td>");
				event.text(results._embedded.events[i].name);
				venue = $("<td>");
				venue.text(results._embedded.events[i]._embedded.venues[0].name);
				date = $("<td>");
				date.text(results._embedded.events[i].dates.start.localDate)
				ticketPrice = $("<td>");
				ticketPrice.text("$" + results._embedded.events[i].priceRanges[0].min)
				link = $("<td>");
				tmLink = $("<img>");
				tmLink.attr("src", results._embedded.events[i].url);
				link.append(tmLink);
				tRow.append(event, venue, date, ticketPrice, link);
				$("tbody").append(tRow)
			}
		});
	});	
// });

