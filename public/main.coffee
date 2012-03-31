$(window).load ->
	$('img').css height : $(window).height()
	leftImg = $('#wrapper img:last')
	rightPoint = leftImg.position().left + leftImg.outerWidth(true)
	$('body').css height : rightPoint + 'px'
	$('#wrapper').css width : rightPoint + 'px'


$(window).scroll ->
	top = $(window).scrollTop()
	if (top - $(window).height() < $('#wrapper').width() - ($(window).width() - 1200) / 2)
		$('#wrapper').css left : -$(window).scrollTop()
 

  