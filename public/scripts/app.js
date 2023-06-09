const weatheForm = document.querySelector("form");
const search = document.querySelector("input");

const local = document.querySelector("#location");
const forecaset = document.querySelector(".forecaste");

weatheForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  local.textContent = "Fetching weather...";
  forecaset.textContent = "";
  fetch(`/weather?adress=${location}`)
    /* so here fetch is fetching from local route */

    /* so agar hum fetch ko http nai denge toh wo local file or folder me
    dhundenga  */
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
