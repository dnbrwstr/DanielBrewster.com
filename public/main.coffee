$ ->

	$(window).bind 'load resize', ->
		sizeObjects()

	$(window).scroll ->
		$('#wrapper').css 
			left : -$(window).scrollTop()

	sizeObjects  = ->
		
		$('#wrapper').css
			width: 50000 + 'px'

		rightImg = $('#wrapper img:last')
		rightPoint = rightImg.position().left + rightImg.outerWidth(true)

		$('body').css 
			height : rightPoint - $(window).width() + $(window).height() + 'px'
			
		$('#wrapper').css 
			width : rightPoint + 'px'
