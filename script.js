/*
TODO
- when scrolled to bottom, loadBottom: newRandomPosts at bottom
- userPost at top
- add like button
- when 15 seconds have passed: notification to load newPosts: loadTop: newRandomPosts at top
- add comment/share
*/


/********** GLOBAL **********/
let startTime;
let numClicks = 0;
let userName;


/********** WELCOME **********/




/********** APP **********/

// userPosts, friendPosts, newsPosts

/*

userPost :
{
    text: "lorem ipsum",
    numLikes: 0
}

friendPost : 
{
    text: "lorem ipsum",
    image: "imageURL",
    numLikes: random
}

newsPost : 
{
    text: "lorem ipsum",
    image: "imageURL",
    numLikes: random
}

*/

// newRandomPosts
    // 5 new friendPosts, 5 new newsPosts
// userPost at top
// when scrolled to bottom:
    // loadBottom: newRandomPosts at bottom
// when 15 seconds have passed: notification to load newPosts
    // loadTop: newRandomPosts at top



let allPosts = [];
// let userPosts = [];
// let friendPosts = [];
// let newsPosts = [];

let feed = document.querySelector('#feed');

let categories = [
    "all",
    "business",
    "sports",
    "world",
    "politics",
    "technology",
    "startup",
    "entertainment",
    "science",
    "automobile",
    "miscellaneous"
]

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function insertCategories(){
    let categoriesDom = document.createElement("div");
    categories.forEach(function(category){
        // categoriesDom.innerHTML += `<input class="single-checkbox" type="checkbox" name="category" value="${category}"> ${category.capitalize()}<br>`;
        if(category == "all"){
            categoriesDom.innerHTML += `<input type="radio" name="category" checked="checked" value="${category}"> ${category.capitalize()}<br>`;
        } else {
            categoriesDom.innerHTML += `<input type="radio" name="category" value="${category}"> ${category.capitalize()}<br>`;
        }
            
    });
    // document.querySelector("#welcome > .container").insertBefore(categoriesDom, document.querySelector("#start"));
    let parentElement = document.querySelector("#welcome > .container");
    parentElement.insertBefore(categoriesDom, parentElement.children[3]);

}
insertCategories();

// checkboxes
// var limit = 3;
// $('input.single-checkbox').on('change', function(evt) {
//    if($(this).siblings(':checked').length >= limit) {
//        this.checked = false;
//    }
// });

// function getUserCategories(){
//     var userCategories = []
//     var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

//     for (var i = 0; i < checkboxes.length; i++) {
//         userCategories.push(checkboxes[i].value)
//     }
//     return userCategories;
// }




let cardWidths = "col-sm-6 col-md-4";



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let newsData = []; // to be filled with objects

function populateNewsData(newsCategory){
    // $.getJSON('https://inshortsapi.vercel.app/news?category=science', function(response) {
    //     newsData.push.apply(newsData,response.data); // append new array to existing array
    //     console.log(newsData);
    // });
    return $.getJSON("https://inshortsapi.vercel.app/news?category="+newsCategory).then(function(response){
        return response.data;
    });
}

function generateNewsPost(){
    let newsArticle = newsData.splice(Math.floor(Math.random()*newsData.length),1)[0]; // returns an array, so gets first element
    // console.log(newsArticle)
    // <p>News ${Math.floor(Math.random()*10+1)}</p>
    // <p>${newsArticle.title}</p>
    result = `
        <div class="${cardWidths} feed-card">
            <div class="card">
                <img class="card-img-top" src="${newsArticle.imageUrl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${newsArticle.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${newsArticle.date}</h6>
                    <p class="card-text">${newsArticle.content}</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    `;
    return result;
}

let friendsCategoryPhotos = []; // to be filled with objects

function populateFriendsCategoryPhotos(category){
    if(category == "all"){
        // merge all arrays
        for (const categoryI in allCategoryPhotos) {
            // container.innerHTML += `<h1>${category}</h1>`;
            // allCategoryPhotos[category].forEach(function(photo){
            //     container.innerHTML += `<p>${photo.description}</p>`;
            //     container.innerHTML += `<img src=${photo.url}>`;
            // });
            friendsCategoryPhotos.push(allCategoryPhotos[categoryI]);
        }
        friendsCategoryPhotos = [].concat.apply([], friendsCategoryPhotos);
        // console.log(friendsCategoryPhotos);
    } else { // individual category
        friendsCategoryPhotos = allCategoryPhotos[category+"Photos"];
    }
}

function generateFriendPost(){
    // result = `
    //     <div class="col-sm-6 feed-card">
    //         <p>Friend ${Math.floor(Math.random()*10+1)}</p>
    //     </div>
    // `;

    // result = `
    //     <div class="col-sm-6 feed-card">
    //         <div class="card">
    //             <div class="card-body">
    //                 <h5 class="card-title">Name ${Math.floor(Math.random()*10+1)}</h5>
    //                 <h6 class="card-subtitle mb-2 text-muted">Date</h6>
    //                 <p class="card-text">Lorem ipsum...</p>
    //                 <a href="#" class="card-link">Card link</a>
    //                 <a href="#" class="card-link">Another link</a>
    //             </div>
    //         </div>
    //     </div>
    // `;

    let friend = friends[Math.floor(Math.random()*100)];
    let photo = friendsCategoryPhotos.pop();
    
    // <h6 class="card-subtitle mb-2 text-muted">Date</h6>

    result = `
        <div class="${cardWidths} feed-card">
            <div class="card">
                <img class="card-img-top" src="${photo.url}" alt="Card image cap">
                <div class="card-body">
                    <img class="rounded-circle mb-2" src="${friend.picture.medium}">
                    <h5 class="card-title text-muted">${friend.name.first} ${friend.name.last}</h5>
                    <p class="card-text">${photo.description}</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    `;


    return result;
}

function generateNewRandomPosts(){
    
    let newRandomPosts = [];
    
    for(let i = 0; i < 5; i++){
        newRandomPosts.push(generateNewsPost());
        newRandomPosts.push(generateFriendPost());
    }

    shuffleArray(newRandomPosts);

    return newRandomPosts.join("");
    
}

document.querySelector('#start').addEventListener('click',function(){
    startTime = new Date;
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#app').style.display = 'block';

    userName = document.querySelector('#userName').value;
    let greeting = userName.length > 0 ? "Welcome, " + userName + "!" : "Welcome!";
    document.querySelector('#greeting').innerHTML = greeting;

    // checkboxes
    // let userCategories = getUserCategories();
    // console.log(userCategories);
    // if(userCategories.length >= 1){
    //     newsCategory1 = userCategories[0];
    // }

    // single radio
    let radios = document.getElementsByName("category");
    let selected = Array.from(radios).find(radio => radio.checked);
    let newsCategory = selected.value;

    populateFriendsCategoryPhotos(newsCategory);
    console.log(friendsCategoryPhotos);
    
    populateNewsData(newsCategory).then(function(newsDataResponse){
        // newsData.push.apply(newsData,newsData1); // append new array to existing array
        newsData = newsDataResponse;
        // console.log(newsData);
        feed.innerHTML += generateNewRandomPosts();
        addInfiniteScrolling();
    });
    // feed.innerHTML += generateNewRandomPosts();
});


function addInfiniteScrolling(){
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....

        // check to load more
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            // feed.innerHTML += generateNewRandomPosts()
            console.log("at the bottom" + Math.floor(Math.random()*10));
        }
    });
}









/********** SUMMARY **********/

document.body.addEventListener('click',function(){
    numClicks += 1;
}, true);

let summaryWrapper = document.querySelector('#summary');
let summary = document.querySelector('#summary > .container');


let timeGuess = document.createElement('p');
summary.appendChild(timeGuess);

let timeSpent = document.createElement('p');
summary.appendChild(timeSpent);

let timeDifference = document.createElement('p');
summary.appendChild(timeDifference);

let userClicks = document.createElement('p');
summary.appendChild(userClicks);

let userDown = document.createElement('p');
summary.appendChild(userDown);

let userUp = document.createElement('p');
summary.appendChild(userUp);


// https://ipdata.co/blog/how-to-get-the-ip-address-in-javascript/
function json(url) {
    return fetch(url).then(res => res.json());
}

// https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
let apiKey = '022497a5b8de46afd3108b489831a889f0194d5f134a20caf85b5a3c';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    let userIP = document.createElement('p');
    userIP.innerHTML = "Your IP address is: " + data.ip;
    summary.appendChild(userIP);

    let userLoc = document.createElement('p');
    userLoc.innerHTML = "You are located in: " + data.city + ", " + data.region_code + ", " + data.postal;
    summary.appendChild(userLoc);
});

function addS(count){
    return count == 1 ? "" : "s";
}


document.querySelector('#finish').addEventListener('click',function(){
    let elapsed = new Date() - startTime;

    var userTimeGuess = prompt("How many seconds do you think you spent on this app? (enter a number)");
    let secondsSpent = Math.floor((elapsed/1000));
    var difference = Math.abs(parseInt(userTimeGuess) - secondsSpent);

    document.querySelector('#app').style.display = 'none';
    summaryWrapper.style.display = 'block';

    // let minutesSpent = Math.floor((elapsed/1000) / 60);
    // let secondsSpent = Math.floor((elapsed/1000) % 60);
    
    timeGuess.innerHTML = "You thought you spent " + userTimeGuess + " second" + addS(userTimeGuess) + " on the app.";
    timeSpent.innerHTML = "You actually spent " + secondsSpent + " second" + addS(secondsSpent) + " on the app.";
    timeDifference.innerHTML = "You were off by " + difference + " second" + addS(difference) + ".";
    
    userClicks.innerHTML = "You clicked " + numClicks + " time" + addS(numClicks) + ".";
    userDown.innerHTML = "You scrolled down " + scrollDownCount + " time" + addS(scrollDownCount) + ".";
    userUp.innerHTML = "You scrolled back up " + scrollUpCount + " time" + addS(scrollUpCount) + ".";
    
    
});

// https://www.techighness.com/post/javascript-track-user-activity-on-webpage-with-custom-script/
let started = false;
let lastScrollTop = 0; // y-value
let scrollingDown = true;
let scrollingDownRecently = false;
let scrollDownCount = 0;
let scrollUpCount = 0;

// // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....

    // count
    if(started){
        scrollingDownRecently = scrollingDown;
    }
    started = true;
    
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426";
    if (st > lastScrollTop){
        // downscroll code
        scrollingDown = true;
    } else {
        // upscroll code
        scrollingDown = false;
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
   

   // count
   if(scrollingDown && !scrollingDownRecently){
       scrollDownCount++;
   } else if(!scrollingDown && scrollingDownRecently){
       scrollUpCount++;
   }

}, false);