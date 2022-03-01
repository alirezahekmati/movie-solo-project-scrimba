

let conatinerDown = document.querySelector(".container-down")
let searchButton = document.querySelector(".search-btn")
let searchInput = document.querySelector(".search input")
let watchlist  = document.querySelector(".container-up-watchlist-btn")
let watchlistBtn =document.querySelector(".watch-list-btn")
let moviePageNumber =0
let movieWatchlistArray =[]
let movieTitle = "aaaaaaaaaaaaaaaa"
function searchInputFunc(){
    movieTitle  =searchInput.value || "Schindler's List"
    console.log("boo")
    conatinerDown = document.querySelector(".container-down")
searchButton = document.querySelector(".search-btn")
searchInput = document.querySelector(".search input")
watchlist  = document.querySelector(".container-up-watchlist-btn")
watchlistBtn =document.querySelector(".watch-list-btn")
}
searchInput.addEventListener("change",searchInputFunc)

searchButton.addEventListener("click",apiCall)
async function apiCall(){
    const respone = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=ce4e166a`)
    const data = await respone.json()
    console.log(data)

if (data.Response =="True"){
    console.log("boo2")
let title = data.Title    
let poster = data.Poster
let plot = data.Plot
let runtime = data.Runtime
let rating = data.Ratings[0].Value
let genre = data.Genre
    conatinerDown.innerHTML = `
    <div class="container-down-movie movie--${moviePageNumber}">
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
                <button class="watch-list-btn" onclick="addWatchlist(event)">
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
else  
{
    conatinerDown.innerHTML = `<h2>unable to fint what you're looking for.please try another search</h2>`
}
conatinerDown = document.querySelector(".container-down")
searchButton = document.querySelector(".search-btn")
searchInput = document.querySelector(".search input")
watchlist  = document.querySelector(".container-up-watchlist-btn")
watchlistBtn =document.querySelector(".watch-list-btn")

}
function watchlistFunc(){
    conatinerDown.innerHTML =""
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
    else{
        document.querySelector(".search").remove()
        document.querySelector(".container-up").outerHTML = `
            <div class="container-up">
                <h1>My  watchlist</h1>
                <h3 class="container-up-watchlist-btn"  onclick="returnHomePage()">Search for a movie !</h3>
                
            </div>`
        conatinerDown.innerHTML +=movieWatchlistArray.map(each=> {
        
            return each.outerHTML
        }).join("")
        
       
        for(let i=0 ;i<moviePageNumber;i++ ){
            
            document.querySelector(`.movie--${i} .watch-list-btn`).outerHTML =`<button class="watch-list-btn" onclick="removeFromList(event)">remove</button>`
        }
    }
    conatinerDown = document.querySelector(".container-down")
searchButton = document.querySelector(".search-btn")
searchInput = document.querySelector(".search input")
watchlist  = document.querySelector(".container-up-watchlist-btn")
watchlistBtn =document.querySelector(".watch-list-btn")
}
watchlist.addEventListener("click",watchlistFunc)
function addWatchlist(event){
    
    movieWatchlistArray.unshift(document.querySelector(`.movie--${moviePageNumber-1}`))
    event.currentTarget.textContent ="added"
    conatinerDown = document.querySelector(".container-down")
searchButton = document.querySelector(".search-btn")
searchInput = document.querySelector(".search input")
watchlist  = document.querySelector(".container-up-watchlist-btn")
watchlistBtn =document.querySelector(".watch-list-btn")
    
}
function removeFromList(event){
    let arry
    arry=event.currentTarget.parentElement.parentElement.parentElement.classList[1]
    
    movieWatchlistArray.map(each => {
        if(each.classList[1]==arry){
            
            
            console.log(movieWatchlistArray)
            movieWatchlistArray.splice(movieWatchlistArray.indexOf(each),movieWatchlistArray.indexOf(each)+1)
            console.log(movieWatchlistArray)
            moviePageNumber--
        }
    })

    
    event.currentTarget.parentElement.parentElement.parentElement.remove()
    conatinerDown = document.querySelector(".container-down")
searchButton = document.querySelector(".search-btn")
searchInput = document.querySelector(".search input")
watchlist  = document.querySelector(".container-up-watchlist-btn")
watchlistBtn =document.querySelector(".watch-list-btn")
    
}
function returnHomePage(){
    document.querySelector(".container").innerHTML =`
    <div class="container-up">
        <h1>Find your film</h1>
        <h3 class="container-up-watchlist-btn"  onclick="watchlistFunc()">My watchlist</h3>
        
    </div>
    <div class="search">
        <input type="text" name="" id="" placeholder="search for a movie title"  onchange="searchInputFunc()">
        <button class="search-btn"  onclick="apiCall()">search</button>
    </div>
    <div class="container-down">
        
        <h3 class="explore">start exploring</h3>
    </div>
`
conatinerDown = document.querySelector(".container-down")
searchButton = document.querySelector(".search-btn")
searchInput = document.querySelector(".search input")
watchlist  = document.querySelector(".container-up-watchlist-btn")
watchlistBtn =document.querySelector(".watch-list-btn")
}
