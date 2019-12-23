import React, { Component } from 'react';
import "./Table.css";
import API from "../../utils/API";


// This table is being used for the Home Page currently, but not for the My Teams page. I am going to create that table separately. 

class Table extends Component {

    //since we are extending class Table so we have to use super in order to override Component class constructor
    state = {
        allTeams: [],
        allNBA: [],
        tomNBA: "",
    }

    componentDidMount() {
        // first we scrape. Inside the function, need to post to the Mongo DB. 
        this.getScoresNBA();
        // Now, once the updates have applied, we call the getteams. This will show updated results. 
    };

    getScoresNBA = () => {
        API.getScoresNBA()
            .then(res => {
                console.log(res);
                console.log(res.data.api.standings);
                var heatWin = res.data.api.standings[0].win;
                var netsWin = res.data.api.standings[1].win;
                var spursWin = res.data.api.standings[2].win;

                const tempNBA = this.state.allNBA;

                tempNBA.push(heatWin);
                tempNBA.push(netsWin);
                tempNBA.push(spursWin);

                var doubledScores = tempNBA.map(team => team * 2);

                var TomPoints = 0;
                
               for(var i = 0; i < doubledScores.length; i++) {
                TomPoints += doubledScores[i];
               }
                
                console.log(TomPoints);
                this.setState({tomNBA: TomPoints})
            })
            .catch(error =>{
            console.log(error)
            });
    }

    // This will be the function used to show the teams. 
    // getTeams = () => {
    //     API.getTeams()
    //         .then(res =>
    //             this.setState({ allTeams: res.data })
    //             // console.log(res)
    //         )
    //         .catch(err => console.log(err));
    // }

    // This is the table that will get returned. It includes the values of each individual row, which we construct and collectively call "teams"
    // returnTable() {
    //     // return this.state.allTeams.map((teams, index) => {
    //     //     const { name, EPL, NFL, NHL, NBA, MLB, totalPoints } = teams //Here is a destructuring of the teams list. 
    //         return (
    //             <tr key={index}>
    //                 <td>{name}</td>
    //                 <td>{EPL}</td>
    //                 <td>{NFL}</td>
    //                 <td>{NHL}</td>
    //                 <td>{this.state.tomNBA}</td>
    //                 <td>{MLB}</td>
    //                 <td>{totalPoints}</td>
    //             </tr>
    //         )
    //     })
    // }

    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div className="container">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Team</th>
                            <th scope="col">EPL</th>
                            <th scope="col">NFL</th>
                            <th scope="col">NHL</th>
                            <th scope="col">NBA</th>
                            <th scope="col">MLB</th>
                            <th scope="col">Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* returning the state. Eventually this will be an API call to the mongo database, which will include each user's team info. For now, going to have a hard-coded table. */}
                        {/* {this.returnTable()} */}
                        <tr>
                            <th scope="col">Team</th>
                            <th scope="col">EPL</th>
                            <th scope="col">NFL</th>
                            <th scope="col">NHL</th>
                            <th scope="col">{this.state.tomNBA}</th>
                            <th scope="col">MLB</th>
                            <th scope="col">Total Points</th>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}


// Let's export the table.
export default Table;