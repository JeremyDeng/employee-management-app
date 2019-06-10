const detail = (state = {}, action) => {
    switch (action.type) {
      case "FETCH_DETAIL_REQUEST":
        return {
          isLoading: true
        };
  
      case "FETCH_DETAIL_SUCCESS":
        return {
          isLoading: false,
          err: "",
          detail: action.detail.employee,
          manager: action.manager.length === 1 ? action.manager[0] : null,
          reporters: action.reporters
        };
  
      case "FETCH_DETAIL_FAIL":
        return {
          isLoading: false,
          err: action.err
        };
  
      default:
        return state;
    }
  };
  
  export default detail;