// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-01-01&endtime=" +
    "2018-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";


// Magnitude color scheme
var minimalGreen = "#00fc0d";
var minorYellowGreen = "#9bfc00";
var noticeableYellow = "#d6fc00";
var mediumYellow = "#fcf800";
var significantOrange = "#fcbd00";
var strongOrange = "#fc8200";
var badOrange = "#fc5400";
var terribleOrange = "#fc0000";
var extremeRed = "#fc0032";
var historicallyExtremeRed = "#a60d2e";

//This function returns the applicable color based on the magnitude
function circleColor(magnitude) {
    var colorForCircle = "";

    if (magnitude < 2) {
        colorForCircle = minimalGreen;
    }
    else if ((magnitude >= 2) && (magnitude < 3)) {
        colorForCircle = minorYellowGreen;
    }
    else if ((magnitude >= 3) && (magnitude < 4)) {
        colorForCircle = noticeableYellow;
    }
    else if ((magnitude >= 4) && (magnitude < 5)) {
        colorForCircle = mediumYellow;
    }
    else if ((magnitude >= 5) && (magnitude < 6)) {
        colorForCircle = significantOrange;
    }
    else if ((magnitude >= 6) && (magnitude < 7)) {
        colorForCircle = strongOrange;
    }
    else if ((magnitude >= 7) && (magnitude < 8)) {
        colorForCircle = badOrange;
    }
    else if ((magnitude >= 8) && (magnitude < 9)) {
        colorForCircle = terribleOrange;
    }
    else if ((magnitude >= 9) && (magnitude < 10)) {
        colorForCircle = extremeRed;
    }
    else if (magnitude >= 10) {
        colorForCircle = historicallyExtremeRed;
    }

    return colorForCircle;
}


//This function returns the description of the size based on the magnitude
function circleCategory(magnitude) {
    var categoryForCircle = "";

    if (magnitude < 2) {
        categoryForCircle = "Minimal";
    }
    else if ((magnitude >= 2) && (magnitude < 3)) {
        categoryForCircle = "Minor";
    }
    else if ((magnitude >= 3) && (magnitude < 4)) {
        categoryForCircle = "Noticeable";
    }
    else if ((magnitude >= 4) && (magnitude < 5)) {
        categoryForCircle = "Medium";
    }
    else if ((magnitude >= 5) && (magnitude < 6)) {
        categoryForCircle = "Significant";
    }
    else if ((magnitude >= 6) && (magnitude < 7)) {
        categoryForCircle = "Strong";
    }
    else if ((magnitude >= 7) && (magnitude < 8)) {
        categoryForCircle = "Bad";
    }
    else if ((magnitude >= 8) && (magnitude < 9)) {
        categoryForCircle = "Terrible";
    }
    else if ((magnitude >= 9) && (magnitude < 10)) {
        categoryForCircle = "Extreme";
    }
    else if (magnitude >= 10) {
        categoryForCircle = "Historically Extreme";
    }

    return categoryForCircle;
}

// Using a proportional instead of pre-set values below
//This function returns the applicable size based on the magnitude
function circleSize(magnitude) {
    if (magnitude > 0) {
        return (50000 * magnitude);
    }
    else {
        return 0;
    }
}

//    //Not using non-proportional, pre-set function
// //This function returns the applicable size based on the magnitude
// function circleSizePreSet(magnitude) {
//     var circleRadius = 0;

//     if (magnitude < 2) {
//         circleRadius = 35000;
//     }
//     else if ((magnitude >= 2) && (magnitude < 3)) {
//         circleRadius = 75000;
//     }
//     else if ((magnitude >= 3) && (magnitude < 4)) {
//         circleRadius = 150000;
//     }
//     else if ((magnitude >= 4) && (magnitude < 5)) {
//         circleRadius = 300000;
//     }
//     else if ((magnitude >= 5) && (magnitude < 6)) {
//         circleRadius = 450000;
//     }
//     else if ((magnitude >= 6) && (magnitude < 7)) {
//         circleRadius = 600000;
//     }
//     else if ((magnitude >= 7) && (magnitude < 8)) {
//         circleRadius = 750000;
//     }
//     else if ((magnitude >= 8) && (magnitude < 9)) {
//         circleRadius = 900000;
//     }
//     else if ((magnitude >= 9) && (magnitude < 10)) {
//         circleRadius = 1050000;
//     }
//     else if (magnitude >= 10) {
//         circleRadius = 1100000;
//     }

//     return circleRadius;
// }

//This function returns the applicable opacity based on the magnitude
function circleOpacityLevel(magnitude) {
    var circleOpacity = 0;

    if (magnitude < 2) {
        circleOpacity = 1;
    }
    else if ((magnitude >= 2) && (magnitude < 3)) {
        circleOpacity = .93;
    }
    else if ((magnitude >= 3) && (magnitude < 4)) {
        circleOpacity = .86;
    }
    else if ((magnitude >= 4) && (magnitude < 5)) {
        circleOpacity = .80;
    }
    else if ((magnitude >= 5) && (magnitude < 6)) {
        circleOpacity = .74;
    }
    else if ((magnitude >= 6) && (magnitude < 7)) {
        circleOpacity = .68;
    }
    else if ((magnitude >= 7) && (magnitude < 8)) {
        circleOpacity = .60;
    }
    else if ((magnitude >= 8) && (magnitude < 9)) {
        circleOpacity = .52;
    }
    else if ((magnitude >= 9) && (magnitude < 10)) {
        circleOpacity = .44;
    }
    else if (magnitude >= 10) {
        circleOpacity = .35;
    }

    return circleOpacity;
}


// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {

    // Define array to hold created earthquake markers
    var circleMarkers = [];

    console.log("Checkpoint 1");

    // Loop through locations in the and create earthquake markers
    for (var i = 0; i < data.features.length; i++) {
        console.log("Checkpoint 2 part" + i);

        // UTC Timestamp event recorded, then changed to local time
        var timeRecorded = new Date(data.features[i].properties.time).toString();


        // For i earthquake there will be a short array with longitude and latitude
        var coordinates = [];
        coordinates.push(data.features[i].geometry.coordinates[1]);
        coordinates.push(data.features[i].geometry.coordinates[0]);

        // Setting the marker radius for the earthquake magnitude circle at location by passing magnitude into the circleSize function
        circleMarkers.push(
            L.circle(coordinates, {
                stroke: true,
                color: "green",
                weight: 1,
                fillOpacity: circleOpacityLevel(data.features[i].properties.mag),
                fillColor: circleColor(data.features[i].properties.mag),
                radius: circleSize(data.features[i].properties.mag)
            }).bindPopup("<b>" + data.features[i].properties.title + "</b><br>" +
                "<hr>" +
                "<b>Time Recorded (Local Time):</b> " + timeRecorded + "<br>" +
                "<b>Location:</b> " + data.features[i].properties.place + "<br>" +
                "<b>Magnitude:</b> " + data.features[i].properties.mag + "<br>" +
                "<b>Magnitude Category for Map:</b> " + circleCategory(data.features[i].properties.mag) + "<br>"
            )
        )
    }

    // Create layer group
    var circleGroupLayer = L.layerGroup(circleMarkers);


    //This section is for the fault lines information
    var fault_line_URL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

    d3.json(fault_line_URL, function (responseData) {
        // This makes a variable to hold the response data from the fault lines data source
        var fault_line_data = responseData;

    // Defines a function that is run once for each feature in faultLineData
    // Create fault lines
    function forEachFault(feature, layer) {
        L.polyline(feature.geometry.coordinates);
      }
      // Creates a GeoJSON layer containing the features array of the faultLineData object
    // Run the onEachFaultLine function once for each element in the array
    var fault_lines = L.geoJSON(fault_line_data, {
        onEachFeature: forEachFault,
        style: {
          weight: 4,
          color: 'orange'
        }
      });

        // Once we get a response, send the data.features object and other information to the createFeatures function
        createFeatures(data.features, circleGroupLayer,fault_lines);
    });
});


function createFeatures(earthquakeData, circleGroupLayer,fault_lines) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes, circleGroupLayer,fault_lines);
}

function createMap(earthquakes, circleGroupLayer,fault_lines) {

    // Define streetmap, darkmap layers
    // Street Map
    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    // Dark Map
    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Outdoors Map
    var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 16,
        id: "outdoors-v11",
        accessToken: API_KEY
    });

    // Satellite Map
    var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetMap,
        "Dark Map": darkMap,
        "Outdoor Map": outdoorsMap,
        "Satellite Map": satelliteMap,
    };

    // Create overlay object to hold our overlay layer, and another for the circles
    var overlayMaps = {
        "Earthquake Locations": earthquakes,
        "Magnitude of Earthquakes": circleGroupLayer,
        "Fault Lines": fault_lines
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetMap, earthquakes,circleGroupLayer,fault_lines]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);


    // This section adds in the legend for the map 

    // Build legend and add to the map
    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += "<h4>Magnitude colors:"
        div.innerHTML += '<i style="background: ' + minimalGreen + '"></i><span>Magnitude <2; Minimal</span><br>';
        div.innerHTML += '<i style="background: ' + minorYellowGreen + '"></i><span>Magnitude 2-3; Minor</span><br>',
            div.innerHTML += '<i style="background: ' + noticeableYellow + '"></i><span>Magnitude 3-4; Noticeable</span><br>';
        div.innerHTML += '<i style="background: ' + mediumYellow + '"></i><span>Magnitude 4-5; Medium</span><br>';
        div.innerHTML += '<i style="background: ' + significantOrange + '"></i><span>Magnitude 5-6; Significant</span><br>';
        div.innerHTML += '<i style="background: ' + strongOrange + '"></i><span>Magnitude 6-7; Strong</span><br>';

        div.innerHTML += '<i style="background: ' + badOrange + '"></i><span>Magnitude 7-8; Bad</span><br>';
        div.innerHTML += '<i style="background: ' + terribleOrange + '"></i><span>Magnitude 8-9; Terrible</span><br>';
        div.innerHTML += '<i style="background: ' + extremeRed + '"></i><span>Magnitude 9-10; Extreme</span><br>';
        div.innerHTML += '<i style="background: ' + historicallyExtremeRed + '"></i><span>Magnitude >10; Historically Extreme</span><br>';

        return div;
    }

    legend.addTo(myMap);

}