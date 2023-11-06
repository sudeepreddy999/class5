const AdminButton = document.getElementById('Admin');
const FacultyButton = document.getElementById('Faculty');
const StudentButton = document.getElementById('Student');
const SuperContainer = document.getElementById('SuperContainer');
const inp1A = document.getElementById('inp1A');
const inp1B = document.getElementById('inp1B');
const inp2A = document.getElementById('inp2A');
const inp2B = document.getElementById('inp2B');
const inp3A = document.getElementById('inp3A');
const inp3B = document.getElementById('inp3B');
function myFunction(i) {
  var x = [document.getElementById("inp1B"),document.getElementById("inp2B"),document.getElementById("inp3B")];
  if (x[i].type === "password") {
    x[i].type = "text";
  } else {
    x[i].type = "password";
  }
}
function functionfin(i){
    var x = [document.getElementById("inp1B"),document.getElementById("inp2B"),document.getElementById("inp3B")];
    x[i].type = "password";
}
AdminButton.addEventListener('click', () => {
	SuperContainer.classList.remove("mid-panel-active");
	SuperContainer.classList.add("right-panel-active");
    inp3A.value="";
    inp3B.value="";
    inp2A.value="";
    inp2B.value="";
});

FacultyButton.addEventListener('click', () => {
	SuperContainer.classList.remove("mid-panel-active");
	SuperContainer.classList.remove("right-panel-active");
    inp1A.value="";
    inp1B.value="";
    inp2A.value="";
    inp2B.value="";
});

StudentButton.addEventListener('click', () => {
	SuperContainer.classList.add("mid-panel-active");
	SuperContainer.classList.remove("right-panel-active");
    inp1A.value="";
    inp1B.value="";
    inp3A.value="";
    inp3B.value="";
}); 