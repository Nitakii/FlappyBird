//Variablen
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var Luecke = 100;
var score = 0;
var xPos = 10;
var yPos = 150;
var grav = 1.75;

var pipe = []; //Array

pipe[0] = {
  x: cvs.width,
  y: 0
};

//Bilder
var Vogel = new Image(); Vogel.src = "Bilder/Vogel.png";
var Hintergrund = new Image(); Hintergrund.src = "Bilder/Hintergrund.png";
var Boden = new Image(); Boden.src = "Bilder/Boden.png";
var RoehreOben = new Image(); RoehreOben.src = "Bilder/Röhre Oben.png";
var RoehreUnten = new Image(); RoehreUnten.src = "Bilder/Röhre Unten.png";

//Audios
var fly = new Audio(); fly.src = "Audio/fly.mp3";
var score_audio = new Audio(); score_audio.src = "Audio/score.mp3";

//Bewegung des Vogels
document.addEventListener("keydown", moveUp); //Tastatur erkennen lassen
function moveUp() {
  yPos -= 50; //Hochspringen lassen
  fly.play(); //Audio abspielen
}

//Spiel
function draw() {
  ctx.drawImage(Hintergrund, 0, 0); //Hintergrund in den Canvas

  for (var i = 0; i < pipe.length; i++) { //Array definieren 
    ctx.drawImage(RoehreOben, pipe[i].x, pipe[i].y); //Röhre Oben malen
    ctx.drawImage(RoehreUnten, pipe[i].x, pipe[i].y + RoehreOben.height + Luecke); //Röhre Unten malen

    pipe[i].x--;

    if (pipe[i].x == 125) { //falls die Röhre zu lang wird, kürzen
      pipe.push({ //Push = Neuen Wert vorne ans Array setzen
        x: cvs.width,
        y: Math.floor(Math.random() * RoehreOben.height) - RoehreOben.height
      });
    }

    if (
      (xPos + Vogel.width >= pipe[i].x && //Pipe-Berührung
        xPos <= pipe[i].x + RoehreOben.width && //Pipe-Berührung
        (yPos <= pipe[i].y + RoehreOben.height || //Pipe-Berührung
          yPos + Vogel.height >= pipe[i].y + RoehreOben.height + Luecke)) || //Pipe-Berührung
      yPos + Vogel.height >= cvs.height - Boden.height //Boden-Berührung
    ) {
      location.reload(); //Spiel neustarten
    }

    //score zählen
    if (pipe[i].x == 5) { //Position erkennen
      score++; //+1
      score_audio.play(); //Audio abspielen
    }
  }

  ctx.drawImage(Boden, 0, cvs.height - Boden.height); //Boden malen
  ctx.drawImage(Vogel, xPos, yPos); //Vogel malen

  yPos += grav; //Vogel fallen lassen

  //Score
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 1, cvs.height - 20); //Score zählen

  requestAnimationFrame(draw); //Animation starten
}

RoehreUnten.onload = draw; //Malen starten


    