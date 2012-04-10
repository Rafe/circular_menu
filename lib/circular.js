window.Spling = {};

Spling.MenuController = (function(id, radius){
  var self = this;
  this.radius = radius;
  this.$el = $(id);
  this.items = [];

  $(".item").each(function(k, v){
    self.items.push(new Spling.MenuItem(v));
  });

  var titles = ["Main Board", "Inspiration", "Sexy", "Photography", "Lots of Billies", "Ladies"];
  this.appendElement = function(element){
    var index = Math.floor((Math.random() * (titles.length - 1)) + 1);
    self.$el.prepend($("<div class='item'><div class='inner'>"+ titles[index] +"</div></div>"));
  }

  this.updateBoard = function(radius){
    $("#plus-button").animate({
      top:radius - 7,
      left:radius - 7,
    },750);

    self.$el.css({
      width: 2 * radius,
      height: 2 * radius 
    });

    self.radius = radius;
  }

  this.render = function(range, direction){
    var radiusEnd = self.radius + range;
    var count = $(".item").length;
    $(".item").each(function(k, elem){
      var item = new Spling.MenuItem();
      var step = (360 / count ) * k;
      var degree = ((180 - step) >= 0 ) ? 180 - step : 540 - step;
      item.renderItem(elem, self.radius ,radiusEnd, 45, degree, direction);
    });
    self.updateBoard(radiusEnd);
  }

  this.render(0, -1);

  return {
    render: this.render,
    appendElement: this.appendElement
  };
});

Spling.MenuItem = (function(item){

  this.$el = $(item);

  this.renderItem = function(element, radius, radiusEnd, d, degree, direction){
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
  return this;
});

$(function(){

  var controller = new Spling.MenuController("#spling-menu", 100); 

  $("#plus-button").on("click", function(){
    controller.appendElement($(".container"));
    controller.render(15);
  });

  $(".item").live("click",function(event){
    var target = $(event.target);
    (target.hasClass("inner")) ? target.parent().remove() : target.remove();
    controller.render(-15);
  });
});
