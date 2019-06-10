const initState = {isLoading: false, employee: [], err: ""};

const employee = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_REQUEST':
      return {
        ...state,
        isLoading: true
      };

    case 'FETCH_EMPLOYEES_SUCCESS': 
      return {
        ...state,
        isLoading: false,
        err: '',
        employee: action.employee
      };


    case 'FETCH_EMPLOYEES_FAILURE': 
      return {
        ...state,
        isLoading: false,
        err: action.error
      };

    default:
      return state;
  }
};

export default employee;