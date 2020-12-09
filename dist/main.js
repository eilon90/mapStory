
const renderer = new Renderer()
const apimanager = new APIManager()

const map = L.map('mapid', {minZoom: 2}).setView([39.63, 3.33], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWlsb245MCIsImEiOiJja2lkaG1nZ2wwMWM3MnJsYmt0NmhjaXd4In0.FIqX_7bwQX0hh3o8FJj8Vg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);
let searchMarker;


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

$(".delete_story").on("click", function(){
    const storyTitle = $(this).closest(".story").text()
    apimanager.deleteStory(storyTitle)
})


async function getCountriesList() {
    await apimanager.getCountries();
    const countries = apimanager.countries;
    renderer.addCountries(countries);
}
getCountriesList();

$('#search-button').on('click', async function() {
    const country = $('#countries-selector').val();
    const address = $('#search-input').val();
    if (country === '--Select Country--') {
        renderer.noCountry();
        return;
    }
    if (address === '') {
        renderer.noAdress();
        return
    } 
    await apimanager.getResults(country, address);
    const results = apimanager.searchResults;
    if (results.error === true) {
        renderer.noResults();
        return;
    }
    if (searchMarker) {map.removeLayer(searchMarker)};
    map.setView([results[0].latitude, results[0].longtitude], 17, map.getZoom(), {
        "animate": true,
        "pan": {
          "duration": 10
        }});
    searchMarker = L.marker([results[0].latitude, results[0].longtitude]).addTo(map);
    $('#search-input').val('');
})

map.on('click', async function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    await apimanager.getAddress(lat, lng);
    const address = apimanager.location.address;
    renderer.printAddress(address);
})

$('#countries-selector').on('change', async function() {
    const country = $('#countries-selector').val();
    await apimanager.zoomOnCountry(country);
    const bounds = apimanager.zoomBounds;
    marker1 = L.marker([bounds.NHLat, bounds.NHLng]);
    marker2 = L.marker([bounds.SWLat, bounds.SWLng]);
    const group = new L.featureGroup([marker1, marker2]);
    map.fitBounds(group.getBounds(), map.getZoom(), {
        "animate": true,
        "pan": {
          "duration": 15
        }});
})

$(".delete_event").on("click", function(){
    const eventTitle = $(this).closest(".eventTitle").text()
    apimanager.deleteEvent(eventTitle)
})

