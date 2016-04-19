console.log("I'm running");
var time = 0;
var all = {};

function drawRect() {
  setTimeout(function () {
    //Create the div
    var tdiv = $('<div></div>');
    transf(tdiv,-10,25,-500,10,10);
    $('.rotating').append(tdiv);
  },300);
}

function transf(el,rx,ry,tx,ty,tz) {
  el.css("transform","rotateX("+rx+"deg) rotateY("+ry+"deg) translate3d("+tx+"px,"+ty+"px,"+tz+"px)");
}
var render = function () {
  time += 0.1;
  for (var i = 0; i < all.squares.length; i++) {
    if(all.data[i].tx < 3000){
      all.data[i].tx += (1+Math.random()*5)*all.data[i].speed;
    }else{
      all.data[i].tx = -500*Math.random()-500;
    }
    transf(all.squares[i],all.data[i].rx,all.data[i].ry,all.data[i].tx,all.data[i].ty,all.data[i].tz);
  }

  requestAnimationFrame(render)

}

var init = function () {
  //Create the div array.
  all.squares = [];
  all.data = [];
  for (var i = 0; i < 40; i++) {
    all.squares[i] = $('<div></div>');
    all.squares[i].css("width",15 + 75*Math.random()+"px");
    all.squares[i].css("height",2+Math.random()*20+"px");
    all.squares[i].css("position","absolute");
    var topos = (Math.random())*400+"px";
    console.log(topos);
    all.squares[i].css("top",topos);
    all.squares[i].css("background-color",randomColor({hue:'blue',luminosity:'dark'}));
    all.squares[i].css("opacity",0.1+Math.random()*0.1);
    all.data[i] = {rx : -25, ry : 25, tx : -1500*Math.random()-500, ty : 10 , tz : 10 , speed : Math.random()*5+1 };
    transf(all.squares[i],all.data[i].rx,all.data[i].ry,all.data[i].tx,all.data[i].ty,all.data[i].tz);
    $('.rotating').append(all.squares[i]);
  }
  render();
}
init();
