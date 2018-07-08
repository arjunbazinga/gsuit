function getTimeString(ts, timezone) {
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
  
  var ans = months[l[1]]+ " " + l[0] + ", " + l[2] + timezone
  
  return ans 
}

function getDateObject(date, time){
  var temp = date + " " + time
  return new Date(getTimeString(temp))
}


function getbody(values) {
  
  var ans = ""
  for(var propt in values){
    ans = ans + propt + " : "  + values[propt] + "\n";
  }
  
  return ans
}

function autoResponder(e){
  var timeZone = " +0530";
  var color = CalendarApp.EventColor.PALE_GREEN;
  var title = "Review Decision"
  
  var date = e.namedValues["Date"][0] ; 
  var time = e.namedValues["Time"][0] ;
  
    var on = getDateObject(date, time, timeZone) ; 
    var body = getbody(e.namedValues) ;
  
    CalendarApp.getDefaultCalendar().createEvent(title, on, on, {description: body}).setColor(color) ;
  
}