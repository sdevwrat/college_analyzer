import React from 'react';
import StateChart from './pieChart';
import CollegeList from './collegeList';
import axios from 'axios'
import _ from 'lodash';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
        state_wise_data:[],
        course_wise_data:[],
        colleges:[],
        title:'',
    }
  }

  getColleges = async (params) =>{
    console.log(params.state,params.courses)
    let resp = await axios.get("https://aqueous-beach-38254.herokuapp.com/colleges",{params});
    let title = '';
    if(params.state)
        title = `List of Colleges in ${params.state}`
    else if(params.courses)
    title = `List of Colleges having course ${params.courses}`
    this.setState({colleges:resp.data,title})
  }

  componentDidMount = async() =>{
    try{
        let resp = await axios.get("https://aqueous-beach-38254.herokuapp.com/colleges");
        const arr = resp.data;

        //group state wise
        var state_wise = _.mapValues(_.groupBy(arr, 'state'),clist => clist.map(arr => _.omit(arr, 'state')));
        let state_wise_data = [];
        Object.entries(state_wise).forEach(([state, colleges]) => {
            let percent = colleges.length*100/arr.length;
            state_wise_data.push({state,percent})
        });

        // count course wise
        var counts = {};
        for(var i=0;i<arr.length;i++){
            var courses = arr[i].courses;
            for (var j = 0; j < courses.length; j++) {
                counts[courses[j]] = counts[courses[j]] ? counts[courses[j]] + 1 : 1;
            }
        }
        let course_wise_data = [];
        Object.entries(counts).forEach(([courses, count]) => {
            let percent = count*100/arr.length;
            course_wise_data.push({courses,percent})
        });
        course_wise_data.sort((a, b) => a.courses.localeCompare(b.courses));


        this.setState({ state_wise_data, course_wise_data })
    }catch(err){
      console.log(err);
    }
  }

  render(){
      const {colleges,state_wise_data,course_wise_data,title} = this.state;
    return (
      <div className="Dashboard">
          <div className="chartRow">
            <div className="chartCol">
            <div className="chartTitle">State-wise distribution of colleges</div>
            <StateChart data = {state_wise_data} field = {"state"} getColleges = {this.getColleges}/>
            </div>
            <div className="chartCol">
            <div className="chartTitle">Course-wise distribution of colleges</div>
            <StateChart data = {course_wise_data} field = {"courses"} getColleges = {this.getColleges} />
            </div>
            {!!colleges.length &&
            <div>
                <CollegeList colleges = {colleges} title = {title}/>
            </div>
            }
          </div>
      </div>
    );
  }
}

export default Dashboard;
