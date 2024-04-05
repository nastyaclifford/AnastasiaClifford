const navButton = document.querySelector(".nav__icon");
const menu = document.querySelector(".nav__menu");
const listItems = document.querySelectorAll(".nav__menu_list-item");
const technologiesList = document.querySelector(".technologies__list");
const projectsList = document.querySelector(".projects__list");
const experienceList = document.querySelector(".about__info_experience-list");
const container = document.querySelector(".container");

//scroll

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Smooth scroll when clicking on anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    var target = this.getAttribute("href");
    var duration = 1000; // Duration of the smooth scroll animation in milliseconds
    smoothScroll(target, duration);
  });
});

//nav menu open

navButton.addEventListener("click", function (e) {
  e.stopPropagation();
  if (menu.style.display === "none") {
    menu.style.display = "block";
    navButton.classList.toggle("transformed");
    container.classList.toggle("darker");
  } else {
    menu.style.display = "none";
    navButton.classList.remove("transformed");
    container.classList.remove("darker");
  }
});

listItems.forEach(function (listItems) {
  listItems.addEventListener("click", function () {
    menu.style.display = "none";
    navButton.classList.remove("transformed");
    container.classList.remove("darker");
  });
});

window.addEventListener("click", function (e) {
  if (
    menu.style.display === "block" &&
    !menu.contains(e.target) &&
    e.target !== navButton
  ) {
    menu.style.display = "none";
    navButton.classList.remove("transformed");
    container.classList.remove("darker");
  }
});

//technologies section

const getTechnologies = () => {
  return fetch("src/JSON/technologies.json")
    .then((response) => response.json())
    .catch((error) => console.log(error.message));
};

const createTechnologiesList = (technologies) => {
  if (!technologies) return;

  technologies.forEach((technologie) => {
    const row = document.createElement("div");
    row.className = "technologies__list_row";
    const points = document.createElement("div");
    points.classList = "technologies__list_points";
    points.textContent = ">>";
    const item = document.createElement("div");
    item.className = "technologies__list_item";
    const itemName = document.createElement("div");
    itemName.className = "technologies__list_item-name";
    itemName.textContent = technologie.name;
    const itemDetails = document.createElement("div");
    itemDetails.className = "technologies__list_item-details";
    itemDetails.textContent = technologie.details;

    row.append(points);
    row.append(item);
    item.append(itemName);
    item.append(itemDetails);
    technologiesList.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  getTechnologies().then(createTechnologiesList);
});

/// projects section

const getProjects = () => {
  return fetch("src/JSON/projects.json")
    .then((response) => response.json())
    .catch((error) => console.log(error.message));
};

const createProjectsList = (projects) => {
  if (!projects) return;

  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.className = "projects__list_item";
    const projectItemName = document.createElement("div");
    projectItemName.className = "projects__list_item-name";
    projectItemName.textContent = project.name;
    const imgDiv = document.createElement("div");
    imgDiv.classList = "projects__list_item-imgDiv";
    const itemImg = document.createElement("img");
    itemImg.src = project.img;
    itemImg.classList = "projects__list_item-img";
    itemImg.alt = project.alt;
    const projectDetails = document.createElement("a");
    projectDetails.className = "projects__list_item-details";
    projectDetails.href = project.url;
    projectDetails.textContent = "Learn More";

    projectItem.append(projectItemName);
    projectItem.append(imgDiv);
    imgDiv.append(itemImg);
    projectItem.append(projectDetails);
    projectsList.appendChild(projectItem);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  getProjects().then(createProjectsList);
});

/// experience section

const getExperiences = () => {
  return fetch("src/JSON/experience.json")
    .then((response) => response.json())
    .catch((error) => console.log(error.message));
};

const createExperienceList = (experiences) => {
  if (!experiences) return;

  experiences.forEach((experience) => {
    const experienceText = document.createElement("div");
    experienceText.className = "about__info_experience-text";
    const job = document.createElement("div");
    job.className = "about__info_experience-job";
    const jobTitle = document.createElement("div");
    jobTitle.className = "about__info_experience-job-title";
    jobTitle.textContent = experience.job;
    const jobCompany = document.createElement("div");
    jobCompany.classList = "about__info_experience-job-company";
    jobCompany.textContent = experience.company;
    const term = document.createElement("div");
    term.classList = "about__info_experience-text-term";
    term.textContent = experience.term;

    experienceText.append(job);
    job.append(jobTitle);
    job.append(jobCompany);
    experienceText.append(term);
    experienceList.appendChild(experienceText);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  getExperiences().then(createExperienceList);
});
