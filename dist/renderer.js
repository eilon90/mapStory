class Renderer {
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
        $('#search-error').text(`Please select a country before searching`);
        setTimeout(function() {
            $('#search-error').text('');
        }, 4000);
    }

    noAdress() {
        $('#search-error').text(`Please type an address or place name before searching`);
        setTimeout(function() {
            $('#search-error').text('');
        }, 4000);
    }

    noResults() {
        $('#search-error').text(`No results`);
        setTimeout(function() {
            $('#search-error').text('');
        }, 4000);
    }

}
