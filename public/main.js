(function() {

  $(window).load(function() {
    var leftImg, rightPoint;
    $('img').css({
      height: $(window).height()
    });
    leftImg = $('#wrapper img:last');
    rightPoint = leftImg.position().left + leftImg.outerWidth(true);
    $('body').css({
      height: rightPoint + 'px'
    });
    return $('#wrapper').css({
      width: rightPoint + 'px'
    });
  });

  $(window).scroll(function() {
    var top;
    top = $(window).scrollTop();
    if (top - $(window).height() < $('#wrapper').width() - ($(window).width() - 1200) / 2) {
      return $('#wrapper').css({
        left: -$(window).scrollTop()
      });
    }
  });

}).call(this);
