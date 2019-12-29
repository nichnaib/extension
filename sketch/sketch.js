// sto passando i parametri al popup prendendoli dal background.js
let bgpage = chrome.extension.getBackgroundPage();
let info = bgpage.info;

console.log(info)
for (elmt of info){
  console.log(info);
  if(info[0].includes("http")){
    document.getElementById("myImg").src = info;
  }else{
    document.getElementById('info').innerHTML = info;
  }
}

chrome.storage.sync.get('key', function(result) {
  console.log('Value currently is ' + result.key);
});

