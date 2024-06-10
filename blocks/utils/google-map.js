import styles from "./google-map-styles.js";

let map;
let infoWindow;

export function createMap(lat, long, mapCanvasID, icons) {
   
    let pointA = new google.maps.LatLng(lat, long),
      infowindow = new google.maps.InfoWindow({ maxWidth: 205 }),
      pos = {
        lat: Number(lat),
        lng: Number(long),
      },
      myOptions = {
        center: pointA,
        zoom: 10,
        styles: styles,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
    infoWindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById(mapCanvasID), myOptions);

    let marker = new google.maps.Marker({
      position: pointA,
      icon: icons,
      map,
    });

    map.setOptions({
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
    });

    marker.setPosition(pos);

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker) {
        return function () {
          let geocoder = new google.maps.Geocoder();
          let latLng = new google.maps.LatLng(
            this.getPosition().lat(),
            this.getPosition().lng()
          );
          geocoder.geocode({ latLng: latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              let address = results[3].formatted_address;
              let string = `<div><p style="color:black">${address}</p></div>`;
              infowindow.setContent(string);
            }
          });
          // infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker)
    );
  }

  
  function createEvent(eventType, details) {
    const customEvent = new CustomEvent(eventType, { detail: details });
    // Dispatching the custom event
    document.dispatchEvent(customEvent);
  }


export default createMap;
