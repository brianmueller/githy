/*
TODO
- add comment/share
*/


/********** GLOBAL **********/
let startTime;
let numClicks = 0;
let userName;
let newsCategory;


/********** WELCOME **********/

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
        if(category == "all"){
            categoriesDom.innerHTML += `<input type="radio" name="category" checked="checked" value="${category}"> ${category.capitalize()}<br>`;
        } else {
            categoriesDom.innerHTML += `<input type="radio" name="category" value="${category}"> ${category.capitalize()}<br>`;
        }
            
    });
    let parentElement = document.querySelector("#welcome > .container");
    parentElement.insertBefore(categoriesDom, parentElement.children[3]);

}
insertCategories();



/********** APP **********/


let allPosts = [];
let feed = document.querySelector('#feed');


// USER POST
document.querySelector('#postButton').addEventListener('click',function(){
    let postTextDom = document.querySelector('#postText');
    if(postTextDom.value != ""){
        feed.insertAdjacentHTML("afterbegin",
            `
                <div class="${cardWidths} feed-card">
                    <div class="card">
                        <h5 class="card-header">
                            <img class="rounded-circle m-2" src="avatar.png">
                            ${userName}
                        </h5>
                        <div class="card-body">
                            <p class="card-text">${postTextDom.value}</p>
                            <i class="bi bi-heart"></i> <span class="likesNum">0</span>
                        </div>
                    </div>
                </div>
            `
        );
        postTextDom.value = "";
        likes();
        window.scrollTo(0, 0);
    }
});


let cardWidths = "col-sm-6 col-md-4";



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let newsData = []; // to be filled with objects

function populateNewsData(newsCategory){
    return $.getJSON("https://inshortsapi.vercel.app/news?category="+newsCategory).then(function(response){
        return response.data;
    });
}

function generateNewsPost(){
    let newsArticle = newsData.splice(Math.floor(Math.random()*newsData.length),1)[0]; // returns an array, so gets first element
    result = `
        <div class="${cardWidths} feed-card">
            <div class="card">
                <img class="card-img-top" src="${newsArticle.imageUrl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${newsArticle.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${newsArticle.date}</h6>
                    <p class="card-text">${newsArticle.content}</p>
                    <!-- <a href="#" class="card-link">Card link</a> -->
                    <i class="bi bi-heart"></i> <span class="likesNum">${Math.floor(Math.random()*100+1)}</span>
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
            friendsCategoryPhotos.push(allCategoryPhotos[categoryI]);
        }
        friendsCategoryPhotos = [].concat.apply([], friendsCategoryPhotos);
        // console.log(friendsCategoryPhotos);
    } else { // individual category
        friendsCategoryPhotos = allCategoryPhotos[category+"Photos"];
    }
}

function generateFriendPost(){
    
    let friend = friends[Math.floor(Math.random()*100)];
    let photo = friendsCategoryPhotos.pop();
    
    result = `
        <div class="${cardWidths} feed-card">
            <div class="card">
                <h5 class="card-header">
                    <img class="rounded-circle m-2" src="${friend.picture.medium}">
                    ${friend.name.first} ${friend.name.last}
                </h5>
                <div class="card-body">
                    <img class="card-img mb-2" src="${photo.url}" alt="Card image cap">    
                    <p class="card-text">${photo.description}</p>
                    <!-- <a href="#" class="card-link">Card link</a> -->
                    <i class="bi bi-heart"></i> <span class="likesNum">${Math.floor(Math.random()*100+1)}</span>
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

// <i class="bi bi-heart"></i> <span class="likesNum">4</span>
function likes(){
    let allHearts = document.querySelectorAll('.card .bi');
    allHearts.forEach(function(heart){
        // heart.addEventListener('mouseover',function(){
        //     heart.classList.toggle('bi-heart');
        //     heart.classList.toggle('bi-heart-half');
        // });
        // heart.addEventListener('mouseout',function(){
        //     heart.classList.toggle('bi-heart');
        //     heart.classList.toggle('bi-heart-half');
        // });
        heart.addEventListener('click',function(){
            let likesNumDom = heart.nextElementSibling;
            if(heart.classList.contains('bi-heart')){ // not liked --> liked
                likesNumDom.innerHTML = parseInt(likesNumDom.innerHTML)+1;
            } else { // liked --> not liked
                likesNumDom.innerHTML = parseInt(likesNumDom.innerHTML)-1;
            }
            heart.classList.toggle('bi-heart');
            heart.classList.toggle('bi-heart-fill');
            
        });

    });
}

document.querySelector('#start').addEventListener('click',function(){
    startTime = new Date;
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#app').style.display = 'block';

    userName = document.querySelector('#userName').value;
    let greeting = userName.length > 0 ? "Welcome, " + userName + "!" : "Welcome!";
    document.querySelector('#greeting').innerHTML = greeting;

    // single radio
    let radios = document.getElementsByName("category");
    let selected = Array.from(radios).find(radio => radio.checked);
    newsCategory = selected.value;

    populateFriendsCategoryPhotos(newsCategory);
    // console.log(friendsCategoryPhotos);
    
    // LOADED!
    populateNewsData(newsCategory).then(function(newsDataResponse){
        // newsData.push.apply(newsData,newsData1); // append new array to existing array
        newsData = newsDataResponse;
        // console.log(newsData);
        feed.innerHTML += generateNewRandomPosts();
        addInfiniteScrolling();
        likes();
        queueLoadNew();
    });
    // feed.innerHTML += generateNewRandomPosts();
});


function addInfiniteScrolling(){
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            // alert("bottom!");
            feed.innerHTML += generateNewRandomPosts();
            likes();
        }
    });
}

function queueLoadNew(){
    document.querySelector('#loadNew').addEventListener('click',function(){
        this.style.display = 'none';
        feed.insertAdjacentHTML("afterbegin",generateNewRandomPosts());
        queueLoadNew(); // reset
    });
    window.setTimeout(function(){
        document.querySelector('#loadNew').style.display = 'inline';
    }, 15000);
}








/********** SUMMARY **********/

document.body.addEventListener('click',function(){
    numClicks += 1;
}, true);

function addUserData(data){
    let userDataDom = document.querySelector('#userData');
    // <li class="list-group-item">Lorem ipsum.</li>
    userDataDom.innerHTML += `<li class="list-group-item">${data}</li>`;
}

let summaryWrapper = document.querySelector('#summary');
let summary = document.querySelector('#summary > .container');

// https://ipdata.co/blog/how-to-get-the-ip-address-in-javascript/
function json(url) {
    return fetch(url).then(res => res.json());
}

// https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
let apiKey = '022497a5b8de46afd3108b489831a889f0194d5f134a20caf85b5a3c';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    addUserData("Your IP address is: <strong>" + data.ip + "</strong>");
    addUserData("You are located in: <strong>" + data.city + ", " + data.region_code + ", " + data.postal + "</strong>");
});

function addS(count){
    return count == 1 ? "" : "s";
}

document.querySelector('#finish').addEventListener('click',function(){
    // window.scrollTo(0, 1); // doesn't work on mobile
    $('html, body').animate({scrollTop : 0},0);
    let elapsed = new Date() - startTime;

    var userTimeGuess = prompt("How many seconds do you think you spent on this app? (enter a number)");
    if(userTimeGuess == ""){
        userTimeGuess = 0;
    }
    let secondsSpent = Math.floor((elapsed/1000));
    var difference = Math.abs(parseInt(userTimeGuess) - secondsSpent);

    document.querySelector('#app').style.display = 'none';
    summaryWrapper.style.display = 'block';

    // let minutesSpent = Math.floor((elapsed/1000) / 60);
    // let secondsSpent = Math.floor((elapsed/1000) % 60);

    addUserData("You clicked <strong>" + numClicks + " time" + addS(numClicks) + "</strong>.");
    addUserData("You scrolled down <strong>" + scrollDownCount + " time" + addS(scrollDownCount) + "</strong>.");
    addUserData("You scrolled back up <strong>" + scrollUpCount + " time" + addS(scrollUpCount) + "</strong>.");

    addUserData("You thought you spent " + userTimeGuess + " second" + addS(userTimeGuess) + " on the app.");
    addUserData("You actually spent <strong>" + secondsSpent + " second" + addS(secondsSpent) + "</strong> on the app.");
    addUserData("You were off by " + difference + " second" + addS(difference) + ".");
    addUserData("Your interest: <strong>" + newsCategory + "</strong>.");
    
});

// https://www.techighness.com/post/javascript-track-user-activity-on-webpage-with-custom-script/
let started = false;
let lastScrollTop = 0; // y-value
let scrollingDown = true;
let scrollingDownRecently = false;
let scrollDownCount = 0;
let scrollUpCount = 0;

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