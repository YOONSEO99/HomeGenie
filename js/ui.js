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

function renderListings(data) {
    const container = document.querySelector('.flat-container');
    container.innerHTML = "";

    data.forEach(flat => {
        const cardHTML = `
        <div class="flat-detail"> 
            <img class="flat-img" src="${flat.img}" onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400'">
            <p class="flat-name">${flat.title} (${flat.sqft} sq ft)</p>
            <p class="flat-price">$ ${flat.price} / month</p>
            <p class="flat-neighborhood">${flat.neighborhood}</p>
            <p class="flat-filter">${flat.mood}</p>
            <div class="btn-option">
                <button class="flat-like" onclick="addWishList(${flat.id})">🩵</button>
                <button class="flat-block" onclick="addBlockList(${flat.id})">❌</button>
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
            <div class="rent-detail"> 
            <img class="rent-img" src="${rent.img}" onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400'">
            <p class="rent-name">${rent.title} (${rent.sqft} sq ft)</p>
            <p class="rent-price">$ ${rent.price} / month</p>
            <p class="rent-neighborhood">${rent.neighborhood}</p>
            <p class="rent-filter">${rent.mood}</p>
            <div class="btn-option">
                <button class="rent-update" onclick="openEditModal(${rent.id})">🩵</button>
                <button class="rent-remove" onclick="removeRent(${rent.id})">❌</button>
            </div>
        </div>
            `;
            mycontainer.innerHTML += cardHTML;
        });
    }

    wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishItems = listings.filter(item => wishList.includes(item.id));
    const wishcontainer = document.querySelector('.wish-container');
    wishcontainer.innerHTML = "";
    if (wishItems) {
        wishItems.forEach(wish => {
            const cardHTML = `
            <div class="wish-detail"> 
            <img class="wish-img" src="${wish.img}" onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400'">
            <p class="wish-name">${wish.title} (${wish.sqft} sq ft)</p>
            <p class="wish-price">$ ${wish.price} / month</p>
            <p class="wish-neighborhood">${wish.neighborhood}</p>
            <p class="wish-filter">${wish.mood}</p>
            <div class="btn-option">
                <button class="remove-wish" onclick="removeWish(${wish.id})">❌</button>
            </div>
        </div>
            `;
            wishcontainer.innerHTML += cardHTML;
        });
    }

    blockList = JSON.parse(localStorage.getItem('blocklist')) || [];
    const blockItems = listings.filter(item => blockList.includes(item.id));
    const blockcontainer = document.querySelector('.not-container');
    blockcontainer.innerHTML = "";
    if (blockItems) {
        blockItems.forEach(block => {
            const cardHTML = `
            <div class="not-detail"> 
            <img class="not-img" src="${block.img}" onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400'">
            <p class="not-name">${block.title} (${block.sqft} sq ft)</p>
            <p class="not-price">$ ${block.price} / month</p>
            <p class="not-neighborhood">${block.neighborhood}</p>
            <p class="not-filter">${block.mood}</p>
            <div class="btn-option">
                <button class="add-wish" onclick="moveToWish(${block.id})">🩵</button>
            </div>
        </div>
            `;
            blockcontainer.innerHTML += cardHTML;
        });
    }
}
