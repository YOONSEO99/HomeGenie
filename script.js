
//dummy data
const listings = [
    {
        id: 1,
        title: "Home Name",
        price: 1300,
        sqft: 500,
        neighborhood: "metrotown",
        mood: "cozy ocean",
        location: { lat: 49.2276, lng: -122.9992 },
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400"
    },
    {
        id: 2,
        title: "Sky View Condo",
        price: 1950,
        sqft: 650,
        neighborhood: "downtown",
        mood: "modern city",
        location: { lat: 49.2848, lng: -123.1215 },
        img: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=400"
    },
    {
        id: 3,
        title: "Greenery House",
        price: 1100,
        sqft: 400,
        neighborhood: "joyce-collingwood",
        mood: "nature wood",
        location: { lat: 49.2384, lng: -123.0318 },
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400"
    },
    {
        id: 4,
        title: "Beachside Studio",
        price: 2200,
        sqft: 550,
        neighborhood: "kitsilano",
        mood: "ocean chic",
        location: { lat: 49.2684, lng: -123.1583 },
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400"
    },
    {
        id: 5,
        title: "Mountain View Cabin",
        price: 1800,
        sqft: 700,
        neighborhood: "north vancouver",
        mood: "mountain cool",
        location: { lat: 49.3200, lng: -123.0724 },
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400"
    },
    {
        id: 6,
        title: "Central Park Condo",
        price: 1650,
        sqft: 600,
        neighborhood: "burnaby central",
        mood: "park nature",
        location: { lat: 49.2285, lng: -123.0076 },
        img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400"
    },
    {
        id: 7,
        title: "Minimalist City Flat",
        price: 1900,
        sqft: 480,
        neighborhood: "gastown",
        mood: "modern cute",
        location: { lat: 49.2827, lng: -123.1053 },
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400"
    }
];

let map;

window.initMap = function () {
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

    const isMain2 = document.getElementById('main-2').classList.contains('hidden');
    const targetId = isMain2 ? "#map2" : "map1";
    const mapElement = document.querySelector(targetId);

    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: myCenter,
        zoom: 12,
        styles: darkStyle
    });

    listings.forEach((place) => {
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

}

function renderListings(data) {
    const container = document.querySelector('.flat-container');
    container.innerHTML = "";

    data.forEach(flat => {
        const cardHTML = `
        <div class="flat-detail"> 
            <img class="flat-img" src="${flat.img}">
            <p class="flat-name">${flat.title} (${flat.sqft} sq ft)</p>
            <p class="flat-price">$ ${flat.price} / month</p>
            <p class="flat-neighborhood">${flat.neighborhood}</p>
            <p class="flat-filter">${flat.mood}</p>
            <div class="btn-option">
                <button class="flat-like">🩵</button>
                <button class="flat-block">❌</button>
            </div>
        </div>
        `;
        container.innerHTML += cardHTML;
    });
}

const navBtn = document.querySelector('.profile-arrow')
const navBar = document.getElementById('nav-bar')
const headerNav = document.getElementById('header-nav');

if (navBtn) {
    navBtn.addEventListener('click', () => {
        navBar.classList.toggle('active');
        if (navBar.classList.contains('active')) {
            navBtn.textContent = "<<";
        } else {
            navBtn.textContent = ">>";
        }
    });

}

function switchTab(tabName) {

    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.add('hidden'));

    const targetPage = document.getElementById(tabName);
    if (targetPage) targetPage.classList.remove('hidden');

    if (tabName === 'login-page' || tabName === 'signup-page') {
        headerNav.classList.add('hidden');
        navBar.classList.add('hidden');
        navBar.classList.remove('active');
    } else {
        headerNav.classList.remove('hidden');
        navBar.classList.remove('hidden');
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

function signUp() {
    const id = document.querySelector('#signup-id');
    const pw = document.querySelector('#signup-pw');
    const pw2 = document.querySelector('#signup-pw-check')
    const name = document.querySelector('#signup-name');
    const bday = document.querySelector('#signup-date');

    if (!id.value || !pw.value || !pw2.value || !name.value || !bday.value) {
        alert("Please input your info!");
        return;
    }

    if (pw.value !== pw2.value) {
        alert("Please check your password again!");
        pw2.focus();
        return;
    }

    const user = {
        userId: id.value,
        userPw: pw.value,
        userName: name.value,
        bDay: bday.value
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert("Your registration is complete!!");
    id.value = "";
    pw.value = "";
    pw2.value = "";
    name.value = "";
    bday.value = "";
    switchTab('login-page')
}

const signupBtn = document.querySelector('#btn-signup');

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        console.log("signup btn clicked!");
        signUp();
    })
}

function login() {
    const inputID = document.querySelector('#login-id');
    const inputPW = document.querySelector('#login-pw');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Please sign up First!");
        return;
    }

    if (inputID.value === user.userId && inputPW.value === user.userPw) {
        alert(`Welcome! ${user.userName}`);
        switchTab('main-1');
        //test
        // renderListings(listings);
        // switchTab('main-2');

        setTimeout(() => {
            initMap();
        }, 100)

        const navName = document.querySelector('.nav-welcome');
        navName.innerHTML = `Welcome, ${user.userName}!`;

    } else if (inputID.value !== user.userId) {
        alert("Please check your ID!");
        inputID.focus();
        return;
    } else if (inputPW.value !== user.userPw) {
        alert("Please check your Passowrd!");
        inputPW.focus();
        return;
    }
}

const loginBtn = document.querySelector('#btn-login');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log("login btn clicked!");
        login();
    });
}

const logoutBtn = document.querySelector('.logout');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        alert("See you again!");
        switchTab('login-page');

        navBar.classList.remove('active');
        navBtn.textContent = ">>";
        document.querySelector('.nav-welcome').innerHTML = "";

        document.querySelector('#login-id').value = "";
        document.querySelector('#login-pw').value = "";
    });
}
switchTab('login-page');