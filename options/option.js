const UA_Current = document.querySelector("#user-agent");

const UA =
  "Mozilla/5.0 (Linux; Android 12; CPH2199) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36";

let userAgents = {
  Android: [
    {
      name: "Android 5 / Google Nexus 6 / Chrome",
      value:
        "Mozilla/5.0 (Linux; Android 5.0; Nexus 6 Build/LRX21D) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile Safari/537.36",
    },
    {
      name: "Android 5 / Amazon Silk",
      value:
        "Mozilla/5.0 (Linux; Android 5.1.1; KFAUWI Build/LVY48F) AppleWebKit/537.36 (KHTML, like Gecko) Silk/68.2.6 like Chrome/68.0.3440.85 Safari/537.36",
    },
    {
      name: "Android 6 / Google Nexus 6P / Chrome",
      value:
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 6P Build/MDB08L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.69 Mobile Safari/537.36",
    },
    {
      name: "Android 7 / Samsung Galaxy Tab / Chrome",
      value:
        "Mozilla/5.0 (Linux; Android 7.0; SM-T715 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.91 Safari/537.36",
    },
    {
      name: "Android 8 / Google Pixel / Chrome",
      value:
        "Mozilla/5.0 (Linux; Android 8.0.0; Pixel Build/OPR3.170623.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.98 Mobile Safari/537.36",
    },
    {
      name: "Android 8 / Samsung Galaxy S7 Edge / Chrome",
      value:
        "Mozilla/5.0 (Linux; Android 8.0.0; SM-G935F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.91 Mobile Safari/537.36",
    },
    {
      name: "Android 9 / Google Pixel 2 XL / Chrome 68",
      value:
        "Mozilla/5.0 (Linux; Android 9; Pixel 2 XL Build/PPR1.180610.009) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.91 Mobile Safari/537.36",
    },
    {
      name: "Android 9 / Google Pixel 2 XL / Firefox 61",
      value: "Mozilla/5.0 (Android 9; Tablet; rv:61.0) Gecko/61.0 Firefox/61.0",
    },
    {
      name: "Android 12 / OPPO Reno5 A (CPH2199) / Chrome 107 / Default",
      value:
        "Mozilla/5.0 (Linux; Android 12; CPH2199) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
    },
  ],
  iPhone: [
    {
      name: "iOS 11 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    },
    {
      name: "iOS 10 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1",
    },
    {
      name: "iOS 9 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13C75 Safari/601.1",
    },
    {
      name: "iOS 8 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12D508 Safari/600.1.4",
    },
    {
      name: "iOS 7 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/546.10 (KHTML, like Gecko) Version/6.0 Mobile/7E18WD Safari/8536.25",
    },
    {
      name: "iOS 6 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25",
    },
    {
      name: "iOS 5 / Safari",
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3",
    },
  ],
  iPad: [
    {
      name: "iOS 9 / Safari",
      value:
        "Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4",
    },
    {
      name: "iOS 8 / Safari",
      value:
        "Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4",
    },
    {
      name: "iOS 7 / Safari",
      value:
        "Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A501",
    },
    {
      name: "iOS 6 / Safari",
      value:
        "Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25",
    },
    {
      name: "iOS 5 / Safari",
      value:
        "Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
    },
  ],
};

function getting() {
  let get = localStorage.getItem("ua_str_key");
  if (get == null) {
    localStorage.setItem("ua_str_key", UA);
    UA_Current.value = UA;
    return UA;
  }

  UA_Current.value = get;

  return get;
}

function populateUserAgentSelect(ua) {
  let selectBox = document.getElementById("ua-predefined");
  let keys = Object.keys(userAgents).sort();
  let df = document.createElement("option");
  df.text = "current";
  df.value = "current";
  selectBox.appendChild(df);
  for (key of keys) {
    // Create <optgroup> for these user agents
    let optGroup = document.createElement("optgroup");
    optGroup.label = key;

    // Add all user agents into this optgroup
    let uaGroup = userAgents[key];
    let selected = false;
    for (let i = 0; i < uaGroup.length; i++) {
      let agent = uaGroup[i];
      let option = document.createElement("option");
      option.text = agent.name;
      option.value = agent.value;

      // If this value matches our current UA,
      // select this value in the dropdown
      if (option.value === ua) {
        selected = true;
        option.selected = true;
      }
      optGroup.appendChild(option);
    }
    if (selected) {
      df.selected = true;
    }
    selectBox.appendChild(optGroup);
  }
}

populateUserAgentSelect(getting());
let selectBox = document.getElementById("ua-predefined");
function Upgrade(e) {
  localStorage.setItem("ua_str_key", e.target.value);
  populateUserAgentSelect(getting());

  alert("changed! pease restart extenstion.");
}
selectBox.addEventListener("change", Upgrade);

UA_Current.addEventListener("change", Upgrade);
document.querySelector("#saving").addEventListener("click", function (e) {
  localStorage.setItem("ua_str_key", UA_Current.value);
  populateUserAgentSelect(getting());

  alert("changed! pease restart extenstion.");
});
function setUA() {
  chrome.runtime.sendMessage({
    type: "setUA",
    ua: getting(),
  });
  window.close();
}
document.querySelector('#update').addEventListener('click', setUA);
