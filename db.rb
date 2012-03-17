Dir.chdir(File.dirname(__FILE__))

# myapp.rb
require 'rubygems'
require 'sinatra'
require 'haml'
require './routes/main.rb'

#Sinatra setup
set :root, File.dirname(__FILE__)
set :environment, :development
