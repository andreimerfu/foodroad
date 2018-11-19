# frozen_string_literal: true

class Api::V1::RestaurantsController < ApplicationController
  def index
  	if params[:search].present?
	    restaurants = Restaurant.approved_filter
                              .search(params[:search])
                              .find_nearest_restaurants(params[:lat], params[:lng])
  	else
  		restaurants = Restaurant.approved_filter
                              .find_nearest_restaurants(params[:lat], params[:lng])
  	end
    render jsonapi: restaurants, status: :ok
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render jsonapi: restaurant, status: :ok
  end

  def create
    manager = create_manager(params)

    unless manager.errors.messages.empty?
      render jsonapi_errors: manager.errors, status: :unprocessable_entity
      return
    end

    restaurant = create_restaurant(manager)

    if restaurant.valid?
      restaurant.save
      render jsonapi: restaurant, status: :created
    else
      manager.destroy
      render jsonapi_errors: restaurant.errors, status: :unprocessable_entity
    end
  end

  private
    def restaurants_params
      params.fetch(:restaurant, {}).permit(Restaurant::RESTAURANT_PARAMS)
    end

    def managers_params
      params.permit(:email, :password, :password_confirmation)
    end

    def create_manager(params)
      manager = User.new(managers_params)

      if manager
        manager.set_role(:restaurant)
        manager.skip_confirmation!
      end

      manager.save
      manager
    end

    def create_restaurant(manager)
      restaurant = Restaurant.new(restaurants_params)

      restaurant.manager_email = manager.email
      restaurant.manager_id = manager.id

      restaurant
    end
end
