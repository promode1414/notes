var menuItem = {
  "id" : "addtonotes",
  "title" : "Add to notes",
  "contexts" : ["selection","link"]
};

var menuItem2 = {
  "id" : "linktonotes",
  "title" : "Add link  to notes",
  "contexts" : ["link"]
};
/*var contextsList = ["selection","link","image","page"];
var context;
for(i=0 ;i<contextsList.length;i++){
 context = contextsList[i];
var titleX = "Twitter Toolkit share this "+ context+" on your twitter profile";
chrome.contextMenus.create({
  title : titleX,
  contexts:[context],
  id:context,
  //onclick:myfunction
});
}*/
 var f=0;
chrome.storage.sync.get(['alldetails'],function(mynotes){
  if(!mynotes.alldetails)
    chrome.storage.sync.set({'alldetails':"notes3`"},function(){  });

});
var hp=chrome.contextMenus.create(menuItem);
var  ph=chrome.contextMenus.create(menuItem2);

var text="";
var arr=new Array(100);
var brr=new Array(100);
var crr=new Array(100);
var count,p,x,y;
count=0;
//alert(contexts);
chrome.storage.onChanged.addListener(function(changes, namespace) {

  for( i=0;i<count;i++){
    //alert(arr[i]);
    chrome.contextMenus.remove(arr[i]);
  }
  count=0;
  chrome.storage.sync.get(['alldetails'],function(mynotes){
    //alert(mynotes.alldetails);
    for(i=0;i<mynotes.alldetails.length;i++){
      if(mynotes.alldetails[i]!="`"){
        text+=mynotes.alldetails[i];
      }
      else{
        brr[count]=text;
        p=text.slice(0,text.length-1);
        arr[count]=p+"1";
        crr[count]=p+"2";
        chrome.contextMenus.create({"title":p,"contexts" : ["selection"], "id":arr[count], "parentId":hp});
        chrome.contextMenus.create({"title":p,"contexts" : ["link"], "id":crr[count], "parentId":ph});
        count=count+1;
        text="";
      }
    }
    f=1;
    //alert(count);
    });
  });
      if(f==0){count=0;
        chrome.storage.sync.get(['alldetails'],function(mynotes){
          for(i=0;i<mynotes.alldetails.length;i++){
            if(mynotes.alldetails[i]!="`"){
              text+=mynotes.alldetails[i];
            }
            else{
              brr[count]=text;
              p=text.slice(0,text.length-1);
              arr[count]=p+"1";
              crr[count]=p+"2";

              chrome.contextMenus.create({"title":p,"contexts" : ["selection"], "id":arr[count], "parentId":hp});
              chrome.contextMenus.create({"title":p,"contexts" : ["link"], "id":crr[count], "parentId":ph});
              count=count+1;
              text="";
            }
          }
          //alert(count);
        });
}





chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: chrome.extension.getURL('popup.html')});
});

chrome.contextMenus.onClicked.addListener(function(clickData){

  for(i=0;i<count;i++){

  if(clickData.menuItemId == arr[i] && clickData.selectionText){
    x=arr[i];
    x=x.slice(0,x.length-1);
    //alert(x);
     chrome.storage.sync.get(x,function(mynotes){
        var newnotes = "";
       //alert("hi");
       //alert(mynotes[x]);
       if(mynotes[x]){
         newnotes = mynotes[x]+ clickData.selectionText + "`";
         //alert("hey");
       }else{
         newnotes += clickData.selectionText;
         newnotes += "`";
         //alert(newnotes);
       }
       //alert(newnotes);
       chrome.storage.sync.set({[x]:newnotes},function(){  });
       //alert(mynotes[x]);

       chrome.tabs.getAllInWindow(null, function(tabs)
       {
        for(var i = 0; i < tabs.length; i++)
        {
           if(tabs[i].title.indexOf("Notes") != -1)
           {
             chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
             break;
           }
        }
      });
     });

  }
  else if(clickData.menuItemId == crr[i] && clickData.linkUrl){

   //alert("hii");
   y=crr[i];
   y=y.slice(0,y.length-1);
   //alert(y);
    chrome.storage.sync.get(y,function(mynotes){
      var newnotes = "";
    //  alert(mynotes[x]);
      if(mynotes[y]){
        newnotes = mynotes[y]+ clickData.linkUrl+"``";
      }else{
        newnotes += clickData.linkUrl;
        newnotes += "``";
      }
      chrome.storage.sync.set({[y]:newnotes},function(){  });
      chrome.tabs.getAllInWindow(null, function(tabs)
      {
       for(var i = 0; i < tabs.length; i++)
       {
          if(tabs[i].title.indexOf("Notes") != -1)
          {
            chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
            break;
          }
       }
     });
    });
  }

 }
});
