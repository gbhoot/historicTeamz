$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/db/v2/countries',
        success: function(response) {
            if (response['message'] == "Success") {
                let html = "";
                for (let country of response['countries']) {
                    console.log(country['name']);
                    html += ("<option value='"+ country['_id'] +"'>" +
                    country['name'] +"</option>");
                };
                document.getElementById("teamSelect").innerHTML = html;
            };
        }
    });

    $('#teamInp').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];
        let data = {
            name: query
        }

        $.ajax({
            type: 'PUT',
            url: '/db/v2/countries/query',
            data: data,
            success: function(response) {
                console.log(response);
                if (response['message'] == "Success") {
                    let html = ""
                    for (let country of response['countries']) {
                        console.log(country['name']);
                    };
                };
            }
        }).done(function(response) {
            console.log(response);
        })
    });
})