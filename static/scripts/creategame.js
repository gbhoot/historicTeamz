$(document).ready(function() {
    let newGame = {};
    let positions = [
        'GK', 'RB', 'RCB', 'CB', 'LCB', 'LB',
        'RWB', 'RCDM', 'CDM', 'LCDM', 'LWB',
        'RM', 'RCM', 'CM', 'LCM', 'LM',
        'RW', 'RAM', 'CAM', 'LAM', 'LW',
        'STR', 'CF', 'STL'
    ]
    let starters = {}, bench = {};
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
                console.log(newGame);
                document.getElementById('teamInp').value = '';
                $('#teamBtn').prop('disabled', false);
                break;
            case "oppoSelect":
                newGame['opposition'] = select_val;
                console.log(newGame);
                document.getElementById('oppoInp').value = '';
                $('#oppoBtn').prop('disabled', false);
                break;
            case "compSelect":
                newGame['competition'] = select_val;
                console.log(newGame);
                document.getElementById('compInp').value = '';
                $('#compBtn').prop('disabled', false);
                break;
            case "homeSelect":
                newGame['home'] = select_val;
                console.log(newGame);
                break;
            case "startSelect":
                $('#addStartBtn').prop('disabled', false);
                curPlayer = select_val;
                console.log(curPlayer);
                document.getElementById('startInp').value = '';
                break;
            case "benchSelect":
                $('#addBenchBtn').prop('disabled', false);
                curPlayer = select_val;
                console.log(curPlayer);
                document.getElementById('benchInp').value = '';
                break;
            case "posSelect":
                curPos = select_val;
                console.log(curPos);
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

    $('#seasonInp').on('keyup', function(event) {
        event.preventDefault();
        let query = Number(this['value']);
        newGame['season'] = query;
        console.log(newGame);
    })

    $('#scoreValH').on('keyup', function(event) {
        event.preventDefault();
        let query = Number(this['value']);
        checkNewGameScore();
        newGame['score'][0] = query;
        console.log(newGame);
    });

    $('#scoreValA').on('keyup', function(event) {
        event.preventDefault();
        let query = Number(this['value']);
        checkNewGameScore();
        newGame['score'][1] = query;
        console.log(newGame);
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
                if (response['message'] = "Success" && !response['content']) {
                    for (let player of response['players']) {
                        let country = player['country'];
                        $.ajax({
                            type: 'GET',
                            url: '/db/v2/countries/'+ country,
                            success: function(countryData) {
                                if (countryData['message'] == "Success") {
                                    html += ("<option value ='"+ player['_id'] +"'>"+ 
                                    player['firstName'] +" "+ player['lastName'] +
                                    " ("+ countryData['country']['nationality'] +")</option>");
                                }
                                document.getElementById("startSelect").innerHTML = html;
                            }
                        })
                    };
                } else {
                    console.log(response);
                    document.getElementById('startSelect').innerHTML = "";
                }
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
                let html = ""
                if (response['message'] = "Success" && !response['content']) {
                    for (let player of response['players']) {
                        let country = player['country'];
                        $.ajax({
                            type: 'GET',
                            url: '/db/v2/countries/'+ country,
                            success: function(countryData) {
                                if (countryData['message'] == "Success") {
                                    html += ("<option value ='"+ player['_id'] +"'>"+ 
                                    player['firstName'] +" "+ player['lastName'] +
                                    " ("+ countryData['country']['nationality'] +")</option>");
                                }
                                document.getElementById("benchSelect").innerHTML = html;
                            }
                        })
                    };
                } else {
                    console.log(response);
                    document.getElementById('benchSelect').innerHTML = "";
                }
            }
        });
    });

    $('#playerNumba').on('keyup', function(event) {
        event.preventDefault();
        let query = this['value'];
        curNum = query;
        console.log(curNum);
    });

    $('#addStartBtn').on('click', function(event) {
        event.preventDefault();
        document.getElementById('startSelect').innerHTML = "";
        $.ajax({
            type: 'GET',
            url: '/db/v2/players/'+ curPlayer,
            success: function(response) {
                if (response['message'] == "Success") {
                    starters[curPos] = {
                        '_id': curPlayer,
                        'num': curNum
                    };
                    updateStartersTable();
                };
            }
        });
    });

    $('#addBenchBtn').on('click', function(event) {
        event.preventDefault();
        document.getElementById('startSelect').innerHTML = "";
        $.ajax({
            type: 'GET',
            url: '/db/v2/players/'+ curPlayer,
            success: function(response) {
                if (response['message'] == "Success") {
                    bench[curPos] = {
                        '_id': curPlayer,
                        'num': curNum
                    };
                };
            }
        });
    });

    $('#createBtn').on('click', function(event) {
        event.preventDefault();
        console.log(newGame);
        $.ajax({
            type: 'POST',
            url: '/db/v2/games',
            data: newGame,
            success: function(response) {
                console.log(response);
            }
        });
    });

    function checkNewGameScore() {
        if (!newGame['score']) {
            newGame['score'] = [];
        };
    };

    function disableAllButtons() {
        $('#teamBtn').prop('disabled', true);
        $('#oppoBtn').prop('disabled', true);
        $('#compBtn').prop('disabled', true);
        $('#seasonBtn').prop('disabled', true);
        $('#scoreBtn').prop('disabled', true);
        $('#startBtn').prop('disabled', true);
        $('#benchBtn').prop('disabled', true);
    };

    function updateAvailablePositions() {
        let html = "<option value='**'></option>"
        for (let pos of positions) {
            html += ("<option value='"+ pos +"'>"+ 
            pos +"</option>");
        };
        document.getElementById('posSelect').innerHTML = html;
    };

    function updateStartersTable() {
        updateAvailablePositions();
        newGame['starters'] = starters
        let html = "";
        for (let key in starters) {
            $.ajax({
                type: 'GET',
                url: '/db/v2/players/'+ starters[key]['_id'],
                success: function(response) {
                    console.log(response);
                    if (response['message'] == "Success") {
                        html += "<tr><th scope='row'>"+ key +"</th>";
                        html += "<td>"+ response['player']['firstName'] +"</td>";
                        html += "<td>"+ response['player']['lastName'] +"</td>";
                        html += "<td>"+ starters[key]['num'] +"</td></tr>";
                    };
                    document.getElementById('tableStarters').innerHTML = html;
                    console.log(newGame);
                }
            });
        };
    };

    function updateBenchTable() {
        newGame['bench'] = bench
        let html = "";
        for (let player of bench) {
            $.ajax({
                type: 'GET',
                url: '/db/v2/players/'+ player['_id'],
                success: function(response) {
                    console.log(response);
                    if (response['message'] == "Success") {
                        html += "<tr><td>"+ response['player']['firstName'] +"</td>";
                        html += "<td>"+ response['player']['lastName'] +"</td>";
                        html += "<td>"+ starters[key]['num'] +"</td></tr>";
                    };
                    document.getElementById('tableStarters').innerHTML = html;
                    console.log(newGame);
                }
            });
        };
    };

    function listRemove(list, value) {
        return list.filter(function(lookup) {
            return lookup != value;
        });
    };

    disableAllButtons();
    updateStartersTable();
})