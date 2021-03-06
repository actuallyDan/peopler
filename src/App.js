import React, { Component } from 'react';
import Human from './human.js';
import Chart from './Chart.js';

let advance;

class App extends Component {
  constructor(){
    super();

    this.state = {
      advance: false,
      people : [],
      date: 0,
      data : [[0, new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toJSON().substring(0,10)]]
    }
  }
  addPerson(){
    let peopleList = this.state.people;
    let n00b = new Human({});
    peopleList.push(n00b);
    this.setState({
      people : peopleList
    });
  }
  advance(){
    if(this.state.advance){
      let peopleList;
      let data = this.state.data;
      let res;
      advance = setTimeout(()=>{
        peopleList = this.state.people;
        if(peopleList.length === 0){
          clearTimeout(advance);
        } 
        peopleList.map((person)=>{
          res = person.advance1Month();

          switch(res){
            case 0:
            /* Person has died remove from list */
            let deadIndex = peopleList.findIndex((dead)=>{return dead.id === person.id });
            peopleList.splice(deadIndex, 1);
            break;
            case 2:
            /* Person had a bab, add to list */
            peopleList.push(person.children[person.children.length - 1])
            break;
            default:
            break
          }
        });

        data.push([peopleList.length, new Date(new Date().getFullYear(), new Date().getMonth() + this.state.date, new Date().getDate()).toJSON().substring(0,10)])

        this.setState({
          people : peopleList,
          date : this.state.date + 1,
          data : data
        }, this.advance());

      }, 10)
    }
  }
  toggleAdvance(){
    this.setState({
      advance : !this.state.advance
    }, ()=>{
      if(!this.state.advance){
        clearTimeout(advance);
      } else {
        this.advance();
      }
    })
  }
  reset(){
    this.setState({
      date : 0,
      people : [],
      data : [["Population", "Time"],[0, new Date(new Date().getFullYear(), new Date().getMonth() + 0, new Date().getDate()).toJSON().substring(0, 10)]]
    })
  }
  render() {
    return (
      <div className="App">
      <div> People : {this.state.people.length} </div>
      <div> Date : {new Date(new Date().getFullYear(), new Date().getMonth() + this.state.date, new Date().getDate()).toLocaleString()} </div>
      <button onClick={this.addPerson.bind(this)}> Add person </button>
      <button onClick={this.toggleAdvance.bind(this)}> {this.state.advance ? "Stop" : "Go"}</button>
      <button onClick={this.reset.bind(this)}> Reset</button>

      <div >
      {this.state.people.map((person)=>{
        return (
          <div key={person.id}>
          Name: {person.firstName + " " + person.lastName} <br/>
          Age: {Math.floor(person.age)} <br/>
          Education: {person.education} <br/>
          Health: {person.health}<br/>
          <br/>
          </div>
          )

      })}
      </div>

      </div>
      );
    }
  }

  export default App;
