// const renderer = new Renderer
const apimanager = new APIManager

const map = L.map('mapid').setView([51.505, -0.09], 13);


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

$("#add_button").on("click", function(){
    
})