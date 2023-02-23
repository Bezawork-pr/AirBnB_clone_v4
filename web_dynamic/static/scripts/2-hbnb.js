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
