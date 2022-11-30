//Controles
let moveX;
let btnPress;
let joyBtn;
let img;


//Imágenes
let imgInicio;
let instrucciones;
let instruccionesuno;


//📺PANTALLAS
let screen = 0;

//-🎼 SONIDO
let song1;
let song2;
let song3;
let song4;
let song5;
let song6;


function preload() {
  //IMAGENES
  imgInicio = loadImage("img/Inicio.png");
  instrucciones = loadImage('img/instruccionesuno.png')
  instruccionesuno = loadImage('img/instruccionesdos.png')

  //SONIDOS
  
  song1 = createAudio('songs/INTRO MAS DESICIÓN.mp3')
  //LINEA TEMPORAL IZQUIERDA
  song2 = createAudio('songs/2.mp3')
  song3 = createAudio('songs/IZQUIERDA.mp3')
  song4 = createAudio('songs/3.mp3')

  //LINEA TEMPORAL DERECHA
 
  song5 = createAudio('songs/m.mp3')
  song6 = createAudio('songs/DERECHA 1.mp3')






}


const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: "/real-time" });
console.log("Server IP: ", NGROK);

let controllerX,
  controllerY = 0;
let posX,
  posY = 0;
let deviceWidth,
  deviceHeight = 0;
let mupiWidth,
  mupiHeight = 0;



function setup() {
  frameRate(60);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("right", "0");
  posX = windowWidth / 2;
  posY = windowHeight / 2;
  controllerX = windowWidth / 2;
  controllerY = windowHeight / 2;
  mupiWidth = windowWidth;
  mupiHeight = windowHeight;
}


function draw() {


  
//Va a recibir los datos en posx 
function getData ()  {
  socket.on('arduinoMessage', (str) => {
    let posX = str.PosX;
   
    // let activate = str.Pulse;
    let change = str.JoystickBtn;
    moveX = posX;
    joyBtn = change;
    //boton = Botonrojo;
    // activar = activate;
  })

  return ( {moveX, joyBtn} )
}


  console.log(getData());

  switch (screen) {
    case 0:
      image(imgInicio, 0, 0, width, height);
      

      if (joyBtn === 0) {
        setTimeout(() => {
          screen = 1;
        }, 1500);
      }
      break;


    case 1:
      image(instrucciones, 0, 0, width, height)

      // if (activar === 0) {
        setTimeout(() => {
          screen = 2;
        }, 1000);

      

      break;

    case 2:
      image(instruccionesuno, 0, 0, width, height)
      if (joyBtn === 0) {
        setTimeout(() => {
          screen = 3;
        }, 1500);
      }
      

     /* if (moveX >= 1000) {
        setTimeout(() => {
          screen = 3;
        }, 1500);

      }
      if (joyBtn === 0) {
        screen = 10;
      }
      */
      break;

//INTRODUCCION
    case 3:
      background(0);
      song1.loop()
     // image(imgEleccion2, 470, 0, 600, 725)
      if (moveX >= 1000) {

        setTimeout(() => {
          screen = 7;
          song1.stop();
        }, 1500);

      }
      if (moveX < 400) {

        setTimeout(() => {
          screen = 4;
          song1.stop();
        }, 1500);

      }
      if (joyBtn === 0) {
        screen = 20
      }
      break;
//LINEA TEMPORAL IZQUIERDA
    case 4:
      background(0)
      song2.loop()
   
    //  image(imgEleccion3, 470, 0, 600, 725)

      if (moveX < 400) {
        setTimeout(() => {
          screen = 5;
          song2.stop()
        }, 1500);
      }

      if (moveX >= 1000) {

        setTimeout(() => {
          screen = 6;
          song2.stop()
        }, 1500);

      }


      if (joyBtn === 0) {
        screen = 10;
      }

      break;
//LINEA TEMPORAL IZQUIERDA
      case 5:
      background(0);
      song3.loop()
  
      break;

    case 6:
      background(0)
      song4.loop()
   
    //  image(imgEleccion3, 470, 0, 600, 725)

   

      break;

//LINEA TEMPORAL DERECHA
      case 7:
      background(0);
      song5.loop()
     // image(imgEleccion2, 470, 0, 600, 725)
      if (moveX >= 1000) {

        setTimeout(() => {
          screen = 8;
          song5.stop();
        }, 1500);

      }
      if (moveX < 400) {

        setTimeout(() => {
          screen = 5;
          song5.stop();
        }, 1500);

      }
      if (joyBtn === 0) {
        screen = 20
      }
      break;

    case 8:
      background(0)
      song6.loop()

   

      break;
     
   /* case 10:
      image(imgDerrota, 470, 0, 600, 725)
      break;

    case 20:
      image(imgVictoria, 470, 0, 600, 725)
      image(qr,620,300,300,300)
      break;
*/
    /*
        case 3:
            if (arduinoData.posX > 900){
              screen = 4;
            }
            if (arduinoData.posX < 200 && arduinoData.posX < 400 ){
              screen = 2;
            }
            if (arduinoData.PressJostick == 1){
              image(pantallaVictoria, 100, 0, 1300, 750);
            }
            else{
              image(pantallaEleccion2, 100, 0, 1300, 750);
            }
            break;
    
    
        case 4:
    
          if (arduinoData.posX < 200 && arduinoData.posX < 400 ){
            screen = 3;
          }
          if (arduinoData.PressJostick == 1){
              image(pantallaDerrota, 100, 0, 1300, 750);
            }
          else{
            image(pantallaEleccion3, 100, 0, 1300, 750);
          }
        break; 
      }
    */
  }

}


