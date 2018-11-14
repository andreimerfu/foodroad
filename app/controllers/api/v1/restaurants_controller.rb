# frozen_string_literal: true

class Api::V1::RestaurantsController < ApplicationController
  def index
  	if params[:search].present?
	    restaurants = Restaurant.search(params[:search]).find_nearest_restaurants(params[:lat], params[:lng])
  	else
  		restaurants = Restaurant.find_nearest_restaurants(params[:lat], params[:lng])
  	end
    render jsonapi: restaurants, status: :ok
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render jsonapi: restaurant, status: :ok
  end
end
