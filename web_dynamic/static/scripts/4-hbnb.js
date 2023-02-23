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

  $('section.filters button').click(function (e) {
    const amenities = [];
    $('input[type=checkbox]').each(function (e) {
      const elem = $(this);
      if (elem.is(':checked')) {
        amenities.push(elem.attr('data-id'));
      }
    });

    // send api request
    console.log('amenities requested: ', amenities);
    searchPlaces({ amenities });
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

  const amenities = {};

  $('input').click(function (e) {
    const amenityId = e.target.attributes['data-id'].value;
    const amenityName = e.target.attributes['data-name'].value;
    const h4 = $('#selected_amenity');

    // console.log($('input').is(':checked'));
    if ($(this).is(':checked')) {
      amenities[amenityId] = [true, amenityName];
    } else {
      amenities[amenityId] = [false, amenityName];
    }
    let str = '';
    for (const key in amenities) {
      if (amenities[key][0] === true) {
        str += amenities[key][1] + ', ';
      }
    }
    str = str.slice(0, -2);
    h4.text(str);
  });
});
