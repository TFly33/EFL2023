import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";

class dj extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arrays here. Each person's array will include three NBA teams. 
        allNBA: [],
        djNBA: "",
        heat: "",
        blazers: "",
        magic: "",
        bears: 80,
        texans: 100,
        broncos: 70,
        totalNFL: 250,
        // EPL
        brighton: "",
        astonVilla: "",
        djEPL: "",
        // NHL 
        avalanche: "",
        flames: "",
        kings: "",
        totalNHL: "",
        // Golf here
        morikawa: "",
        mcilroy: "",
        casey: "",
        rose: "",
        garcia: "",
        totalGolf: "",
        // MLB Here
        brewers: 86,
        rockies: 68,
        orioles: 83,
        totalMLB: 237
    }

    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresEPL();
        this.getScoresNHL();
        this.getScoresPGA();
        this.getScoresMLB();
        this.getScoresNFL();
    }

    getScoresNFL = () => {
        var x = golfHelper();
        this.setState({ packers: x.Packers });
        this.setState({ titans: x.Titans });
        this.setState({ falcons: x.Falcons });
        var allNFL = (x.Packers + x.Titans + x.Falcons)
        this.setState({ totalNFL: allNFL });
    };

    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                var brewersWin;
                var rockiesWin;
                var oriolesWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )

                    //brewers
                    if (fullIndex[i].team.id === 20) {
                        brewersWin = fullIndex[i].games.win.total
                    }

                    // orioles
                    if (fullIndex[i].team.id === 4) {
                        oriolesWin = fullIndex[i].games.win.total
                    }

                    // rockies
                    if (fullIndex[i].team.id === 10) {
                        rockiesWin = fullIndex[i].games.win.total
                    }

                }

                var allMLB = brewersWin + oriolesWin + rockiesWin;

                this.setState({ totalMLB: allMLB });
                this.setState({ brewers: brewersWin });
                this.setState({ orioles: oriolesWin });
                this.setState({ rockies: rockiesWin });

            });
    };


    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ mcilroy: x.Mcilroy });
        this.setState({ morikawa: x.Morikawa });
        this.setState({ casey: x.Casey });
        this.setState({ rose: x.Rose });
        this.setState({ garcia: x.Garcia });
        var allGolf = x.Garcia + x.Mcilroy + x.Morikawa + x.Rose + x.Casey;
        this.setState({ totalGolf: allGolf });
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

                var avalancheWins;
                var avalancheOTLS;
                var avalancheTotal;
                var flamesWins;
                var flamesOTLS;
                var flamesTotal;
                var kingsWins;
                var kingsOTLS;
                var kingsTotal;
                var allNHL;

                // Here is the avalanche loop. 
                for (var i = 0; i < centralResults.length; i++) {
                    // avalanche
                    if (centralResults[i].team.id === 21) {
                        avalancheWins = centralResults[i].leagueRecord.wins;
                        avalancheOTLS = centralResults[i].leagueRecord.ot;
                        console.log(avalancheWins);
                        console.log(avalancheOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < pacificResults.length; i++) {

                    // kings
                    if (pacificResults[i].team.id === 26) {
                        kingsWins = pacificResults[i].leagueRecord.wins;
                        kingsOTLS = pacificResults[i].leagueRecord.ot;
                        console.log(kingsWins);
                        console.log(kingsOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < metroResults.length; i++) {

                    // flames
                    if (pacificResults[i].team.id === 20) {
                        flamesWins = pacificResults[i].leagueRecord.wins;
                        flamesOTLS = pacificResults[i].leagueRecord.ot;
                        console.log(flamesWins);
                        console.log(flamesOTLS);
                        console.log("this loop is running")
                    }
                }

                // flames total
                flamesTotal = (flamesWins * 2) + flamesOTLS;
                console.log(flamesTotal)

                // kings total
                kingsTotal = (kingsWins * 2) + kingsOTLS;
                console.log(kingsTotal);

                // avalanche total
                avalancheTotal = (avalancheWins * 2) + avalancheOTLS;
                console.log(avalancheTotal);

                var allNHL = avalancheTotal + flamesTotal + kingsTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ avalanche: avalancheTotal });
                this.setState({ flames: flamesTotal });
                this.setState({ kings: kingsTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {

                console.log(res.data.response[0].league.standings[0])
                var brightonWin;
                var brightonTie;
                var astonVWin;
                var astonVTie;

                // running the for loop here. 
                var forLoopArray = res.data.response[0].league.standings[0]
                for (var i = 0; i < forLoopArray.length; i++) {

                    if (forLoopArray[i].team.id === 51) {
                        brightonWin = forLoopArray[i].all.win
                        brightonTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + brightonWin);
                        console.log("here are the ties" + brightonTie);
                    }

                    if (forLoopArray[i].team.id === 66) {
                        astonVWin = forLoopArray[i].all.win
                        astonVTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + astonVWin);
                        console.log("here are the ties" + astonVTie);
                    }
                }

                var brightonTotal = (brightonWin * 4.25) + (brightonTie);
                var astonVTotal = (astonVWin * 4.25) + (astonVTie);

                // Here is the final result
                var djPoints = brightonTotal + astonVTotal;
                this.setState({ brighton: brightonTotal });
                this.setState({ astonV: astonVTotal });
                this.setState({ eplTotal: djPoints });

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
                var heatWin = res.data.api.standings[10].win;
                var blazersWin = res.data.api.standings[18].win;
                var magicWin = res.data.api.standings[13].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doubleheat = (heatWin * 2);
                var doubleblazers = (blazersWin * 2);
                var doublemagic = (magicWin * 2);

                const tempdjNBA = this.state.allNBA;

                tempdjNBA.push(heatWin);
                tempdjNBA.push(blazersWin);
                tempdjNBA.push(magicWin);

                var djDoubledScores = tempdjNBA.map(team => team * 2);

                var djPoints = 0;

                for (var i = 0; i < djDoubledScores.length; i++) {
                    djPoints += djDoubledScores[i];
                }
                console.log(djPoints);
                this.setState({ djNBA: djPoints });
                this.setState({ heat: doubleheat });
                this.setState({ blazers: doubleblazers });
                this.setState({ magic: doublemagic });
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
                            <li class="nav-item">
                                <a class="nav-link" href="/Home">Standings <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item active">
                                <div class="dropdown show">
                                    <div class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Teams
                                    </div>
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
                                        <a class="dropdown-item" href="ben">Eres</a>
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
                                        <th scope="row">28</th>
                                        <td className="heat">Miami Heat</td>
                                        <td>{this.state.heat}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">59</th>
                                        <td className="blazers">Portland Blazers</td>
                                        <td>{this.state.blazers}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">113</th>
                                        <td className="magic">Orlando Magic</td>
                                        <td>{this.state.magic}</td>
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
                                                <th scope="row">42</th>
                                                <td className="packers">Green Bay Packers</td>
                                                <td>{this.state.packers}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">100</th>
                                                <td className="titans">Tennessee Titans</td>
                                                <td>{this.state.titans}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">132</th>
                                                <td className="falcons">Alanta Falcons</td>
                                                <td>{this.state.falcons}</td>
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
                                                <th scope="row">59</th>
                                                <td className="brighton">Brighton and Hove Albion</td>
                                                <td>{this.state.brighton}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">62</th>
                                                <td className="astonV">Aston Villa</td>
                                                <td>{this.state.astonV}</td>
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
                                                <th scope="row">13</th>
                                                <td className="avalanche">Colorado Avalanche</td>
                                                <td>{this.state.avalanche}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">62</th>
                                                <td className="flames">Calgary Flames</td>
                                                <td>{this.state.flames}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">100</th>
                                                <td className="kings">LA Kings</td>
                                                <td>{this.state.kings}</td>
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

                        {/* MLB Here */}

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">MLB Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">33</th>
                                                <td className="brewers">Milwaukee Brewers</td>
                                                <td>{this.state.brewers}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">129</th>
                                                <td className="rockies">Colorado Rockies</td>
                                                <td>{this.state.rockies}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">185</th>
                                                <td className="orioles">Baltimore Orioles</td>
                                                <td>{this.state.orioles}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalMLB}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        {/* Adding Golf Here */}

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">Golfer</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">13</th>
                                                <td className="senators">Colin Morikawa</td>
                                                <td>{this.state.morikawa}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">28</th>
                                                <td className="senators">Rory Mcilroy</td>
                                                <td>{this.state.mcilroy}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">113</th>
                                                <td className="senators">Paul Casey</td>
                                                <td>{this.state.casey}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">159</th>
                                                <td className="senators">Justin Rose</td>
                                                <td>{this.state.rose}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">177</th>
                                                <td className="senators">Sergio Garcia</td>
                                                <td>{this.state.garcia}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalGolf}</td>
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
                    <footer id="sticky-footer" class="py-2 bg-dark text-white-50">
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