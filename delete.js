$(document).ready(function(){
  var alldetails="";
  var ol,olid,res="",ans="";
    $('#body').on('click', 'button', function() {
      //alert("sss");
        var btn_id = $(this).attr('id');
        var k=btn_id.slice(0,btn_id.length);
        var req=k.slice(0,k.length-1);
          chrome.storage.sync.get(['alldetails'],function(mynotes){
            ans=mynotes.alldetails;
            //alert(ans.indexOf(req));
            if(req.length!=0 && ans.indexOf(req)!==-1)
            {  //alert(req);
              x=req;
               chrome.storage.sync.get(x,function(mynotes){
                 empt="";
                 chrome.storage.sync.set({[x]:empt},function(){  });
               });
               req=req+"3"+"`";
               //alert(req);
              res=mynotes.alldetails.replace(req,"");
              chrome.storage.sync.set({'alldetails':res},function(){  });
              //chrome.runtime.reload();
              //chrome.extension.getBackgroundPage().updateSetting();
            }

          });
        var id = $(this).closest('li').attr('id');
        var did= $(this).closest('details').attr('id');
        var name=did.slice(0,did.length-1);
        var store,summary,details;
        var ac = document.getElementById(id).innerHTML;
      var element= document.getElementById(id);
      var text=  element.textContent;
      var final=text.slice(0,text.length);
      //alert(text);
      var x = parseInt(id);
        if(x%2==0){
       final+="`";
      }
      else final+="``";
      chrome.storage.sync.get(name,function(mynotes){
        //alert(final);
      //  alert("hi");
       store=mynotes[name].replace(final,"");
       //alert(store);


       chrome.storage.sync.set({[name]:store},function(){  });

      });

    });
   //}
    $('#deleteAll').on('click', 'button', function() {
       chrome.storage.sync.get(['notes'],function(mynotes){
         chrome.storage.sync.set({'notes':""},function(){  });
       });
    });
    $('#submit').on('click', 'button', function() {

      chrome.storage.sync.get(['alldetails'],function(mynotes){
        var k=0;
        var text=document.getElementById("new");
      //alert(text.value.length);
        if(text.value.length==0){
          alert("This field cannot be empty");
        }
        else{
        var textd,p;
        //alert(text.value);
        for(i=0;i<mynotes.alldetails.length;i++){
          if(mynotes.alldetails[i]!="`"){
            textd+=mynotes.alldetails[i];
          }
          else{

            b=textd;
            p=textd.slice(0,textd.length-1);
            //alert(textd);
            textd="";

            if(p==text.value)
            {
              k=1;
            }
        }
      }
      if(k==1)
      {
        alert("Select some different name this name is already available");
      }
      else {
        division=document.createElement("div");
        division.setAttribute("class","container");
        details=document.createElement("details");
        ol=document.createElement("ol");
        olid=text.value+"3";
        //var k;
      //  alert(olid);
      an=document.createElement("a");
      linebreak=document.createElement("br");
      bt=document.createElement("button");
      bt.setAttribute("type","button");
      bt.setAttribute("class","btn btn-danger");
      bt.setAttribute("id",text.value+"4");
      an.setAttribute("href","chrome-extension://ojffefdplfkjgcfilifkomfifmdbceme/popup.html");
      bttext=document.createTextNode("delete "+text.value);
      bt.appendChild(bttext);
      an.appendChild(bt);
      an.appendChild(document.createElement("br"));
        ol.setAttribute("id",text.value); //li.setAttribute("id",countl);
        details.setAttribute("id",olid);
       //details.setAttribute(open);
         //alert(mynotes.alldetails);
        alldetails=mynotes.alldetails+olid+"`";
        strong=document.createElement("strong");
        summary=document.createElement("summary");
        summary.setAttribute("class","btn btn-success btn-block");
        tab=document.createTextNode(text.value);
        strong.appendChild(tab);
        summary.appendChild(strong);
        details.appendChild(summary);
        details.appendChild(ol);
        division.appendChild(details);

        document.getElementById("body").appendChild(linebreak);
        document.getElementById("body").appendChild(division);

        chrome.storage.sync.set({'alldetails':alldetails},function(){  });
        //alert(mynotes.alldetails);
          // chrome.runtime.reload();
      }
    }
      });
    });
});
