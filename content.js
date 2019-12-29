chrome.storage.local.clear(function (){
  console.log("cleared?")
})




document.querySelector("body").addEventListener('click', function(s) {
  var liImg = s.target.closest('img');
  if(liImg !== null) {
    console.log(liImg.src);
    clicked_text = liImg.src
    let message = {
        text: clicked_text
    };
    if (message != undefined)
        chrome.runtime.sendMessage(message);
        var m = message.text
        chrome.storage.local.set({key: m}, function() {
          console.log('Value is set to ' + m);
        });
  }
}, false);
document.querySelector("body").addEventListener('click', function(s) {
  var liElem = s.target.closest('li')
  if(liElem !== null) {
    console.log(liElem.textContent);
    clicked_text = liElem.textContent
    let message = {
        text: clicked_text
    };
    if (message != undefined)
        chrome.runtime.sendMessage(message);
        var m = message.text
        chrome.storage.local.set({key: m}, function() {
          console.log('Value is set to ' + m);
        });

        chrome.storage.local.get('key', function(result) {
          console.log('Value currently is ' + result.key);
        });
  }
}, false);



chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});