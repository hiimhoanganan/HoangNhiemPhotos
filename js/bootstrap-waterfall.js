// bootstrap-waterfall.js doesn't have a cdn yet. You need to include it in your project
// from https://rawgithub.com/Mystist/bootstrap-waterfall/master/dist/bootstrap-waterfall.js

+function(t){"use strict";function i(i){this.$pins=i,this.tasks=[],this.timerId=null,this.deferred=new t.Deferred}function n(t){this.img=t,this.initialWidth=t.width,this.initialHeight=t.height,this.img.isError=!1,this.img.onerror=function(){this.isError=!0}}function e(i){return this.each(function(){var n=t(this),e=n.data("mystist.waterfall"),s="object"==typeof i&&i;e&&"string"!=typeof i&&e.destroy()&&(e=null),e||n.data("mystist.waterfall",e=new r(this,s)),"string"==typeof i&&e[i]()})}var s=s||{now:Date.now||function(){return(new Date).getTime()},throttle:function(t,i,n){var e,r,o,a=null,h=0;n||(n={});var l=function(){h=n.leading===!1?0:s.now(),a=null,o=t.apply(e,r),a||(e=r=null)};return function(){var c=s.now();h||n.leading!==!1||(h=c);var u=i-(c-h);return e=this,r=arguments,u<=0||u>i?(a&&(clearTimeout(a),a=null),h=c,o=t.apply(e,r),a||(e=r=null)):a||n.trailing===!1||(a=setTimeout(l,u)),o}},debounce:function(t,i,n){var e,r,o,a,h,l=function(){var c=s.now()-a;c<i&&c>=0?e=setTimeout(l,i-c):(e=null,n||(h=t.apply(o,r),e||(o=r=null)))};return function(){o=this,r=arguments,a=s.now();var c=n&&!e;return e||(e=setTimeout(l,i)),c&&(h=t.apply(o,r),o=r=null),h}}},r=function(i,n){this.$element=t(i),this.options=t.extend({},r.DEFAULTS,n),this.id=Math.random().toString().slice(2),this.$fakePin=null,this.$container=null,this.$pins=null,this.pinWidth=null,this.imgWidth=null,this.lefts=[],this.tops=[],this.init().calculateWidth().calculatePosition().sail(),t(window).on("resize.mystist.waterfall"+this.id,s.debounce(t.proxy(function(){t(window).off("scroll.mystist.waterfall"+this.id),this.calculateWidth().calculatePosition().ship(o.getLoadedPins.call(this))},this),777))};r.VERSION="0.2.8",r.DEFAULTS={},r.prototype.init=function(){return this.initPins().initAttributes(),this},r.prototype.initPins=function(){var i=this.$element.children().length>0?this.$element.children().remove():t(this.$element.data("bootstrap-waterfall-template"));return this.$pins=o.decorate(i),this},r.prototype.initAttributes=function(){return this.$fakePin=this.$pins.first().clone(),this.$container=t("<div />").css("position","relative"),this.$element.html(this.$container),this},r.prototype.calculateWidth=function(){var t=this.$fakePin.clone();return this.$container.append(t.css("opacity",0)),this.pinWidth=t.outerWidth(!0),this.imgWidth=t.find("img:eq(0)").css("width","100%").width(),t.remove(),this},r.prototype.calculatePosition=function(){for(var t=parseInt(this.$container.width()/this.pinWidth,10),i=[],n=[],e=0;e<t;e++)i.push(e*this.pinWidth),n.push(0);return this.lefts=i,this.tops=n,this},r.prototype.sail=function(){var n=o.getToLoadPins.call(this),e=new i(n);return e.load().run().deferred.done(t.proxy(function(){this.ship(n)},this)),this},r.prototype.ship=function(i){return this.render(i).updateHeight(),t(window).on("scroll.mystist.waterfall"+this.id,s.throttle(t.proxy(function(){if(o.isWantMore.call(this)){t(window).off("scroll.mystist.waterfall"+this.id),this.sail();var i=o.getRemainingPins.call(this).length;i<=o.getSteps.call(this)&&i>0&&this.$element.trigger("finishing.mystist.waterfall")}},this),500)),this},r.prototype.render=function(i){var n=this;return i.each(function(){n.placePin(t(this))}),this},r.prototype.placePin=function(t){var i=a.indexOf(this.tops,Math.min.apply(null,this.tops)),n=o.getPosition.call(this,i);return t.css({position:"absolute",left:n.left,top:n.top}),t.data("bootstrap-waterfall-pin")&&o.setImageHeight.call(this,t),t.data("bootstrap-waterfall-src")&&(o.makeImageAvailable.call(this,t),t.removeData("bootstrap-waterfall-src")),this.$container.append(t),o.updatePosition.call(this,i,t),this},r.prototype.updateHeight=function(){var t=a.indexOf(this.tops,Math.max.apply(null,this.tops));return this.$container.height(this.tops[t]),this},r.prototype.destroy=function(){return t(window).off("scroll.mystist.waterfall"+this.id),t(window).off("resize.mystist.waterfall"+this.id),this.$element.empty().removeData("mystist.waterfall"),this},r.prototype.addPins=function(i){this.$pins=this.$pins.add(o.decorate(i)),t(window).trigger("scroll.mystist.waterfall"+this.id)};var o={decorate:function(i){return i.map(function(){var i=t(this).find("img:eq(0)");if(i.length>0)return t(this).data("bootstrap-waterfall-src",i.attr("src")),i.attr("src","data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),this})},getRemainingPins:function(){return this.$pins.map(function(){if(t(this).find("img").length>0&&t(this).data("bootstrap-waterfall-src"))return t(this)})},getSteps:function(){return 3*parseInt(this.$container.width()/this.pinWidth,10)},getToLoadPins:function(){return o.getRemainingPins.call(this).slice(0,o.getSteps.call(this))},getLoadedPins:function(){var i=this.$pins.map(function(){if(t(this).find("img").length>0&&!t(this).data("bootstrap-waterfall-src"))return t(this)});return i},isWantMore:function(){return t(window).scrollTop()+t(window).height()>a.getDocHeight()-377},getPosition:function(t){var i={left:this.lefts[t],top:this.tops[t]};return i},setImageHeight:function(t){var i=t.data("bootstrap-waterfall-pin"),n=this.imgWidth*i.img.height/i.img.width;t.find("img:eq(0)").css({height:n,width:"auto"})},makeImageAvailable:function(t){t.find("img:eq(0)").attr("src",t.data("bootstrap-waterfall-src"))},updatePosition:function(t,i){this.tops[t]+=i.outerHeight(!0)}};i.prototype.load=function(){var i=this;return this.$pins.each(function(){var e=new Image;e.src=t(this).data("bootstrap-waterfall-src");var s=new n(e);i.tasks.push(s),t(this).data("bootstrap-waterfall-pin",s)}),this},i.prototype.run=function(){return this.timerId=setInterval(t.proxy(function(){this.isDone()?this.stop():this.check()},this),40),this},i.prototype.isDone=function(){return 0===this.tasks.length},i.prototype.stop=function(){clearInterval(this.timerId),this.timerId=null,this.deferred.resolve()},i.prototype.check=function(){for(var t=0;t<this.tasks.length;t++){var i=this.tasks[t];i.isLoaded()&&this.tasks.splice(t--,1)}},n.prototype.isLoaded=function(){return!!this.img.isError||(this.img.width!==this.initialWidth||this.img.height!==this.initialHeight||this.img.width*this.img.height>1024)};var a={getDocHeight:function(){var t=document;return Math.max(t.body.scrollHeight,t.documentElement.scrollHeight,t.body.offsetHeight,t.documentElement.offsetHeight,t.body.clientHeight,t.documentElement.clientHeight)},indexOf:function(t,i){if(null==t)return-1;for(var n=0,e=t.length;n<e;n++)if(t[n]===i)return n;return-1}},h=t.fn.waterfall;t.fn.waterfall=e,t.fn.waterfall.Constructor=r,t.fn.waterfall.noConflict=function(){return t.fn.waterfall=h,this}}(jQuery);


let fader = {
  wh: $(window)
    .height(),
  full: function () {
    $('#waterfall .pin')
      .each(function (i, e) {
        (function (i, e) {
          setTimeout(function () {
            fader.check(e)
          }, i * 150);
        })(i, e)
      })
  },
  check: function (e) {
    if (fader.wh > e.getBoundingClientRect()
      .top + 60) {
      $(e)
        .addClass('inView');
      setTimeout(function () {
        $(e)
          .addClass('fix')
      }, 750)
    }
  },
  resize: function () {
    fader.wh = $(window)
      .height();
    fader.full();
  },
  light: function () {
    let fst = $('#waterfall .pin:not(".inView")')
      .eq(0);
    if (fst.is('.pin')) {
      fader.check(fst[0])
    }
  }
};

setTimeout(function () {
  fader.full()
}, 210);

$(window)
  .on('scroll', fader.light)
  .on('resize', _.throttle(fader.resize,
    500, {
      leading: false,
      trailing: true
    }))
  .on('load', function () {
    $('#waterfall')
      .data('bootstrap-waterfall-template', $('#waterfall-template')
        .html());
    $('#waterfall')
      .waterfall();
  });

/* 
 * load more function: replace this with an $.ajax() call, wrap new pins in a new
 * <script> with specific id, append it to <body> and add the items with:
 * $('#waterfall').data('mystist.waterfall').addPins($($('#scriptId').html()));
 */

$(document)
  .on('click', '.loadMore button', function () {
    let dumper = $('<script />', {
      type: 'text/template',
      id: Math.random()
        .toString(36)
        .substring(7)
    });
    for (let i = 40; i < 60; i++) {
      dumper[Math.random()
        .toFixed(0) > 0 ? 'append' : 'prepend'](
        $('<div />', {
          class: 'pin',
          html: '<a href="javascript:;"><img src="./files/images/album/' +
            i + (i < 109 ? '.jpg' : '.jpg') + 
            '" /></a>'
        })
      );
    }
    dumper.insertBefore('body > script + .container');
    $('#waterfall')
      .data('mystist.waterfall')
      .addPins($(dumper.html()));
    for (let i = 0; i < 4; i++) {
      (function (i) {
        setTimeout(function () {
          $(window)
            .trigger('scroll');
        }, i * 100);
      })(i);
    }
  });
  
  