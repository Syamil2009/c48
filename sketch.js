var bg,bgImg
var player, shooterImg, shooter_shooting
var heart1, heart2, heart3
var heart1img, heart2img, heart3img
var zombie, zombieimg
var bulletgroup, zombiegroup
var gameState="fight"
var bullet
var bullets=70
var score=0
var life=3
var lose,winning,explosion


//loads all our images
function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1img = loadImage("assets/heart_1.png");
  heart2img = loadImage("assets/heart_2.png");
  heart3img = loadImage("assets/heart_3.png");
  zombieimg = loadImage("assets/zombie.png");
  lose = loadSound("assets/lose.mp3");
  winning = loadSound("assets/win.mp3");
  explosion = loadSound("assets/explosion.mp3");

}


function setup() {

  //created a canvas for all devices
  createCanvas(windowWidth,windowHeight)

  //created and added the image to the sprite
  bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale=1.1

//created a player sprite and added the image along with the collider box
player=createSprite(displayWidth-1150,displayHeight-300,50,50)
player.addImage(shooterImg)
player.scale=0.3
player.debug=true
player.setCollider("rectangle",0,0,300,300)

heart1=createSprite(displayWidth-150,40,20,20) 
heart1.visible=false
heart1.addImage("heart1",heart1img)
heart1.scale=0.4

heart2=createSprite(displayWidth-100,40,20,20) 
heart2.visible=false
heart2.addImage("heart2",heart2img)
heart2.scale=0.4

heart3=createSprite(displayWidth-150,40,20,20) 
heart3.addImage("heart3",heart3img)
heart3.scale=0.4

bulletgroup=new Group()
zombiegroup=new Group()
}



function draw() {
//black background
background(0)

if(gameState==="fight"){

  if (life===3){
heart3img.visible=true
heart2img.visible=false
heart1img.visible=false

  }

  if (life===2){
    heart2img.visible=true
    heart3img.visible=false
    heart1img.visible=false
    
      }

      if (life===1){
        heart1img.visible=true
        heart3img.visible=false
        heart2img.visible=false
        
        
          }

          if (life===0){
            gameState="lost"
            
              }

              if (score===100){
gamestate="won"
winning.play()

              }
  //makes the player go up
if (keyDown("UP_ARROW")||touches.length>0) {
player.y=player.y-30
}

//makes the player go down
if (keyDown("DOWN_ARROW")||touches.length>0) {
player.y=player.y+30
}

if (keyWentDown("space")) {
bullet=createSprite(displayWidth-1150,player.y-30,20,10)
bullet.velocityX=20
bulletgroup.add(bullet)
player.depth=bullet.depth
player.depth=player.depth+2
  player.addImage(shooter_shooting)
  bullets=bullets-1

  explosion.play()
  
  }

  
}



//when space is pressed it changes to the shooting image 

//when space is released changes back to shooter image
else if(keyWentUp("space")) {
  player.addImage(shooterImg)
}
    
if(bullets==0){
gameState="bullet"
lose.play()
}
  
if(zombiegroup.isTouching(bulletgroup)){
  for(var i=0;i<zombiegroup.length;i++){
if (zombiegroup[i].isTouching(bulletgroup)){
  zombiegroup[i].destroy()
  bulletgroup.destroyEach()
explosion.play()
score=score+2

}

  }
  
}

if(zombiegroup.isTouching(player)){
  lose.play()
  for(var i=0;i<zombiegroup.length;i++){
if (zombiegroup[i].isTouching(player)){
  zombiegroup[i].destroy()
  life=life-1
  
}

  }
  
}

enemy()

drawSprites()

textSize(20)
fill("white")
text("Bullets="+bullets,displayWidth-210,displayHeight/2-250)
text("Score="+score,displayWidth-200,displayHeight/2-220)
text("Lives="+life,displayWidth-200,displayHeight/2-280)



if(gameState==="lost"){

  textSize(100)
  fill("red")
  text("you lost",400,400)
  zombiegroup.destroyEach()
  player.destroy()
}else if(gameState==="won"){

  textSize(100)
  fill("green")
  text("you won",400,400)
  zombiegroup.destroyEach()
  player.destroy()
}else if(gameState==="bullet"){

  textSize(50)
  fill("yellow")
  text("you ran out of bullets",470,410)
  zombiegroup.destroyEach()
  player.destroy()
  bulletgroup.destroyEach()
}
}

function enemy(){
  if(frameCount%50===0){
zombie=createSprite(random(500,1100),random(100,500),40,40)
zombie.addImage(zombieimg)
zombie.scale=0.15
zombie.velocityX=-3
zombie.debug=true
zombie.setCollider("rectangle",0,0,400,400)
zombie.lifeTime=400
zombiegroup.add(zombie)
  }
}
