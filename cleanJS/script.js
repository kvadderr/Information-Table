var jsonData = {};
var jsonFileName;
const url2 = new URL("http://localhost:4000/jsonFileName");

fetch(url2).then(function(response) {
    response.text().then(function(text) {
        console.log(text);
        jsonFileName = text;
        const url = new URL("http://localhost:4000/jsonData?name="+jsonFileName);
        fetch(url).then(function(response) {
            response.json().then(function(json) {
                jsonData = json;
                afterLoad();
            });
          });
    });
  });


function afterLoad(){

    var jsonLength = Object.keys(jsonData).length;
    var values =  [];
    for (var k in jsonData){
        values.push(jsonData[k])
    }


    var htmlData = [];

    function htmlCreator(){
        for (i = 0; i < jsonLength; i++){
            
            if (values[i].tag == "img") {
                htmlData.push("<img src="+values[i].URL+" />");
            }  

            if(values[i].tag == "a") {
                htmlData.push("<a style='color: "+values[i].color+"' href='" + values[i].URL +"'>"+ values[i].text +"</a>");
            } 

            if(values[i].tag == "strike") {
                htmlData.push("<strike style='color: "+values[i].color+"' href='" + values[i].URL +"'>"+ values[i].text +"</strike>");
            } 
            
            if(values[i].tag == "h1") {
                htmlData.push("<h1 class='is-size-2 is-family-secondary' style='color: "+values[i].color+"'>" + values[i].text + "</h1>");
            }
            if(values[i].tag == "notification") {
                htmlData.push('<div class="notification is-primary"><button class="delete"></button>'+values[i].text+'</div>');
            }
            if(values[i].tag == "progress") {
                htmlData.push('<progress class="progress is-large '+values[i].type+'" max="100"></progress>');
            }
        } 
        console.log("HTML DATA" + jsonLength);
    } 

    htmlCreator();

    function startAnim(){

        const canvas = document.getElementById('a');
        
        var i = 0;
        var timeDuration = 6000;
        var animName;
    
        var timerId = setTimeout(function tick() {
            
            canvas.onanimationend = function(){
                this.classList.remove(values[i].anim);
            }   

            if (values[i].anim != null) {
                canvas.className='';
                animName = values[i].anim;
                canvas.classList.add(animName);
            } else {
                canvas.classList.remove(animName);
            }
            canvas.innerHTML = htmlData[i];
            i++;
            if (i==jsonLength) i = 0;
            timerId = setTimeout(tick, values[i].duration);
        }, 0);
    }

    startAnim();
}
