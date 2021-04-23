var contactNodePresent = false;

function getContactData()
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

function StartupButtons()
{
  var elementArray = document.getElementsByClassName('Box');
  for (var i = 0; i < elementArray.length; i++) {
    var buttonNode = document.createElement('BUTTON');
    buttonNode.setAttribute('onclick', "OpenProjectPage('" + elementArray[i].getAttribute('id') + "')");
    buttonNode.innerHTML = "Go to Project Page";
    elementArray[i].appendChild(buttonNode);
  }
}

function OpenProjectPage(ProjectName)
{
  window.open("content/projects/" + ProjectName + "/main_page.html");
}
