let allImgs = document.querySelectorAll("img");

allImgs.forEach(item =>
  item.addEventListener("dblclick", event => fullScreen(item))
);

let isFullScreen = false;
let overlay = document.createElement("div");
overlay.className = "overlay";

function fullScreen(item) {
  event.stopPropagation();

  isFullScreen = !isFullScreen ? true : false;

  if (isFullScreen) {
    item.style.position = "fixed";
    item.style.borderRadius = 0;
    item.style.left = " 2%";
    item.style.width = "80%";
    item.style.zIndex = 20;
    item.style.top = (window.innerHeight - item.clientHeight) / 2 + "px";
    item.style.left = (window.innerWidth - item.clientWidth) / 2 + "px";
    item.parentElement.prepend(overlay);
    overlay = document.querySelector(".overlay");
    overlay.style.position = "fixed";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.zIndex = 10;
  } else {
    item.removeAttribute("style");
    overlay.remove();
  }
}

window.addEventListener("click", removeFullScreen);

function removeFullScreen() {
  isFullScreen = false;
  allImgs.forEach(current => {
    current.removeAttribute("style");
    overlay.remove();
  });
}

allImgs.forEach(item =>
  item.addEventListener("mouseenter", function() {
    item.style.transform = "scale(1.1)";
    item.style.transition = "all 0.4s";
  })
);

allImgs.forEach(item =>
  item.addEventListener("mouseleave", function() {
    item.style.transform = "scale(1)";
    item.style.transition = "all 0.4s";
  })
);

let intro = document.querySelector(".intro");
intro.style.overflow = "hidden";

let texts = document.querySelectorAll("p");

texts.forEach(item =>
  item.addEventListener("mouseover", function() {
    item.style.letterSpacing = "1px";
    item.style.transition = "all 0.5s";
  })
);

texts.forEach(item =>
  item.addEventListener("mouseout", function() {
    item.style.letterSpacing = "inherit";
    item.style.transition = "all 0.5s";
  })
);

allImgs.forEach(item =>
  item.addEventListener("wheel", function(event) {
    if (event.ctrlKey) {
      event.preventDefault();
      let currentSize = item.clientWidth;
      let newSize = 0;
      event.deltaY > 0
        ? (newSize = currentSize + 100)
        : (newSize = currentSize - 100);
      item.style.display = "block";
      item.style.width = `${newSize}px`;
      item.style.margin = "0 auto";
    }
  })
);

let destination = document.querySelectorAll(".destination");

destination.forEach(item => {
  item.style.width = "100%";
  item.style.display = "flex";
  item.style.flexDirection = "column";
  item.style.margin = "0";
  let newDiv = document.createElement("div");
  newDiv.appendChild(item);
  newDiv.style.width = "30%";
  newDiv.style.margin = "0 0 30px 0";
  newDiv.style.background = "white";
  newDiv.className = "dropzone";
  let container = document.querySelector(".content-pick");
  container.appendChild(newDiv);
});

destination.forEach(item => {
  item.style.userSelect = "none";
  item.draggable = "true";

  item.addEventListener("drag", function() {}, false);

  item.addEventListener(
    "dragstart",
    function(event) {
      event.target.style.opacity = 0.2;
    },
    false
  );

  item.addEventListener(
    "dragend",
    function(event) {
      event.target.style.opacity = 1;
      event.target.parentNode.style.background = "white";
    },
    false
  );

  item.addEventListener(
    "dragenter",
    function(event) {
      event.target.parentNode.className == "destination"
        ? (event.target.parentNode.parentNode.style.background = "lightyellow")
        : true;
    },
    false
  );

  item.addEventListener(
    "dragover",
    function(event) {
      event.target.parentNode.className == "destination"
        ? (event.target.parentNode.parentNode.style.background = "lightyellow")
        : true;
      event.preventDefault();
    },
    false
  );

  item.addEventListener(
    "dragleave",
    function(event) {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.parentNode.className == "destination") {
        event.target.parentNode.parentNode.style.background = "white";
      }
    },
    false
  );

  item.addEventListener(
    "drop",
    function(event) {
      event.preventDefault();
      event.target.style.opacity = 1;
      event.target.style.background = "white";
      item.style.opacity = 1;
      item.style.background = "white";
      event.target.parentNode.prepend(item);
      item.parentNode.prepend(event.target.parentNode);
      item.parentNode.remove(item);
    },
    false
  );
});

let logo = document.querySelector(".logo-heading");

window.addEventListener("resize", function() {
  logo.classList.add("apply-shake");
  logo.style.fontSize = "6rem";
});
logo.addEventListener("animationend", function() {
  logo.classList.remove("apply-shake");
  logo.style.fontSize = "4rem";
});

window.addEventListener("load", () => {
  let welcomeOverlay = document.createElement("div");
  welcomeOverlay.className = "welcomeOverlay";
  document.querySelector("body").appendChild(welcomeOverlay);
  welcomeOverlay.style.position = "fixed";
  welcomeOverlay.style.width = "100%";
  welcomeOverlay.style.height = "100%";
  welcomeOverlay.style.top = 0;
  welcomeOverlay.style.left = 0;
  welcomeOverlay.style.right = 0;
  welcomeOverlay.style.bottom = 0;
  welcomeOverlay.style.background = "rgba(0,0,0,0.8)";
  welcomeOverlay.style.zIndex = 10;
  let welcomeTitle = document.createElement("h1");
  let welcomeTitle2 = document.createElement("h4");
  welcomeTitle.textContent = "Welcome!";
  welcomeTitle2.textContent = "Click anywhere to continue";
  welcomeTitle.style.color = "white";
  welcomeTitle2.style.color = "white";
  welcomeTitle.style.fontSize = "14rem";
  welcomeTitle2.style.fontSize = "4rem";
  welcomeTitle.style.textAlign = "center";
  welcomeTitle2.style.textAlign = "center";
  welcomeTitle.style.marginTop = "30rem";
  document.querySelector(".welcomeOverlay").appendChild(welcomeTitle);
  document.querySelector(".welcomeOverlay").appendChild(welcomeTitle2);
  welcomeOverlay.addEventListener("click", () => {
    welcomeOverlay.style.transform = "translateX(-1600px)";
  });
});

window.addEventListener("keydown", event => {
  event.preventDefault();
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let logotext = [...logo.textContent].join("");

  if (event.code == "Space") {
    logotext = logotext.replace(
      logotext.charAt([Math.floor(Math.random() * 7)]),
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
    logo.textContent = logotext;
  }
});

let links = document.querySelectorAll("nav a");
links.forEach(item =>
  item.addEventListener("click", event => event.preventDefault())
);

window.addEventListener("copy", function(event) {
  event.preventDefault();
  alert("No No No No no!!");
});

window.addEventListener("scroll", event => {
  let body = document.querySelector("body");
  console.log(body, event);
  body.style.background = `rgba(${Math.random() * 255},${Math.random() *
    255},${Math.random() * 255}, 0.3 )`;
});

window.addEventListener("mouseup", function(event) {
  window.getSelection().toString()
    ? alert(window.getSelection().toString())
    : null;
});
