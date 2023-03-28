const weatheForm = document.querySelector("form");
const search = document.querySelector("input");

const local = document.querySelector("#location");
const forecaset = document.querySelector(".forecaste");

weatheForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  local.textContent = "Fetching weather...";
  forecaset.textContent = "";
  fetch(`http://localhost:3000/weather?adress=${location}`)
    .then((result) => {
      result.json().then((data) => {
        if (data.error) {
          local.innerText = data.error;
          forecaset.innerText = "";
        } else {
          local.innerText = data.location;
          forecaset.innerText = data.forecaste;
        }
      });
    })
    .catch((err) => {
      local.textContent = err;
      forecaset.innerText = "";
    });

  search.value = "";
});
