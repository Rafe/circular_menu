$(function(){

  var count = $(".small").length;
  var radius = 100;
  render(radius, -1);
  updateBoard(radius);

  $("#plus-button").on("click", function(){
    radius += 15;
    appendElement($(".container"));
    render(radius);
    updateBoard(radius);
  });

  $(".small").live("click",function(){
    radius -= 15;
    $(event.target).remove();
    render(radius);
    updateBoard(radius);
  });
});

function updateBoard(radius){
  $("#plus-button").css({
    top:radius,
    left:radius
  });
  $(".container").css({
    width: 2 * radius,
    height: 2 * radius 
  });
}

function render(radius, direction){
  var count = $(".small").length;
  $(".small").each(function(k, elem){
    var step = (360 / count ) * k;
    var degree = ((180 - step) >= 0 ) ? 180 - step : 540 - step;
    console.log(k + "th is " + degree);
    circular(elem, radius , 45, degree, direction);
  });
}

function circular(element, radius, d, degree, direction){
  var item = $(element);
  var start = item.data("degree");
  if(start == undefined){
    start = 180;
  }

  if(!direction || typeof direction == "undefined"){
    var diff = degree - start;
    if(diff < 0) diff = 360 + diff;
    direction = (diff >= 180 ) ? -1 : 1;
  }

  //console.log(degree);
  var end = degree % 360;

  //console.log(start + "=>" + degree);
  item.animate({
    path : new $.path.arc({
      center : [radius - d, radius - d],
      start : start,
      radius : radius,
      end : end,
      dir : direction
    })
  }, 750);
  item.data("degree", end );
}

var titles = ["Main Board", "Inspiration", "Sexy", "Photography", "Lots of Billies", "Ladies"];

function appendElement(element){
  var index = Math.floor((Math.random() * titles.length) + 1);
  element.prepend($("<div class='round small'>"+ titles[index] +"</div>"));
}

//calculate x,y position on circle div with width and height = 2r
function x(r,d,degree){
  return r + r * Math.sin(degree / 180 * Math.PI) - d
}

function y(r,d,degree){
  return r - r * Math.cos(degree / 180 * Math.PI) - d
}
