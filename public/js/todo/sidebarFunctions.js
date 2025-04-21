const sidebar = document.querySelector(".sidebar");
const modalSidebar = document.querySelector(".create-modal-side");
const openSidebarButton = document.getElementById("openSidebarButton");
export function closeSidebar() {
  sidebar.style.position = "absolute";
  sidebar.style.left = "-250px";
  openSidebarButton.style.display = "unset";
  document.getElementById("overlay").style.display = "none";
}

export function openSidebar() {
  if (window.innerWidth < 800) {
    sidebar.style.position = "fixed";
    document.getElementById("overlay").style.display = "block";

    const inboxElement = document.querySelector(".inbox");

    // Store the current scroll position
    inboxElement._scrollTop = inboxElement.scrollTop;
  
    // Make the content unscrollable but keep the scrollbar visible
    inboxElement.style.pointerEvents = "none";
  
    // Add a wheel event listener to prevent scrolling
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("click", closeMenuOnOutsideClick);
  } else {
    sidebar.style.position = "unset";
  }
  sidebar.style.left = "unset";
  openSidebarButton.style.display = "none";

  window.addEventListener("resize", () => {
    if (window.innerWidth > "800" && sidebar.style.position == "fixed") {
      sidebar.style.position = "unset";
      document.getElementById("overlay").style.display = "none";
    } else if (window.innerWidth < "800" && sidebar.style.position == "unset") {
      sidebar.style.position = "fixed";
      document.getElementById("overlay").style.display = "block";
    }
  });
}

// Function to prevent scrolling
function preventScroll(e) {
  e.preventDefault();
}

export function closeSidebarMenu() {
  document.removeEventListener("click", closeMenuOnOutsideClick);

  // Re-enable scrolling on the inbox element
  const inboxElement = document.querySelector(".inbox");
  inboxElement.style.pointerEvents = "";

  // Remove the wheel event listener
  document.removeEventListener("wheel", preventScroll);

  closeSidebar();
}

function closeMenuOnOutsideClick(event) {
  let clickedInsideMenu = false;
  if (sidebar.contains(event.target)) {
    clickedInsideMenu = true;
  }
  if (!clickedInsideMenu && !event.target.classList.contains(".sidebar")) {
    closeSidebarMenu();
  }
}
