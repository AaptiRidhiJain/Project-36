class Food{
    constructor(){
         this.foodStock = foodStock;
         this.lastFed = lastFed

        this.image = loadImage("Milk.png");
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock != 0){
            for(var i = 0 ; i < this.foodStock ; i++){
                if(i % 10){
                    x = 50;
                    y = y + 50;
                }

                this.image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }

    getFoodStock(){
        var getFoodRef = database.ref('Food');
        getFoodRef.on("value",function(data){
        food = data.val();
        })
    }
    
    updateFoodStock(food){
        database.ref('/').update({
            'Food': food
        })
    }
    
    deductFood(FOOD){
        var foodIndex = 'Food' + foodStock;
        database.ref(foodIndex).set({
        'Food': FOOD
        })
    }    
}
