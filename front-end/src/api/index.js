const commonUrl = "http://localhost:5000";


// 封装 ajax
function getJson(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", `${commonUrl}/${url}`);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) resolve(xhr.response);
        else reject(xhr.response);
      }
    }
  })
}


export const fetchFlights = (depCity, arrCity, depDate) => getJson(`flights?depCity=${depCity}&arrCity=${arrCity}&depDate=${depDate}`);

export const fetchSeveralLowPriceFlights = (depCity, arrCity, depDate) => getJson(`flights/several?depCity=${depCity}&arrCity=${arrCity}&depDate=${depDate}`);