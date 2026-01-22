const airports = {
  JED: { x: 460, y: 360 },
  RUH: { x: 500, y: 340 },
  DXB: { x: 540, y: 360 },
  CAI: { x: 420, y: 330 },
  LHR: { x: 360, y: 260 },
  IST: { x: 420, y: 250 }
};

const routes = (localStorage.getItem("routes") || "")
  .split("\n")
  .map(r => r.trim())
  .filter(r => r.includes("-"));

const plane = document.getElementById("plane");
let index = 0;

function animateRoute() {
  if (routes.length === 0) return;

  const [from, to] = routes[index].split("-");
  const A = airports[from];
  const B = airports[to];

  if (!A || !B) {
    index = (index + 1) % routes.length;
    animateRoute();
    return;
  }

  // --- STEP 1: SNAP TO START (At City A) ---
  plane.style.transition = "none"; // Disable animation for instant teleport
  plane.style.left = A.x + "px";
  plane.style.top = A.y + "px";

  // Calculate angle and apply 0-degree offset for the '✈' icon
  const angle = Math.atan2(B.y - A.y, B.x - A.x) * (180 / Math.PI);
  // Note: If icon is sideways, change (angle + 0) to (angle + 90)
  plane.style.transform = `rotate(${angle + 0}deg)`;

  // --- STEP 2: WAIT 2 SECONDS AT GATE ---
  setTimeout(() => {
    
    // --- STEP 3: FLY TO B (6 seconds) ---
    // Only animate position, not rotation
    plane.style.transition = "left 6s linear, top 6s linear"; 
    plane.style.left = B.x + "px";
    plane.style.top = B.y + "px";

    // --- STEP 4: ARRIVAL AT B ---
    setTimeout(() => {
      // Rotate 180 degrees to prepare for next leg or stay at gate
      plane.style.transition = "none"; 
      plane.style.transform = `rotate(${angle + 180}deg)`;

      // --- STEP 5: PAUSE 2 SECONDS THEN NEXT ROUTE ---
      setTimeout(() => {
        index = (index + 1) % routes.length;
        animateRoute();
      }, 2000);

    }, 6000); // Wait for 6s flight to finish
  }, 2000); // Wait for 2s boarding to finish
}

animateRoute();
