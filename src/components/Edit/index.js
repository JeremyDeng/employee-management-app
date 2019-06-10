import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import image from "../avatarData/image.js";
import { Link} from "react-router-dom";

const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

class Edit extends Component{
    constructor(props) {
        super(props);
        this.state = {
          _id: "",
          avatar: null,
          firstName: "",
          lastName: "",
          title: "",
          gender: "Male",
          age: "",
          cellPhone: "",
          email: "",
          manager: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            _id: nextProps.detail._id,
            avatar: nextProps.detail.avatar,
            firstName: nextProps.detail.firstName,
            lastName: nextProps.detail.lastName,
            title: nextProps.detail.title,
            gender: nextProps.detail.gender,
            age: nextProps.detail.age,
            cellPhone: nextProps.detail.cellPhone,
            email: nextProps.detail.email,
            manager: nextProps.detail.manager
        });
    }

    avatarChange = e => {
            if (e.target.value) {
            let file = e.target.files[0];
            getBase64(file).then(base64 => {
                this.setState({ avatar: base64 });
            });
            }
        };

    firstNameChange = e => {
        this.setState({firstName: e.target.value});
    };

    lastNameChange = e => {
        this.setState({lastName: e.target.value});
    };

    titleChange = e => {
        this.setState({ title: e.target.value });
      };
    
    genderChange = e => {
        this.setState({ gender: e.target.value });
    };
    
    ageChange = e => {
        this.setState({ age: e.target.value });
    };
    
    cellPhoneChange = e => {
            this.setState({ cellPhone: e.target.value });
    };

    emailChange = e => {
        this.setState({ email: e.target.value });
    };
    
    managerChange = e => {
        this.setState({ manager: e.target.value });
    };
    
    handleClick = () => {
        this.props.history.push("/");
    }

    onSubmit = e => {
        e.preventDefault();
        let user = {
          avatar: this.state.avatar,  
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          title: this.state.title,
          gender: this.state.gender,
          age: this.state.age,
          cellPhone: this.state.cellPhone,
          email: this.state.email,
          manager: this.state.manager,
        };
        this.props.dispatch(actions.editEmployee(this.state._id, user));
    };
      
    render () {
        return (
            <div>
                <h1>Edit employee</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {this.state.avatar === null ? (
                        <img src={image} />
                        ) : (
                        <img src={this.state.avatar} />
                        )}
                    </div>
                    <div className="custom-file" style={{width: "400px"}}>
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            accept=".jpg, .jpeg, .png"
                            onChange={this.avatarChange}
                        />
                        <label class="custom-file-label" htmlFor="inputGroupFile01">
                            Upload Picture
                        </label>
                    </div>
                    <div className="form-group" style={{width: "400px"}}> 
                        <label>First Name : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.firstNameChange}
                                placeholder = "First Name"
                        />
                    </div>

                    <div className="form-group" style={{width: "400px"}}> 
                        <label>Last Name : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.lastNameChange}
                                placeholder = "Last Name"
                        />
                    </div>
                    
                    <div className="form-group" style={{width: "400px"}}> 
                        <label>Title : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.titleChange}
                                placeholder = "Title"
                        />
                    </div>

                    <div className="form-group" style={{width: "400px"}}> 
                        <label>Gender : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.gender}
                                onChange={this.genderChange}
                                placeholder = "Gender"
                        />
                    </div>

                    <div className="form-group" style={{width: "400px"}}> 
                        <label>Age : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.age}
                                onChange={this.ageChange}
                                placeholder = "Age"
                        />
                    </div>

                    <div className="form-group" style={{width: "400px"}}> 
                        <label>Cell Phone : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.cellPhone}
                                onChange={this.cellPhoneChange}
                                placeholder = "Cell Phone"
                        />
                    </div>

                    <div className="form-group" style={{width: "400px"}}> 
                        <label>E-mail : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.emailChange}
                                placeholder = "E-mail"
                        />
                    </div>

                    <div className="form-group" style={{width: "400px"}}> 
                        <label>Manager : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.manager}
                                onChange={this.managerChange}
                                placeholder = "Manager"
                        />
                    </div>

                    <Link to="/">
                        <button type="submit" class="btn btn-secondary back-btn">
                        Back
                        </button>
                    </Link>
                    <button type="submit" class="btn btn-primary create-btn" onClick={this.handleClick}>
                        Confirm
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      employee: state.employee,
      detail: state.detail
    };
};
  
  export default connect(mapStateToProps)(Edit);