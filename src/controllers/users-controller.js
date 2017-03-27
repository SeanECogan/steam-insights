var request = require('request');

function getSteamId(response, userInput) {
	// SC - ResolveVanityURL will return a Steam ID for both a vanity URL label
	// 		but will return an error for an existing Steam ID.
	var vanityURL = 'ISteamUser/ResolveVanityURL/v0001/';

	var requestURL = apiURL + vanityURL + '?key=' + apiKey + '&vanityUrl=' + userInput;

	request.get(requestURL, function(err, steamResponse, steamResponseBody) {
		if (steamResponse.statusCode == 200) {
			var jsonResponse = JSON.parse(steamResponseBody);

			response.setHeader('Content-Type', 'application/json');

			// SC - If success == 42, we'll assume that they gave us their ID to begin with.
			if (jsonResponse.response.success == 42) {
				response.send({ success: 0, steamId: userInput });
			} else {
				response.send({ success: 0, steamId: jsonResponse.response.steamid });
			}
		} else {
			response.send({ success: 1, message: 'Error getting Steam ID: ' + steamResponse.statusCode });
		}
	});
}

var apiURL = 'http://api.steampowered.com/';
var apiKey = '1D2EE334A8DF1D7EB4E19B1979C7E914';

exports.steamId = getSteamId;
