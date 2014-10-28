/*global $*/

// Create global array of location map markers
var location_map_markers = {};

// Custom location map style
var location_map_style = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }
];

// On document ready
$(function () {

    // Loop all location picker inputs
    $("input.location_picker").each(function () {

        // Create unique this
        var _this = this;

        // Generate unique number
        var unique_number = Math.floor(Math.random() * 99999);

        // Create a map search box
        var search_box = $("<input/>", {
           type: "text",
           class: "location_map_search_box"
        });

        // Add the search box before the input
        $("<p/>", {
            html: "Location search: "
        }).insertBefore(this).append(search_box);

        // Create a new map
        var map = $("<div/>", {
            id: "location_map_picker_" + unique_number,
            class: "location_map_picker"
        });

        // Add the map before the input
        map.insertBefore(this);

        // Create map options
        var mapOptions = {
            center: {lat: 0, lng: 0},
            zoom: 1,
            styles: location_map_style
        };

        // Create map
        var google_map = new google.maps.Map(map.get(0), mapOptions)

        // Make sure we have a markers array
        if(location_map_markers[map.attr('id')] === undefined){
            location_map_markers[map.attr('id')] = []
        }

        // Check to see if the input has a value
        if ($(_this).val() != "") {

            // We have a marker, so set it and center the map
            var current_marker = $(_this).val().split(',');
            var current_marker_position = new google.maps.LatLng(current_marker[0],current_marker[1])

            set_marker(map, google_map, current_marker_position, $(_this), true, true);

        }

        // Create geocoder
        var geocoder = new google.maps.Geocoder();

        // Bind search box change
        search_box.bind('keyup', function(){

            // Get the address we'll be geocoding
            var address = $(this).val();

            geocoder.geocode({ 'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    set_marker(map, google_map, results[0].geometry.location, $(_this), true, true);
                }
            });

        });

        search_box.bind('keydown', function(event){
            if (event.keyCode === 13) {
                $(this).trigger('keyup');
                event.preventDefault();
            }
        })

        // Bind click event on map
        google.maps.event.addListener(google_map, 'click', function (event) {
            set_marker(map, google_map, event.latLng, $(_this), false, false);
        });

    });

});

function set_marker(map, google_map, position, input, center, zoom) {
    // We have a markers array, need to clear it
    $.each(location_map_markers[map.attr('id')], function (key, value) {
        this.setMap(null)
    })

    location_map_markers[map.attr('id')].push(new google.maps.Marker({
        position: position,
        map: google_map
    }));

    if (center) {
        google_map.setCenter(position);
    }

    if (zoom) {
        google_map.setZoom(13);
    }

    // Set value of field
    input.val(position.k + "," + position.B);
}
