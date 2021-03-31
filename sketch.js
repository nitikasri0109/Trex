var trex, trex_running, trex_collide;
var ground, groundImage,invisibleGround;
var cloud_img;
var obstacle, ob1, ob2, ob3, ob4, ob5, ob6;
var score = 0;
var gameState = "play";
var obstaclegroup;
var cloudsgroup;
var gameOver, gameOver_image, restart, restart_image;
var jump, checkPoint, gameEnd; 

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collide = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  gameOver_image = loadImage("gameOver.png");
  
  restart_image = loadImage("restart.png");
  
  jump = loadSound("jump.mp3");
  
  checkPoint = loadSound("checkPoint.mp3");
  
  gameEnd = loadSound("die.mp3"); 
}

function setup(){
  createCanvas(600,200);
  
  //Creating trex
  trex= createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collide",trex_collide);
  //to see the collision radius 
  //trex.debug = true;
  //first argument is shape, second argument is x-offset, third argument is y-offset, four argument is radius;
  trex.setCollider("circle",0,0,40);
  
  //assigning AI to trex trex.setCollider("circle",50,0,40);
  trex.scale= 0.5;
  
  //creating ground sprite
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImage);
  
  ground.x = ground.width/2;
  
  //creating invisible ground
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  //gameOver
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver", gameOver_image);
  gameOver.visible = false;
  
  //restart
  restart = createSprite(300,150);
  restart.addImage("restart", restart_image);
  restart.scale = 0.4;
  restart.visible = false;
  
  obstaclegroup = new Group();
  
  cloudsgroup = new Group();
}

function draw(){
  //refreshes the screen with white color
  background("white");
  text("score: "+Math.round(score),500,50);
  
  //if(frameCount%5===0){score = score+1;}
if(gameState === "play"){
  //console.log(ground.velocityX);  
  ground.velocityX = -4-score/100;
  
  
//frameRate is no of frames per second score = score+Math.round(getFrameRate()/60);
  score = score+0.5;  
  
   //Infinite scrolling ground
  if(ground.x<0){
     ground.x = ground.width/2;
  }
  
  
  //trex jump when space key is pressed
  if(keyDown("space") && trex.y>=161){
    trex.velocityY = -10;
    jump.play();
  }
  
  
  if(score!= 0 && score%100 === 0){
  checkPoint.play();  
  }
  
   
    //Gravity
  trex.velocityY = trex.velocityY + 0.5;
  
  if(trex.isTouching(obstaclegroup)){
    gameEnd.play();
    
    gameState = "end";
      }
  
  //calling spawnClouds function
  spawnClouds();
  spawnObstacle();
}
  if(gameState === "end"){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
       
    trex.velocityY = 0;
  
    trex.changeAnimation("collide",trex_collide);
    
    
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1); 
    
    cloudsgroup.setVelocityXEach(0);
    
    cloudsgroup.setLifetimeEach(-1); 
    }
  
  //console.log("hello"+"p"+"e");
  
  if(mousePressedOver(restart)){
    reset();
  }
 
  
  
  //testing the trex's y position
  //console.log(trex.y);
  
  
  //stop trex from falling off the ground
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

function spawnClouds(){
  //creating cloud every 60 frames
  //frameCount = the no of excution of draw function
  if (frameCount % 60 === 0){
    
    //Creating cloud sprite
    cloud = createSprite(600,20,40,10);
    cloud.velocityX = -3;
    cloud.addImage("cloud",cloud_img);
    cloud.scale = 0.5;
    cloudsgroup.add(cloud);
    //time = distance/speed
    cloud.lifetime = 200;
    //spawning clouds at different heights
    cloud.y = Math.round(random(10,60));
    
    //Adjusting the depths
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    //console.log(cloud.x);
  }
}

function spawnObstacle(){
  if(frameCount% 100 === 0){
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    obstacle.lifetime = 150;
    obstaclegroup.add(obstacle);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:
        obstacle.addImage("cactus1",ob1);
        break;
      
      case 2:
        obstacle.addImage("cactus2",ob2);
        break;   
       
      case 3:
        obstacle.addImage("cactus3",ob3);
        break;  
        
      case 4:
        obstacle.addImage("cactus4",ob4);
        break;    
        
      case 5:
        obstacle.addImage("cactus5",ob5);
        break;      
       
      case 6:
        obstacle.addImage("cactus6",ob6);
        break;      
    }
    
   obstacle.scale = 0.5;
    
  }
  
}

function reset(){
  
  gameState = "play";

  score = 0;
  
  obstaclegroup.destroyEach();
  
  cloudsgroup.destroyEach();
  
  gameOver.visible = false;
  
  restart.visible = false;
  
  trex.changeAnimation("running", trex_running);
  
}