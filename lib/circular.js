window.Spling = {};

/*
 * MenuController:
 * -----
 * Controller of circular menu, render items and control the size increase/decrease.
 * @id : html element id of menu container
 * @radius : initial radius of menu
 */
Spling.MenuController = (function(id, radius){
  var self = this;

  this.radius = radius;
  this.$el = $(id);
  var item = new Spling.MenuItem();

  /* 
   * appendElement:
   * -----
   * append item element with random title to menu
   */
  var titles = ["Main Board", "Inspiration", "Sexy", "Photography", "Lots of Billies", "Ladies"];
  this.appendElement = function(){
    var index = Math.floor((Math.random() * (titles.length - 1)) + 1);
    var el = $("<div class='item'><div class='inner'>"+ titles[index] +"</div></div>");
    self.$el.prepend(el);
  }

  /* 
   * updateBoard:
   * -----
   * increase/decrease radius on menu, update border size and position of center plus button(pretty buggy)
   */
  this.updateBoard = function(radius){
    $("#plus-button").animate({
      top:radius - 7,
      left:radius - 7,
    },750);

    this.$el.css({
      width: 2 * radius,
      height: 2 * radius 
    });

    this.radius = radius;
  }

  /* 
   * render
   * -----
   * @range : increase/decrease range of menu
   * @direction : item animation direction, -1 => clockwise, auto detect if not assigned.
   */
  this.render = function(range, direction){
    var radiusEnd = self.radius + range;
    var items = $(".item");
    var count = items.length;

    items.each(function(k, v){
      var step = (360 / count ) * k;
      var degree = ((180 - step) >= 0 ) ? 180 - step : 540 - step;
      item.renderItem(v, self.radius ,radiusEnd, 45, degree, direction);
    });

    self.updateBoard(radiusEnd);
  }

  this.render(0, -1);

  return {
    render: this.render,
    appendElement: this.appendElement
  };
});

/*
 * MenuItem:
 * -----
 * Menu item renderer, using $.path to animate circular path animation.
 * Store item position in html element.
 */
Spling.MenuItem = (function(){

  /*
   * renderItem :
   * @elem : html element
   * @radius : radius of menu 
   * @radiusEnd : radius to be in end of animation 
   * @itemRadius : radius of Menu Item
   * @degree : target degree 
   * @direction : animation direction, -1 = clockwise, auto detect if not assigned
   */
  this.renderItem = function(elem, radius, radiusEnd, itemRadius, degree, direction){
    var item = $(elem);
    var start = item.data("degree");
    if(typeof start == "undefined"){
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
        center : [radius - itemRadius, radius - itemRadius],
        centerEnd : [radiusEnd - itemRadius, radiusEnd - itemRadius],
        start : start,
        radius : radius,
        radiusEnd : radiusEnd,
        end : end,
        dir : direction
      })
    }, 750);

    item.data("degree",end)
  }
  return this;
});

$(function(){

  controller = new Spling.MenuController("#spling-menu", 100); 

  $("#plus-button").on("click", function(){
    controller.appendElement();
    controller.render(15);
  });

  $(".item").live("click",function(event){
    var target = $(event.target);
    (target.hasClass("inner")) ? target.parent().remove() : target.remove();
    controller.render(-15);
  });
});
