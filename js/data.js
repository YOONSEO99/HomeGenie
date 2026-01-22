const neighborhoodCoords = {
    // 1. Downtown & West End
    "downtown": { lat: 49.2848, lng: -123.1215 },
    "west end": { lat: 49.2858, lng: -123.1341 },
    "gastown": { lat: 49.2827, lng: -123.1053 },
    "yaletown": { lat: 49.2766, lng: -123.1212 },
    "coal harbour": { lat: 49.2892, lng: -123.1211 },

    // 2. Vancouver West & East
    "kitsilano": { lat: 49.2684, lng: -123.1583 },
    "ubc": { lat: 49.2606, lng: -123.2460 },
    "kerrisdale": { lat: 49.2346, lng: -123.1553 },
    "mount pleasant": { lat: 49.2631, lng: -123.1022 },
    "joyce-collingwood": { lat: 49.2384, lng: -123.0318 },

    // 3. Burnaby & New West
    "metrotown": { lat: 49.2276, lng: -122.9992 },
    "brentwood": { lat: 49.2662, lng: -123.0035 },
    "edmonds": { lat: 49.2198, lng: -122.9592 },
    "new westminster": { lat: 49.2057, lng: -122.9110 },
    "lougheed": { lat: 49.2483, lng: -122.8969 },

    // 4. North & West Vancouver
    "north vancouver": { lat: 49.3200, lng: -123.0724 },
    "west vancouver": { lat: 49.3326, lng: -123.1593 },
    "lonsdale": { lat: 49.3168, lng: -123.0722 },

    // 5. Richmond & Others
    "richmond": { lat: 49.1666, lng: -123.1336 },
    "steverston": { lat: 49.1248, lng: -123.1818 },
    "coquitlam": { lat: 49.2838, lng: -122.7932 },
    "surrey": { lat: 49.1913, lng: -122.8490 }
};

let listings = JSON.parse(localStorage.getItem('listings')) || [
    { id: 1, title: "Metrotown Cozy Hub", price: 1300, sqft: 500, neighborhood: "metrotown", mood: "cozy ocean", location: { lat: 49.2276, lng: -122.9992 }, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 2, title: "Sky View Condo", price: 1950, sqft: 650, neighborhood: "downtown", mood: "modern city", location: { lat: 49.2848, lng: -123.1215 }, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 3, title: "Greenery House", price: 1100, sqft: 400, neighborhood: "joyce-collingwood", mood: "nature wood", location: { lat: 49.2384, lng: -123.0318 }, img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 4, title: "Beachside Studio", price: 2200, sqft: 550, neighborhood: "kitsilano", mood: "ocean chic", location: { lat: 49.2684, lng: -123.1583 }, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 5, title: "Mountain View Cabin", price: 1800, sqft: 700, neighborhood: "north vancouver", mood: "mountain cool", location: { lat: 49.3200, lng: -123.0724 }, img: "https://images.unsplash.com/photo-1449156001437-3a1621dfbe2b?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 6, title: "Central Park Condo", price: 1650, sqft: 600, neighborhood: "burnaby central", mood: "park nature", location: { lat: 49.2285, lng: -123.0076 }, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 7, title: "Minimalist City Flat", price: 1900, sqft: 480, neighborhood: "gastown", mood: "modern cute", location: { lat: 49.2827, lng: -123.1053 }, img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 8, title: "Yaletown Loft", price: 2500, sqft: 800, neighborhood: "yaletown", mood: "chic modern", location: { lat: 49.2766, lng: -123.1212 }, img: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 9, title: "Gastown Historic Brick", price: 1750, sqft: 520, neighborhood: "gastown", mood: "vintage cool", location: { lat: 49.2827, lng: -123.1053 }, img: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 10, title: "UBC Student Nest", price: 1200, sqft: 350, neighborhood: "ubc", mood: "cozy nature", location: { lat: 49.2606, lng: -123.2460 }, img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 11, title: "Richmond Garden Suite", price: 1450, sqft: 550, neighborhood: "richmond", mood: "nature cute", location: { lat: 49.1666, lng: -123.1336 }, img: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 12, title: "Coal Harbour Luxury", price: 2800, sqft: 900, neighborhood: "coal harbour", mood: "ocean chic", location: { lat: 49.2892, lng: -123.1211 }, img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 13, title: "Brentwood New Condo", price: 2100, sqft: 680, neighborhood: "brentwood", mood: "modern park", location: { lat: 49.2662, lng: -123.0035 }, img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 14, title: "West End Sunset Room", price: 1600, sqft: 450, neighborhood: "west end", mood: "ocean cozy", location: { lat: 49.2858, lng: -123.1341 }, img: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 15, title: "Surrey Central Flat", price: 1350, sqft: 600, neighborhood: "surrey", mood: "city cool", location: { lat: 49.1913, lng: -122.8490 }, img: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 16, title: "Kerrisdale Classic", price: 2300, sqft: 750, neighborhood: "kerrisdale", mood: "nature chic", location: { lat: 49.2346, lng: -123.1553 }, img: "https://images.unsplash.com/photo-1493236272120-200db0da1927?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 17, title: "Lougheed Bright Unit", price: 1550, sqft: 580, neighborhood: "lougheed", mood: "cute modern", location: { lat: 49.2483, lng: -122.8969 }, img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 18, title: "Mount Pleasant Artist Loft", price: 1850, sqft: 620, neighborhood: "mount pleasant", mood: "cool park", location: { lat: 49.2631, lng: -123.1022 }, img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 19, title: "North Van Nature Hideout", price: 1950, sqft: 670, neighborhood: "north vancouver", mood: "mountain cozy", location: { lat: 49.3200, lng: -123.0724 }, img: "https://images.unsplash.com/photo-1464894474525-d9a4cd153c05?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 20, title: "New West River View", price: 1700, sqft: 540, neighborhood: "new westminster", mood: "ocean modern", location: { lat: 49.2057, lng: -122.9110 }, img: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 21, title: "Steveston Village Den", price: 1250, sqft: 480, neighborhood: "steverston", mood: "cozy ocean", location: { lat: 49.1248, lng: -123.1818 }, img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 22, title: "Lonsdale Quay Loft", price: 1850, sqft: 600, neighborhood: "lonsdale", mood: "ocean city", location: { lat: 49.3168, lng: -123.0722 }, img: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 23, title: "Coquitlam Parkside", price: 1400, sqft: 580, neighborhood: "coquitlam", mood: "park nature", location: { lat: 49.2838, lng: -122.7932 }, img: "https://images.unsplash.com/photo-1512918766775-d24dbb6b0267?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 24, title: "Downtown Neon Flat", price: 2100, sqft: 500, neighborhood: "downtown", mood: "modern city", location: { lat: 49.2848, lng: -123.1215 }, img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 25, title: "Kitsilano Blue House", price: 2350, sqft: 620, neighborhood: "kitsilano", mood: "ocean chic", location: { lat: 49.2684, lng: -123.1583 }, img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 26, title: "UBC Forest Retreat", price: 1150, sqft: 380, neighborhood: "ubc", mood: "nature wood", location: { lat: 49.2606, lng: -123.2460 }, img: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 27, title: "Edmonds Quiet Unit", price: 1300, sqft: 510, neighborhood: "edmonds", mood: "cozy cute", location: { lat: 49.2198, lng: -122.9592 }, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 28, title: "West Van Luxury Villa", price: 3200, sqft: 1200, neighborhood: "west vancouver", mood: "mountain chic", location: { lat: 49.3326, lng: -123.1593 }, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 29, title: "Richmond Sky-High", price: 1900, sqft: 650, neighborhood: "richmond", mood: "modern city", location: { lat: 49.1666, lng: -123.1336 }, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 30, title: "Joyce Collingwood Gem", price: 1200, sqft: 420, neighborhood: "joyce-collingwood", mood: "cute cozy", location: { lat: 49.2384, lng: -123.0318 }, img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 31, title: "Gastown Artist Nest", price: 1800, sqft: 550, neighborhood: "gastown", mood: "modern cool", location: { lat: 49.2827, lng: -123.1053 }, img: "https://images.unsplash.com/photo-1536376074432-bf12177448b2?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 32, title: "Metrotown Urban Stay", price: 1550, sqft: 580, neighborhood: "metrotown", mood: "city modern", location: { lat: 49.2276, lng: -122.9992 }, img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 33, title: "Kerrisdale Garden Home", price: 2100, sqft: 800, neighborhood: "kerrisdale", mood: "nature chic", location: { lat: 49.2346, lng: -123.1553 }, img: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 34, title: "West End Vintage", price: 1650, sqft: 530, neighborhood: "west end", mood: "ocean vintage", location: { lat: 49.2858, lng: -123.1341 }, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 35, title: "Lougheed Heights", price: 1450, sqft: 560, neighborhood: "lougheed", mood: "cute modern", location: { lat: 49.2483, lng: -122.8969 }, img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 36, title: "Surrey Woodside", price: 1200, sqft: 500, neighborhood: "surrey", mood: "nature wood", location: { lat: 49.1913, lng: -122.8490 }, img: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 37, title: "Mount Pleasant Red Brick", price: 2000, sqft: 600, neighborhood: "mount pleasant", mood: "modern city", location: { lat: 49.2631, lng: -123.1022 }, img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 38, title: "New West Quay Condo", price: 1750, sqft: 620, neighborhood: "new westminster", mood: "ocean modern", location: { lat: 49.2057, lng: -122.9110 }, img: "https://images.unsplash.com/photo-1512918766775-d24dbb6b0267?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 39, title: "Brentwood Skyline", price: 2200, sqft: 700, neighborhood: "brentwood", mood: "city cool", location: { lat: 49.2662, lng: -123.0035 }, img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 40, title: "North Van Trail Side", price: 1600, sqft: 550, neighborhood: "north vancouver", mood: "mountain cozy", location: { lat: 49.3200, lng: -123.0724 }, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 41, title: "Coal Harbour Vista", price: 2900, sqft: 950, neighborhood: "coal harbour", mood: "ocean luxury", location: { lat: 49.2892, lng: -123.1211 }, img: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 42, title: "Yaletown Glow", price: 2400, sqft: 780, neighborhood: "yaletown", mood: "chic city", location: { lat: 49.2766, lng: -123.1212 }, img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 43, title: "Steveston Harbor Studio", price: 1400, sqft: 450, neighborhood: "steverston", mood: "ocean cozy", location: { lat: 49.1248, lng: -123.1818 }, img: "https://images.unsplash.com/photo-1536376074432-bf12177448b2?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 44, title: "Burnaby Central Loft", price: 1650, sqft: 600, neighborhood: "burnaby central", mood: "park modern", location: { lat: 49.2285, lng: -123.0076 }, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 45, title: "Downtown Brick Studio", price: 1850, sqft: 500, neighborhood: "downtown", mood: "modern vintage", location: { lat: 49.2848, lng: -123.1215 }, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 46, title: "Kitsilano Sandy Loft", price: 2200, sqft: 580, neighborhood: "kitsilano", mood: "ocean chic", location: { lat: 49.2684, lng: -123.1583 }, img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 47, title: "UBC Green Den", price: 1100, sqft: 360, neighborhood: "ubc", mood: "nature wood", location: { lat: 49.2606, lng: -123.2460 }, img: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=400&q=80", owner: "samoyad" },
    { id: 48, title: "Richmond Sun Suite", price: 1550, sqft: 520, neighborhood: "richmond", mood: "cute modern", location: { lat: 49.1666, lng: -123.1336 }, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", owner: "onyourMark" },
    { id: 49, title: "Lonsdale City View", price: 1950, sqft: 630, neighborhood: "lonsdale", mood: "ocean city", location: { lat: 49.3168, lng: -123.0722 }, img: "https://images.unsplash.com/photo-1512918766775-d24dbb6b0267?auto=format&fit=crop&w=400&q=80", owner: "gelatto" },
    { id: 50, title: "Mount Pleasant Charm", price: 1800, sqft: 580, neighborhood: "mount pleasant", mood: "cool park", location: { lat: 49.2631, lng: -123.1022 }, img: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=400&q=80", owner: "samoyad" }
];

const neighborhoodList = Object.keys(neighborhoodCoords);
const moods = ["cozy", "modern", "nature", "ocean", "mountain", "cool", "cute", "chic", "park"];
const owners = ["onyourMark", "gelatto", "samoyad", "angela_vancouver"];

if (listings.length < 200) {
    for (let i = listings.length + 1; i <= 200; i++) {
        const randomNeigh = neighborhoodList[Math.floor(Math.random() * neighborhoodList.length)];
        const randomMood1 = moods[Math.floor(Math.random() * moods.length)];
        const randomMood2 = moods[Math.floor(Math.random() * moods.length)];
        const price = Math.floor(Math.random() * (3500 - 900) + 900);
        
        listings.push({
            id: i,
            title: `${randomNeigh.charAt(0).toUpperCase() + randomNeigh.slice(1)}`,
            price: price,
            sqft: Math.floor(Math.random() * (1200 - 300) + 300),
            neighborhood: randomNeigh,
            mood: `${randomMood1} ${randomMood2}`,
            location: neighborhoodCoords[randomNeigh],
           
            img: `https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=400&q=80&sig=${i}`,
            owner: owners[Math.floor(Math.random() * owners.length)]
        });
    }
}

let wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
let blockList = JSON.parse(localStorage.getItem('blocklist')) || [];