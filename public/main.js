// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var sizeObjects;
    $('#wrapper').append($('#wrapper img:first-child').clone());
    $(window).bind('load resize', function() {
      return sizeObjects();
    });
    $(window).scroll(function() {
      var scrollTop;
      scrollTop = $(window).scrollTop();
      $('#wrapper').css({
        left: -scrollTop
      });
      if (scrollTop + $(window).height() >= $('body').height()) {
        return $(window).scrollTop(0);
      }
    });
    return sizeObjects = function() {
      var rightImg, rightPoint;
      $('#wrapper').css({
        width: 50000 + 'px'
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
