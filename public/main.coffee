$ ->

	$('#wrapper').append($('#wrapper img:first-child').clone())

	$(window).bind 'load resize', ->
		sizeObjects()

	$(window).scroll ->
		scrollTop = $(window).scrollTop()
		$('#wrapper').css 
			left : -scrollTop
		if scrollTop + $(window).height() >= $('body').height()
			$(window).scrollTop(0)

	sizeObjects  = ->
		
		$('#wrapper').css
			width: 50000 + 'px'

		rightImg = $('#wrapper img:last')
		rightPoint = rightImg.position().left + rightImg.outerWidth(true)

		$('body').css 
			height : rightPoint - $(window).width() + $(window).height() + 'px'
			
		$('#wrapper').css 
			width : rightPoint + 'px'
