(function() {

  $(function() {
    var sizeObjects;
    $(window).bind('load resize', function() {
      return sizeObjects();
    });
    $(window).scroll(function() {
      return $('#wrapper').css({
        left: -$(window).scrollTop()
      });
    });
    return sizeObjects = function() {
      var rightImg, rightPoint;
      $('#wrapper').css({
        width: 30000 + 'px'
      });
      $('img').css({
        height: $(window).height(),
        width: 'auto'
      });
      rightImg = $('#wrapper img:last');
      rightPoint = rightImg.position().left + rightImg.outerWidth(true);
      $('body').css({
        height: rightPoint - $(window).width() + $(window).height() + 'px'
      });
      return $('#wrapper').css({
        width: rightPoint + 'px'
      });
    };
  });

}).call(this);
