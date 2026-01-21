
let listings = JSON.parse(localStorage.getItem('listings')) || [
    {
        id: 1,
        title: "Home Name",
        price: 1300,
        sqft: 500,
        neighborhood: "metrotown",
        mood: "cozy ocean",
        location: { lat: 49.2276, lng: -122.9992 },
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400",
        owner: "onyourMark"
    },
    {
        id: 2,
        title: "Sky View Condo",
        price: 1950,
        sqft: 650,
        neighborhood: "downtown",
        mood: "modern city",
        location: { lat: 49.2848, lng: -123.1215 },
        img: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=400",
        owner: "gelatto"
    },
    {
        id: 3,
        title: "Greenery House",
        price: 1100,
        sqft: 400,
        neighborhood: "joyce-collingwood",
        mood: "nature wood",
        location: { lat: 49.2384, lng: -123.0318 },
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400",
        owner: "samoyad"
    },
    {
        id: 4,
        title: "Beachside Studio",
        price: 2200,
        sqft: 550,
        neighborhood: "kitsilano",
        mood: "ocean chic",
        location: { lat: 49.2684, lng: -123.1583 },
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400",
        owner: "onyourMark"
    },
    {
        id: 5,
        title: "Mountain View Cabin",
        price: 1800,
        sqft: 700,
        neighborhood: "north vancouver",
        mood: "mountain cool",
        location: { lat: 49.3200, lng: -123.0724 },
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400",
        owner: "samoyad"
    },
    {
        id: 6,
        title: "Central Park Condo",
        price: 1650,
        sqft: 600,
        neighborhood: "burnaby central",
        mood: "park nature",
        location: { lat: 49.2285, lng: -123.0076 },
        img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400",
        owner: "gelatto"
    },
    {
        id: 7,
        title: "Minimalist City Flat",
        price: 1900,
        sqft: 480,
        neighborhood: "gastown",
        mood: "modern cute",
        location: { lat: 49.2827, lng: -123.1053 },
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400",
        owner: "samoyad"
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

    const isMain2 = !document.getElementById('main-2').classList.contains('hidden');
    const targetId = isMain2 ? "#map2" : "#map1";
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

    const user = JSON.parse(localStorage.getItem('user'));
    const myItems = listings.filter(item => item.owner === user.userId);
    const mycontainer = document.querySelector('.rent-container');
    mycontainer.innerHTML = "";
    if (myItems) {
        myItems.forEach(rent => {
            const cardHTML = `
            <div class="rent-detail" onclick="openEditModal(${rent.id})"> 
            <img class="rent-img" src="${rent.img}">
            <p class="rent-name">${rent.title} (${rent.sqft} sq ft)</p>
            <p class="rent-price">$ ${rent.price} / month</p>
            <p class="rent-neighborhood">${rent.neighborhood}</p>
            <p class="rent-filter">${rent.mood}</p>
            <div class="btn-option">
                <button class="rent-update">🩵</button>
                <button class="rent-remove">❌</button>
            </div>
        </div>
            `;
            mycontainer.innerHTML += cardHTML;
        });
    }
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

        //switchTab('main-1');
        //test
        // renderListings(listings);
        // switchTab('main-2');
        switchTab('myrentlist');
        renderListings(listings);


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

const newRentBtn = document.querySelector('#new-btn');
const newRentModal = document.querySelector('#new-rent-modal');
const saveNewRent = document.querySelector('#create-new-btn');
const cancelNewRent = document.querySelector('#cancel-new-btn');

if (newRentBtn) {
    newRentBtn.addEventListener('click', () => {
        newRentModal.classList.remove('hidden');
    });
}

if (cancelNewRent) {
    cancelNewRent.addEventListener('click', () => {
        newRentModal.classList.add('hidden');
    });
}

const tags = document.querySelectorAll('#new-rent-modal .filter-tag');

tags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
    });
});

const editTags = document.querySelectorAll('#edit-rent-modal .filter-tag');

editTags.forEach(tag=>{
    tag.addEventListener('click',()=>{
        tag.classList.toggle('selected');
    });
});

function createListing() {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert("Please login first!!");
        return;
    }

    const imgValue = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=400";

    const nameValue = document.querySelector('#new-name').value;
    const sqftValue = Number(document.querySelector('#new-sqft').value);
    const priceValue = Number(document.querySelector('#new-price').value);
    const neighValue = document.querySelector('#new-neigh').value;

    const selectedTags = document.querySelectorAll('#new-rent-modal .filter-tag.selected');
    const selectedTagsArray = Array.from(selectedTags);
    const moodValues = selectedTagsArray.map(tag => tag.textContent);

    const newItem = {
        id: listings.length + 1,
        title: nameValue,
        price: priceValue,
        sqft: sqftValue,
        neighborhood: neighValue,
        mood: moodValues.join(' '),
        location: { lat: 49.2, lng: -123.1 },
        img: imgValue,
        owner: user.userId
    }

    listings.push(newItem);
    localStorage.setItem('listings', JSON.stringify(listings));

    renderListings(listings);
    initMap();

    document.querySelector('#new-rent-modal').classList.add('hidden');
    document.querySelector('#new-name').value = "";
    document.querySelector('#new-sqft').value = "";
    document.querySelector('#new-price').value = "";
    document.querySelector('#new-neigh').value = "";

    selectedTags.forEach(tags => tags.classList.remove('selected'));
}

if (saveNewRent) {
    saveNewRent.addEventListener('click', () => {
        alert("New Rent Registrated!");
        createListing();
    });
}

const editRentModal = document.querySelector('#edit-rent-modal');
const editCancelBtn = document.querySelector('#cancel-edit-btn');
const saveEditBtn = document.querySelector('#create-edit-btn');

if (editCancelBtn) {
    editCancelBtn.addEventListener('click', () => {
        editRentModal.classList.add('hidden');
    });
}

let currentEditId = null;

function openEditModal(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const target = listings.find(item => item.id === id);

    if (target.owner !== user.userId) {
        alert("No right edit this!");
        return;
    }

    currentEditId = id;
    console.log('id : ' + id);

    document.querySelector('#edit-name').value = target.title;
    document.querySelector('#edit-sqft').value = target.sqft;
    document.querySelector('#edit-price').value = target.price;
    document.querySelector('#edit-neigh').value = target.neighborhood;

    const editTags = document.querySelectorAll('#edit-rent-modal .filter-tag');

    editTags.forEach(tag => {
        if (target.mood.includes(tag.textContent)) {
            tag.classList.add('selected');
        } else {
            tag.classList.remove('selected');
        }
    });

    editRentModal.classList.remove('hidden');

}

function saveEdit() {
    const index = listings.findIndex(item => item.id === currentEditId);
    const editSelectedTags = document.querySelectorAll('#edit-rent-modal .filter-tag.selected');
    const editSelectedTagsArray = Array.from(editSelectedTags);
    const eidtMoodValues = editSelectedTagsArray.map(tag => tag.textContent);
    
    listings[index] = {
        ...listings[index],
        title: document.querySelector('#edit-name').value,
        price: Number(document.querySelector('#edit-price').value),
        sqft: Number(document.querySelector('#edit-sqft').value),
        neighborhood: document.querySelector('#edit-neigh').value,
        mood: eidtMoodValues.join(' ')
    };

    localStorage.setItem('listings', JSON.stringify(listings));

    renderListings(listings);
    editRentModal.classList.add('hidden');
    alert("Edit completed!");
}

if (saveEditBtn) {
    saveEditBtn.addEventListener('click', saveEdit);
}

switchTab('login-page');