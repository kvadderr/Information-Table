var jsonData ={
    "key0": {
         "tag": "h1",
         "text": "«Долой самодержавие» и «Вся власть Советам» — Лозунги революции",
         "duration": "7000",
         "anim": "AppereanceAnim",
         "color": "red"
    },
    "key1": {
         "tag": "progress",
         "duration": "5000",
         "type": "is-danger"
    },
    "key2": {
         "tag": "strike",
         "text": "Революция — любая, от бархатной до самой лютой — всегда одета в лозунги. В полотнища, на которых написано, что же требуют протестующие. Во все времена протест начинается не с радикальных, а с мирных лозунгов. ",
         "duration": "4000",
         "anim": "SlideInAnim",
         "color": "green"
    },
    "key3": {
         "tag": "img",
         "URL": "https://cdnn21.img.ria.ru/images/148919/62/1489196262_0:0:1491:971_600x0_80_0_1_774e28b5fba6cf2c224330977d52149b.jpg.webp",
         "duration": "6000",
         "anim": "AppereanceAnim"
    },
    "key4": {
         "tag": "notification",
         "text": "Всё начиналось с мирного требования хлеба. Для семей защитников Родины. Святое дело — и совершенно не претендовавшее на потрясение основ.",
         "duration": "6000",
         "anim": "AppereanceAnim"
    },
    "key5": {
         "tag": "img",
         "URL": "https://cdnn21.img.ria.ru/images/148919/66/1489196680_0:0:3236:2048_600x0_80_0_1_d3e46f98f2e56cca4dbc682f6b9422ec.jpg.webp",
         "duration": "6000",
         "anim": "PulsingAnim"
    },
    "key6": {
         "tag": "notification",
         "text": "Восьмого марта — в женский день, уже тогда пользовавшийся популярностью — перед победившим революционным правительством женщины поставили уже политические вопросы.",
         "duration": "7000",
         "anim": "SlideInAnim"
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
