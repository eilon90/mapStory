class APIManager{
    constructor(){
        this.stories = []
        this.story = null //should reference to object story
        this.countries = [];
        this.searchResults = [];
        this.location = {address: ''};
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
    async getCountries() {
        const countriesList = await $.get('/countries');
        countriesList.forEach(c => this.countries.push(c));
    }

    async getResults(country, address) {
        const results = await $.get(`/search/${address}/${country}`);
        // results.forEach(r => this.searchResults.push(r));
        this.searchResults = results;
    }

    async getAddress(lat, lng) {
        const address = await $.get(`/address/${lat}/${lng}`);
        this.location.address = address;
    }
}


