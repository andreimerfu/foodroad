# frozen_string_literal: true

class Api::V1::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.find_nearest_restaurants(params[:lat], params[:lng])
    render jsonapi: restaurants, status: :ok
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render jsonapi: restaurant, status: :ok
  end
end
