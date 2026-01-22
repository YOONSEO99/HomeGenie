let map;

window.initMap = function (data = listings) {
    const myCenter = { lat: 49.282, lng: -123.120 };

    const darkStyle = [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
        { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
    ];

    const isMain2 = !document.getElementById('main-2').classList.contains('hidden');
    const targetId = isMain2 ? "#map2" : "#map1";
    const mapElement = document.querySelector(targetId);

    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: myCenter,
        zoom: 12,
        styles: darkStyle
    });

    data.forEach((place) => {
        new google.maps.Marker({
            position: place.location,
            map: map,
            label: {
                text: place.price.toString(),
                color: "white",
                fontWeight: "bold",
                fontSize: "14px"
            },
            title: place.title
        });
    })

};