$(document).ready(function() {
    let newGame = {};
    let positions = [
        'GK', 'RB', 'RCB', 'CB', 'LCB', 'LB',
        'RWB', 'RCDM', 'CDM', 'LCDM', 'LWB',
        'RM', 'RCM', 'CM', 'LCM', 'LM',
        'RW', 'RAM', 'CAM', 'LAM', 'LW',
        'STR', 'CF', 'STL'
    ]
    let starters = [];
    let curPos = "", curPlayer = "", curNum = 0;

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
                document.getElementById('teamSelect').innerHTML = html;
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
                $('#teamBtn').prop('disabled', false);
                break;
            case "oppoSelect":
                newGame['opposition'] = select_val;
                $('#oppoBtn').prop('disabled', false);
                break;
            case "compSelect":
                newGame['competition'] = select_val;
                $('#compBtn').prop('disabled', false);
                break;
            case "startSelect":
                $('#addStartBtn').prop('disabled', false);
                curPlayer = select_val;
                break;
            case "posSelect":
                curPos = select_val;
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

    $('#compInp').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];
        let data = {
            name: query
        }

        $.ajax({
            type: 'PUT',
            url: '/db/v2/competitions/query',
            data: data,
            success: function(response) {
                let html = ""
                if (response['message'] == "Success") {
                    for (let competition of response['competitions']) {
                        html += ("<option value='"+ competition['_id'] +"'>" +
                        competition['name'] +"</option>");
                    };
                };
                document.getElementById("compSelect").innerHTML = html;
            }
        });
    });

    $('#startInp').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];

        let data = {
            name: query
        };

        $.ajax({
            type: 'PUT',
            url: '/db/v2/players/query',
            data: data,
            success: function(response) {
                let html = ""
                if (response['message'] = "Success") {
                    for (let player of response['players']) {
                        html += ("<option value ='"+ player['_id'] +"'>"+ 
                        player['firstName'] +" "+ player['lastName'] +"</option>");
                    };
                };
                document.getElementById("startSelect").innerHTML = html;
            }
        });
    });

    $('#benchInp').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];
        let data = {
            name: query
        };

        $.ajax({
            type: 'PUT',
            url: '/db/v2/players/query',
            data: data,
            success: function(response) {
                if (response['message'] == "Success") {
                    let countries = [];
                    for (let player of response['players']) {
                        countries.push(player['country']);
                    }
                    $.ajax({
                        type: 'PUT',
                        url: '/db/v2/countries/multiple',
                        data: {countries: countries},
                        success: function(countryData) {
                            if (countryData['message'] == "Success") {
                                let html = "";
                                for (let count in response['players']) {
                                    let player = response['players'][count];
                                    let country = countryData['countries'][count];
                                    console.log(count, response['players'], country);
                                    html += ("<option value='"+ player['_id'] +"'>"+
                                    "<div class='row'><div class='col'>"+
                                    player['firstName'] +" "+ player['lastName'] +
                                    "</div><div class='col-md-2'>"+ country['name'] +
                                    "</div></div></option>");
                                    // "</option>");
                                }
                                document.getElementById('benchSelect').innerHTML = html;
                            }
                        }
                    })
                }
            }
        });
    });

    $('#playerNumba').on('click', function(event) {
        event.preventDefault();
        let query = this['value'];
        curNum = query;
    });

    $('#addStartBtn').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/db/v2/players/'+ curPlayer,
            success: function(response) {
                if (response['message'] == "Success") {
                    let fName = response['firstName'];
                    let lName = response['lastName'];
                    starters[curPos] = {
                        'fName': fName,
                        'lName': lName,
                        'num': curNum
                    };
                    // positions.
                };
            }
        });
    });

    function disableAllButtons() {
        $('#teamBtn').prop('disabled', true);
        $('#oppoBtn').prop('disabled', true);
        $('#compBtn').prop('disabled', true);
        $('#seasonBtn').prop('disabled', true);
        $('#scoreBtn').prop('disabled', true);
        $('#startBtn').prop('disabled', true);
        $('#benchBtn').prop('disabled', true);
    }

    function updateAvailablePositions() {
        let html = ""
        for (let pos of positions) {
            html += ("<option value='"+ pos +"'>"+ 
            pos +"</option>");
        }
        console.log(html);
        document.getElementById('posSelect').innerHTML = html;
    };

    function updateStartersTable() {
        let html = "";
        for (let player of starters) {
            console.log(player);
        }
    }

    disableAllButtons();
    updateAvailablePositions();
    updateStartersTable();
})