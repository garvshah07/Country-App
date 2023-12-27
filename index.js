const main_activity = document.querySelector(".main-activity");

//  Search Button Elements

const filterCountry = document
  .querySelector(".searchBtn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    let inputValue = document.getElementById("searchInput").value;
    console.log(inputValue);

    //  API Url link

    const URL = `https://restcountries.com/v3.1/all`;

    // API Fetching Function

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();

        main_activity.innerHTML = "";

        data
          .filter((letestValue) =>
            letestValue?.name?.common
              .toLowerCase()
              .startsWith(inputValue.toLowerCase())
          )
          .map((countryValue) => {
            if (inputValue === "" && !filterCountry) {
            } else {
              const card = document.createElement("div");
              card.classList.add("card");

              card.innerHTML = `
                       <div>
                       <img class="img" src=${countryValue.flags.svg} /></div>
                      </div>
                         <h5 class="card-title">Name: ${countryValue.name.common}</h5>
                         <h5 class="card-title">Capital: ${countryValue.capital}</h5>
                         <h5 class="card-title">Continent: ${countryValue.continents}</h5>
                      </div>
              `;

              //  return main_activity_inputValue.value = "";
              main_activity.appendChild(card);
            }
          });
      } catch (error) {
        console.log("Error");
      }
    };

    fetchData();
    // document.getElementById("searchInput").value = "";
  });
