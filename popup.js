const UA =
  "Mozilla/5.0 (Linux; Android 12; CPH2199) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36";
function readUa() {
  let get = localStorage.getItem("ua_str_key");
  if (get == null) {
    localStorage.setItem("ua_str_key", UA);
    return UA;
  }

  return get;
}
function setUA(ua) {
  chrome.runtime.sendMessage({
    type: "setUA",
    ua: ua,
  });
  chrome.browserAction.setIcon({
    path: {
      16: "./data/icons/active/16.png",
      18: "./data/icons/active/18.png",
      19: "./data/icons/active/19.png",
      32: "./data/icons/active/32.png",
      36: "./data/icons/active/36.png",
      38: "./data/icons/active/38.png",
      48: "./data/icons/active/48.png",
      64: "./data/icons/active/64.png",
      72: "./data/icons/active/72.png",
      120: "./data/icons/active/120.png",
      128: "./data/icons/active/128.png",
      144: "./data/icons/active/144.png",
      152: "./data/icons/active/152.png",
      167: "./data/icons/active/167.png",
      180: "./data/icons/active/180.png",
      192: "./data/icons/active/192.png",
      256: "./data/icons/active/256.png",
      384: "./data/icons/active/384.png",
      512: "./data/icons/active/512.png",
    },
  });
  window.close();
}

function resetUA() {
  chrome.runtime.sendMessage({
    type: "resetUA",
  });
  chrome.browserAction.setIcon({
    path: {
      16: "./data/icons/16.png",
      18: "./data/icons/18.png",
      19: "./data/icons/19.png",
      32: "./data/icons/32.png",
      36: "./data/icons/36.png",
      38: "./data/icons/38.png",
      48: "./data/icons/48.png",
      64: "./data/icons/64.png",
      72: "./data/icons/72.png",
      120: "./data/icons/120.png",
      128: "./data/icons/128.png",
      144: "./data/icons/144.png",
      152: "./data/icons/152.png",
      167: "./data/icons/167.png",
      180: "./data/icons/180.png",
      192: "./data/icons/192.png",
      256: "./data/icons/256.png",
      384: "./data/icons/384.png",
      512: "./data/icons/512.png",
    },
  });
  window.close();
}

function bindButtons() {
  document.getElementById("submit-ua-custom").onclick = function () {
    setUA(readUa());
  };

  document.getElementById("submit-ua-reset").onclick = resetUA;
}

function init() {
  bindButtons();
}

init();
