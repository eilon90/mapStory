
const renderer = new Renderer()
const apimanager = new APIManager()

const map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWlsb245MCIsImEiOiJja2lkaG1nZ2wwMWM3MnJsYmt0NmhjaXd4In0.FIqX_7bwQX0hh3o8FJj8Vg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

// function onMapClick(e) {
//         alert("You clicked the map at " + e.latlng.lat);
//         alert("You clicked the map at " + e.latlng.lng);

//     }
//     map.on('click', onMapClick);


$(".new_story").on("click", function(){
    $("#new_story_input").toggle() 
})


$("#new_story_button").on("click", function(){
    const title = $("#story_title_input").val()
    const des = $("#story_des_input").val()
    const newStory = { 
        title: title,
        description: des
    }
    apimanager.createStory(newStory)
})

$(".show_stories").on("click", function(){
    const allStories = apimanager.getStories()
    renderer.renderStories(allStories)
})

$("#new_event_button").on("click", function(){


    const title = $("some title").val()
    const des = $("some_html_input").val()
    const longitude = $("some value").val()
    const latitude = $("some value").val()
    const newEvent = {
        title: title,
        description: des,
        longtitude:longitude,
        latitude: latitude
    }
    apimanager.createEvent(newEvent)
})

$("#add_button").on("click", function(){
    $("#new_event_input").toggle()
})



