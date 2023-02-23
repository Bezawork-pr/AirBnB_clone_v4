$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status', function (data, txt_status) {
    const elem = $('div#api_status');
    if (data.status == 'OK') {
      elem.addClass('available');
    } else {
      if (elem.hasClass('available')) {
        elem.removeClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data, txt_status) {
      const section = $('section.places');
      data.forEach(place => {
        const html = `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>

                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
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

  const amenities_js = {};

  $('input').click(function (e) {
    const amenity_id = e.target.attributes['data-id'].value;
    const amenity_name = e.target.attributes['data-name'].value;
    const h4 = $('#selected_amenity');

    // console.log($('input').is(':checked'));
    if ($(this).is(':checked')) {
      amenities_js[amenity_id] = [true, amenity_name];
    } else {
      amenities_js[amenity_id] = [false, amenity_name];
    }
    let str = '';
    for (const key in amenities_js) {
      if (amenities_js[key][0] === true) {
        str += amenities_js[key][1] + ', ';
      }
    }
    str = str.slice(0, -2);
    h4.text(str);
  });
});
