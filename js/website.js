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
