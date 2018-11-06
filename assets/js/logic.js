$(document).ready(function(){
	console.log("ready");


	$("#submitBtn").on("click", function(){
		var keyword = $("#keywordIn").val().trim();
		var startDate = $("#startDateIn").val().trim();
		var endDate = $("#endDateIn").val().trim();
		var city = $("#cityIn").val().trim();
		var radius = $("#radiusIn").val().trim();

		var tmUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=s13JIGsAVU63A3yIEMWPlQSQt5ldZz7x&format=json&keyword=" + keyword + "&radius=" + radius+ "&startDateTime=" + startDate + "&endDateTime= " + endDate + "&city=" + city;

			$.ajax({
				method: "GET",
			  	url: tmUrl,
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
					tmLink = $("<a>").text("link");
					tmLink.attr("href", results._embedded.events[i].url);
					link.append(tmLink);
					tRow.append(event, venue, date, ticketPrice, link);
					$("tbody").append(tRow)
				}
			});

		})
	
	});	


//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=cuzzy&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyCoqQeit3I0Arb3_C-BdKSsFYX_yokU4f4

