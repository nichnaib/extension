
let bgpage = chrome.extension.getBackgroundPage();
let info = bgpage.info;

let refresh = bgpage.refresh;


var chains = {
	"service": {
		"twitter":{
			"post a tweet": ["new tweet by you","new link by you"],
			"post a tweet with image": ["new link by you"]
		},
		"facebook pages":{
			"upload a photo from url": ["new photo upload on page"]
		},
		"google drive":{
			"upload file from url": ["new photo in your folder"]
		},
		"dropbox":{
			"add file from url": ["new photo in your folder"]
		},
    "flickr": {
      "upload public photo from url": ["any new public photo", "new public photos"]
    },
    "pinterest":{
      "add pin to board":["new pin on your board"]
    },
    "wordpress":{
      "create a photo post":["any new post"]
    },
    "tumblr": { 
      "create a text post": ["any new post", "new text post"],
      "create a photo post": ["any new post","new photo post"],
      "create a link post": ["any new post", "new link post"],
      "create a quote post": ["any new post", "new quote post"]
    }
	}
}

var ascisse =  {"any new photo": 0, "new screenshot": 1, "new photo taken in area": 2, "new photo with the front camera": 3, "new photo with the rear camera": 4, "new photo added to album": 5, "new photo in your folder":6,"any new photo by you":7, "new photo by you with specific hashtag":8, "new photo by you in area":9}

var ordinate = {
 "post a tweet": 0,
 "post a tweet with image": 1,
 "update profile picture": 2,
 "update bio": 3,
 "upload file from url": 4,
 "add file from url": 5,
 "create a text file": 6,
 "append to a text file": 7, 
 "create a status message": 8,
 "create a link post": 9,
 "upload a photo from url": 10,
 "add photo to album": 11,
 "upload public photo from url":12,
 "add pin to board":13,
 "create a photo post":14,
 "send photo":15,
 "send message":16,
 "post to channel":17
}

let tablePublicProfile = [
  ["HIGH","HIGH", "HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["HIGH", "HIGH", "HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["NONE", "NONE" ,"NONE", "NONE", "NONE", "NONE", "NONE","NONE", "NONE","NONE"], 
  ["HIGH", "MEDIUM", "HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["HIGH", "MEDIUM", "HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["NONE", "NONE" ,"NONE", "NONE", "NONE", "NONE","NONE","NONE","NONE","NONE"], 
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM","MEDIUM","MEDIUM","MEDIUM","MEDIUM"], 
  ["NONE", "NONE" ,"NONE", "NONE", "NONE", "NONE","NONE","NONE","NONE","NONE"], 
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"],
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"],
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"],
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"],
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM","MEDIUM","MEDIUM","MEDIUM","MEDIUM"],
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH","HIGH","HIGH","HIGH","HIGH"]
]

let tableRestrictedProfile = [
  ["MEDIUM","MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM","MEDIUM", "MEDIUM","MEDIUM", "MEDIUM"], 
  ["MEDIUM", "MEDIUM","MEDIUM","MEDIUM","MEDIUM","MEDIUM","MEDIUM","MEDIUM","MEDIUM", "MEDIUM"], 
  ["HIGH", "HIGH" ,"HIGH", "HIGH", "HIGH", "HIGH", "HIGH", "HIGH", "HIGH", "HIGH"], 
  ["NONE", "NONE" ,"NONE", "NONE", "NONE", "NONE","NONE", "NONE", "NONE", "NONE"], 
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM","MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"], 
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM","MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"], 
  ["NONE", "NONE" ,"NONE", "NONE", "NONE", "NONE","NONE", "NONE", "NONE", "NONE"], 
  ["LOW", "LOW" ,"LOW", "LOW", "LOW", "LOW","LOW", "LOW", "LOW", "LOW"], 
  ["NONE", "NONE" ,"NONE", "NONE", "NONE", "NONE","NONE", "NONE", "NONE","NONE"], 
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM","MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"], 
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE", "NONE", "NONE","NONE"],
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"],
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"],
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"],
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"],
  ["LOW", "LOW" ,"LOW", "LOW", "LOW", "LOW","LOW", "LOW", "LOW", "LOW"],
  ["MEDIUM", "MEDIUM" ,"MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM", "MEDIUM"]
]

let tablePrivateProfile = [
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["HIGH","HIGH","HIGH","HIGH","HIGH","HIGH","HIGH","HIGH","HIGH","HIGH"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"], 
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"]
]


var privacy="";

if (info.trigger.title && info.action.title != undefined){
  if (ascisse[info.trigger.title.toLowerCase()] != undefined || ordinate[info.action.title.toLowerCase()] != undefined){
    document.getElementById("publicProfile").addEventListener("click", function(){
      var message = {
        profile : "pubblico"
      }
      chrome.runtime.sendMessage(message)
      chrome.storage.sync.get({list:[]}, function(data) {
        for (var i = 0; i < data.list.length; i++){
          if (i === data.list.length-1){
            break
          }
          var savedValues = Object.values(data.list[i+1])
          savedTitle = savedValues['0']['data']['title']
          savedName = savedValues['0']['data']['name']
          savedProfile = savedValues['0']['data']['profile']
          if (chains['service'][savedName] != undefined){
            if (chains['service'][savedName][savedTitle] != undefined){
              // in chainElem ho il trigger che sta inserendo l'utente associato all'azione che ho identificato come chain
              chainElem = chains['service'][savedName][savedTitle]
                // se sono più di un trigger
                for (var elmt of chainElem){
                  trig = elmt
                  // il controllo è perchè l'utente potrebbe selezionare lo stesso servizio ma un trigger diverso da quello che genera la chain
                  if (info.trigger.title != undefined && info.trigger.name != undefined){
                    if (trig === info.trigger.title.toLowerCase() && a_name === info.trigger.name.toLowerCase()){
                      if (savedProfile === "privato"){
                        document.getElementById('privacy').innerHTML = "HIGH";
                      } else if (savedProfile === "ristretto") {
                        document.getElementById('privacy').innerHTML = "HIGH";
                      } else if (savedProfile === "publico") {
                        document.getElementById('privacy').innerHTML = "Profile was already Public";
                      } else {
                        document.getElementById('privacy').innerHTML = "Profile visibility was not set";
                      }
                    }
                  }
                }
              }
            }
          i++;   
        }
      });                
      
      privacy = tablePublicProfile[ordinate[info.action.title.toLowerCase()]][ascisse[info.trigger.title.toLowerCase()]]
      if (privacy === undefined){
        document.getElementById('privacy').innerHTML = "Image privacy violation cannot be checked ";
      }else {
        document.getElementById('privacy').innerHTML = privacy;
      }
      

    });
    document.getElementById("privateProfile").addEventListener("click", function(){
      var message = {
        profile : "privato"
      }
      chrome.runtime.sendMessage(message)
      chrome.storage.sync.get({list:[]}, function(data) {
        for (var i = 0; i < data.list.length; i++){
          if (i === data.list.length-1){
            break
          }
          var savedValues = Object.values(data.list[i+1])
          savedTitle = savedValues['0']['data']['title']
          savedName = savedValues['0']['data']['name']
          savedProfile = savedValues['0']['data']['profile']
          if (chains['service'][savedName] != undefined){
            if (chains['service'][savedName][savedTitle] != undefined){
              chainElem = chains['service'][savedName][savedTitle]
                for (var elmt of chainElem){
                  trig = elmt
                  if (info.trigger.title != undefined && info.trigger.name != undefined){
                    if (trig === info.trigger.title.toLowerCase() && a_name === info.trigger.name.toLowerCase()){
                      if (savedProfile === "privato"){
                        document.getElementById('privacy').innerHTML = "Profile was already Private";
                      } else if (savedProfile === "ristretto") {
                        document.getElementById('privacy').innerHTML = "No violation";
                      } else if (savedProfile === "publico"){
                        document.getElementById('privacy').innerHTML = "No violation";
                      } else {
                        document.getElementById('privacy').innerHTML = "Profile visibility was not set"
                      }
                    }
                  }
                }
              }
            }
          i++;   
        }
      });
      privacy = tablePrivateProfile[ordinate[info.action.title.toLowerCase()]][ascisse[info.trigger.title.toLowerCase()]]
      if (privacy === undefined){
        document.getElementById('privacy').innerHTML = "Image privacy violation cannot be checked ";
      }else {
        document.getElementById('privacy').innerHTML = privacy;
      }
      
    });
    document.getElementById("restrictedProfile").addEventListener("click", function(){
      var message = {
        profile : "ristretto"
      }
      chrome.runtime.sendMessage(message)
      chrome.storage.sync.get({list:[]}, function(data) {
        for (var i = 0; i < data.list.length; i++){
          if (i === data.list.length-1){
            break
          }
          var savedValues = Object.values(data.list[i+1])
          savedTitle = savedValues['0']['data']['title']
          savedName = savedValues['0']['data']['name']
          savedProfile = savedValues['0']['data']['profile']
          if (chains['service'][savedName] != undefined){
            if (chains['service'][savedName][savedTitle] != undefined){
              chainElem = chains['service'][savedName][savedTitle]
                for (var elmt of chainElem){
                  if (info.trigger.title != undefined && info.trigger.name != undefined){
                    if (trig === info.trigger.title.toLowerCase() && a_name === info.trigger.name.toLowerCase()){
                      if (savedProfile === "privato"){
                        document.getElementById('privacy').innerHTML = "MEDIUM";
                      } else if (savedProfile === "ristretto") {
                        document.getElementById('privacy').innerHTML = "Profile was already Restricted";
                      } else if (savedProfile === "publico"){
                        document.getElementById('privacy').innerHTML = "No violation";
                      } else {
                        document.getElementById('privacy').innerHTML = "Profile visibility was not set"
                      }
                    }
                  }
                }
              }
            }
          i++;   
        }
      });    

      privacy = tableRestrictedProfile[ordinate[info.action.title.toLowerCase()]][ascisse[info.trigger.title.toLowerCase()]]
      if (privacy === undefined){
        document.getElementById('privacy').innerHTML = "Image privacy violation cannot be checked ";
      }else {
        document.getElementById('privacy').innerHTML = privacy;
      }
      
    });
  }else{
    var message = {
      profile : "null"
    }
    chrome.runtime.sendMessage(message)
    privacy = "Image privacy violation cannot be checked"
    document.getElementById('privacy').innerHTML = privacy;
  }
}


// in creazione
if(info.trigger.name === undefined){
  document.getElementById('triggerName').innerHTML = "TO SET";
} else {
 document.getElementById('triggerName').innerHTML = info.trigger.name.toUpperCase();
}

if(info.trigger.src === undefined){
  document.getElementById('triggerSrc').src = "../wait.png";

}else {
  document.getElementById('triggerSrc').src = info.trigger.src;
}

if(info.trigger.title === undefined){
  document.getElementById('triggerDescTitle').innerHTML = "TO SET";
} else {
  document.getElementById('triggerDescTitle').innerHTML = info.trigger.title;
}

if(privacy === undefined){
  document.getElementById('privacy').innerHTML = " ";
} else {
  document.getElementById('privacy').innerHTML = privacy;
}


if(info.action.src === undefined){
  document.getElementById('actionSrc').src = "../wait.png";

}else {
  document.getElementById('actionSrc').src = info.action.src;
}


if(info.action.name === undefined) {
  document.getElementById('actionName').innerHTML = "TO SET";
} else {
  document.getElementById('actionName').innerHTML = info.action.name.toUpperCase();
  document.getElementById('viewer').innerHTML = info.action.name;
}

if(info.action.title === undefined) {
  document.getElementById('actionDescTitle').innerHTML = "TO SET";
} else {
  document.getElementById('actionDescTitle').innerHTML = info.action.title;
}



chrome.storage.sync.get({list:[]}, function(data) {
  console.log(data.list);
  for (var i = 0; i < data.list.length; i++){
    if (i === data.list.length-1){
      break
    }
    var t_values = Object.values(data.list[i])   
    t_title = t_values['0']['data']['title']
    t_name = t_values['0']['data']['name']
    t_src = t_values['0']['data']['src']

    var a_values = Object.values(data.list[i+1])
    a_title = a_values['0']['data']['title']
    a_name = a_values['0']['data']['name']
    a_profile = a_values['0']['data']['profile']
    a_src = a_values['0']['data']['src']

    console.log(t_values)
    console.log(a_values)

    if (chains['service'][a_name] != undefined){
      if (chains['service'][a_name][a_title] != undefined){
        chainElem = chains['service'][a_name][a_title]
          for (var elmt of chainElem){
            trig = elmt
            if (info.trigger.title != undefined && info.trigger.name != undefined){
              if (trig === info.trigger.title.toLowerCase() && a_name === info.trigger.name.toLowerCase()){
                console.log("CHAIN")
                var c = document.getElementById("chain");
                if (c.style.display === "none") {
                  c.style.display = "grid";
                } else {
                  c.style.display = "none";
                }
                var nc = document.getElementById("noChain");
                if (nc.style.display === "none") {
                  nc.style.display = "grid";
                } else {
                  nc.style.display = "none";
                }
  
                 
                document.getElementById('SavedTriggerSrc').src = t_src;
                document.getElementById('SavedTriggerName').innerHTML = t_name.toUpperCase();
                document.getElementById('SavedTriggerDescTitle').innerHTML = t_title;
                
                document.getElementById('privacy').innerHTML = privacy;
  
                document.getElementById('SavedActionSrc').src = a_src;
                document.getElementById('SavedActionName').innerHTML = a_name.toUpperCase();
                document.getElementById('SavedActionDescTitle').innerHTML = a_title;
  
                document.getElementById('CTriggerSrc').src = info.trigger.src;
                document.getElementById('CTriggerName').innerHTML = info.trigger.name.toUpperCase();
                document.getElementById('CTriggerDescTitle').innerHTML = info.trigger.title;
  
                document.getElementById('CActionSrc').src = info.action.src;
                document.getElementById('CActionName').innerHTML = info.action.name.toUpperCase();
                document.getElementById('CActionDescTitle').innerHTML = info.action.title;
              }
            }
          }
        }
      }
    i++;   
  }
});                

