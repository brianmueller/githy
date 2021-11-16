let categories = [
    //"all"
    "business",
    "sports",
    "world",
    "politics",
    "technology",
    "startup",
    "entertainment",
    "science",
    "automobile",
    "miscellaneous",
]

let result = ""
categories.forEach(function(category){
    // result += `<script src="categories/${category}.js"></script>\n`
    // result += `${category}Photos,\n`
});
console.log(result);

let allCategoryPhotos = [
    businessPhotos,
    sportsPhotos,
    worldPhotos,
    politicsPhotos,
    technologyPhotos,
    startupPhotos,
    entertainmentPhotos,
    sciencePhotos,
    automobilePhotos,
    miscellaneousPhotos
]

// https://api.unsplash.com/search/photos?query=business&orientation=landscape&per_page=100&client_id=X

// businessPhotos.results.forEach(function(photo){
//     // console.log(photo.urls.thumb);
//     document.write(`<p>${photo.description}</p>`);
//     document.write(`<img src=${photo.urls.small}>`);
// });

let friendPhotos = {
    businessPhotos: [],
    sportsPhotos: [],
    worldPhotos: [],
    politicsPhotos: [],
    technologyPhotos: [],
    startupPhotos: [],
    entertainmentPhotos: [],
    sciencePhotos: [],
    automobilePhotos: [],
    miscellaneousPhotos: []
}


const varToString = varObj => Object.keys(varObj)[0]

allCategoryPhotos.forEach(function(categoryPhotos){
    let categoryDisplay = varToString({ categoryPhotos });
    document.write(`<h1>${categoryDisplay}</h1>`);
    categoryPhotos.results.forEach(function(photo){
        document.write(`<p>${photo.description}</p>`);
        document.write(`<img src=${photo.urls.small}>`);
    });
    document.write(`<hr style="height:30px;background-color:#000">`);
});

// console.log(allCategoryPhotos[0]);







// allCategoryPhotos[0].results.forEach(function(photo){
//     friendPhotos.businessPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[1].results.forEach(function(photo){
//     friendPhotos.sportsPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[2].results.forEach(function(photo){
//     friendPhotos.worldPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[3].results.forEach(function(photo){
//     friendPhotos.politicsPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[4].results.forEach(function(photo){
//     friendPhotos.technologyPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[5].results.forEach(function(photo){
//     friendPhotos.startupPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[6].results.forEach(function(photo){
//     friendPhotos.entertainmentPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[7].results.forEach(function(photo){
//     friendPhotos.sciencePhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[8].results.forEach(function(photo){
//     friendPhotos.automobilePhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });

// allCategoryPhotos[9].results.forEach(function(photo){
//     friendPhotos.miscellaneousPhotos.push({
//         "description": photo.description,
//         "url": photo.urls.small
//     });
// });



// console.log(JSON.stringify(friendPhotos));

