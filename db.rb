Dir.chdir(File.dirname(__FILE__))

require 'rubygems'
require 'sinatra'
require 'haml'
require './routes/main.rb'

#Sinatra/Rack setup
set :root, File.dirname(__FILE__)
set :environment, :development
