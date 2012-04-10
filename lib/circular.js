$(function(){

  var count = $(".small").length;
  var radius = 100;
  render(radius, radius, -1);
  updateBoard(radius);

  $("#plus-button").on("click", function(){
    appendElement($(".container"));
    render(radius,radius + 15);
    radius += 15;
    updateBoard(radius);
  });

  $(".small").live("click",function(event){
    var target = $(event.target);
    (target.hasClass("inner")) ? target.parent().remove() : target.remove();
    render(radius, radius - 15);
    radius -= 15;
    updateBoard(radius);
  });
});

function updateBoard(radius){
  $("#plus-button").animate({
    top:radius - 7,
    left:radius - 7,
  },750);
  $(".container").css({
    width: 2 * radius,
    height: 2 * radius 
  });
}

function render(radius, radiusEnd, direction){
  var count = $(".small").length;
  $(".small").each(function(k, elem){
    var step = (360 / count ) * k;
    var degree = ((180 - step) >= 0 ) ? 180 - step : 540 - step;
    //console.log(k + "th is " + degree);
    renderItem(elem, radius ,radiusEnd, 45, degree, direction);
  });
}

function renderItem(element, radius, radiusEnd, d, degree, direction){
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
      centerEnd : [radiusEnd - d, radiusEnd - d],
      start : start,
      radius : radius,
      radiusEnd : radiusEnd,
      end : end,
      dir : direction
    })
  }, 750);
  item.data("degree", end );
}

var titles = ["Main Board", "Inspiration", "Sexy", "Photography", "Lots of Billies", "Ladies"];

function appendElement(element){
  var index = Math.floor((Math.random() * (titles.length - 1)) + 1);
  element.prepend($("<div class='round small'><div class='inner'>"+ titles[index] +"</div></div>"));
}
