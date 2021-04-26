import * as configData from './config.js';

window.onload = Startup;
window.projectPage = OpenProjectPage;
window.contactInfo = GetContactData;

var contactNodePresent = false;
var CurrentDataSet;

function Startup()
{
  if(window.location.href.includes("template"))
  {
    TemplateStartup();
  }
  else {
    StartupButtons();
  }
}

function StartupButtons()
{
  var elementArray = document.getElementsByClassName('Box');
  for (var i = 0; i < elementArray.length; i++) {
    var buttonNode = document.createElement('BUTTON');
    buttonNode.setAttribute('onclick', "window.projectPage('" + elementArray[i].getAttribute('id') + "')");
    buttonNode.innerHTML = "Go to Project Page";
    elementArray[i].appendChild(buttonNode);
  }
}

function GetContactData()
{
  if(!contactNodePresent)
  {
    var contactNode = document.createElement("DIV");
    var textNode = document.createTextNode("Email: rikilowe500@btinternet.com");
    contactNode.setAttribute("class", "reference");
    contactNode.setAttribute("id", "ContactNode");
    contactNode.appendChild(textNode);
    document.getElementById("Contact").appendChild(contactNode);
    contactNodePresent = true;
  }
}

function OpenProjectPage(ProjectName)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem("templateData", ProjectName);
    window.open("content/main_page_template.html");
  }
}

function TemplateStartup()
{
  CurrentDataSet = JSON.parse(JSON.stringify(configData))["default"];
  if (typeof(Storage) !== "undefined") {
    var DataPointer = localStorage.getItem("templateData");
    document.getElementById("Title").innerHTML = CurrentDataSet[DataPointer];
  }
  else {
    console.log("Site did not load properly");
  }
}
