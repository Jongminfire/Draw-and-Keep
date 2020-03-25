var data = {}; // Global object to hold results from the loadJSON call
var points = []; // Global array to hold all Point objects
var preX;
var preY;
var clicked = 0;

function preload() {
  data = loadJSON('Object.json');        // 불러오기
}

function loadData() {

  for (var i = 0; i < Object.keys(data).length; i++) {
    
	var point = data[i];

	var x = data[i].x;
	var y = data[i].y;
    var prex = data[i].prex;
    var prey = data[i].prey;
    
	points.push(new Point(x, y,prex,prey));
  }
  
}

function setup() {
	createCanvas(360, 280);
	loadData();
}

keyReleased = function() {
	if (key == ' ')
	{
		saveJSON(points, 'save.json');
		points = [];
	}
  
    if (key == 'R' || key=='r')
    {
      points=[];
    }
}


function mouseReleased() {
	if (clicked == 1)
	{
		clicked = 0;
	}
}

function draw() {

	background(255);
    strokeWeight(3);
  
	// Display all points
	for (var i = 0; i < points.length; i++) {
		points[i].display();
	}

	if (mouseIsPressed)
	{
		if (clicked == 0)
			points.push(new Point(mouseX, mouseY, mouseX, mouseY));

		if (clicked == 1)
			points.push(new Point(mouseX, mouseY, preX, preY));

		preX = mouseX;
		preY = mouseY;
		clicked = 1;
	}

	textAlign(LEFT);
	fill(0);
	strokeWeight(1);
	text('스페이스바로 저장하세요. (지우기 : R)', 10, height - 10);
}

// Point class
function Point(x, y, prex, prey) {
	this.x = x;
	this.y = y;
	this.prex = prex;
	this.prey = prey;

	// Display the Point
	this.display = function() {
		line(this.x, this.y, this.prex, this.prey);
	};
}
