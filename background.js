
chrome.runtime.onMessage.addListener(receiver)


var info = {trigger : {}, action : {}}


var refresh;

var set = false;
function receiver(request, sender, sendResponse){
    console.log(request)

    if(request.refresh === "false"){
        refresh = false;
    }

    if(request.phase === "trigger"){
        if (request.name != undefined){
            info.trigger.name = request.name 
         
        }
        if (request.src != undefined){
            info.trigger.src = request.src
        }
        if (request.data != undefined){
            var title = request.data.title
          
            info.trigger.title = title
        }
        if (request.data != undefined){
            var description = request.data.description
            info.trigger.desc = description
        }
        console.log(info)
    }
    
    if (request.phase === "action"){
        if (request.name != undefined){
            info.action.name = request.name
        }
        if (request.src != undefined){
            info.action.src = request.src
        }
        if (request.data != undefined ){
            var title = request.data.title
            info.action.title = title
        }
        if(request.data != undefined){
            var description = request.data.description
            info.action.desc = description
        }
        console.log(info)
    }
    

    
    if (request.profile != undefined){
        info.action.profile = request.profile
    }

    if (request.set === "true"){
        chrome.storage.sync.get(null, function(items) {
            var allKeys = Object.keys(items);
            var allValues = Object.values(items)
            allValues = Object.values(allValues)
            var triggerValue = [{
            "data" : {
                "name" : info.trigger.name.toLowerCase(),
                "title" : info.trigger.title.toLowerCase(),
                "timestamp" : Date.now(),
                "src" : info.trigger.src,
                "description": request.t
            }
            }]
            var actionValue = [{
            "data" : {
                "name" : info.action.name.toLowerCase(),
                "title" : info.action.title.toLowerCase(),
                "timestamp" : Date.now(),
                "profile" : info.action.profile,
                "src" : info.action.src,
                "description": request.t
            }
            }]
            if (allValues.length){
                
                chrome.storage.sync.get({list:[]}, function(data) {
                    console.log(data.list);
                    update(data.list); //storing the storage value in a variable and passing to update function
                });                  
                function update(array) {
                    array.push(triggerValue);
                    array.push(actionValue);
                    //then call the set to update with modified value
                    chrome.storage.sync.set({list:array}, function() {
                        console.log("added to list with new values");
                    });
                }
            }else{
                var testArray=[];
            
                chrome.storage.sync.set({list:testArray}, function() {
                    console.log("added to list");
                });
                chrome.storage.sync.get({list:[]}, function(data) {
                    console.log(data.list);
                    update(data.list); 
                });  
                
                function update(array) {
                    array.push(triggerValue);
                    array.push(actionValue);
                    
                    chrome.storage.sync.set({list:array}, function() {
                        console.log("added to list with new values");
                    });
                }
            }
             
        }); 
        
    }
}
