const navBtn = document.querySelector('.profile-arrow')
const navBar = document.getElementById('nav-bar')

navBtn.addEventListener('click', () => {
    navBar.classList.toggle('active');
    if (navBar.classList.contains('active')) {
        navBtn.textContent = "<<";
    } else {
        navBtn.textContent = ">>";
    }
});

function switchTab(tabName) {

    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.add('hidden'));

    const targetPage = document.getElementById(tabName);
    if (targetPage) targetPage.classList.remove('hidden');

    if (tabName === 'login-page' || tabName === 'signup-page') {
        navBar.classList.add('hidden');
        navBtn.classList.add('hidden');
        if (navBtn) navBtn.style.display = 'none';
    } else {
        navBar.classList.remove('hidden');
        navBtn.classList.remove('hidden');
        if (navBtn) navBtn.style.display = 'block';
    }
}

const links = document.querySelectorAll('.link');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetValue = event.target.textContent;
        if (targetValue === "Sign Up") {
            switchTab("signup-page");
        } else if (targetValue === "Login") {
            switchTab("login-page");
        }
    });
});

const loginBtn = document.querySelector('#btn-login');
//dummy
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log("login btn clicked!");
        switchTab("main-1")
    });
}

let map;

function initMap() {
    const myCenter = { lat: 49.282, lng: -123.120 };

    // 이 스타일 배열을 map 옵션 안에 넣어줘!
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

    map = new google.maps.Map(document.querySelector(".map"), {
        center: myCenter,
        zoom: 12,
        styles: darkStyle
    });

    //dummy data
    const locations = [
        { name: "Metrotown Studio", lat: 49.2276, lng: -122.9992,count: "3"},
        { name: "Downtown Loft", lat: 49.2827, lng: -123.1207, count:"1"},
        { name: "Richmond House", lat: 49.1666, lng: -123.1336, count:"5"}
    ];
    locations.forEach((place) => {
        new google.maps.Marker({
            position: {lat:place.lat, lng:place.lng},
            map: map,
            label: {
                text: place.count,
                color: "white",
                fontWeignt: "bold",
                fontSize: "14px"
            },
            title: place.name
        });
    })


}
