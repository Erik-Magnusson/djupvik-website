

const BTN = document.querySelector('#dropbtn');
BTN.addEventListener('click', toggleMenu);

function toggleMenu() {
    
    var contents = document.getElementById("drop-contents");

    if (contents.style.display === "block") {
        contents.style.display = "none";
      } else {
        contents.style.display = "block";
      }
}




