const makeDate = () => {
    let date = new Date();
  
    let formattedDate = "";
   
    formattedDate += (date.getMonth() + 1) + "_";
    
    formattedDate += date.getDate() + "_";
    
    formattedDate += date.getFullYear();
   
    return formattedDate;
  };
  
  module.exports = makeDate;