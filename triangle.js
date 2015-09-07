var triangle = function(inX,inY)
{
  //New Triangle!
  //Triable Variables
  var x,y,rotation, vx, vy, scale, ratio, gotoX, gotoY;
  var hasDesiredLocation = false;

  var maxSpeed = .003
  var maxChangeSpeed = .0001

  //Setup Values
  x = inX;
  y = inY;
  scale = 1;

  //Randomly set a direction for now
  vx = (Math.random() - .5) * 2;
  vy = (Math.random() - .5) * 2;
  vx /= Math.random() * 1000;
  vy /= Math.random() * 1000;

  this.setScale = function(inScale)
  {
    scale = inScale;
  }

  //A function to set this triangles desired location
  this.setDesiredLocation = function(inX, inY)
  {
    gotoX = inX;
    gotoY = inY;

    hasDesiredLocation = true;

    //Debug
    //console.log("Desired Location Set: " + gotoX);
    //console.log("Desired Location Set: " + gotoY);
  }

  //Create a function that takes the canvas context and calculates the aspect ration for later
  this.setAspectRatio = function(inAspect)
  {
    //Calculate aspect ratio
    aspect = inAspect
  }

  this.updateLocation = function()
  {
    //Calculate rotation
    rotation = Math.atan2(vx, -vy) / (Math.PI * 2);


    if(hasDesiredLocation == true)
    {
      var speed = Math.sqrt(vx*vx + vy*vy);

      var desired_rotation = Math.atan2(gotoX - x, -(gotoY - y)) / (Math.PI * 2);
      desired_rotation -= rotation;
      if (desired_rotation < -0.5) desired_rotation += 1;
      if (desired_rotation >= 0.5) desired_rotation -= 1;
      if (desired_rotation < -0.0025) desired_rotation = -0.0025;
      if (desired_rotation >= 0.0025) desired_rotation = +0.0025;
      rotation += desired_rotation;
      vx = Math.sin(rotation * Math.PI * 2);
      vy = -Math.cos(rotation * Math.PI * 2);

      vx *= speed;
      vy *= speed;
    }

    //Adjust position
    x += vx;
    y += vy;


    //Check boundaries
    if(x > 1 / aspect)
    {
      x = 0;
    }
    if(x < 0)
    {
      x = 1 / aspect;
    }
    if(y > 1)
    {
      y = 0;
    }
    if(y < 0)
    {
      y = 1;
    }

    //Cap speeds!
    if(vx > maxSpeed)
    {
      vx = maxSpeed;
    }

    if(vx < -maxSpeed)
    {
      vx = -maxSpeed;
    }

    if(vy > maxSpeed)
    {
      vy = maxSpeed;
    }

    if(vy < -maxSpeed)
    {
      vy = -maxSpeed;
    }
  }

  //Function to draw this triangle to a given canvas context
  this.drawTriangle = function(context)
  {
    //Translate the contet to the location of this triangle
    context.translate(context.canvas.width * x * aspect, context.canvas.height * y);

    //Rotate the context to ensure the triangle is facing the direction it is moving
    context.rotate(2 * Math.PI * rotation);

    //Scale up the context for drawing, so shapes aren't so tiny at hi-res
    context.scale(scale, scale);

    //Draw the trianlge
    var path = new Path2D();
    path.moveTo(0,-6);
    path.lineTo(5,5);
    path.lineTo(0,2);
    path.lineTo(-5,5);
    path.lineTo(0,-6);
//    path.moveTo(0,-1000);
//    path.lineTo(0,1000);
    context.stroke(path);

    //Reset the scale back down to 1
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  //Function to get locations
  this.getX = function()
  {
    return x;
  }

  this.getY = function()
  {
    return y;
  }
};
