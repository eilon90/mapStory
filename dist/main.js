
let renderer
let apimanager 
let map
let markerGroup;

const loadPage = async function(){
    renderer = new Renderer()
    apimanager = new APIManager()

map = L.map('mapid', {minZoom: 2}).setView([39.63, 3.33], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWlsb245MCIsImEiOiJja2lkaG1nZ2wwMWM3MnJsYmt0NmhjaXd4In0.FIqX_7bwQX0hh3o8FJj8Vg', {
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   id: 'mapbox/streets-v11',
   tileSize: 512,
   zoomOffset: -1,
   accessToken: 'your.mapbox.access.token'
}).addTo(map);
markerGroup = L.layerGroup().addTo(map)
let searchMarker;
await apimanager.getStories()
await renderer.renderStories(apimanager.stories)
await getCountriesList();
}

loadPage()

async function onMapClick(e) {
//   apimanager.connectStory("whatever");
  const isDisabled = $("#add_button").attr("disabled");
  if (isDisabled === "disabled" && apimanager.story) {
    // const marker = L.marker(e.latlng).addTo(map).on('click', onEventClick);
    // marker.bindPopup("").openPopup();
    const latlng = { lng: e.latlng.lng, lat: e.latlng.lat };
    renderer.renderEventForm(latlng);
    $("#new_event_input").show();
  } else {
    await displayAddress(e);
  }
}
map.on("click", onMapClick);

function onEventClick(e) {
  renderer.renderEvent(apimanager.searchEvent(this.getLatLng()));
  $("#new_event_input").show();
}




$("body").on("click", ".delete_story", async function(){
    const storyTitle = $(this).closest(".story").text()
   await apimanager.deleteStory(storyTitle)
   await renderer.renderStories(apimanager.stories)
})

$(".new_story").on("click", function () {
  $("#new_story_input").toggle();
});

$("#new_story_button").on("click", async function(){
    const title = $("#story_title_input").val()
    const des = $("#story_des_input").val()
    const newStory = { 
        title: title,
        description: des
    }
    await apimanager.createStory(newStory)
    $("#new_story_input").toggle()
    await renderer.renderStories(apimanager.stories)
})

$(".show_stories").on("click", function () {
  const allStories = apimanager.getStories();
  renderer.renderStories(allStories);
});

$("#new_event_input").on("click", ".new_event_button", async function () {
  //hide and remove disable the add button
  const title = $("#event_title_input").val();
  const description = $("#event_des_input").val();
  const longtitude = $(this).data("lng");
  const latitude = $(this).data("lat");
  const newEvent = {
    title,
    description,
    longtitude,
    latitude,
    photos: [],
  };
  await apimanager.createEvent(newEvent);
  const marker = L.marker([latitude, longtitude]).addTo(markerGroup).on("click", onEventClick);
  $("#new_event_input").empty();
  $("#new_event_input").hide();
  $("#add_button").prop("disabled", false);
  renderer.renderStories(apimanager.stories)
  const activeStory = $(".story").filter(`[data-title="${apimanager.story.title}"]`)
  $(activeStory).css("color", "red")//change color
  markerGroup.clearLayers()
  renderer.renderStory(markerGroup, apimanager.story, $(activeStory).next())
});

$("#add_button").on("click", function () {
  $("#add_button").attr("disabled", true);
});

$("body").dblclick(function () {
  $("#new_event_input").hide();
});

async function getCountriesList() {
  await apimanager.getCountries();
  const countries = apimanager.countries;
  renderer.addCountries(countries);
}


$(".stories").on("click", ".story", function(){
    $(this).siblings(".story").css("color", "white") //change color
    const divToRenderOn = $(this).next()
    // renderer.renderStories(apimanager.stories)
    $(this).css("color", "red")//change color
    $(".storyInfo").empty()
    apimanager.connectStory($(this).text().trim())
    markerGroup.clearLayers()
    renderer.renderStory(markerGroup, apimanager.story, divToRenderOn)
})

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


async function displayAddress(e){
   const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    await apimanager.getAddress(lat, lng);
    const address = apimanager.location.address;
    renderer.printAddress(address);
}

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

$("body").on("click", ".delete_event", function(){
    const eventTitle = $(this).closest(".event_container").find(".eventTitle").text()
    console.log(eventTitle)
    apimanager.deleteEvent(eventTitle)
    $(".event_container").hide()
})

$("body").on("click", ".close_event_form", function(){
    $("#new_event_input").hide();
})