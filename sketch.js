var dog, database, foodS, foodStock;
var dogImage, happyDogImage;
var addFood,feed;
var fedTime,lastFed;
var food;

function preload()
{
  
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500,500);
  
  dog = createSprite(250,290);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  food = new Food(200,200,10,10);

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  food.display();

  feedDog();
  addFoods();

  

  dog.addImage(dogImage);

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: " + lastFed % 12 + " PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed: " + lastFed + " AM",350,30)
  }

  drawSprites();
}

function feedDog(){
  dog.addImage(happyDogImage);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}