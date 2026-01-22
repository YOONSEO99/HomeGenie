function showRandomFive(data) {
    if (data.length === 0) {
        alert("No results!");
        return;
    }

    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const finalFive = shuffled.slice(0, 5);
    renderListings(finalFive);
    initMap(finalFive);
}

function search() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert("Pleaes login first!");
        return;
    }

    const isMain2 = !document.getElementById('main-2').classList.contains('hidden');
    const inputId = isMain2 ? '#detail-search-input' : '#main-search-input';
    const parentId = isMain2 ? '#main-2' : '#main-1';

    const searchInputValue = document.querySelector(inputId).value.trim().toLowerCase();

    const selectedPriceBtn = document.querySelector(`${parentId} .price-tag.selected`);
    const maxPrice = selectedPriceBtn ? Number(selectedPriceBtn.dataset.max) : null;

    const selectedMoodBtn = document.querySelectorAll(`${parentId} .filter-tag.selected`);
    const selectedMoodFilters = Array.from(selectedMoodBtn).map(btn => btn.textContent);

    const filteredResults = listings.filter(item => {

        const isNotMine = item.owner !== user.userId;
        const isNotWish = !wishList.includes(item.id);
        const isNotBlock = !blockList.includes(item.id);

        const matchNeighbor = searchInputValue !== "" && item.neighborhood.toLowerCase().includes(searchInputValue);
        const matchPrice = maxPrice !== null && item.price <= maxPrice;
        const matchMood = selectedMoodFilters.length > 0 && selectedMoodFilters.some(mood => item.mood.includes(mood));

        return isNotMine && isNotWish && isNotBlock && (matchNeighbor || matchPrice || matchMood);
    });

    if (filteredResults.length === 0) {
        alert("No new results for you!");
        return;
    }

    console.log("filtered : ", filteredResults);
    switchTab('main-2')
    showRandomFive(filteredResults);
}



//wishlist > remove button
function removeWish(id) {
    if (confirm("Are you sure to remove it?")) {
        wishList = wishList.filter(item => item != id);
        localStorage.setItem('wishlist', JSON.stringify(wishList));

        renderListings(wishList);
        alert("Wish remove completed!");
    }

}

//notmylist > add button
function moveToWish(id) {
    if (confirm("Are you sure to add it?")) {
        blockList = blockList.filter(item => item != id);
        if (!wishList.includes(id)) wishList.push(id);

        localStorage.setItem('blocklist', JSON.stringify(blockList));
        localStorage.setItem('wishlist', JSON.stringify(wishList));

        renderListings(blockList);
        alert("Wish add completed!");
    }
}


function addWishList(id) {
    if (!wishList.includes(id)) {
        wishList.push(id);
        localStorage.setItem('wishlist', JSON.stringify(wishList));
        alert("Added to Wishlist!");
        search();
    }
}

function addBlockList(id) {
    if (!blockList.includes(id)) {
        blockList.push(id);
        localStorage.setItem('blocklist', JSON.stringify(blockList));
        alert("Added to Not My List!");
        search();
    }
}

const navBtn = document.querySelector('.profile-arrow')
const navBar = document.getElementById('nav-bar')
const headerNav = document.getElementById('header-nav');

const links = document.querySelectorAll('.link');

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
const logoutBtn = document.querySelector('.logout');

const newRentBtn = document.querySelector('#new-btn');
const newRentModal = document.querySelector('#new-rent-modal');
const saveNewRent = document.querySelector('#create-new-btn');
const cancelNewRent = document.querySelector('#cancel-new-btn');

const tags = document.querySelectorAll('#new-rent-modal .filter-tag');
const editTags = document.querySelectorAll('#edit-rent-modal .filter-tag');

function createListing() {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert("Please login first!!");
        return;
    }

    const nameValue = document.querySelector('#new-name').value;
    const sqftValue = Number(document.querySelector('#new-sqft').value);
    const priceValue = Number(document.querySelector('#new-price').value);
    const neighValue = document.querySelector('#new-neigh').value;

    const selectedTags = document.querySelectorAll('#new-rent-modal .filter-tag.selected');
    const selectedTagsArray = Array.from(selectedTags);
    const moodValues = selectedTagsArray.map(tag => tag.textContent);

    const inputNeigh = neighValue.toLowerCase().trim();
    const locaValue = neighborhoodCoords[inputNeigh] || { lat: 49.2, lng: -123.1 };

    const newImgInput = document.querySelector('#new-img-input');
    const file = newImgInput.files[0];

    if (!file) {
        alert("Input img first!");
        return;
    }

    if (!nameValue || !sqftValue || !priceValue || !neighValue || moodValues.length === 0) {
        alert("Input rent detail first!");
        return;
    }

    const imgValue = URL.createObjectURL(file);

    const newItem = {
        id: listings.length + 1,
        title: nameValue,
        price: priceValue,
        sqft: sqftValue,
        neighborhood: neighValue,
        mood: moodValues.join(' '),
        location: locaValue,
        img: imgValue,
        owner: user.userId
    }

    listings.push(newItem);
    localStorage.setItem('listings', JSON.stringify(listings));

    renderListings(listings);
    initMap();
    alert("New Rent Registrated!");

    document.querySelector('#new-rent-modal').classList.add('hidden');
    document.querySelector('#new-name').value = "";
    document.querySelector('#new-sqft').value = "";
    document.querySelector('#new-price').value = "";
    document.querySelector('#new-neigh').value = "";

    selectedTags.forEach(tags => tags.classList.remove('selected'));
}

function removeRent(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const target = listings.find(item => item.id === id);

    if (target.owner !== user.userId) {
        alert("No right remove this!");
        return;
    }

    if (confirm("Are you sure to remove it? ")) {
        listings = listings.filter(item => item.id !== id);

        localStorage.setItem('listings', JSON.stringify(listings));

        renderListings(listings);
        initMap(listings);

        alert("Rent remove completed!");
    }

}

const editRentModal = document.querySelector('#edit-rent-modal');
const editCancelBtn = document.querySelector('#cancel-edit-btn');
const saveEditBtn = document.querySelector('#create-edit-btn');

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

    const editFileInput = document.querySelector('#edit-img-input');
    console.log("selected files:", editFileInput.files);
    const file = editFileInput.files[0];

    let finalImg = listings[index].img;

    if (file) {
        finalImg = URL.createObjectURL(file);
    }

    listings[index] = {
        ...listings[index],
        title: document.querySelector('#edit-name').value,
        price: Number(document.querySelector('#edit-price').value),
        sqft: Number(document.querySelector('#edit-sqft').value),
        neighborhood: document.querySelector('#edit-neigh').value,
        img: finalImg,
        mood: eidtMoodValues.join(' ')
    };

    localStorage.setItem('listings', JSON.stringify(listings));

    renderListings(listings);
    editRentModal.classList.add('hidden');
    alert("Edit completed!");
}



const editProfileModal = document.querySelector('#edit-profile-modal');

function openProfileModal() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const userIdInput = document.querySelector('#old-id');

    document.querySelector('#old-id').value = user.userId;
    userIdInput.readOnly = true;
    userIdInput.style.backgroundColor = "#e9e9e9";

    document.querySelector('#new-profile-name').value = user.userName;
    document.querySelector('#new-profile-date').value = user.bDay;

    editProfileModal.classList.remove('hidden');
}

function saveProfile() {
    const userId = document.querySelector('#old-id');
    const newPW = document.querySelector('#new-profile-pw')
    const newPW2 = document.querySelector('#new-profile-pw-check');
    const newName = document.querySelector('#new-profile-name');
    const newBirth = document.querySelector('#new-profile-date');

    if (!newPW.value || !newPW2.value || !newName.value || !newBirth.value) {
        alert("Input your info!!");
        return;
    }

    if (newPW.value !== newPW2.value) {
        alert("Please check your new password again!");
        newPW2.focus();
        return;
    }

    const updatedUser = {
        userId: userId.value,
        userPw: newPW.value,
        userName: newName.value,
        bDay: newBirth.value
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    document.querySelector('.nav-welcome').innerHTML = `Welcome, ${updatedUser.userName}!`;

    alert("Your profile updated!");
    userId.value = "";
    newPW.value = "";
    newPW2.value = "";
    newName.value = "";
    newBirth.value = "";

    editProfileModal.classList.add('hidden');
}

const saveProfileBtn = document.querySelector('#update-profile-btn');
const cancelProfileBtn = document.querySelector('#cancel-profile-btn');

if (saveNewRent) {
    saveNewRent.addEventListener('click', () => {
        createListing();
    });
}

if (cancelProfileBtn) {
    cancelProfileBtn.addEventListener('click', () => {
        editProfileModal.classList.add('hidden');
    });
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', saveProfile);
}

if (saveEditBtn) {
    saveEditBtn.addEventListener('click', saveEdit);
}

if (editCancelBtn) {
    editCancelBtn.addEventListener('click', () => {
        editRentModal.classList.add('hidden');
    });
}

document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault(); 
        tag.classList.toggle('selected'); 
        console.log("선택된 무드:", tag.textContent);
    });
});

const searchBtn = document.querySelector('#main-1-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', search);
}

const searchBtn2 = document.querySelector('#main-2-btn');
if (searchBtn2) {
    searchBtn2.addEventListener('click', search);
}

const refreshBtn = document.querySelector('#refresh-btn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        search();
    });
}

if (newRentBtn) {
    newRentBtn.addEventListener('click', () => {
        newRentModal.classList.remove('hidden');
    });
}

if (cancelNewRent) {
    cancelNewRent.addEventListener('click', () => {
        newRentModal.classList.add('hidden');
        document.querySelectorAll('#new-rent-modal .filter-tag').forEach(t=>t.classList.remove('selected'));
    });
}


if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        console.log("signup btn clicked!");
        signUp();
    })
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log("login btn clicked!");
        login();
    });
}

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

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const menuText = e.target.textContent.trim().toLowerCase();

        if (menuText.includes("rent")) {
            resetSearch();
            switchTab('myrentlist');
            renderListings(listings);
        } else if (menuText.includes("wish")) {
            switchTab('mywishlist');
            renderListings(listings);
        } else if (menuText.includes("not my")) {
            switchTab('notmylist');
            renderListings(listings);
        } else if(menuText.includes("home")){
            switchTab('main-1');
            renderListings(listings);
        }

        navBar.classList.remove('active');
        if (navBtn) navBtn.textContent=">>";
    });
});

function resetSearch(){
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.value="");

    const selectedTags = document.querySelectorAll('.filter-tag.selected');
    selectedTags.forEach(tag => tag.classList.remove('selected'));

    console.log("search values reset!");
}

switchTab('login-page');