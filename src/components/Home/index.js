import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import * as actions from "../../actions";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from "../avatarData/image.js";


const List = (props, handleDelete, handleEdit) => {
    return (
        <tr className="list">
            <td>
                {
                  !props.data.avatar ? (
                  <img src={image} className="li-avatar" width={50} height={50}/>
                  ) : (
                  <img src={props.data.avatar} className="li-avatar" width={50} height={50}/>
                )}
            </td>
            <td className="li-firstName">{props.data.firstName}</td>
            <td className="li-lastName">{props.data.lastName}</td>
            <td className="li-title">{props.data.title}</td>
            <td className="li-gender">{props.data.gender}</td>
            <td className="li-age">{props.data.age}</td>
            <td className="li-startDate">{props.data.startDate}</td>
            <td className="li-cellPhone">
            <a href={`tel:${props.data.cellPhone}`}>{props.data.cellPhone}</a>
            </td>
            <td className="li-email">
                <a href={`mailto:${props.data.email}`}>{props.data.email}</a>
            </td>
            <td className="li-manager" >
                {/* <button type="button" onClick={()=>props.getManager(props.data.manager)}> */}
                {props.data.manager}
                {/* </button> */}
            </td>
            <td className="li-directReports">{props.data.directReports.length}</td>  
            <td>
                <button type="button" className="btn btn-outline-primary" id="edit-btn" onClick = {() => props.handleEdit(props.data._id)}>
                <i className="fas fa-edit" />
                Edit
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-outline-secondary" id="delete-btn" onClick = {() => props.handleDelete(props.data._id)}>
                <i className="fas fa-trash-alt" />
                Delete
                </button> 
            </td>
      </tr>
    );
  };

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
          search: "",
      };
    }
  
    componentDidMount() {
      this.props.dispatch(actions.getEmployees());
    }

    getManager = (id) => {
        
    };

    handleEdit = (id) => {
        this.props.history.push(`/edit/${id}`);
    };

    handleDelete = (id) => {
        this.props.dispatch(actions.deleteEmployee(id));
    };

    handleChange = e => {
        this.setState({ search: e.target.value });
    }

    isMatch = (user) => {
        return(
            user.firstName.search(new RegExp(this.state.search, "i")) !== -1 || 
            user.lastName.search(new RegExp(this.state.search, "i")) !== -1     
        )
    }

    render() {
      return (
        <div>
          <h1>Employee Management</h1>
          <div>
                    <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
          </div>
          <Link to="/create">
            <button type="button" className="btn btn-light">
              Create
            </button>
          </Link>
          <Table striped bordered hover>
            <thead>
                <tr>
                    <th >Avatar</th>
                    <th >First Name</th>
                    <th>Last Name</th>
                    <th>Title</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Start Date</th>
                    <th>Cell Phone</th>
                    <th>E-mail</th>
                    <th>Manager</th>
                    <th># of DR</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody className="scroll">
                    {
                        this.props.employee.employee.filter((data) => this.isMatch(data)).map((employee, index) => {
                            return <List 
                                key={index} 
                                data={employee} 
                                getManager={this.getManager}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                            />;
                    })} 
            </tbody>
          </Table>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      employee: state.employee
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        getEmployees: () => {
            dispatch(actions.getEmployees)
        },
        deleteEmployee: (id) => {
            dispatch(actions.deleteEmployee(id));
        }
    }
}

  export default connect(mapStateToProps)(Home);