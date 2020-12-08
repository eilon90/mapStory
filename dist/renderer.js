class Renderer {
  constructor() {}
  renderStory(map, story){
    story.events.forEach(e => {
        const marker = L.marker([51.5, -0.09]).addTo(map);
    })
    const source = $("#story-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(story);
    $(".story").append(newHTML);
  }
  renderStories(stories) {
    const source = $("#stories-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({stories});
    $(".stories").append(newHTML);
  }
  renderEvent(event){
    const source = $("#event-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(event);
    $("#event").append(newHTML);
  }
}
