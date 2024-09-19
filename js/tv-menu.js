// Declare initialStyles globally
var initialStyles = {};

function applySelectedMenuStyle(nextElement) {
  nextElement.setAttribute("menu-item-selected", "true");
  var selectedStyle = nextElement.getAttribute("menu-item-selected-style");
  if (selectedStyle) {
    // Extract general and first-child styles
    var firstChildStyleMatch = selectedStyle.match(/first-child:\s*([^;]+);?/);
    var firstChildStyle = firstChildStyleMatch ? firstChildStyleMatch[1] : "";
    var generalStyle = selectedStyle.replace(/first-child:\s*[^;]+;?/g, "");

    // Apply general style to all .menu-item-image elements
    var innerDivs = nextElement.querySelectorAll(".menu-item-image");
    for (var i = 0; i < innerDivs.length; i++) {
      var div = innerDivs[i];
      div.style.cssText =
        div.style.cssText.replace(/(?<=\s)(background-color:.*?)(?=;|$)/, "") +
        generalStyle;
    }

    // Apply first-child style to the first <img> within .menu-item-image
    var imgs = nextElement.querySelectorAll(".menu-item-image img");
    if (imgs.length > 0) {
      var firstImg = imgs[0];
      firstImg.style.cssText =
        firstImg.style.cssText.replace(
          /(?<=\s)(background-color:.*?)(?=;|$)/,
          ""
        ) + firstChildStyle;
    }
  }
}

$(document).ready(function () {
  alert("ready function in tv-menu");
  var elements = document.querySelectorAll(".menu-item");

  // Store the initial style of each menu item
  Array.prototype.forEach.call(elements, function (element) {
    var innerDivs = element.querySelectorAll(".menu-item-image");
    for (var i = 0; i < innerDivs.length; i++) {
      var div = innerDivs[i];
      var elementId = div.getAttribute("id");
      if (!elementId) {
        elementId = "element_" + Math.random(); // Generate a unique ID
        div.setAttribute("id", elementId);
      }
      if (!initialStyles.hasOwnProperty(elementId)) {
        initialStyles[elementId] = div.style.cssText;
      }
    }

    // Store the initial style of the first image in .menu-item-image
    var firstImage = element.querySelector(".menu-item-image img");
    if (firstImage) {
      var imageId = firstImage.getAttribute("id");
      if (!imageId) {
        imageId = "image_" + Math.random(); // Generate a unique ID
        firstImage.setAttribute("id", imageId);
      }
      if (!initialStyles.hasOwnProperty(imageId)) {
        initialStyles[imageId] = firstImage.style.cssText;
      }
    }
  });
});

// Function to highlight the next menu item
function callbackRCRightArrow() {
  var elements = document.querySelectorAll(".menu-item");

  // Find the currently selected item
  var currentMenuIndex = Array.prototype.findIndex.call(
    elements,
    function (el) {
      return el.getAttribute("menu-item-selected") === "true";
    }
  );

  // Remove previous highlight and restore initial styles
  var previousElement = elements[currentMenuIndex];
  if (previousElement) {
    var innerDivs = previousElement.querySelectorAll(".menu-item-image");
    for (var i = 0; i < innerDivs.length; i++) {
      var div = innerDivs[i];
      var elementId = div.getAttribute("id");
      var initialStyle = initialStyles[elementId] || "";
      div.style.cssText = initialStyle;
    }

    // Reset the first image style
    var firstImg = previousElement.querySelector(".menu-item-image img");
    if (firstImg) {
      var imageId = firstImg.getAttribute("id");
      var initialFirstImageStyle = initialStyles[imageId] || "";
      firstImg.style.cssText = initialFirstImageStyle;
    }

    previousElement.setAttribute("menu-item-selected", "false");
    previousElement.style.border = "none";
  }

  // Move to the next item
  currentMenuIndex = (currentMenuIndex + 1) % elements.length;

  // Highlight the new selected item
  var nextElement = elements[currentMenuIndex];
  if (nextElement) {
    applySelectedMenuStyle(nextElement);
  }
}

// Function to highlight the previous menu item
function callbackRCLeftArrow() {
  var elements = document.querySelectorAll(".menu-item");

  // Find the currently selected item
  var currentMenuIndex = Array.prototype.findIndex.call(
    elements,
    function (el) {
      return el.getAttribute("menu-item-selected") === "true";
    }
  );

  // Remove previous highlight and restore initial styles
  var previousElement = elements[currentMenuIndex];
  if (previousElement) {
    var innerDivs = previousElement.querySelectorAll(".menu-item-image");
    for (var i = 0; i < innerDivs.length; i++) {
      var div = innerDivs[i];
      var elementId = div.getAttribute("id");
      var initialStyle = initialStyles[elementId] || "";
      div.style.cssText = initialStyle;
    }

    // Reset the first image style
    var firstImg = previousElement.querySelector(".menu-item-image img");
    if (firstImg) {
      var imageId = firstImg.getAttribute("id");
      var initialFirstImageStyle = initialStyles[imageId] || "";
      firstImg.style.cssText = initialFirstImageStyle;
    }

    previousElement.setAttribute("menu-item-selected", "false");
    previousElement.style.border = "none";
  }

  // Move to the previous item
  currentMenuIndex = (currentMenuIndex - 1 + elements.length) % elements.length;

  // Highlight the new selected item
  var newElement = elements[currentMenuIndex];
  if (newElement) {
    applySelectedMenuStyle(newElement);
  }
}

function callbackRCOK() {
  var elements = document.querySelectorAll(".menu-item");
  var currentMenuIndex = Array.prototype.findIndex.call(
    elements,
    function (el) {
      return el.getAttribute("menu-item-selected") === "true";
    }
  );

  if (currentMenuIndex !== -1) {
    var selectedMenu = elements[currentMenuIndex];
    var anchor = selectedMenu.closest("a"); // Find the closest anchor tag
    if (anchor) {
      var url = anchor.getAttribute("href"); // Get the URL from the href attribute
      if (url) {
        window.location.href = url; // Navigate to the URL
      }
    }
  }
}
