function getTimeString(ts) {
  var months = {"01":"January",
                "02":"February",
                "03":"March",
                "04":"April",
                "05":"May",
                "06":"June",
                "07":"July",
                "08":"August",
                "09":"September",
                "10":"October",
                "11":"November",
                "12":"December"}
  
  var l = ts.split("/")
   
  // very hacky assuming IST.
  var ans = months[l[1]]+ " " + l[0] + ", " + l[2] + " +0530"
  
  return ans 
}

function getDateObject(date, time){
  var temp = date + " " + time
  return new Date(getTimeString(temp))
}

function getHoursAndMinutes(start, end) {
  var diff = end.getTime() - start.getTime() ;
  var sec=1000;
  var min=60*sec;
  var hour=60*min;
  var hours=Math.floor(diff/hour);
  var minutes=Math.floor(diff%hour/min);
  return [hours, minutes] ;
}

function getDescription(notes, start, end, ts) {
  var temp = getHoursAndMinutes(start, end) ; 
  var hours = temp[0] ; 
  var minutes = temp[1] ; 
  
  var ans = "Slept for: " + hours + " hours and " + minutes + " minutes \n Notes: " + notes + "\n added on : " + ts ;
  
  return ans ;
}

function autoResponder(e){
  var ts = e.values[0] ; 
  var startTime = e.values[1] ;
  var startDate = e.values[2] ;
  var notes = e.values[3] ; 
  var endTime = e.values[4] ; 
  var endDate = e.values[5] ;
  
  Logger.log(startDate)
  var title = "Slept" ; 
  var start = getDateObject(startDate, startTime) ;
  var end = getDateObject(endDate, endTime) ;
  var description = getDescription(notes, start, end,ts) ;
  var color = CalendarApp.EventColor.GRAY ;
  
  CalendarApp.getDefaultCalendar().createEvent(title, start, end, {description: description}).setColor(color) ;
  
}