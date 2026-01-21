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

  plane.style.left = A.x + "px";
  plane.style.top = A.y + "px";
  plane.style.transform = "rotate(0deg)";

  setTimeout(() => {
    const angle = Math.atan2(B.y - A.y, B.x - A.x) * 180 / Math.PI;
    plane.style.transform = `rotate(${angle}deg)`;
    plane.style.left = B.x + "px";
    plane.style.top = B.y + "px";
  }, 500);

  setTimeout(() => {
    index = (index + 1) % routes.length;
    animateRoute();
  }, 4000);
}

animateRoute();
