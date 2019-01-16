$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/db/v1/futbalTeams/countries',
        success: function(data) {
            if (data['message'] == 'Success') {
                let countries = data['countries'];
                let html = "";
                for (var country of countries) {
                    let this_country = country.toLowerCase();
                    html += "<a class='list-group-item list-group-item-action allCountries' id="+
                    "'"+ country +"'>"+ country +"</a>";
                }
                document.getElementById('countries').innerHTML = html;

                $('.allCountries').on('click', function(event) {
                    event.preventDefault();
                    let country = $(this)[0]['id'];
                    $.ajax({
                        type: 'GET',
                        url: '/db/v1/futbalTeams/countries/'+ country +'/organizations',
                        success: function(data) {
                            if (data['message'] == 'Success') {
                                let organizations = data['organizations'];
                                let html = "";
                                for (var organization of organizations) {
                                    html += "<a class='list-group-item list-group-item-action allOrganizations' id="+
                                    "'"+ organization +"'>"+ organization +"</a>";
                                }
                                document.getElementById('organizations').innerHTML = html;
                                document.getElementById('games').innerHTML = "";

                                $('.allOrganizations').on('click', function(event) {
                                    event.preventDefault();
                                    let organization = $(this)[0]['id'];
                                    $.ajax({
                                        type: 'GET',
                                        url: '/db/v1/futbalTeams/organizations/'+ organization +'/teams',
                                        success: function(data) {
                                            if (data['message'] == 'Success') {
                                                let teams = data['teams'];
                                                let html = "";
                                                for (var team of teams) {
                                                    html += "<a class='list-group-item list-group-item-action allTeams' id="+
                                                    "'"+ team['_id'] +"'>"+ team['season'] +"-"+ Number(team['season'] + 1) 
                                                    +" "+ team['game'] +"</a>";
                                                }
                                                document.getElementById('games').innerHTML = html;

                                                $('.allTeams').on('click', function(event) {
                                                    event.preventDefault();
                                                    let game_id = $(this)[0]['id'];
                                                    window.location.href = "/team/"+ game_id;
                                                });
                                            } else {
                                                console.log(data, "No games found for specific organization");
                                            };
                                        }
                                    });
                                });
                            } else {
                                console.log(data, "No organizations found for specific country");
                            }
                        }
                    })
                });
            } else {
                console.log(data, "No countries found");
            }
        }
    });

})