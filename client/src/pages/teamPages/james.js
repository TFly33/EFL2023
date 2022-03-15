import React from "react";
import API from "../../utils/API";

class james extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arrays here. Each person's array will include three NBA teams. 
        allNBA: [],
        jamesNBA: "",
        lakers: "",
        pacers: "",
        thunder: "",
        saints: 130,
        falcons: 70,
        lions: 32.5,
        totalNFL: 232.5,
        // EPL States HEre
        manU: "",
        leicester: "",
        jamesEPL: "",
        // NHL HERE
        flames: "",
        panthers: "",
        stars: "",
        totalNHL: ""
    }
    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresEPL();
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

                console.log(centralResults);
                var flamesWins;
                var flamesOTLS;
                var flamesTotal;
                var panthersWins;
                var panthersOTLS;
                var panthersTotal;
                var starsWins;
                var starsOTLS;
                var starsTotal;
                var allNHL;

                // Here is the flames loop. 
                for (var i = 0; i < pacificResults.length; i++) {
                    // flames
                    if (pacificResults[i].team.id === 20) {
                        flamesWins = pacificResults[i].leagueRecord.wins;
                        flamesOTLS = pacificResults[i].leagueRecord.ot;
                        console.log(flamesWins);
                        console.log(flamesOTLS);
                        console.log("this loop is running")
                    }
                }


                // Here is the loop for the panthers
                for (var i = 0; i < atlanticResults.length; i++) {

                    // panthers
                    if (atlanticResults[i].team.id === 13) {
                        panthersWins = atlanticResults[i].leagueRecord.wins;
                        panthersOTLS = atlanticResults[i].leagueRecord.ot;
                        console.log(panthersWins);
                        console.log(panthersOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < centralResults.length; i++) {

                    // stars
                    if (centralResults[i].team.id === 25) {
                        starsWins = centralResults[i].leagueRecord.wins;
                        starsOTLS = centralResults[i].leagueRecord.ot;
                        console.log(starsWins);
                        console.log(starsOTLS);
                        console.log("this loop is running")
                    }
                }

                // panthers total
                panthersTotal = (panthersWins * 2) + panthersOTLS;
                console.log(panthersTotal)

                // stars total
                starsTotal = (starsWins * 2) + starsOTLS;
                console.log(starsTotal);

                // flames total
                flamesTotal = (flamesWins * 2) + flamesOTLS;
                console.log(flamesTotal);

                var allNHL = flamesTotal + panthersTotal + starsTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ flames: flamesTotal });
                this.setState({ panthers: panthersTotal });
                this.setState({ stars: starsTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                console.log(res.data.response[0].league.standings[0])
                var manUWin;
                var manUTie;
                var leicesterWin;
                var leicesterTie;

                // running the for loop here. 
                var forLoopArray = res.data.response[0].league.standings[0]
                for (var i = 0; i < forLoopArray.length; i++) {

                    if (forLoopArray[i].team.id === 33) {
                        manUWin = forLoopArray[i].all.win
                        manUTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + manUWin);
                        console.log("here are the ties" + manUTie);
                    }

                    if (forLoopArray[i].team.id === 46) {
                        leicesterWin = forLoopArray[i].all.win
                        leicesterTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + leicesterWin);
                        console.log("here are the ties" + leicesterTie);
                    }
                }

                var manUTotal = (manUWin * 4.25) + (manUTie);
                var leicesterTotal = (leicesterWin * 4.25) + (leicesterTie);

                // Here is the final result
                var jamesPoints = manUTotal + leicesterTotal;
                this.setState({ manU: manUTotal });
                this.setState({ leicester: leicesterTotal });
                this.setState({ eplTotal: jamesPoints });
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
                var lakersWin = res.data.api.standings[24].win;
                var pacersWin = res.data.api.standings[13].win;
                var thunderWin = res.data.api.standings[29].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doublelakers = (lakersWin * 2);
                var doublepacers = (pacersWin * 2);
                var doublethunder = (thunderWin * 2);

                const tempJamesNBA = this.state.allNBA;

                tempJamesNBA.push(lakersWin);
                tempJamesNBA.push(pacersWin);
                tempJamesNBA.push(thunderWin);

                var JamesDoubledScores = tempJamesNBA.map(team => team * 2);

                var JamesPoints = 0;

                for (var i = 0; i < JamesDoubledScores.length; i++) {
                    JamesPoints += JamesDoubledScores[i];
                }
                console.log(JamesPoints);
                this.setState({ jamesNBA: JamesPoints });
                this.setState({ lakers: doublelakers });
                this.setState({ pacers: doublepacers });
                this.setState({ thunder: doublethunder });
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
                        James
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
                                        <th scope="row">17</th>
                                        <td className="lakers">LA Lakers</td>
                                        <td>{this.state.lakers}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">80</th>
                                        <td className="pacers">Indiana Pacers</td>
                                        <td>{this.state.pacers}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">187</th>
                                        <td className="thunder">OKC Thunder</td>
                                        <td>{this.state.thunder}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.jamesNBA}</td>
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
                                                <th scope="row">15</th>
                                                <td className="saints">New Orleans Saints</td>
                                                <td>{this.state.saints}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">74</th>
                                                <td className="falcons">Atlanta Falcons</td>
                                                <td>{this.state.falcons}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">134</th>
                                                <td className="lions">Detroit Lions</td>
                                                <td>{this.state.lions}</td>
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
                                                <th scope="row">4</th>
                                                <td className="manU">Manchester United</td>
                                                <td>{this.state.manU}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">60</th>
                                                <td className="leicester"> Leicester City</td>
                                                <td>{this.state.leicester}</td>
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
                                                <th scope="row">116</th>
                                                <td className="fPanthers">Florida Panthers</td>
                                                <td>{this.state.flames}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">136</th>
                                                <td className="stars">Dallas Stars</td>
                                                <td>{this.state.stars}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">117</th>
                                                <td className="flames">Calgary Flames</td>
                                                <td>{this.state.flames}</td>
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

export default james;