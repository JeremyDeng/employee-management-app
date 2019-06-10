const axios = require("axios");

function getEmployeeStart() {
  return {
    type: "FETCH_EMPLOYEE_REQUEST"
  };
}

function getEmployeeFail(error) {
  return {
    type: "FETCH_EMPLOYEE_FAILURE",
    err: error
  };
}

function getEmployeeSuccess(response) {
  return {
    type: "FETCH_EMPLOYEES_SUCCESS",
    employee: response
  };
}

function getDetailSuccess(response) {
  return {
    type: "FETCH_DETAIL_SUCCESS",
    detail: response,
    manager: response.manager,
    reporters: response.reporters
  };
}

function getDetailStart() {
  return {
    type: "FETCH_DETAIL_REQUEST"
  };
}

function getDetailFail() {
  return {
    type: "FETCH_DETAIL_FAIL"
  };
}

function getManagerSuccess(response, id) {
  return {
    type: "FETCH_MANAGERS_SUCCESS",
    managers: response,
    id: id
  };
}

export const toggle = val => {
  return {
    type: "TOGGLE",
    value: val
  };
};

export function addEmployee(employee) {
  return (dispatch, getState) => {
    axios
      .post("http://localhost:5000/api/employee", employee)
      .then(response => {
        dispatch(getEmployeeSuccess(response.data.employee));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  };
}

export function getEmployees() {
  return (dispatch, getState) => {
    dispatch(getEmployeeStart());
    axios
      .get("http://localhost:5000/api/employees")
      .then(response => {
        dispatch(getEmployeeSuccess(response.data.employee));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  };
}

export function getEmployeeDetail(id) {
  return (dispatch, getState) => {
    dispatch(getDetailStart());
    axios
      .get(`http://localhost:5000/api/employee/${id}`)
      .then(response => {
        dispatch(getDetailSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDetailFail(err));
      });
  };
}

export function deleteEmployee(id) {
  return (dispatch, getState) => {
    axios
      .delete(`http://localhost:5000/api/employee/${id}`)
      .then(response => {
        dispatch(getEmployeeSuccess(response.data.employee));
      })
      .catch(err => {
        dispatch(getDetailFail(err));
      });
  };
}

export function editEmployee(id, user) {
  return (dispatch, getState) => {
    axios
      .put(`http://localhost:5000/api/employee/${id}`, user)
      .then(response => {
        dispatch(getEmployeeSuccess(response.data.employee));
      })
      .catch(err => {
        dispatch(getDetailFail(err));
      });
  };
}