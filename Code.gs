function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function doGet(e) {
  
  return HtmlService.createTemplateFromFile("index").evaluate();
  
}

//Session.getActiveUser()

var SSURL = "https://docs.google.com/spreadsheets/d/1fatnk5Jkd0zkAGpGZDwxLr2l_cao_oI0WRpU3_5WrOo/edit#gid=0"
var ss = SpreadsheetApp.openByUrl(SSURL);
var ws = ss.getSheetByName("Sheet1");

var score1 = ws.getRange(2,1);
var score2 = ws.getRange(2,2);
var target = ws.getRange(2,3);
var p1Active = ws.getRange(2,4);
var p2Active = ws.getRange(2,5);

/// Initial setup for player IDs in different browsers
function initialSetup(dbstat){
  dbstat.p1IsActive = p1Active.getValue();
  dbstat.p2IsActive = p2Active.getValue();
  if (dbstat.p1IsActive == 0){
    p1Active.setValue(1);
    dbstat.p1IsActive = 1;
  } else if (dbstat.p2IsActive == 0) {
    p2Active.setValue(1);
    dbstat.p2IsActive = 1;
  }
  Logger.log(dbstat);
  return dbstat;
}

/// Set score1 in db and return result
function updateScore1(player1){
  var isP1Active = p1Active.getValue();
  if (isP1Active == 0) {
    p1Active.setValue(1);
    player1.active = 1;
  }
  var currentScore = score1.getValue();
  var pScore1 = currentScore + 1; // change to accept a passed value
  score1.setValue(pScore1);
  player1.score = pScore1;
  return player1;
}

/// Set score2 in db and return result
function updateScore2(player2){
  var isP2Active = p2Active.getValue();
  if (isP2Active == 0) {
    p2Active.setValue(1);
    player2.active = 1;
  }
  var currentScore = score2.getValue();
  var pScore2 = currentScore + 1; // change to accept a passed value 
  score2.setValue(pScore2);
  player2.score = pScore2;
  Logger.log(pScore2);
  return player2;
}

/// Set target score and return result
function setTarget(value){
  target.setValue(value);
  return target.getValue();
}
/// Get target score
function getTarget(){
  return target.getValue(); 
}
/// Get score for player1
function getPlayer1Score(player1) {
  return score1.getValue();
}
/// Get score for player2
function getPlayer2Score(player2) {
  return score2.getValue();
}


/// Reset DB
function resetDB(){
  score1.setValue(0);
  score2.setValue(0);
  target.setValue(21);
  p1Active.setValue(0);
  p2Active.setValue(0);
}