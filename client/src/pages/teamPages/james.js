import React from "react";
import API from "../../utils/API";

class james extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arrays here. Each person's array will include three NBA teams. 
        allNBA: [],
        jamesNBA: "",
        bucks: "",
        thunder: "",
        suns: "",
        saints: 130,
        falcons: 70,
        lions: 32.5,
        totalNFL: 232.5,
        // EPL States HEre
        newcastle: "",
        palace: "",
        jamesEPL: "",
        // NHL HERE
        flames: "",
        pens: "",
        wild: "",
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
                var pensWins;
                var pensOTLS;
                var pensTotal;
                var wildWins;
                var wildOTLS;
                var wildTotal;
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

                // flames total
                flamesTotal = (flamesWins * 2) + flamesOTLS;
                console.log(flamesTotal);

                // Here is the loop for the pens
                for (var i = 0; i < metroResults.length; i++) {

                    // pens
                    if (metroResults[i].team.id === 5) {
                        pensWins = metroResults[i].leagueRecord.wins;
                        pensOTLS = metroResults[i].leagueRecord.ot;
                        console.log(pensWins);
                        console.log(pensOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < centralResults.length; i++) {

                    // wild
                    if (centralResults[i].team.id === 30) {
                        wildWins = centralResults[i].leagueRecord.wins;
                        wildOTLS = centralResults[i].leagueRecord.ot;
                        console.log(wildWins);
                        console.log(wildOTLS);
                        console.log("this loop is running")
                    }
                }

                // pens total
                pensTotal = (pensWins * 2) + pensOTLS;
                console.log(pensTotal)

                // wild total
                wildTotal = (wildWins * 2) + wildOTLS;
                console.log(wildTotal);

                var allNHL = flamesTotal + pensTotal + wildTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ flames: flamesTotal });
                this.setState({ pens: pensTotal });
                this.setState({ wild: wildTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                // HERE ARE EPL TEAMS FOR James. 
                //  NewCastle
                var newcastleWin = res.data.api.standings[0][12].all.win;
                var newcastleTie = res.data.api.standings[0][12].all.draw;
                var newcastleTotal = (newcastleWin * 4.25) + (newcastleTie);

                // Now Crystal Palace results
                var palaceWin = res.data.api.standings[0][8].all.win;
                var palaceTie = res.data.api.standings[0][8].all.draw;
                var palaceTotal = (palaceWin * 4.25) + (palaceTie)

                // Here is the final result
                var jamesPoints = newcastleTotal + palaceTotal
                this.setState({ jamesEPL: jamesPoints });
                this.setState({ newcastle: newcastleTotal });
                this.setState({ palace: palaceTotal });

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
                var bucksWin = res.data.api.standings[10].win;
                var thunderWin = res.data.api.standings[28].win;
                var sunsWin = res.data.api.standings[24].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doubleBucks = (bucksWin * 2);
                var doubleThunder = (thunderWin * 2);
                var doubleSuns = (sunsWin * 2);

                const tempJamesNBA = this.state.allNBA;

                tempJamesNBA.push(bucksWin);
                tempJamesNBA.push(thunderWin);
                tempJamesNBA.push(sunsWin);

                var JamesDoubledScores = tempJamesNBA.map(team => team * 2);

                var JamesPoints = 0;

                for (var i = 0; i < JamesDoubledScores.length; i++) {
                    JamesPoints += JamesDoubledScores[i];
                }
                console.log(JamesPoints);
                this.setState({ jamesNBA: JamesPoints });
                this.setState({ bucks: doubleBucks });
                this.setState({ thunder: doubleThunder });
                this.setState({ suns: doubleSuns });
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
                                        <th scope="row">6</th>
                                        <td>Milwaukee Bucks</td>
                                        <td>{this.state.bucks}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">94</th>
                                        <td>Oklahoma City Thunder</td>
                                        <td>{this.state.thunder}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">127</th>
                                        <td>Phoenix Suns</td>
                                        <td>{this.state.suns}</td>
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
                                                <td>New Orleans Saints</td>
                                                <td>{this.state.saints}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">74</th>
                                                <td>Atlanta Falcons</td>
                                                <td>{this.state.falcons}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">134</th>
                                                <td>Detroit Lions</td>
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
                                                <th scope="row">67</th>
                                                <td>Newcastle</td>
                                                <td>{this.state.newcastle}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">87</th>
                                                <td>Crystal Palace</td>
                                                <td>{this.state.palace}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.jamesEPL}</td>
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
                                                <th scope="row">35</th>
                                                <td>Calgary Flames</td>
                                                <td>{this.state.flames}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">48</th>
                                                <td>Pittsburgh Penguins</td>
                                                <td>{this.state.pens}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">117</th>
                                                <td>Minnesota Wild</td>
                                                <td>{this.state.wild}</td>
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