var jsonData = {
    "key0": {
         "tag": "h1",
         "text": "Международный автовокзал «Саларьево»",
         "duration": "3000",
         "anim": "AppereanceAnim",
         "color": "orange"
    },
    "key1": {
         "tag": "img",
         "URL": "https://www.mosgortrans.ru/upload/medialibrary/378/378d4331f105daa74b12b9fc1befb408.jpg",
         "duration": "4000",
         "anim": "PulsingAnim"
    },
    "key2": {
         "tag": "notification",
         "text": "Посадка в автобус возможна при предъявлении электронного билета на мобильном устройстве. При себе необходимо иметь оригинал документа, удостоверяющего личность пассажира (для детей в возрасте до 14 лет – оригинал свидетельства о рождении), на основании которого был приобретен билет.",
         "duration": "5000",
         "anim": "SlideInAnim"
    },
    "key3": {
         "tag": "h1",
         "text": "Схема проезда",
         "duration": "3000",
         "anim": "AppereanceAnim",
         "color": "blue"
    },
    "key4": {
         "tag": "img",
         "URL": "https://www.mosgortrans.ru/upload/photo/avs.png",
         "duration": "4000",
         "anim": "AppereanceAnim"
    }
};
var jsonFileName;


console.log(jsonData);


var keys  = Object.keys(jsonData);
var valueName = Object.values(jsonData);
var jsonLength = Object.keys(jsonData).length;

var values =  [];
for (var k in jsonData){
    values.push(jsonData[k])
}

var html = JSON.stringify(jsonData);  
let jsonCanvas = document.getElementById('b');

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
    console.log(htmlData);
} 
console.log(values);
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

    /*
    (function(i) {
    setInterval(function(){

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
        timeDuration = values[i].duration;
        console.log(timeDuration);
    }, timeDuration);
    })(i);
    */
}

startAnim();
