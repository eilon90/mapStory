class Renderer {
    constructor() {}

    renderStory(map, story){
        story.events.forEach(e => {
            const marker = L.marker([51.5, -0.09]).addTo(map);
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
        $("#event").empty()
        $("#event").append(newHTML);
    }

    addCountries(list) {
      const source = $('#countries-template').html();
      const template = Handlebars.compile(source);
      const newHTML = template({list});
      $('#countries-selector').append(newHTML);
    }

    printAddress(location){
        $('#clickAddress').empty();
        const source = $('#address-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template(location);
        $('#clickAddress').append(newHTML);
    }

    noCountry() {
        $('#search-error').text(`Please select country before searching`);
        setTimeout(function() {
            $('#search-error').text('');
        }, 4000);
    }
}
