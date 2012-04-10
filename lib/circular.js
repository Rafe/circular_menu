window.Spling = {};

Spling.MenuController = (function(id){
  var titles = ["Main Board", "Inspiration", "Sexy", "Photography", "Lots of Billies", "Ladies"];

  this.$el = $(id);

  this.appendElement = function(element){
    var index = Math.floor((Math.random() * (titles.length - 1)) + 1);
    this.$el.prepend($("<div class='item'><div class='inner'>"+ titles[index] +"</div></div>"));
  }

  this.updateBoard = function(radius){
    $("#plus-button").animate({
      top:radius - 7,
      left:radius - 7,
    },750);

    this.$el.css({
      width: 2 * radius,
      height: 2 * radius 
    });
  }

  return this;
});

$(function(){

  var count = $(".item").length;
  var radius = 100;
  var controller = new Spling.MenuController("#spling-menu");
  render(radius, radius, -1);
  controller.updateBoard(radius);

  $("#plus-button").on("click", function(){
    controller.appendElement($(".container"));
    render(radius,radius + 15);
    radius += 15;
    controller.updateBoard(radius);
  });

  $(".item").live("click",function(event){
    var target = $(event.target);
    (target.hasClass("inner")) ? target.parent().remove() : target.remove();
    render(radius, radius - 15);
    radius -= 15;
    controller.updateBoard(radius);
  });
});

function render(radius, radiusEnd, direction){
  var count = $(".item").length;
  $(".item").each(function(k, elem){
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

