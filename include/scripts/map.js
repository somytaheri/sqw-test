/**
 * Created by somi on 7/03/15.
 */

var map;
function initialize() {
    var myLatlng = new google.maps.LatLng(-37.838460,144.922203);
    var mapOptions = {
        center: myLatlng,
        zoom: 10,
        disableDefaultUI:true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
$( window ).bind("resize", function(){
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
});
