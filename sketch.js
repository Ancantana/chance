let messageIndex = 0;
let messages = [
  "Hello",
  "My name is AVI. I am a digital assistant created by An.",
  "If it's alright with you, I'd like to ask you to do something for me.",
  "Hold down your mousepad for me. You are free to let go whenever you'd like, but it'd be nice if you could stay with me for a bit",
  "Thank you. You have been assigned a number ()"
];

let holdingMouse = false;
let startTime, endTime;
let assignedNumber;

function setup() {
  createCanvas(800, 500);
  displayMessage();
}

function draw() {
  if (holdingMouse) {
    let pressure = map(sin(frameCount * 0.1), -1, 1, 5, 20);
    background(255);
    ellipse(width / 2, height / 2, pressure, pressure);
  }
}

function mousePressed() {
  holdingMouse = true;
  startTime = millis();
}

function mouseReleased() {
  holdingMouse = false;
  endTime = millis();
  calculateAssignedNumber();
  messageIndex++;
  displayMessage();
}

function calculateAssignedNumber() {
  let holdDuration = (endTime - startTime) / 1000; // Convert to seconds
  let area = sq(mouseX - width / 2) + sq(mouseY - height / 2); // Area of the ellipse

  // Map area and duration to the assigned number
  assignedNumber = floor(map(area * holdDuration, 0, width * height * 10, 1, 30));
  assignedNumber = constrain(assignedNumber, 1, 30); // Ensure the number is within the desired range

  // Update the message with the assigned number
  messages[2] = `Thank you :). You have been assigned a number (${assignedNumber}).`;
}

function displayMessage() {
  background(255);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(messages[messageIndex], width / 2, height / 2);

  if (messageIndex === 0 || messageIndex === 1) {
    setTimeout(displayNextCharacter, 50);
  }
}

function displayNextCharacter() {
  let currentMessage = messages[messageIndex];
  if (frameCount % 50 === 0 && currentMessage.length > 0) {
    messages[messageIndex] = currentMessage.substring(0, currentMessage.length - 1);
    displayMessage();
  }
}
