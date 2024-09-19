var menu_elements;
var currentIndex = 0;

$(document).ready(function () {
  menu_elements = $(".menu-item");
  // Set the initially selected item based on the attribute
  menu_elements.each(function (index) {
    if ($(this).attr("menu-item-selected") === "true") {
      currentIndex = index;
    }
  });

  updateSelectedItem();
});

function callbackRCRightArrow() {
  currentIndex++;
  if (currentIndex >= menu_elements.length) {
    currentIndex = 0; // Loop back to the first item
  }
  updateSelectedItem();
}

function callbackRCLeftArrow() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = menu_elements.length - 1; // Loop back to the last item
  }
  updateSelectedItem();
}

function callbackRCOK() {
  // Get the selected menu item
  var selectedItem = $(menu_elements[currentIndex]);

  // Find the closest anchor tag (a) to get the href
  var link = selectedItem.closest("a").attr("href"); // Adjusted to find the anchor tag

  if (link) {
    window.location.href = link; // Navigate to the selected menu link
  } else {
    alert("No link found for the selected menu item.");
  }
}

function updateSelectedItem() {
  // Remove border from all items
  menu_elements.css("border", "none");

  // Add border to the currently selected item
  $(menu_elements[currentIndex]).css("border", "2px solid yellow"); // Change the color as needed
}
