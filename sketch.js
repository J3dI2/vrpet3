//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedButton, FoodButton;
var fedTime, lastFed;
var foodObj;
var bedroomImg,gardenImg,washroomImg;
var bedroom,garden,washroom;

function preload(){
   dogImg=loadImage("virtualpetimages/Dog.png");
   dogImg1=loadImage("virtualpetimages/Happy.png");
   bedroomImg=loadImage("virtualpetimages/Bed Room.png");
   gardenImg=loadImage("virtualpetimages/Garden.png");
   washroomImg=loadImage("virtualpetimages/Wash Room.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedButton=createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  FoodButton=createButton("Add Food");
  FoodButton.position(800,95);
  FoodButton.mousePressed(addFood);

  bedroom.addImage(bedroomImg);
  garden.addImage(gardenImg);
  washroom.addImage(washroomImg);

}

// function to display UI
function draw() {
  background(46,139,87);
/* 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
*/
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
/*
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
*/
  
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }
  drawSprites();
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function getState(){
  var gameStateRef = database.ref('gameState');
  gameStateRef.on("value",function(data){
    gameState = data.val();
  })
}

function updata(state){
  database.ref('/').updata({
    gameState: state
  });
}