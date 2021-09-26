const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded(){
    // console.log('image loaded');
    imagesLoaded++;
 
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
     
    }
}

// Helper function to Set attributes on DOM elements.
// Created as a result of repetetive code. DRY(do not repeat yourself)
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
   
    // Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');

        // helper function incorporated
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');

        // helper function incorporated
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        // Event Listener,check when each image is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// Unsplash API
const count = 10;
const apiKey = 'QorNB4nLOet9EkajAV0EYs_IYTK_X79DMfV12A4LQr4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos(){
try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

}catch(error){
// Catch Error here
} 
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',()=>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
ready=false;
getPhotos();

}
})

// On Load
getPhotos();