$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
    const elem = $('div#api_status');
    if (data.status === 'OK') {
      elem.addClass('available');
    } else {
      if (elem.hasClass('available')) {
        elem.removeClass('available');
      }
    }
  });

  const amenities = {};
  const states = {}
  const city = {}

  $('section.filters button').click(function (e) {
    const amenities = [];
    $('.amenities input[type=checkbox]').each(function (e) {
      const elem = $(this);
      if (elem.is(':checked')) {
        amenities.push(elem.attr('data-id'));
      }
    });

    // send api request
    // {ameni: [], states: []}
    // {states: {'23423': [flase, 'califor']}}
    let selectedStates = Object.keys(states);
    let selectedCities= Object.keys(city);
    let filby = { amenities, states: selectedStates, cities: selectedCities};
    searchPlaces(filby);
  });

  function searchPlaces (filter_by = {}) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(filter_by),
      success: function (data) {
        const section = $('section.places');
        section.empty();
        data.forEach(place => {
          const html = `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>

                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>

                        <div class="user">
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`;

          section.append(html);
        });
      }
    });
  }

  searchPlaces();

  //function buildFilterOption(selectBy) {}

    // {amenities: [23434, 2342], state: [c933], cities: []}
    // <input data-name


  $('input').click(function (e) {
    const id = e.target.attributes['data-id'].value;
    const name = e.target.attributes['data-name'].value;
    const filterBy = e.target.attributes['data-filterby'].value;
    let h4;
    let strAmenity = '';
    let strLocation = '';
    
    if (filterBy === 'amenity') {
        h4 = $('#selected_amenity'); 
        if ($(this).is(':checked')) {
          amenities[id] = [true, name];
        } else {
          amenities[id] = [false, name];
        }
        for (const key in amenities) {
          if (amenities[key][0] === true) {
            strAmenity += amenities[key][1] + ', ';
          }
        }
        strAmenity = strAmenity.slice(0, -2);
        h4.text(strAmenity);

    }else if (filterBy === 'state') {
        h4 = $('#selected_locations'); 
        if ($(this).is(':checked')) {
          states[id] = [true, name];
        } else {
          states[id] = [false, name];
        }
        for (const key in states) {
          if (states[key][0] === true) {
            strLocation += states[key][1] + ', ';
          }
        }
        for (const key in city) {
          if (city[key][0] === true) {
            strLocation += city[key][1] + ', ';
          }
        }
        strLocation = strLocation.slice(0, -2);
        h4.text(strLocation);
    }else if (filterBy === 'city') {
        h4 = $('#selected_locations'); 
        if ($(this).is(':checked')) {
          city[id] = [true, name];
        } else {
          city[id] = [false, name];
        }
        for (const key in states) {
          if (states[key][0] === true) {
            strLocation += states[key][1] + ', ';
          }
        }
        for (const key in city) {
          if (city[key][0] === true) {
            strLocation += city[key][1] + ', ';
          }
        }
        strLocation = strLocation.slice(0, -2);
        h4.text(strLocation);
    }

    // console.log($('input').is(':checked'));
  });

});
