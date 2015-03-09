/**
 * Created by somi on 7/03/15.
 */

var map;
function initialize() {
    var latLng = new google.maps.LatLng(-37.834176, 144.971103);
    var myLatlng = new google.maps.LatLng(-37.834176, 144.971103);
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        disableDefaultUI:true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //var marker = new google.maps.Marker({
    //    position: myLatlng,
    //    map: map,
    //    title: 'Hello World!'
    //});
    var marker = new google.maps.Marker({
        position: latLng,
        draggable: true,
        map: map
    });

    var label = new Label({
        map: map
    });
    label.bindTo('position', marker, 'position');
    label.bindTo('text', marker, 'position');
}
google.maps.event.addDomListener(window, 'load', initialize);
$( window ).bind("resize", function(){
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
});


