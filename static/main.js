window.onload = (ev) => {
  var myButton = document.getElementsByName("myButton")[0];

  myButton.addEventListener("click", function(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if(req.readyState == 4 && req.status == 200){
        displayMyRandomNumber(req.responseText);
      }
    }

    req.open("GET", "http://localhost:3000/random-number", true);
    req.send(null);

    var displayMyRandomNumber = (responseText) => {
      response = JSON.parse(responseText);
      var myRandomNumber = document.getElementById("randomNumber");
      myRandomNumber.textContent = response.value;
    }
  });
};