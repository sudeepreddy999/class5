addEventBtn = document.querySelector(".add-event");
  addEventWrapper = document.querySelector(".add-event-wrapper ");
  addEventCloseBtn = document.querySelector(".close ");
  addEventTitle = document.querySelector(".event-name ");
  addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});
const BodyCapita = document.querySelectorAll(".announcement_content");
BodyCapita.forEach((obj) => {
  const text = obj.textContent;
  if (text.length > 0) {
    obj.textContent = text.charAt(0).toUpperCase() + text.slice(1);
  }
});
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});
const imageElements = [];
for (let i = 1; i <= 12; i++) {
  imageElements.push(document.getElementById(`img-${i}`));
}
let currentImageIndex = 0;
const images = document.querySelectorAll(".ImgContainer .imgs");
const ImgContainer = document.getElementById('ImgComtainer');
const dots = document.getElementById('dots');
dots.addEventListener('click', (event) => {
  const clickedId = event.target.id;
  const cha = clickedId.charAt(4);
  const intValue = parseInt(cha, 10);
  images[currentImageIndex].style.display = "none";
  currentImageIndex = (intValue - 1) % images.length;
  for (let i = 1; i <=6; i++) {
    imageElements[i + 5].style.display = i == intValue ? 'block' : 'none';
}
});
  function showNextImage() {
    images[currentImageIndex].style.display = "none";
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = "block";
  }
  images[currentImageIndex].style.display = "block";
  setInterval(showNextImage, 4000);
  function updateWindowSize() {
    document.documentElement.style.setProperty('--window-width', window.innerWidth + 'px');
}
window.addEventListener('load', updateWindowSize);
window.addEventListener('resize', updateWindowSize);
const dropContainer = document.getElementById("dropcontainer");
const fileInput = document.getElementById("images");

dropContainer.addEventListener("dragover", e => {
  e.preventDefault();
}, false);

dropContainer.addEventListener("dragenter", () => {
  dropContainer.classList.add("drag-active");
});

dropContainer.addEventListener("dragleave", () => {
  dropContainer.classList.remove("drag-active");
});

dropContainer.addEventListener("drop", e => {
  e.preventDefault();
  dropContainer.classList.remove("drag-active");
  fileInput.files = e.dataTransfer.files;
});
const announcementonclick = document.querySelectorAll('.Announcement');

announcementonclick.forEach(function(div) {
  div.addEventListener('click', function() {
    const announcementId = div.getAttribute('data-announcement-id');
    const url = `/home/announcements/${announcementId}`;
    window.location.href = url;
  });
});
document.addEventListener("DOMContentLoaded", function() {
    const announcementsContainer = document.querySelector(".Announcements");
    const loadMoreButton = document.getElementById("load-more-button");
    const announcements = document.querySelectorAll(".Announcement");
    let visibleAnnouncements = 3;
    const announcementsPerPage = 3; 
    function toggleAnnouncementVisibility() {
      for (let i = 0; i < announcements.length; i++) {
        if (i < visibleAnnouncements) {
          announcements[i].style.display = "block";
        } else {
          announcements[i].style.display = "none";
        }
      }
    }
    toggleAnnouncementVisibility();
    loadMoreButton.addEventListener("click", function() {
      visibleAnnouncements += announcementsPerPage;
      toggleAnnouncementVisibility();
      if (visibleAnnouncements >= announcements.length) {
        loadMoreButton.style.display = "none";
      }
    });
  });