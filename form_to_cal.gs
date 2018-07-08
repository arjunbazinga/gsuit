function get_time_string(ts) {
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
  
  ans = months[l[1]]+ " " + l[0] + ", " + l[2] + " +0530"
  
  return ans 
}

function autoResponder(e){
  var time = e.values[0]
  var book_name = e.values[1]
  var author = e.values[2]
  var reccomender = e.values[3]
  var reason = e.values[4]
  var link = e.values[5]
  
  var title = "Read: "+ book_name + " by " + author
  var des = "Reccomended by: " + reccomender + "\n Reason: " + reason + "\n Link: " + link
  var ts = get_time_string(time)
  var color = CalendarApp.EventColor.PALE_BLUE
  
  CalendarApp.getDefaultCalendar().createEvent(title,
                                               new Date(ts),
                                               new Date(ts),
                                               {description: des}).setColor(color);
  
  

}