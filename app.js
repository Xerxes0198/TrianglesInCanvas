//Get the Canvas
var canvas = document.getElementById('myCanvas');

//Add event listener to canvas for clicking
canvas.addEventListener("mousedown", canvasClicked, false);

//Details about where our triangles should go
var positionSet = false;
var gotoX, gotoY;
var avgX, avgY;

//Setup a 2D context for the canvas
var context = canvas.getContext('2d');
var aspect  = canvas.height / canvas.width;

//Put all the triangles here
var numberOfTriangles = 50;
var triangles= new Array();

//Add new triangles to Array
for(i = 0; i < numberOfTriangles; i++)
{
  //Add a new trianle to the array with a random position
  triangles.push(new triangle(Math.random() / aspect, Math.random()));

  //Set the inital aspect ration Values
  triangles[i].setAspectRatio(aspect);
}

//Canvas clicked function
function canvasClicked(evt)
{
  gotoX = evt.clientX / canvas.width;
  gotoY = evt.clientY / canvas.height;
  positionSet = true;
}

//Canvas key pressed function
function canvasKeyPressed(evt)
{
  console.log(evt.keyCode);
}

//Update world objects
function tickWorld()
{
  for(i = 0; i < triangles.length; i++)
  {
    //Update Triangles goto position if it has been set
    if(positionSet == true)
    {
      triangles[i].setDesiredLocation(gotoX, gotoY);
    }

    triangles[i].updateLocation();
  }

  //Reset this value so it doesn't aimlessly reset it
  positionSet = false;
}

//Begin a draw loop
var delta, now, previousTime;

function drawLoop()
{
  //Update all objects in world
  tickWorld();

  //Reset transformations
  context.setTransform(1, 0, 0, 1, 0, 0);

  //Clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Draw triangles
  for(i = 0; i < triangles.length; i++)
  {
    triangles[i].drawTriangle(context);
  }

  //Wait for browser to finish and then call next frame
  requestAnimationFrame(drawLoop);
}

//Begin draw loop
drawLoop();
