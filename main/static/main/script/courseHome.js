const addEventBtn = document.querySelector(".add-event");
const addEventWrapper = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = addEventWrapper.querySelector(".close"); // Updated selector
const addEventTitle = document.querySelector(".event-name");

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});
window.addEventListener('load', updateWindowSize);
window.addEventListener('resize', updateWindowSize);

const dropContainer = document.getElementById("dropcontainer");

dropContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropContainer.classList.add("drag-active");
});

dropContainer.addEventListener("dragleave", () => {
    dropContainer.classList.remove("drag-active");
});

dropContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    dropContainer.classList.remove("drag-active");

    const fileInput = document.getElementById("fileInput");
    fileInput.files = e.dataTransfer.files;
    displayPDFLink();
});

function displayPDFLink() {
    const fileInput = document.getElementById("fileInput");
    const pdfLinkContainer = document.getElementById("pdfLinkContainer");

    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        if (selectedFile.type === "application/pdf") {
            const pdfLink = document.createElement("a");
            pdfLink.href = URL.createObjectURL(selectedFile);
            pdfLink.textContent = "Open PDF";
            pdfLink.target = "_blank";
            pdfLinkContainer.innerHTML = "";
            pdfLinkContainer.appendChild(pdfLink);
        } else {
            alert("Please select a valid PDF file.");
            fileInput.value = "";
            pdfLinkContainer.innerHTML = "";
        }
    }
}


function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}

function deleteForm(closeButton) {
    const formContainer = closeButton.parentElement;
    formContainer.style.display = "none";
    document.getElementById("addAssignmentButton").style.display="block";
}
document.addEventListener("DOMContentLoaded", function () {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Initialize scrollbar thumb position
  scrollbarThumb.style.width = "20%"; // Adjust the initial thumb width

  // Handle slide button click events
  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const currentScrollLeft = imageList.scrollLeft;

      // Calculate the target scroll position based on direction
      const targetScrollLeft = currentScrollLeft + direction * imageList.clientWidth;

      // Ensure the target position is within bounds
      const newScrollLeft = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft));

      // Smoothly scroll to the new position
      imageList.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    });
  });

  imageList.addEventListener("scroll", () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.clientWidth);
    scrollbarThumb.style.left = thumbPosition + "px";
  });

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const boundedPosition = Math.max(0, Math.min(sliderScrollbar.clientWidth - scrollbarThumb.clientWidth, newThumbPosition));
      const scrollPosition = (boundedPosition / (sliderScrollbar.clientWidth - scrollbarThumb.clientWidth)) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollTo({
        left: scrollPosition,
        behavior: "auto" 
      });
    }
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
});



function openFormPopUp() {
        document.getElementById("formPopup").style.display = "block";
       
}

function closeFormPopup(){
    document.getElementById("formPopup").style.display = "none";
}   

function openFormPopUps() {
    var popupForm = document.getElementById("formPopups");
    popupForm.style.display = "block";
  }
  function closeFormPopups() {
    var popupForm = document.getElementById("formPopups");
    popupForm.style.display = "none";
  }

function PopUp(){
  document.getElementById("formPopupss").style.display="block";
}

function closeFormPopupss(){
  document.getElementById("formPopupss").style.display="none";
}



const search = document.querySelector('.input-group input'),
table_rows = document.querySelectorAll('tbody tr'),
table_headings = document.querySelectorAll('thead th');
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

table_headings.forEach((head, i) => {
    let sort_asc = true;
    if(i<3){
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
}
});


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}
function openPdfPopup(pdfFileName, page) {
    const pdfURL = pdfFileName + '#page=' + page;
    document.getElementById('pdfIframe').src = pdfURL;
    document.getElementById('pdfModal').style.display = 'block';
}

function closePdfPopup() {
    document.getElementById('pdfModal').style.display = 'none';
    document.getElementById('pdfIframe').src = '';
}
    

function Announcement() {

  document.querySelector(".Announcements").style.display = "block";
  document.querySelector(".Assignments").style.display = "none";
  document.querySelector("#Announcement").style.backgroundColor = "grey";
  document.querySelector("#Assignment").style.backgroundColor = "initial";
}

function Assignment() {

  document.querySelector(".Assignments").style.display = "block";
  document.querySelector(".Announcements").style.display = "none";
  document.querySelector("#Assignment").style.backgroundColor = "grey";
  document.querySelector("#Announcement").style.backgroundColor = "initial";
  PastDue();
}

function PastDue() {

  document.querySelector(".PastDues").style.display = "block";
  document.querySelector(".Completeds").style.display = "none";
  document.querySelector("#PastDue").style.backgroundColor = "grey";
  document.querySelector("#Completed").style.backgroundColor = "initial";
}

function Completed() {
 
  document.querySelector(".Completeds").style.display = "block";
  document.querySelector(".PastDues").style.display = "none";
  document.querySelector("#Completed").style.backgroundColor = "grey";
  document.querySelector("#PastDue").style.backgroundColor = "initial";
}

function classes() {
  document.querySelector(".classess").style.display = "block";
  document.querySelector(".classmaterialss").style.display = "none";
  document.querySelector(".gradess").style.display = "none";

  document.querySelector("#classes").style.backgroundColor = "grey";
  document.querySelector("#classmaterials").style.backgroundColor = "initial";
  document.querySelector("#grade").style.backgroundColor = "initial";
}

function classmaterials(){
  document.querySelector(".classmaterialss").style.display = "block";
  document.querySelector(".classess").style.display = "none";
  document.querySelector(".gradess").style.display = "none";

  document.querySelector("#classmaterials").style.backgroundColor = "grey";
  document.querySelector("#classes").style.backgroundColor = "initial";
  document.querySelector("#grade").style.backgroundColor = "initial";
}

function grade() {
  document.querySelector(".classess").style.display = "none";
  document.querySelector(".classmaterialss").style.display = "none";
  document.querySelector(".gradess").style.display = "block";
  document.querySelector("#grade").style.backgroundColor = "grey";
  document.querySelector("#classes").style.backgroundColor = "initial";
  document.querySelector("#classmaterials").style.backgroundColor = "initial";
}






search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

table_headings.forEach((head, i) => {
    let sort_asc = true;
    if(i<3){
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
}
});


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}


function save(number) {
  let forImg = `${number}B`;
  let forP = `${number}A`;
  let forP2 = `${number}C`;
  let forInp = `${number}`;
  const inputElements = document.getElementsByClassName(forInp);
  if (inputElements.length > 0) {
    const inputElement = inputElements[0];
    const inputValue = inputElement.value;
    const intValue = parseInt(inputValue);

    if (intValue <= 10 && intValue > 0) {
      inputElement.style.display = 'none';
      const Img = document.getElementsByClassName(forImg);
      if (Img.length > 0) {
        Img[0].style.display = 'none';
      }
      const paragraph = document.getElementsByClassName(forP);
      if (paragraph.length > 0) {
        paragraph[0].textContent = `${intValue}`/10;
      }
      const paragraph2 = document.getElementsByClassName(forP2)[0];
      if (paragraph2.classList.contains('pending')) {
    paragraph2.classList.remove('pending');
    paragraph2.classList.add('graded');
    paragraph2.innerHTML = 'Graded';
  }
    } else {
      alert('Input is not in the range');
      inputElement.value="";
    }
  }
}

config = {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            altInput: true,
            altFormat: "F j, Y (h:S K)"
        }
        flatpickr("input[type=datetime-local]", config);