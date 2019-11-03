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
      console.log("dragend", event.target);
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
      console.log("dragleave", event.target);
    },
    false
  );

  item.addEventListener(
    "drop",
    function(event) {
      item.style.opacity = 1;
      event.target.style.opacity = 1;
      item.style.background = "white";
      event.target.style.background = "white";
      event.preventDefault();
      console.log("drop item ", item);
      console.log("drop event target parentNode", event.target.parentNode);
      item.parentNode.prepend(event.target.parentNode);
      event.target.parentNode(item);
      item.parentNode.remove(item);
    },
    false
  );
});
