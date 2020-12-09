class APIManager{
    constructor(){
        this.stories = []
        this.story = null //should reference to object story
    }
    //event {title, description, longitude, latitude, photos}
    async getStories(){
        const stories = await $.get('/stories')
        this.stories = stories
    }
    async createEvent(event){
        await $.ajax({
            method: "post",
            url: `/event/${this.story.title}`,
            data: event
          })
        this.story.events.push(event)
    }
    async deleteEvent(eventTitle){
        await $.ajax({
            method: "delete",
            url: `/event/${this.story.title}/${eventTitle}`,//something to write     
          })
        const eventIndex = this.story.events.findIndex(e => e.title === eventTitle)
        this.story.events.splice(eventIndex, 1)
    }
    async updateEvent(event, update){
        //update is {parameterTitle : value of text input , ...}
    }
    //story {title, description, events}
    async createStory(story){
        story.events = []
        await $.ajax({
            method: "post",
            url: '/story',
            data:story
          })
          this.stories.push(story)
          this.story = this.stories[this.stories.length -1]
    }
    updateStory(param, update){

    }
    async deleteStory(storyTitle){
        await $.ajax({
            method: "delete",
            url: `/story/${storyTitle}`,//something to write     
          })
          const storyIndex = this.stories.findIndex(s => s.title === storyTitle)
          this.stories.splice(storyIndex, 1)
    }
    connectStory = storyTitle =>{ this.story = this.stories.find(s => s.title === storyTitle)}
    searchEvent = latlng => this.story.events.find(e=> e.longtitude == latlng.lng && e.latitude == latlng.lat)
    // storyIndex = ()=> this.stories.findIndex(s => s.title === this.storyTitle)
    // eventIndex = (eventTitle, StoryIndex) => this.stories[storyIndex()].events.findIndex()
    // eventIndex = eventTitle => this.story.events.findIndex(e => e.title === eventTitle)
}

// const api = new APIManager()
// api.stories = [
//     {title: "elementry school", description: "i don't remember", events: []},
//     {title: "high school", description: "cool", events: [
//         {title: "10th grade", description: "funny", longitude: 24324, latitude: 243.24, photos:[]},
//         {title: "tawjihi", description: "stressful", longitude: 24324, latitude: 243.24, photos:[]},
//         {title: "competition", description: "", longitude: 24324, latitude: 243.24, photos:[]}
//     ]},
//     {title: "university", description: "long", events: [
//         {title: "pharmD", description: "stress", longitude: 34.67, latitude: 243.24, photos:[]},
//         {title: "cs", description: "changing environment", longitude: 09.45, latitude: 243.24, photos:[]}
//     ]},
//     {title: "jobless", description: "boring", events: [
//         {title: "10th grade", description: "funny", longitude: 24324, latitude: 243.24, photos:[]}
//     ]}
// ]
    //event {title, description, longitude, latitude, photos}

//     api.connectStory("high school")
//     console.log(api.story)
    // api.createStory({title:"trip", description: " awesome"})
    
    // api.createEvent({title: "haifa", description: "hot", longitude: 24.67, latitude: 293.24, photos:[]})
//     api.connectStory("high school")
//     api.deleteEvent("tawjihi")
//     api.deleteStory("university")

    
//     console.log(api.stories)

