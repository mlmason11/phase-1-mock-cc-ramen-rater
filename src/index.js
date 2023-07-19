// write your code here


// --- Global constants --- //
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');
const newRamenForm = document.getElementById('new-ramen-form');


// --- Event listeners --- //
newRamenForm.addEventListener('submit', event => {
    event.preventDefault();
    fetch(`http://localhost:3000/ramens`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.name.value,
            restaurant: event.target.restaurant.value,
            image: event.target.image.value,
            rating: event.target.rating.value,
            comment: event.target.comment.value
        })
    }).then(r => r.json())
    .then(newRamen => addOneRamen(newRamen))
    .catch(error => alert(error))
});

// --- Render one ramen image onto the menu --- //
function addOneRamen(ramenObj) {
    const ramenImg = document.createElement('img');
    ramenImg.src = ramenObj.image;
    ramenImg.addEventListener('click', event => {
        event.preventDefault();
        ramenDetail.innerHTML ='';
        ratingDisplay.innerHTML='';
        commentDisplay.innerHTML='';

        const image = document.createElement('img');
        image.setAttribute('class', 'detail-image');
        image.src = ramenObj.image;

        const name = document.createElement('h2');
        name.setAttribute('class', 'ramen-name');
        name.textContent = ramenObj.name;

        const restaurant = document.createElement('h3');
        restaurant.setAttribute('class', 'restaurant');
        restaurant.textContent = ramenObj.restaurant;
        
        ramenDetail.append(image, name, restaurant);

        const rating = document.createElement('h3');
        rating.textContent = ramenObj.rating;
        ratingDisplay.append(rating);

        const comment = document.createElement('h3');
        comment.textContent = ramenObj.comment;
        commentDisplay.append(comment);
    });
    ramenMenu.append(ramenImg);
}

// --- Fetch all ramens and display them in the ramen menu div --- //
fetch(`http://localhost:3000/ramens`)
.then(r => r.json())
.then(ramenArray => {
    ramenArray.forEach(ramenObj => addOneRamen(ramenObj))
})
.catch(error => alert(error))