music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;
leftWristScore = 0;
status = false;
function setup() {
  music1 = loadSound('music.mp3');
  music2 = loadSound('music2.mp3');
  canvas = createCanvas(597, 498);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  music1.rate(1);
  music1.setVolume(1);
  music2.rate(1);
  music2.setVolume(1);
}

function modelLoaded() {
  console.log("Model loaded!");
}

function gotPoses(results) {
  if(results.length > 0) {
      console.log(results);
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      rightWristScore = results[0].pose.keypoints[10].score;
      leftWristScore = results[0].pose.keypoints[9].score;
      console.log("Left Wrist Y = " + leftWristY + " Right Wrist Y = " + rightWristY);
      console.log(rightWristScore);
      console.log(leftWristScore);
  }
}

function draw() {
  canvas.center();
  image(video, 0, 0, 597, 498);
  status1 = music1.isPlaying();
  fill('red');
  stroke('black');
  if (leftWristScore > 0.2) {
    circle(leftWristX, leftWristY, 50);
    music2.stop();
    if (status1 == false) {
      music1.play();
      document.getElementById("song").innerHTML = "music1";
    }
  }
  status2 = music2.isPlaying();
  if (rightWristScore > 0.2) {
    circle(rightWristX, rightWristY, 50);
    music1.stop();
    if (status2 == false) {
      music2.play();
      document.getElementById("song").innerHTML = "music2";
    }
  }
}
