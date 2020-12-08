const renderer = new Renderer
const apimanager = new APIManager

const map = L.map('mapid').setView([51.505, -0.09], 13);

$(document).ready(function(){
$(".new_story").on("click", function(){
    $("new_story_input").toggle()   
})
})

$(".show_stories").on("click", function(){
    const allStories = apimanager.getStories()
    renderer.renderStories(allStories)
})

$("#add_button").on("click", function(){

})