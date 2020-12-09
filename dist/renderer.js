class Renderer {
  constructor() {}
  renderStory(map, story){
    story.events.forEach(e => {
        const marker = L.marker().addTo(map).on('click', onEventClick);;
    })
    const source = $("#story-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(story);
    $(".story").empty()
    $(".story").append(newHTML);
  }
  renderStories(stories) {
    const source = $("#stories-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({stories});
    $(".stories").empty()
    $(".stories").append(newHTML);
  }
  renderEvent(event){
    const source = $("#event-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(event);
    $("#new_event_input").empty()
    $("#new_event_input").append(newHTML);
  }
  renderEventForm(latlng){
    const source = $("#eventForm-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(latlng);
    $("#new_event_input").empty()
    $("#new_event_input").append(newHTML);
  }
}
