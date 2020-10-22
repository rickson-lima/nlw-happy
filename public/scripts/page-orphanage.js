// pre-seting options of map
const options = {
    dragging: false,
    touch: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// get lat and lng values from html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng

// create map
const map = L.map('mapid', options).setView([lat,lng], 15);

// create and add titleLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
    popupAnchor: [170, 2]
})

// create and add marker
L.marker([lat, lng], {icon})
.addTo(map);


// image gallery
function selectImage(event){
    // get the clicked button
    const button = event.currentTarget;

    // get all buttons from image gallery
    const buttons = document.querySelectorAll(".images button");

    // remove all class .active from buttons
    buttons.forEach((button) => {
        button.classList.remove("active");
    })

    // get the clicked button's image
    const image = button.children[0]

    // get the main image container
    const imageContainer = document.querySelector('.orphanage-details > img');

    // inject the main image container with the clicked button's image
    imageContainer.src = image.src;

    // add the .active class to clicked button
    button.classList.add('active');
}