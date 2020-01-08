import React from "react";
import API from "../../utils/API";

class dj extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arrays here. Each person's array will include three NBA teams. 
        allNBA: [],
        djNBA: "",
        sixers: "",
        rockets: "",
        timberwolves: "",
        bears: 80,
        texans: 100,
        broncos: 70,
        totalNFL: 250,
        // EPL
        sheffield: "",
        burnley: "",
        djEPL: "",
        // NHL 
        jets: "",
        canes: "",
        coyotes: "",
        totalNHL: "",
    }
    componentDidMount = () => {
        this.getScoresNBA();
        // this.getScoresEPL();
        this.getScoresNHL();
    }

    getScoresNHL = () => {
        API.getScoresNHL()
            .then(res => {
                // This is the Metro Division
                var metroResults = res.data.records[0].teamRecords;
                // Atlantic Division
                var atlanticResults = res.data.records[1].teamRecords;
                // Central Division
                var centralResults = res.data.records[2].teamRecords;
                // central
                var pacificResults = res.data.records[3].teamRecords;

                console.log(metroResults);

                var jetsWins;
                var jetsOTLS;
                var jetsTotal;
                var canesWins;
                var canesOTLS;
                var canesTotal;
                var coyotesWins;
                var coyotesOTLS;
                var coyotesTotal;
                var allNHL;

                // Here is the jets loop. 
                for (var i = 0; i < centralResults.length; i++) {
                    // jets
                    if (centralResults[i].team.id === 52) {
                        jetsWins = centralResults[i].leagueRecord.wins;
                        jetsOTLS = centralResults[i].leagueRecord.ot;
                        console.log(jetsWins);
                        console.log(jetsOTLS);
                        console.log("this loop is running")
                    }
                }

                // jets total
                jetsTotal = (jetsWins * 2) + jetsOTLS;
                console.log(jetsTotal);

                for (var i = 0; i < pacificResults.length; i++) {

                    // coyotes
                    if (pacificResults[i].team.id === 53) {
                        coyotesWins = pacificResults[i].leagueRecord.wins;
                        coyotesOTLS = pacificResults[i].leagueRecord.ot;
                        console.log(coyotesWins);
                        console.log(coyotesOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < metroResults.length; i++) {

                    // canes
                    if (metroResults[i].team.id === 12) {
                        canesWins = metroResults[i].leagueRecord.wins;
                        canesOTLS = metroResults[i].leagueRecord.ot;
                        console.log(canesWins);
                        console.log(canesOTLS);
                        console.log("this loop is running")
                    }
                }

                // canes total
                canesTotal = (canesWins * 2) + canesOTLS;
                console.log(canesTotal)

                // coyotes total
                coyotesTotal = (coyotesWins * 2) + coyotesOTLS;
                console.log(coyotesTotal);

                var allNHL = jetsTotal + canesTotal + coyotesTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ jets: jetsTotal });
                this.setState({ canes: canesTotal });
                this.setState({ coyotes: coyotesTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                // HERE ARE EPL TEAMS FOR DJ. 
                //  sheffield
                var sheffieldWin = res.data.api.standings[0][7].all.win;
                var sheffieldTie = res.data.api.standings[0][7].all.draw;
                var sheffieldTotal = (sheffieldWin * 4.25) + (sheffieldTie);

                // Now burnley results
                var burnleyWin = res.data.api.standings[0][14].all.win;
                var burnleyTie = res.data.api.standings[0][14].all.draw;
                var burnleyTotal = (burnleyWin * 4.25) + (burnleyTie)

                // Here is the final result
                var djPoints = sheffieldTotal + burnleyTotal
                this.setState({ djEPL: djPoints });
                this.setState({ sheffield: sheffieldTotal });
                this.setState({ burnley: burnleyTotal });

                // And now I need to run the totalscores function so that it can get logged. 
                this.totalScores();

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresNBA = () => {
        API.getScoresNBA()
            .then(res => {
                // HERE ARE NBA TEAMS FOR TOMMY. 
                // console.log(res);
                // console.log(res.data.api.standings);
                var sixersWin = res.data.api.standings[6].win;
                var rocketsWin = res.data.api.standings[15].win;
                var timberwolvesWin = res.data.api.standings[29].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doublesixers = (sixersWin * 2);
                var doublerockets = (rocketsWin * 2);
                var doubletimberwolves = (timberwolvesWin * 2);

                const tempdjNBA = this.state.allNBA;

                tempdjNBA.push(sixersWin);
                tempdjNBA.push(rocketsWin);
                tempdjNBA.push(timberwolvesWin);

                var djDoubledScores = tempdjNBA.map(team => team * 2);

                var djPoints = 0;

                for (var i = 0; i < djDoubledScores.length; i++) {
                    djPoints += djDoubledScores[i];
                }
                console.log(djPoints);
                this.setState({ djNBA: djPoints });
                this.setState({ sixers: doublesixers });
                this.setState({ rockets: doublerockets });
                this.setState({ timberwolves: doubletimberwolves });
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div class="text-center">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="/Home">Epic Fantasy League</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="/Home">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link" href="/MyTeams">My Teams</a> */}
                                <div class="dropdown show">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Teams
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item" href="tommy">Tommy</a>
                                        <a class="dropdown-item" href="patrick">Patrick</a>
                                        <a class="dropdown-item" href="james">James</a>
                                        <a class="dropdown-item" href="neptune">Neptune</a>
                                        <a class="dropdown-item" href="dj">DJ</a>
                                        <a class="dropdown-item" href="goose">Goose</a>
                                        <a class="dropdown-item" href="al">Al</a>
                                        <a class="dropdown-item" href="joe">Joe</a>
                                        <a class="dropdown-item" href="steids">Steids</a>
                                        <a class="dropdown-item" href="ben">Ben</a>
                                    </div>
                                </div>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" href="/Login">Login</a>
                            </li> */}
                            <li class="nav-item">
                                <a class="nav-link" href="/draft">Draft Results</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/points">Points System</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="card">
                    <div class="card-body text-center bg-light text-secondary">
                        DJ
  </div>
                </div>
                {/* Starting my new table here */}
                <div class="container smallTable">
                    <div class="row">
                        <div class="col">
                            <table class="table table-striped table-bordered table-hover">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col-6">Draft Pick</th>
                                        <th scope="col-6">NBA Team</th>
                                        <th scope="col-6">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Philadelphia 76ers</td>
                                        <td>{this.state.sixers}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">17</th>
                                        <td>Houston Rockets</td>
                                        <td>{this.state.rockets}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">84</th>
                                        <td>Minnesota Timberwolves</td>
                                        <td>{this.state.timberwolves}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.djNBA}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Here is NFL */}
                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">NFL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">22</th>
                                                <td>Chicago Bears</td>
                                                <td>{this.state.bears}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">41</th>
                                                <td>Houston Texans</td>
                                                <td>{this.state.texans}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">97</th>
                                                <td>Denver Broncos</td>
                                                <td>{this.state.broncos}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalNFL}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    {/* Here is EPL */}
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">EPL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">116</th>
                                                <td>Sheffield United</td>
                                                <td>{this.state.sheffield}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">136</th>
                                                <td>Burnley</td>
                                                <td>{this.state.burnley}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.djEPL}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Adding the NHL Table here */}

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    {/* Here is NFL */}
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">NHL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">39</th>
                                                <td>Winnipeg Jets</td>
                                                <td>{this.state.jets}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">61</th>
                                                <td>Carolina Hurricanes</td>
                                                <td>{this.state.canes}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">80</th>
                                                <td>Arizona Coyotes</td>
                                                <td>{this.state.coyotes}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalNHL}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <body class="d-flex flex-column">
                    <div id="page-content">
                        <div class="container text-center">
                            <div class="row justify-content-center">
                                <div class="col-md-7">
                                    {/* Adding this custom footer I found online. Requires some fake text. Here it is below.  */}
                                    <h1 class="font-weight-light mt-4 text-white">Sticky Footer using Flexbox</h1>
                                    <p class="lead text-white-50">Use just two Bootstrap 4 utility classes and three custom CSS rules and you will have a flexbox enabled sticky footer for your website!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
                        <div class="container text-center">
                            <small>Copyright &copy; Epic Fantasy League 2020</small>
                        </div>
                    </footer>
                </body>
            </div>
        )
    }
}

export default dj;