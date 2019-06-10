const redirect = (state = false, action) => {
    switch (action.type) {
      case "TOGGLE":
        return action.value;
        break;
      default:
        return state;
    }
  };
  
  export default redirect;