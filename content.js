
//to clear 
//chrome.storage.sync.clear()



url = window.location.href

if (url === "https://ifttt.com/create"){

  var targetNode = document.getElementById('composer');

  // Opzioni per il monitoraggio (quali mutazioni monitorare)
  var config = { attributes: true, childList: true, subtree: true };
  
  var bool = false
  var before;
  
  // Funzione di callback da eseguire quando avvengono le mutazioni
  var callback = function(mutationsList, observer) {

    
  
    items = document.querySelectorAll(".service-content")
  
    items.forEach(function(item){
      item.addEventListener('click', function(){
        step = document.getElementsByClassName("user-step")[0]
        var st = step.innerHTML
        var splitted = st.split(" ")
        var res = splitted[1]
        console.log(item.innerHTML)
        var s = item.innerHTML
        var name = item.innerText
        
        var until = s.indexOf(" alt")
        var src = s.substring(10,until-1)
        var message;
        if(res === "1"){
          message = {
            src, name, phase : "trigger", set : "false"
          }    
        } if(res === "3") {
           message = {
            src, name, phase : "action", set : "false"
          }
        }
  
        console.log(message)
        if(message != undefined){
          chrome.runtime.sendMessage(message)
        }
      }, {once : true})
    })
  
    testi = document.querySelectorAll(".tanda-selector")
    testi.forEach(function(testo){
      lis = testo.getElementsByTagName('li')
      
      for (var item of lis){
        item.addEventListener('click', function(e){
          title =''
          description=''
          for(var child of this.childNodes){
            if(child.className == 'title'){
              title = child.innerText
              console.log(title)
            }
            if(child.className == 'description'){
              description = child.innerText
              console.log(description)
            }
          }
          step = document.getElementsByClassName("user-step")[0]
          var st = step.innerHTML
    
          var splitted = st.split(" ")
          var res = splitted[1]
      
          var data = {"title":title, "description":description}
          console.log(data)
          var message;
          if (res === "2"){
            message = {
              data, phase : "trigger", set : "false"
            }
          }if (res === "4"){
            before = "4";
            message = {
              data, phase : "action", set : "false"
            }
          }
    
          if(message != undefined){
            chrome.runtime.sendMessage(message)
          }
        })
      }
  
    })
    
    step = document.getElementsByClassName("user-step")[0]
  
    if (step != undefined){
      var st = step.innerHTML
      var splitted = st.split(" ")
      var res = splitted[1]
      console.log(res)
    
  
      if (res === "5" && before === "4"){

        function doOnce() {
          if (document.cookie.replace(/(?:(?:^|.*;\s*)test\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
            alert("Hey! Check your applet's privacy violation before creating the action. Press the chrome extension in the upper rigth corner of the browser!");
            document.cookie = "test=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
          }
        }
        doOnce()
      } else {
        document.cookie = "test=true; expires=Fri, 31 Dec 1970 23:59:59 GMT";
      }
  
      if (res === "6") {
        before = "6"
        text = document.getElementsByName('description')

        t = text[1].innerHTML

        finish = document.querySelectorAll("input[value=Finish]");
        finish.forEach(function(pressed) {
          pressed.addEventListener("click", function(e){
          
            message = {
              t : t , set : "true"
            }
            chrome.runtime.sendMessage(message)
    
          })
        })
        
      }
    }

  };
  
  
  
  // Creazione di un'istanza di monitoraggio collegata alla funzione di callback
  var observer = new MutationObserver(callback);
  
  // Inizio del monitoraggio del nodo target riguardo le mutazioni configurate
  
  observer.observe(targetNode, config); 
  
} else {

  title = document.getElementsByClassName('connection-title')
  var t = title[0].innerText


  del = document.querySelectorAll(".delete");
  del.forEach(function(pressed) {
    pressed.addEventListener("click", function(){
      chrome.storage.sync.get({list:[]}, function(data) {
        for (var i of data.list){
          t_saved = i['0']['data']['description']
          index = data.list.indexOf(i)
          if (t_saved === t){
            data.list.splice(index,2)
            chrome.storage.sync.set(data, function(){
              console.log("Items removed")
            })
          }
        }
      });  
    })
  });


}


