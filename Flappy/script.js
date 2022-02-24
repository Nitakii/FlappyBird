var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var Vogel = new Image();
var Hintergrund = new Image();
var Boden = new Image();
var RoehreOben = new Image();
var RoehreUnten = new Image();

Vogel.src = "Bilder/Vogel.png";
Hintergrund.src = "Bilder/Hintergrund.png";
Boden.src = "Bilder/Boden.png";
RoehreOben.src = "Bilder/Röhre Oben.png";
RoehreUnten.src = "Bilder/Röhre Unten.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "Audio/fly.mp3";
score_audio.src = "Audio/score.mp3";

var Luecke = 100;

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 50;
  fly.play();
}

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

var score = 0;
var xPos = 10;
var yPos = 150;
var grav = 1.75;

function draw() {
  ctx.drawImage(Hintergrund, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(RoehreOben, pipe[i].x, pipe[i].y);
    ctx.drawImage(RoehreUnten, pipe[i].x, pipe[i].y + RoehreOben.height + Luecke);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * RoehreOben.height) - RoehreOben.height
      });
    }

    if (
      (xPos + Vogel.width >= pipe[i].x &&
        xPos <= pipe[i].x + RoehreOben.width &&
        (yPos <= pipe[i].y + RoehreOben.height ||
          yPos + Vogel.height >= pipe[i].y + RoehreOben.height + Luecke)) ||
      yPos + Vogel.height >= cvs.height - Boden.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(Boden, 0, cvs.height - Boden.height);
  ctx.drawImage(Vogel, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 1, cvs.height - 20);

  requestAnimationFrame(draw);
}

RoehreUnten.onload = draw;


    