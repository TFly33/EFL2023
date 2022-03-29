import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";

class joe extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arpadres here. Each person's array will include three NBA teams. 
        allNBA: [],
        joeNBA: "",
        nets: "",
        warriors: "",
        heat: "",
        // colts: 70,
        // vikings: 100,
        // raiders: 70,
        // totalNFL: 240,
        // EPL HERE
        liverpool: "",
        aston: "",
        joeEPL: "",
        // NHL Here
        blues: "",
        kings: "",
        redWings: "",
        // Golf here
        dechambeau: "",
        finau: "",
        simpson: "",
        scott: "",
        vanRooyen: "",
        totalGolf: "",
        // MLB Here
        padres: "",
        mariners: "",
        royals: "",
        totalMLB: ""
    }
    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresEPL();
        this.getScoresNHL();
        this.getScoresPGA();
        this.getScoresMLB();
    }

    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                var padresWin;
                var marinersWin;
                var royalsWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )

                    // padres
                    if (fullIndex[i].team.id === 30) {
                        padresWin = fullIndex[i].games.win.total
                    }

                    // royals
                    if (fullIndex[i].team.id === 16) {
                        royalsWin = fullIndex[i].games.win.total
                    }

                    // mariners
                    if (fullIndex[i].team.id === 32) {
                        marinersWin = fullIndex[i].games.win.total
                    }

                }

                var allMLB = padresWin + royalsWin + marinersWin;

                this.setState({ totalMLB: allMLB });
                this.setState({ padres: padresWin });
                this.setState({ royals: royalsWin });
                this.setState({ mariners: marinersWin });

            });
    };

    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ finau: x.Finau });
        this.setState({ dechambeau: x.Dechambeau });
        this.setState({ simpson: x.Simpson });
        this.setState({ scott: x.Scott });
        this.setState({ vanRooyen: x.VanRooyen });
        var allGolf = x.VanRooyen + x.Finau + x.Dechambeau + x.Scott + x.Simpson;
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
                var bluesWins;
                var bluesOTLS;
                var bluesTotal;
                var kingsWins;
                var kingsOTLS;
                var kingsTotal;
                var redWingsWins;
                var redWingsOTLS;
                var redWingsTotal;
                var allNHL;

                // Here is the blues loop. 
                for (var i = 0; i < centralResults.length; i++) {
                    // blues
                    if (centralResults[i].team.id === 19) {
                        bluesWins = centralResults[i].leagueRecord.wins;
                        bluesOTLS = centralResults[i].leagueRecord.ot;
                        console.log(bluesWins);
                        console.log(bluesOTLS);
                        console.log("this loop is running")
                    }
                }

                // Here is the loop for the kings
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

                for (var i = 0; i < atlanticResults.length; i++) {

                    // red wings
                    if (atlanticResults[i].team.id === 17) {
                        redWingsWins = atlanticResults[i].leagueRecord.wins;
                        redWingsOTLS = atlanticResults[i].leagueRecord.ot;
                        console.log(redWingsWins);
                        console.log(redWingsOTLS);
                        console.log("this loop is running")
                    }

                }

                // blues total
                bluesTotal = (bluesWins * 2) + bluesOTLS;
                console.log(bluesTotal);

                // kings total
                kingsTotal = (kingsWins * 2) + kingsOTLS;
                console.log(kingsTotal)

                // redWings total
                redWingsTotal = (redWingsWins * 2) + redWingsOTLS;
                console.log(redWingsTotal);

                var allNHL = bluesTotal + kingsTotal + redWingsTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ blues: bluesTotal });
                this.setState({ kings: kingsTotal });
                this.setState({ redWings: redWingsTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                console.log(res.data.response[0].league.standings[0])
                var brentfordWin;
                var brentfordTie;
                var southhamptonWin;
                var southhamptonTie;

                // running the for loop here. 
                var forLoopArray = res.data.response[0].league.standings[0]
                for (var i = 0; i < forLoopArray.length; i++) {

                    if (forLoopArray[i].team.id === 55) {
                        brentfordWin = forLoopArray[i].all.win
                        brentfordTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + brentfordWin);
                        console.log("here are the ties" + brentfordTie);
                    }

                    if (forLoopArray[i].team.id === 41) {
                        southhamptonWin = forLoopArray[i].all.win
                        southhamptonTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + southhamptonWin);
                        console.log("here are the ties" + southhamptonTie);
                    }
                }

                var brentfordTotal = (brentfordWin * 4.25) + (brentfordTie);
                var southhamptonTotal = (southhamptonWin * 4.25) + (southhamptonTie);

                // Here is the final result
                var joePoints = brentfordTotal + southhamptonTotal;
                this.setState({ brentford: brentfordTotal });
                this.setState({ southhampton: southhamptonTotal });
                this.setState({ eplTotal: joePoints });

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
                var netsWin = res.data.api.standings[6].win;
                var warriorsWin = res.data.api.standings[20].win;
                var heatWin = res.data.api.standings[2].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doublenets = (netsWin * 2);
                var doublewarriors = (warriorsWin * 2);
                var doubleheat = (heatWin * 2);

                const tempjoeNBA = this.state.allNBA;

                tempjoeNBA.push(netsWin);
                tempjoeNBA.push(warriorsWin);
                tempjoeNBA.push(heatWin);

                var joeDoubledScores = tempjoeNBA.map(team => team * 2);

                var joePoints = 0;

                for (var i = 0; i < joeDoubledScores.length; i++) {
                    joePoints += joeDoubledScores[i];
                }
                console.log(joePoints);
                this.setState({ joeNBA: joePoints });
                this.setState({ nets: doublenets });
                this.setState({ warriors: doublewarriors });
                this.setState({ heat: doubleheat });
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
                        Joe
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
                                        <th scope="row">7</th>
                                        <td className="nets">Brooklyn Nets</td>
                                        <td>{this.state.nets}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">25</th>
                                        <td className="warriors">Golden State Warriors</td>
                                        <td>{this.state.warriors}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">36</th>
                                        <td className="heat">Miami Heat</td>
                                        <td>{this.state.heat}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.joeNBA}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="container smallTable">
                            {/* Here is NFL */}
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
                                                <th scope="row">27</th>
                                                <td className="colts">Indianapolis Colts</td>
                                                <td>{this.state.colts}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">58</th>
                                                <td className="vikings">Minnesota Vikings</td>
                                                <td>{this.state.vikings}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">130</th>
                                                <td className="raiders">Oakland Raiders</td>
                                                <td>{this.state.raiders}</td>
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
                                                <th scope="row">63</th>
                                                <td className="brentford">Brentford</td>
                                                <td>{this.state.brentford}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">78</th>
                                                <td className="southhampton">Southhampton</td>
                                                <td>{this.state.southhampton}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.eplTotal}</td>
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
                                                <th scope="row">144</th>
                                                <td className="blues">St. Louis Blues</td>
                                                <td>{this.state.blues}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">157</th>
                                                <td className="kings">Los Angeles Kings</td>
                                                <td>{this.state.kings}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">119</th>
                                                <td className="redwings">Detroit Red Wings</td>
                                                <td>{this.state.redWings}</td>
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
                                                <th scope="row">93</th>
                                                <td className="padres">San Diego Padres</td>
                                                <td>{this.state.padres}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">118</th>
                                                <td className="mariners">Seattle Mariners</td>
                                                <td>{this.state.mariners}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">133</th>
                                                <td className="royals">Kansas City Royals</td>
                                                <td>{this.state.royals}</td>
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
                                                <th scope="row">14</th>
                                                <td className="senators">Bryson Dechambeau</td>
                                                <td>{this.state.dechambeau}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">51</th>
                                                <td className="senators">Tony Finau</td>
                                                <td>{this.state.finau}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">88</th>
                                                <td className="senators">Webb Simpson</td>
                                                <td>{this.state.simpson}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">175</th>
                                                <td className="senators">Adam Scott</td>
                                                <td>{this.state.scott}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">186</th>
                                                <td className="senators">Erik Van Rooyen</td>
                                                <td>{this.state.vanRooyen}</td>
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

export default joe;