import * as configData from './config.js';

window.onload = Startup;
window.projectPage = OpenProjectPage;
window.contactInfo = GetContactData;

var contactNodePresent = false;
var CurrentDataSet;

function Startup()
{
  CommitDataToStorage("SiteData", JSON.stringify(configData));
  CurrentDataSet = JSON.parse(GetDataFromStorage("SiteData"))["default"];
  if(window.location.href.includes("Template"))
  {
    TemplateStartup();
  }
  else {
    MainPageStartup();
  }
}

function GetAllDataWhichIs(criteria)
{
  var fulfilled = {};
  for(var k in CurrentDataSet)
  {
    var data = CurrentDataSet[k][criteria];
    if(!(k in fulfilled))
    {
      fulfilled[k] = data;
    }
  }
  return fulfilled;
}

function GetAllUniqueData(criteria)
{
  var uniqueData = [];
  for(var k in CurrentDataSet)
  {
    var data = CurrentDataSet[k][criteria];
    if(!uniqueData.includes(data))
    {
      uniqueData.push(data);
    }
  }
  return uniqueData;
}

function CreateCategories()
{
  var projectList = document.getElementById("Projects");
  var projectData = GetAllUniqueData("Category");
  for(var category in projectData)
  {
    var aNode = document.createElement("A");
    aNode.setAttribute("href", "#" + projectData[category]);
    aNode.innerHTML = projectData[category];
    projectList.appendChild(aNode);
    var tabDiv = document.createElement("DIV");
    tabDiv.setAttribute("class", "tab");
    for(var data in CurrentDataSet)
    {
      if(CurrentDataSet[data]["Category"] == projectData[category])
      {
        var aaNode = document.createElement("A");
        aaNode.setAttribute("href", "#" + CurrentDataSet[data]["Abbreviation"]);
        aaNode.innerHTML = CurrentDataSet[data]["Title"];
        aaNode.appendChild(document.createElement("BR"));
        tabDiv.appendChild(aaNode);
      }
    }
    projectList.appendChild(tabDiv);
  }
}

function CreateSummaries()
{
  var summary = document.getElementById("ProjectSummaries");
  var projectCategories = GetAllUniqueData("Category");
  for(var category in projectCategories)
  {
    var h3title = document.createElement("H3");
    h3title.setAttribute("id", projectCategories[category])
    h3title.setAttribute("class", "BackgroundText");
    h3title.innerHTML = projectCategories[category];
    document.body.appendChild(h3title);
    var categoryBox = CreateMainBox(document.body);
    for(var data in CurrentDataSet)
    {
      if(CurrentDataSet[data]["Category"] == projectCategories[category])
      {
        CreateBox(categoryBox, CurrentDataSet[data]);
      }
    }
  }
}

function CreateMainBox(appendTo)
{
  var mainBox = document.createElement("DIV");
  mainBox.setAttribute("class", "MainBox");
  appendTo.appendChild(mainBox);
  return mainBox;
}

function CreateBox(appendTo, projectData)
{
  var box = document.createElement("DIV");
  box.setAttribute("id", projectData["Abbreviation"]);
  box.setAttribute("class", "Box");
  var h3title = document.createElement("H3");
  h3title.innerHTML = projectData["Title"];
  box.appendChild(h3title);
  CreateInformation(box, projectData);
  appendTo.appendChild(box);
}

function CreateInformation(appendTo, projectData)
{
  var informationNode = document.createElement("P");
  informationNode.innerHTML = "Genres:<br>";
  for(var genre in projectData["Genres"])
  {
    informationNode.innerHTML += projectData["Genres"][genre] + "<br>";
  }
  informationNode.innerHTML += "<br>Description:<br>" + projectData["Description"];
  appendTo.appendChild(informationNode);
  return informationNode;
}

function CreateLinks(appendTo, projectData)
{
  for(var link in projectData["External Links"])
  {
    var aNode = document.createElement("A");
    aNode.setAttribute("href", projectData["External Links"][link]);
    aNode.innerHTML = link + "<br>";
    appendTo.appendChild(aNode);
    console.log(link);
  }
}

function CreateButtons()
{
  var elementArray = document.getElementsByClassName('Box');
  for (var i = 0; i < elementArray.length; i++) {
    var buttonNode = document.createElement('BUTTON');
    buttonNode.setAttribute('onclick', "window.projectPage('" + elementArray[i].getAttribute('id') + "')");
    buttonNode.innerHTML = "Go to Project Page";
    elementArray[i].appendChild(buttonNode);
  }
}

function CreateGallery(appendTo, projectData)
{
  for(var image in projectData["Gallery"])
  {
    var aNode = document.createElement("A");
    aNode.setAttribute("href", projectData["Gallery"][image]);
    var imgNode = document.createElement("IMG");
    imgNode.src = projectData["Gallery"][image];
    imgNode.setAttribute("class", "GalleryIcon");
    aNode.appendChild(imgNode);
    appendTo.appendChild(aNode);
  }
}

function MainPageStartup()
{
  CreateCategories();
  CreateSummaries();
  CreateButtons();
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
    CommitDataToStorage("ProjectName", ProjectName);
    window.open("content/projectPageTemplate.html");
  }
}

function CommitDataToStorage(Name, Data)
{
  if(typeof(Storage) !== "undefined")
  {
    localStorage.setItem(Name, Data);
  }
}

function GetDataFromStorage(Name)
{
  if(typeof(Storage) !== "undefined")
  {
    return localStorage.getItem(Name);
  }
  return "NO_DATA";
}

function TemplateStartup()
{
  var DataItem = CurrentDataSet[GetDataFromStorage("ProjectName")];
  document.getElementById("Title").innerHTML = DataItem["Title"];
  CreateInformation(document.getElementById("Details"), DataItem);
  CreateLinks(document.getElementById("Links"), DataItem);
  CreateGallery(document.getElementById("Gallery"), DataItem);
}
