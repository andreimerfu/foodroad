# frozen_string_literal: true

class Api::V1::Restaurants::OrdersController < ApplicationController
  before_action -> { is_authenticated_as(:restaurant) }, only: [:index]

  def index
    restaurant = Restaurant.where(manager_id: current_user.id)
    orders =  Order.includes(:products)
      .where(products: { restaurant: restaurant})
      .where(status: :in_progress)

    render jsonapi: orders, status: :ok if orders
  end
end
