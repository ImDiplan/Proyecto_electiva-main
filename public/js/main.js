const socket = io();
const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const green = document.getElementById("green")
// const counter = document.getElementById("counter-number")
const stopbtn = document.getElementById("stopbtn")
const gobtn = document.getElementById("gobtn")


const tm = document.getElementById("tm")
const tp = document.getElementById("tp")

var activeLight = ''


const $lucesCirculo = document.querySelectorAll('.circle-light');
let contLuz = 0;

const counter = document.getElementById("seconds");
// console.log($lucesCirculo);


socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('updateSemaphore', function (state) {
    let light = JSON.parse(state).light
    changeLight(light)

})

socket.on('updateData', function(data) {

    tm.innerHTML = data.totalM
    tp.innerHTML = data.totalP
    if ($.fn.dataTable.isDataTable('#maintable')) {
        $('#maintable').DataTable()
        .clear()
        .draw();
        $('#maintable').DataTable().destroy();
    }
    console.log(data)
    
    let html = ''
    data.data.forEach(row => {
        console.log(row)
       html += "<tr><td>" + row.steps + "</td><td>" + row.location +"</td></tr>"
    })
    $("#maintable tbody").append(html)

   $('#maintable').DataTable()
})

// function changeLight(light) {
//     red.classList.remove("active");
//     yellow.classList.remove("active");
//     green.classList.remove("active");

//     switch(light) {
//         case 'GREEN':
//             green.classList.add("active");
//           break;
//         case 'RED':
//             red.classList.add("active");
//             initCounter()
//           break;
//         case 'YELLOW':
//             yellow.classList.add("active");

//         break;
//         default:
//           // code block
//       }
// }

function changeLight(light) {

    //$lucesCirculo[contLuz].className = 'luces-circulo';
    // $lucesCirculo.classList.remove("color");
    $lucesCirculo[0].classList.remove("active");
    $lucesCirculo[1].classList.remove("active");
    $lucesCirculo[2].classList.remove("active");
    let luzActual = 0;
    // red.classList.remove("active");
    // yellow.classList.remove("active");
    // green.classList.remove("active");

    switch(light) {
        case 'GREEN':
            // green.classList.add("active");
            //$lucesCirculo.classList.add("active");
            // $lucesCirculo.classList.add("color");
            luzActual = $lucesCirculo[2];
            luzActual.classList.add(luzActual.getAttribute('color'));
            luzActual.classList.add('active');
          break;
        case 'RED':
            // red.classList.add("active");
            luzActual = $lucesCirculo[0];
            luzActual.classList.add(luzActual.getAttribute('color'));
            luzActual.classList.add('active');
            initCounter()
          break;
        case 'YELLOW':
            luzActual = $lucesCirculo[1];
            luzActual.classList.add(luzActual.getAttribute('color'));
            luzActual.classList.add('active');
            // yellow.classList.add("active");

        break;
        default:
          // code block
      }
}

var totalTime = 0;
function initCounter() {
    totalTime = 10
    counter.classList.remove("disable");

    updateClock()
}
function updateClock() {
    counter.innerHTML = totalTime;

    if(totalTime==0) {
        counter.innerHTML = '00';
        counter.classList.add("disable");


    } else {
        totalTime-=1;
        setTimeout("updateClock()",1000);
        effectCircle(totalTime);
    }
}

stopbtn.addEventListener("click", function(){
    console.log("stop")
    socket.emit('stop')
});



gobtn.addEventListener("click", function(){
    console.log("Go")
    socket.emit('Go')
});

// $(document).ready(function() {
//     $('#maintable').DataTable();
// } );

effectCircle = function(counter){
    const seconds = 10;
    const strokeDash = 439;

    var circleSVG = document.getElementsByClassName('chart');

    var valPerSecond = strokeDash / seconds;
    var size = strokeDash - (valPerSecond * counter);
    circleSVG[0].style.strokeDashoffset = size;
}

