get '/*?' do
	@images = Dir.glob('public/images/*')
	@images = @images.map {|image| image = image.split('/').pop()}
	haml :index	
end