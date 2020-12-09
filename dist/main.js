
const renderer = new Renderer()
const apimanager = new APIManager()
apimanager.getStories()
const map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWlsb245MCIsImEiOiJja2lkaG1nZ2wwMWM3MnJsYmt0NmhjaXd4In0.FIqX_7bwQX0hh3o8FJj8Vg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

function onMapClick(e) {
    apimanager.connectStory("whatever")
    const isDisabled = $("#add_button").attr('disabled')
    if(isDisabled==="disabled" && apimanager.story){
        // const marker = L.marker(e.latlng).addTo(map).on('click', onEventClick);
        // marker.bindPopup("").openPopup();
        const latlng = {lng: e.latlng.lng, lat: e.latlng.lat}
        renderer.renderEventForm(latlng)
        $("#new_event_input").show()
    }

}
map.on('click', onMapClick);

function onEventClick(e){
    renderer.renderEvent(apimanager.searchEvent(this.getLatLng()))
    $("#new_event_input").show()
    
}

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

$("#new_event_input").on("click",".new_event_button", async function(){//hide and remove disable the add button
    const title = $("#event_title_input").val()
    const description = $("#event_des_input").val()
    const longtitude = $(this).data("lng")
    const latitude = $(this).data("lat")
    const newEvent = {
        title,
        description,
        longtitude,
        latitude,
        photos: []
    }
    await apimanager.createEvent(newEvent)
    const marker = L.marker([latitude, longtitude]).addTo(map).on('click', onEventClick);
    $("#new_event_input").empty()
    $("#new_event_input").hide()
    $("#add_button").prop("disabled", false)
})

$("#add_button").on("click", function(){
    $("#add_button").attr("disabled", true);
})

$("body").dblclick( function(){
    $("#new_event_input").hide() 
})



