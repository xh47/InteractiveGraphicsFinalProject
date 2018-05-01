var speedmax = 3;
var n = 60;
var img;

class mol {
    constructor(x1, y1, sx1, sy1, col1, sizee1){
        this.x = x1;
        this.y = y1;
        this.sx = sx1;
        this.sy = sy1;
        this.col = col1;
        this.sizee = sizee1;
    }

    display(){
        this.x += this.sx;
        this.y += this.sy;

        if (mouseX < width & mouseX > 0 & mouseY < height & mouseY > 0){
            this.sx -= 0.25*(this.x - mouseX)/width
            this.sy -= 0.25*(this.y - mouseY)/height
        }
        
        if (this.x > width+this.sizee){
            this.x = 0-this.sizee;
            this.sx = random(-speedmax,speedmax);
            this.sy = random(-speedmax,speedmax);
        }
        if (this.x < 0-this.sizee){
            this.x = width+this.sizee;
            this.sx = random(-speedmax,speedmax);
            this.sy = random(-speedmax,speedmax);
        }
        if (this.y > height+this.sizee){
            this.y = 0-this.sizee;
            this.sx = random(-speedmax,speedmax);
            this.sy = random(-speedmax,speedmax);
        }
        if (this.y < 0-this.sizee){
            this.y = height+this.sizee;
            this.sx = random(-speedmax,speedmax);
            this.sy = random(-speedmax,speedmax);
        }        
        fill(this.col);
        noStroke();
        ellipse(this.x, this.y, this.sizee, this.sizee);
    }
}

var mols = new Array(n);

var table;
function preload(){
    table = loadTable("data.csv", "header")
}

var years = [];
var co2 = [];

function setup(){
    createCanvas(windowWidth-20,windowHeight-20)
    //img = loadImage("images/background.jpeg");
    for (var i = 0; i < n; i++){
        var m = new mol(random(width),random(height),random(-speedmax,speedmax),random(-speedmax,speedmax),color(random(200,255), random(200,255), random(200,255),random(20,100)),random(10,50));
        mols[i] = m;
    }
    frameRate(120);
    cursor("images/blackhole.png", 16,16);

    loadData();
}

function loadData(){
    years = table.getColumn(1);
    co2 = table.getColumn(0);
}

var clicks = -1;
var middletext = "Pollution in China - A Visualization";
var additional = "Click to begin...";
var final = "";

var backgroundcol = 255;
var fillcol = 0;
var linkopacity = 0;
var counterstart = false;
var backgroundcounterstart = false;

function draw(){
    //createCanvas(windowWidth-20,windowHeight-100);

    background(backgroundcol);
    //image(img, 0, 0, img.width, img.height);

    for (var i = 0; i < n; i++){
        mols[i].display();
    }

    textSize(32);
    textAlign(CENTER);
    fill(fillcol,fillcol,fillcol);
    text(middletext, width/2, height/2 - 20);
    text(additional, width/2, height/2 + 30);

    fill(100,200,250,linkopacity);
    text(final, width/2, height - 20);
    if (counterstart){
        linkopacity++;
    }
    if (backgroundcounterstart){
        backgroundcol--;
    }

}

var clickable = true;

function myTimer() {
    clickable = true;
}

var done = false;

function myTimer2() {
    clickable = true;
    done = true;
}

var temp = 1;

function mousePressed() {
    if (clickable){
        clicks = clicks + 1;
        if (clicks < years.length){
            if (years[clicks] == 1966){
                clickable = false;
                additional = "Industrialization since 1950 is complete with Mao Zedong's Cultural Revolution...";
                setInterval(myTimer, 2000);
            } else if (years[clicks] == 1979){
                clickable = false;
                additional = "Economic reforms begin under Deng Xiaoping to industrialize and modernize China";
                setInterval(myTimer, 2000);
            } else if (years[clicks] == 1998){
                clickable = false;
                additional = "State Environmental Protection Administration (SEPA) established, but with many flaws...";
                setInterval(myTimer, 3000);
            } else if (years[clicks] == 2008){
                clickable = false;
                additional = "Summer Olympics in Beijing finally brings global attention to China's dire environmental issues";
                setInterval(myTimer, 5000);
            } else {
                additional = "";
            }
            middletext = years[clicks];
            for (var i = 0; i < n; i++){
                var ratio = co2[clicks]/co2[co2.length-1];
                mols[i].sizee = random(0.75,1.25)*ratio*500;
                mols[i].col = color((1-ratio)*random(200,255), (1-ratio)*random(200,255), (1-ratio)*random(200,255), random(20,50));
            }
        } else {
            if (!done){
                clickable = false;
                middletext = "By now, it's already too late.";
                backgroundcounterstart = true;
                setInterval(myTimer2, 8000);
            } else {
                backgroundcol = 0;
                fillcol = 255;
                middletext = "In northern China, air pollution from the burning of fossil fuels, principally coal,";
                additional = "is causing people to die on average 5.5 years sooner than they otherwise might.";
                counterstart = true;
                final = "click for more information"
                if( mouseY > height - 100 ){
                    window.location = "https://github.com/xh47/InteractiveGraphicsFinalProject";
                }
            }
            
        }
    }
    else {
        temp = 2;
    }
}
