

const conatinerDown = document.querySelector(".container-down")
const searchButton = document.querySelector(".search-btn")
const searchInput = document.querySelector(".search input")
const watchlist  = document.querySelector(".container-up-watchlist-btn")
const watchlistBtn =document.querySelector(".watch-list-btn")
let moviePageNumber =0
let movieWatchlistArray =[]
let movieTitle = "Schindler's List"
searchInput.addEventListener("change",()=>{
    movieTitle  =searchInput.value || "Schindler's List"
})

searchButton.addEventListener("click",apiCall)
async function apiCall(){
    const respone = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=ce4e166a`)
    const data = await respone.json()
    console.log(data.Response)

if (data.Response===true){
    let title = data.Title    
let poster = data.Poster
let plot = data.Plot
let runtime = data.Runtime
let rating = data.Ratings[0].Value
let genre = data.Genre
    conatinerDown.innerHTML = `
    <div class="container-down-movie  movie-${moviePageNumber}">
        <div class="container-down-movie-right">
            <img src=${poster}>
        </div>
        <div class="container-down-movie-left">
            <div class="container-down-movie-left-up">
                <h2>${title}</h2>
                <!-- add star icon here yello -->
                <p>${rating}</p>
                
            </div>
            <div class="container-down-movie-left-middle">
                <p>
                    ${runtime}
                </p>
                <p>
                    ${genre}
                </p>
                <button class="watch-list-btn" onclick="addWatchlist()">
                    <!-- add a plus icon  -->
                    Watchlist 
                </button>
            </div>
            <div class="container-down-movie-left-down">
                <p>${plot}</p>
            </div>
        </div>
    </div>`
    moviePageNumber++
}
else{
    conatinerDown.innerHTML = `<h2>unable to fint what you're looking for.please try another search</h2>`
}

}
watchlist.addEventListener("click",function(){
    if(!movieWatchlistArray.length){
        document.querySelector(".container").innerHTML =`
        <div class="container">
            <div class="container-up">
                <h1>My  watchlist</h1>
                <h3 class="container-up-watchlist-btn"  onclick="returnHomePage()">Search for a movie !</h3>
                
            </div>
            <div class="container-down">
                <h3 class="explore">your watchlist looking litile empthy ... </h3>
                <button  onclick="returnHomePage()">lets add some movies!</button>
            </div>
        </div>   
            `
    }
    conatinerDown.innerHTML =""
    conatinerDown.innerHTML +=movieWatchlistArray.map(each=> {
        
        return each.outerHTML
    }).join("")
    
    
    for(let i=0 ;i<moviePageNumber;i++ ){
        
        document.querySelector(`.movie-${i} .watch-list-btn`).outerHTML =`<button class="watch-list-btn" onclick="removeFromList(event)">remove</button>`
    }
    
})
function addWatchlist(){
    
    movieWatchlistArray.unshift(document.querySelector(`.movie-${moviePageNumber-1}`))
    
    
}
function removeFromList(event){
    
    event.currentTarget.parentElement.parentElement.parentElement.remove()
}
function returnHomePage(){
    document.querySelector(".container").innerHTML =`
    <div class="container-up">
        <h1>Find your film</h1>
        <h3 class="container-up-watchlist-btn">My watchlist</h3>
        
    </div>
    <div class="search">
        <input type="text" name="" id="" placeholder="search for a movie title">
        <button class="search-btn">search</button>
    </div>
    <div class="container-down">
        
        <h3 class="explore">start exploring</h3>
    </div>
`
}
