$(function() {
    let amenities_js = {};

    $("input").click(function(e) {
        let amenity_id = e.target.attributes['data-id'].value;
        let amenity_name = e.target.attributes['data-name'].value;
        let h4 = $("#selected_amenity");

        
        //console.log($('input').is(':checked'));
        if ($(this).is(':checked')) {
            amenities_js[amenity_id] = [true, amenity_name]; 
        }else {
            amenities_js[amenity_id] = [false, amenity_name]; 
        }
        let str = ''
        for (let key in amenities_js) {
             if (amenities_js[key][0] === true) {
                 str += amenities_js[key][1] + ', '
             }
        }
        str = str.slice(0, -2);
        h4.text(str);
    });
});
