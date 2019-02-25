$(document).ready(function() {
    let newGame = {};

    $.ajax({
        type: 'GET',
        url: '/db/v2/teams',
        success: function(response) {
            if (response['message'] == "Success") {
                let html = "";
                for (let team of response['teams']) {
                    // html += ("<option value='"+ team['_id'] +"'>" +
                    // team['name'] +"</option>");
                };
                document.getElementById("teamSelect").innerHTML = html;
            };
        }
    });

    $('select').on('change', function(event) {
        event.preventDefault();
        let select_id = this['id'];
        let select_val = this['value']
        switch (select_id) {
            case "teamSelect":
                newGame['team'] = select_val;
                break;
            case "oppoSelect":
                newGame['opposition'] = select_val;
                break;
            case "compSelect":
                newGame['competition'] = select_val;
                break;
            default:
                break;
        }
    })

    $('#teamInp').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];
        let data = {
            name: query
        }

        $.ajax({
            type: 'PUT',
            url: '/db/v2/teams/query',
            data: data,
            success: function(response) {
                let html = ""
                if (response['message'] == "Success") {
                    for (let team of response['teams']) {
                        html += ("<option value='"+ team['_id'] +"'>" +
                        team['name'] +"</option>");
                    };
                };
                document.getElementById("teamSelect").innerHTML = html;
            }
        });
    });

    $('#oppoInp').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];
        let data = {
            name: query
        }

        $.ajax({
            type: 'PUT',
            url: '/db/v2/teams/query',
            data: data,
            success: function(response) {
                let html = ""
                if (response['message'] == "Success") {
                    for (let team of response['teams']) {
                        html += ("<option value='"+ team['_id'] +"'>" +
                        team['name'] +"</option>");
                    };
                };
                document.getElementById("oppoSelect").innerHTML = html;
            }
        });
    });
})