
export const DateFormat = (dateToString:string) => {
    if (!dateToString || isNaN(new Date(dateToString).getTime())) {
      return "";
    }
  
    let dateStr = dateToString.toString();
  
    let day, month, year; 
  
    if (dateStr?.includes("T")) {
      const localDate = new Date(dateStr);
      year = localDate.getFullYear();
      month = (localDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      day = localDate.getDate().toString().padStart(2, "0");
    } else if (dateStr?.includes("/")) {
      [day, month, year] = dateStr?.split("/");
    } else if (dateStr?.includes("-")) {
      [year, month, day] = dateStr?.split("-");
    } else {
      return "";
    }
  
    
  
    const formattedDay = day?.padStart(2, "0");
    const formattedMonth = month?.padStart(2, "0");
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  
  