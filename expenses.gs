function getConfig() {
  
  var config = {
                "email": "arjunsrivastava15499@gmail.com",
                "from": ["Paytm", "Debit card", "Smart card", "Cash"],
                "to": ["Mess", "Tea Post", "La fresco", "Cafeteria", "Zippy"],
                "formName": "Expenses",
                "sheetName": "Expenses Responses"
            }
  
  return  config
}
function init() {
  var config = getConfig()
  
  // creating Form
  var form = create_form(config.formName, cofing.from, config.to);
  
  // linking to spreadsheet
  var ss = SpreadsheetApp.create(config.sheetName)
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  // adding triggers
  ScriptApp.newTrigger('onSubmitCustom')
      .forSpreadsheet(ss)
      .onFormSubmit()
      .create();
  
  ScriptApp
     .newTrigger("sendReviewMail")
     .timeBased()
     .onMonthDay(1)
  
  var link  = form.getPublishedUrl()
  
  Logger.log("", "All done!", "visit here: " + link);
}



function create_form(name, from, to){
  var form = FormApp.create(name);
  var text_is_number  = FormApp.createTextValidation().requireNumberGreaterThanOrEqualTo(0) ;
  
  
  form.addTextItem()
    .setRequired(true)
    .setTitle("Amount")
    .setValidation(text_is_number)
  
  
  var f = form.addCheckboxItem()
            .setTitle("Payed From ?")
            .setRequired(true)
            .showOtherOption(true);
  
  for (var i = 0; i < from.length ; i++){
    f = f.createChoice(from[i]);
  }
  
  var t = form.addCheckboxItem()
            .setTitle("Payed at ?")
            .setRequired(true)
            .showOtherOption(true);
  
  for (var i = 0; i < to.length ; i++){
    t = t.createChoice(to[i]);
  }
  
  form.addTextItem().setTitle("Remarks/Notes");
  
  
  return form;
}

  function sendReviewMail(e){
  var recipient = getConfig().email
  var subject = "Last Month's Expenses: Review"
  var body = getEmailBody(e)
  MailApp.sendEmail(recipient, subject, body)
}

function getEmailBody(e){
  return JSON.stringify(e)
}

function addCalendarEvent(description,ts){
  var color = CalendarApp.EventColor.PALE_RED;
  CalendarApp.getDefaultCalendar()
  .createEvent(new Date(ts),
               new Date(ts),
               {description: des}).setColor(color);

}

function getEventDescription(values){
  var ans = ""
  for(var propt in values){
    ans = ans + propt + " : "  + values[propt] + "\n";
  }
  
  return ans
}

function getTs(timestamp) {
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
  
  ans = months[l[1]]+ " " + l[0] + ", " + l[2] + " +0530" // +0530 because of IST.
  
  return ans 
}


function onSubmitCustom(e){
  var description = getEventDescription(e.namedValues);
  var ts = getTs(e.values[0]);
  addCalendarEvent(description, ts);
}
