var HEIGHT = 10;
var WIDTH = 10;
var lab;
var nbGraines = 5;
var m = new MersenneTwister();

function getRand( number){
  return Math.round(m.random()*nbGraines)%number;
}

function estConstructible( x, y){
	var res = false;
	if( lab[y][x]==1 || ( x== 1 && y== 1 )|| ( x== WIDTH-2 && y== HEIGHT-2)){
		return res;
	}
	else if( lab[y+1][x]==1) //Haut
	{
		if( lab[y][x-1]==0 && lab[y][x+1]==0 &&  lab[y-1][x]==0
			&& lab[y-1][x-1]==0 && lab[y-1][x+1]==0 ){
			res = true;}
	}
	else if( lab[y-1][x]==1) //Bas
	{
		if( lab[y][x-1]==0 && lab[y][x+1]==0 && lab[y+1][x]==0
			&& lab[y+1][x-1]==0 && lab[y+1][x+1]==0 ){
			res = true;}
	}
	else if( lab[y][x+1]==1) //Droite
	{
		if( lab[y+1][x]==0 && lab[y-1][x]==0 && lab[y][x-1]==0
			&& lab[y-1][x-1]==0 && lab[y+1][x-1]==0 ){
			res = true;}
	}
	else if( lab[y][x-1]==1) //Gauche
	{
		if( lab[y+1][x]==0 && lab[y-1][x]==0 &&  lab[y][x+1]==0
			&& lab[y-1][x+1]==0 && lab[y+1][x+1]==0 ){
			res = true;}
	}

	return res;

}
function estConstructibleGraine( x, y){

  	var res = false;

  	if( lab[y][x]==1 || ( x== 1 && y== 1 )|| ( x== WIDTH-2 && y== HEIGHT-2)){
  		return res;
  	}else if( lab[y-1][x]==0 && lab[y+1][x]==0 && lab[y][x-1]==0 && lab[y][x+1]==0){
  		res = true;
  	}else if( lab[y+1][x]==1) //Haut
  	{
  		if( lab[y][x-1]==0 && lab[y][x+1]==0 &&  lab[y-1][x]==0 ){
  			res = true;}
  	}
  	else if( lab[y-1][x]==1) //Bas
  	{
  		if( lab[y][x-1]==0 && lab[y][x+1]==0 && lab[y+1][x]==0){
  			res = true;}
  	}
  	else if( lab[y][x+1]==1) //Droite
  	{
  		if( lab[y+1][x]==0 && lab[y-1][x]==0 && lab[y][x-1]==0 ){
  			res = true;}
  	}
  	else if( lab[y,x-1]==1) //Gauche
  	{
  		if( lab[y+1][x]==0 && lab[y-1][x]==0 &&  lab[y][x+1]==0){
  			res = true;}
  	}

  	return res;
}


function ajouteEnsConstructible( x,  y,  e){
	//haut
	if(estConstructible(x,y+1)){
		e.push([x,y+1]);
  }

	//bas
	if(estConstructible(x,y-1)){
		e.push([x,y-1]);
  }
	//droite
	if(estConstructible(x+1,y)){
		e.push([x+1,y]);
  }

	//gauche
	if(estConstructible(x-1,y)){
		e.push([x-1,y]);
  }

  return e;
}


function initMat(){
	//varialisation des bords, l'arrivée et la sortie

  //init de la matrice
  lab = new Array(HEIGHT);
  for (var i = 0; i < HEIGHT; i++) {
    lab[i] = new Array(WIDTH);
    for (var j = 0; j < WIDTH; j++) {
      lab[i][j] = 0;
    }
  }

  //mur de coté
	var i=0;
	for(;i<WIDTH;i++){//haut et bas
		lab[ 0 ][i] = 1;
		lab[HEIGHT-1][i] = 1;
	}
	for(i=0;i<HEIGHT;i++){//droite et gauche
		lab[i][ 0 ] = 1;
		lab[i][WIDTH-1] = 1;
	}


	var j;
	//posage des graines sur les murs
	var walledSeeds = 2+getRand(nbGraines-3);
	nbGraines = nbGraines - walledSeeds;
	var pos,y = 0,x = 0;
  var ensCstrbl= [];

	for(i=0;i<walledSeeds;i++){
		pos = 0 | 1<<(getRand(4)); //selection du mur ou placer la graine

		while(!estConstructible(x,y))
		{
			switch(pos){
				case 1: //haut
					y = 1;
					x = 1+getRand((WIDTH-3));
					break;

				case 2://bas
					y = HEIGHT-2;
					x = 1+getRand((WIDTH-3));
					break;

				case 4: //droite
					y = 1+getRand((HEIGHT-3));
					x = 1;
					break;

				case 8://gauche
					y = 1+getRand((HEIGHT-3));
					x = WIDTH-2;
					break;
			}
		}

		lab[y][x] = 1;

		ensCstrbl = ajouteEnsConstructible(x,y,ensCstrbl); //l'inversion x, y est normale
	}

	//posage des graines dans la matrice
	for(i=0;i<nbGraines;i++){
		x = 1+getRand(WIDTH-2);
		y = 1+getRand(HEIGHT-2);

		while(!estConstructibleGraine(x,y)) //graine
		{
			x = 1+getRand(WIDTH-2);
			y = 1+getRand(HEIGHT-2);
		}

		lab[y][x] = 1;
		ensCstrbl = ajouteEnsConstructible(x,y,ensCstrbl);
	}
	return ensCstrbl;
}

function generationLab(){
  var ensCstrbl = initMat();
  var cToAdd = [0,0];
  var tire;

	while(ensCstrbl.length != 0)
	{
    tire = getRand(ensCstrbl.length-1);
		cToAdd = ensCstrbl[tire];
    ensCstrbl.splice(tire,1);

		//case it was the first among the rest
		if(estConstructible(cToAdd[0],cToAdd[1])){
			//mettre un mur
			lab[cToAdd[1]][cToAdd[0]] = 1;
			ensCstrbl = ajouteEnsConstructible(cToAdd[0],cToAdd[1],ensCstrbl);
      console.log("tire :" + tire + "puted 1 at " + cToAdd[0] + "," + cToAdd[1] +" length of ensCstrbl : " + ensCstrbl.length);
		}
	}
}

function showLab(){
  lab.forEach(function(row){
    row.forEach(function(value){
      $("#content").html( $("#content").html() + value);
    });
      $("#content").html( $("#content").html() + "</br>");
  });
}

function generateLab(){
  $("#content").html("");
  generationLab();
  showLab();
}
