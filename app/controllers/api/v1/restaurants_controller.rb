# frozen_string_literal: true

class Api::V1::RestaurantsController < ApplicationController
  before_action -> { is_authenticated_as(:restaurant) }, only: [:update]

  def index
    if params[:search].present?
      restaurants = Restaurant.approved_filter
                      .search(params[:search])
                      .find_nearest_restaurants(params[:lat], params[:lng])
    else
      restaurants = Restaurant.approved_filter
                      .find_nearest_restaurants(params[:lat], params[:lng])
    end

    Recommendation.training(current_user, restaurants) if current_user

    render jsonapi: restaurants, status: :ok
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render jsonapi: restaurant, status: :ok
  end

  def create
    manager = create_manager

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

  def update
    restaurant = Restaurant.find(params[:id])

    if params[:documents].present?
      restaurant.documents.attach(params[:documents])
      restaurant.check_step_validation('documents')
    end

    if params[:check_cui].present?
      restaurant.cui_validation if restaurant
    end

    if restaurant.update(restaurants_params)
      restaurant.check_step_validation('informations')
      render jsonapi: restaurant, status: :ok
    else
      render jsonapi_errors: restaurant.errors, status: :unprocessable_entity
    end
  end

  def find_by_manager
    restaurant = Restaurant.find_by(manager_id: params[:manager_id])
    if restaurant
      render jsonapi: restaurant, status: :ok
    else
      render jsonapi_errors: restaurant.errors, status: :unprocessable_entity
    end
  end

  def get_restaurant_id
    restaurant = Restaurant.find_by(manager_id: current_user.id)

    render json: restaurant.id, status: :ok
  end


  private
  def restaurants_params
    params.fetch(:restaurant, {}).permit(Restaurant::RESTAURANT_PARAMS)
  end

  def managers_params
    params.permit(:email, :password, :password_confirmation)
  end

  def create_manager
    manager = User.new(managers_params)

    if manager.valid?
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
