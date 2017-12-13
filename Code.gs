//Initialize the program
function init() {  
    // Check if any triggers are already present
  if (ScriptApp.getProjectTriggers().length == 0) {
    // Set up a monitor that triggers every 5 minutes
    ScriptApp.newTrigger("checkForChange")
      .timeBased().everyMinutes(5).create();
  }  
}

// Checks for change in the website
function checkForChange() {
  
  //The string to search for
  var find = 'S3';
  
  //The url to be checked for any changes
  var url = 'https://ktu.edu.in/eu/core/announcements.htm';
  var html = UrlFetchApp.fetch(url).getContentText();
 
  html = html.substring(0,15000);
  
  //Create a regular expression to search for in the webpage
  var regex = /<b>/gi, result, indices = [];
  while ( (result = regex.exec(html)) ) {
    indices.push(result.index);
  }
  
  var text = html.substring(indices[1], indices[2]);
  
  //checks if the extracted html contains the find string
  if(text.indexOf(find) != -1){
    
    var sheet = SpreadsheetApp.getActiveSheet();  
    var cell = sheet.getRange(1,1);
    var cellValue = cell.getValue();
      
    if(cellValue == '' || cellValue != text){
      cell.setValue(text);
      MailApp.sendEmail('biswasb007@gmail.com', 'ktu alert', 'New change for '+find+'\n'+text)
    }
  }
  

  
}
