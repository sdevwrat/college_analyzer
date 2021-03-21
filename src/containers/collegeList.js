import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from 'axios';

const mediaMatch = window.matchMedia('(min-width: 500px)');

class CollegeList extends React.Component {

    constructor(){
        super();
        this.state = {
            showId:null,
            showStudId:null,
            students:[]
        }
    }

    toggleStudent = (id) =>{
        this.setState({
            showStudId:this.state.showStudId === id ?null:id,
        })
    }

    toggle = async(id) =>{
        try{
            const params = {
                college_id:id
            }
            const resp = await axios.get('http://localhost:8000/students',{params})
            this.setState({
                showId:this.state.showId === id ?null:id,
                students:resp.data
            })
        }catch(err){
            console.log(err);
        }
    }

  render(){
    return (
        <div>
            <div className="itemTitle">
                {this.props.title}
            </div>
            <div>
            <ol>
                {this.props.colleges.map((college) => {
                    return (
                        <>
                        <li key={college._id} className="listItem" onClick={() => this.toggle(college.name)}>{college.name}</li>
                        {this.state.showId === college.name && 
                        <div className="table" style={{border:"1px solid"}}>
                        <Table>
                            <Thead className="thead">
                                <Tr style={{border:"1px solid"}}>
                                <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>College Name</Th>
                                <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>City</Th>
                                <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>State</Th>
                                <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>Country</Th>
                                <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>Year Founded</Th>
                                <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>Courses</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr style={{borderLeft:"1px solid"}}>
                                <Td>{college.name}</Td>
                                <Td>{college.city}</Td>
                                <Td>{college.state}</Td>
                                <Td>{college.country}</Td>
                                <Td>{college.founded_year}</Td>
                                <Td>{college.courses.map((course)=>{
                                    return (
                                        <span>{course},</span>
                                    )
                                })}
                                </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                            <div>
                            <div className="itemTitle studentListTitle" style={{textAlign:"left",margin:"8px 0 8px 4%"}}>
                                List of Students
                            </div>
                                <ol style={{width:"100px"}}>
                                    {this.state.students.map(student => {
                                        return(
                                            <>
                                            <li key={student._id} className="listItem" onClick={() => this.toggleStudent(student._id)}>{student.name}</li>
                                            {this.state.showStudId === student._id && 
                                                <Table style={{width:"400px",margin:"10px"}}>
                                                <Thead className="thead">
                                                    <Tr style={{border:"1px solid"}}>
                                                    <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>Student Name</Th>
                                                    <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>Batch Year</Th>
                                                    <Th style={{width:"400px",borderBottom:"1px solid",color:"#779090"}}>Skills</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr style={{borderLeft:"1px solid"}}>
                                                    <Td>{student.name}</Td>
                                                    <Td>{student.batch_year}</Td>
                                                    <Td>{student.skills.map((skill)=>{
                                                        return (
                                                            <span>{skill},</span>
                                                        )
                                                    })}
                                                    </Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                            }
                                        </>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                        }
                        </>
                    )
                })}
            </ol> 
            </div>
        </div>
    );
  }
}

export default CollegeList;
