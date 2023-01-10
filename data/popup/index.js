'use strict';
let startBlu = document.getElementById("blustart");
let stopBlu = document.getElementById("stopblu");
let btn_check = document.getElementById("AutoRefresh");
if(localStorage.getItem("autoRefreshApp") == null){
  localStorage.setItem("autoRefreshApp", true);
  btn_check.checked = true;
}else{
  let EndBtnCheck = localStorage.getItem("autoRefreshApp") == "true" ? true : false;
  btn_check.checked = EndBtnCheck;
}


btn_check.onchange = function(e){
  localStorage.setItem("autoRefreshApp", e.target.checked);
};


chrome.storage.local.get('startORstopApp', function (result) {
  if(result.startORstopApp == "true"){
    stopBlu.removeAttribute("disabled");
    startBlu.setAttribute("disabled", "disabled");
  }else{
    startBlu.removeAttribute("disabled");
    stopBlu.setAttribute("disabled", "disabled");
  }
});

// localization
document.querySelectorAll('[data-localized-value]').forEach(e => {
  const ref = e.dataset.localizedValue;
  const translated = chrome.i18n.getMessage(ref);
  if (translated) {
	  if(ref != "applyAllWindows" && ref != "applyActiveWindow" && ref != "reset"){
		   e.value = translated;
	  }
  }
});
document.querySelectorAll('[data-localized-title]').forEach(e => {
  const ref = e.dataset.localizedTitle;
  const translated = chrome.i18n.getMessage(ref);
  if (translated) {
    e.title = translated;
  }
});
document.querySelectorAll('[data-localized-placeholder]').forEach(e => {
  const ref = e.dataset.localizedPlaceholder;
  const translated = chrome.i18n.getMessage(ref);
  if (translated) {
    e.placeholder = translated;
  }
});
document.querySelectorAll('[data-localized-content]').forEach(e => {
  const ref = e.dataset.localizedContent;
  const translated = chrome.i18n.getMessage(ref);
  if (translated) {
    e.dataset.content = translated;
  }
});
document.querySelectorAll('[data-localize]').forEach(e => {
  const ref = e.dataset.localize;
  const translated = chrome.i18n.getMessage(ref);
  if (translated) {
    e.textContent = translated;
  }
});

const DCSI = 'firefox-default';

document.body.dataset.android = navigator.userAgent.indexOf('Android') !== -1;

let tab = {};

chrome.tabs.query({
  active: true,
  currentWindow: true
}, tbs => {
  if (tbs.length) {
    tab = tbs[0];
    if ('cookieStoreId' in tab) {
      const apply = document.querySelector('[data-cmd="apply"]');
      apply.value = chrome.i18n.getMessage('applyContainer');
      apply.title = chrome.i18n.getMessage('applyContainerTitle');

      const w = document.querySelector('[data-cmd="window"]');
      w.value = chrome.i18n.getMessage('applyContainerWindow');
      w.title = chrome.i18n.getMessage('applyContainerWindowTitle');

      const reset = document.querySelector('[data-cmd="reset"]');
      reset.value = chrome.i18n.getMessage('resetContainer');
      reset.title = chrome.i18n.getMessage('resetContainerTitle');
    }
  }
});

const map = {};

function sort(arr) {
  function sort(a = '', b = '') {
    const pa = a.split('.');
    const pb = b.split('.');
    for (let i = 0; i < 3; i++) {
      const na = Number(pa[i]);
      const nb = Number(pb[i]);
      if (na > nb) {
        return 1;
      }
      if (nb > na) {
        return -1;
      }
      if (!isNaN(na) && isNaN(nb)) {
        return 1;
      }
      if (isNaN(na) && !isNaN(nb)) {
        return -1;
      }
    }
    return 0;
  }
  const list = arr.sort((a, b) => sort(a.browser.version, b.browser.version));
  if (document.getElementById('sort').value === 'descending') {
    return list.reverse();
  }
  return list;
}

function get(path) {
  const cf = Promise.resolve({
    match() {
      return Promise.resolve();
    },
    add() {
      return Promise.resolve();
    }
  });
  return (typeof caches !== 'undefined' ? caches : {
    open() {
      return cf;
    }
  }).open('agents').catch(() => cf).then(cache => {
    const link = 'https://cdn.jsdelivr.net/gh/ray-lothian/UserAgent-Switcher/extension/firefox/data/popup/' + path;
    // updating agents once per 7 days
    chrome.storage.local.get({
      ['cache.' + path]: 0
    }, prefs => {
      const now = Date.now();
      if (now - prefs['cache.' + path] > 7 * 24 * 60 * 60 * 1000) {
        cache.add(link).then(() => chrome.storage.local.set({
          ['cache.' + path]: now
        }));
      }
    });
    return cache.match(link).then(resp => resp || fetch(path));
  });
}

function update(ua) {
  const browser = "Chrome";
  const os = 'Android';

}

chrome.storage.local.set({
  'popup-browser': "Chrome"
});
chrome.storage.local.set({
  'popup-os': "Android"
});
document.getElementById('sort').addEventListener('change', e => chrome.storage.local.set({
  'popup-sort': e.target.value
}));

document.addEventListener('change', ({target}) => {
  if (target.closest('#filter')) {
    chrome.storage.local.get({
      ua: ''
    }, prefs => update(prefs.ua || navigator.userAgent));
  }
  if (target.type === 'radio') {
    document.getElementById('ua').value = target.closest('tr').querySelector('td:nth-child(5)').textContent;
    document.getElementById('ua').dispatchEvent(new Event('input'));
  }
});




document.getElementById('custom').addEventListener('keyup', ({target}) => {
  const value = target.value;
  [...document.querySelectorAll('#list tbody tr')]
    .forEach(tr => tr.dataset.matched = tr.textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1);
});

chrome.storage.onChanged.addListener(prefs => {
  if (prefs.ua) {
    document.getElementById('ua').value = prefs.ua.newValue || navigator.userAgent;
    document.getElementById('ua').dispatchEvent(new Event('input'));
  }
});


// commands
document.addEventListener('click', ({target}) => {
  const cmd = target.dataset.cmd;
  if (cmd) {
    if (cmd === 'apply') {
      const value = "Mozilla/5.0 (Linux; Android 12; CPH2199) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36";
      
      console.log("Blu is started");

      if (value !== navigator.userAgent) {
        chrome.storage.local.set({"startORstopApp": "true"});
          stopBlu.removeAttribute("disabled");
          startBlu.setAttribute("disabled", "disabled");
          console.log("./../icons/72.png");
          chrome.browserAction.setIcon({ 
            path : {
              "16": "../icons/active/16.png",
              "18": "../icons/active/18.png",
              "19": "../icons/active/19.png",
              "32": "../icons/active/32.png",
              "36": "../icons/active/36.png",
              "38": "../icons/active/38.png",
              "48": "../icons/active/48.png",
              "64": "../icons/active/64.png",
              "72": "../icons/active/72.png",
              "120": "../icons/active/120.png",
              "128": "../icons/active/128.png",
              "144": "../icons/active/144.png",
              "152": "../icons/active/152.png",
              "167": "../icons/active/167.png",
              "180": "../icons/active/180.png",
              "192": "../icons/active/192.png",
              "256": "../icons/active/256.png",
              "384": "../icons/active/384.png",
              "512": "../icons/active/512.png"
        }
      });
        // prevent a container ua string from overwriting the default one
        if ('cookieStoreId' in tab && tab.cookieStoreId !== DCSI) {
          console.log("a")
          chrome.runtime.sendMessage({
            method: 'request-update',
            value,
            cookieStoreId: tab.cookieStoreId
          });
          chrome.storage.local.get({
            'container-uas': {}
          }, prefs => {
            prefs['container-uas'][tab.cookieStoreId] = value;
            chrome.storage.local.set(prefs);
          });
          
          
          if(localStorage.getItem("autoRefreshApp") == "true"){
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, ([tab]) => chrome.tabs.reload(tab.id, {
              bypassCache: true
            }));
          }          
        }
        else {
          console.log("b", value)
          console.log(chrome.storage.local.set({
            ua: value
          }));
          chrome.storage.local.get("ua", function(a){
            console.log(a.ua, navigator.userAgent)
          })
          if(localStorage.getItem("autoRefreshApp") == "true"){
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, ([tab]) => chrome.tabs.reload(tab.id, {
              bypassCache: true
            }));
          } 
        }
      }
    }
    else if (cmd === 'reset') {
      chrome.browserAction.setIcon({ 
        path : {
          "16": "../icons/16.png",
          "18": "../icons/18.png",
          "19": "../icons/19.png",
          "32": "../icons/32.png",
          "36": "../icons/36.png",
          "38": "../icons/38.png",
          "48": "../icons/48.png",
          "64": "../icons/64.png",
          "72": "../icons/72.png",
          "120": "../icons/120.png",
          "128": "../icons/128.png",
          "144": "../icons/144.png",
          "152": "../icons/152.png",
          "167": "../icons/167.png",
          "180": "../icons/180.png",
          "192": "../icons/192.png",
          "256": "../icons/256.png",
          "384": "../icons/384.png",
          "512": "../icons/512.png"
    }
  });
      // prevent a container ua string from overwriting the default one
      if ('cookieStoreId' in tab && tab.cookieStoreId !== DCSI) {
        
        chrome.runtime.sendMessage({
          method: 'request-update',
          value: '',
          cookieStoreId: tab.cookieStoreId,
          delete: true
        });
        chrome.storage.local.get({
          'container-uas': {}
        }, prefs => {
          delete prefs['container-uas'][tab.cookieStoreId];
          chrome.storage.local.set(prefs);
        });
        localStorage.setItem("startORstopApp", "false");
        startBlu.removeAttribute("disabled");
        stopBlu.setAttribute("disabled", "disabled");
        console.log("Blu bank was stoped.");
        
        if(localStorage.getItem("autoRefreshApp") == "true"){
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, ([tab]) => chrome.tabs.reload(tab.id, {
            bypassCache: true
          }));
        } 
      }
      else {
        chrome.storage.local.set({"startORstopApp": "false"});
        startBlu.removeAttribute("disabled");
        stopBlu.setAttribute("disabled", "disabled");
        chrome.storage.local.set({
          ua: ''
        });
        console.log("Blu bank was stoped.");
        
        if(localStorage.getItem("autoRefreshApp") == "true"){
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, ([tab]) => chrome.tabs.reload(tab.id, {
            bypassCache: true
          }));
        } 
      }
    }

    if (cmd) {
      target.classList.add('active');
      window.setTimeout(() => target.classList.remove('active'), 500);
    }
  }
});
