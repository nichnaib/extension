console.log("background running")

chrome.runtime.onMessage.addListener(receiver)

var info = []

function receiver(request, sender, sendResponse){
    if (request.text.length > 0){
        console.log(request.text)
        info.push(request.text)
    }   
}