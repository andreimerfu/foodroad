# frozen_string_literal: true

class Api::V1::OrdersController < ApplicationController
  before_action -> { is_authenticated_as(:user) }, only: [:create]
  before_action -> { is_authenticated_as(:restaurant) }, only: [:update]

  def create
    products = Product.find(params[:products].pluck(:id))
    restaurant = products.first.restaurant

    restaurant = products.first.restaurant

    head 422 if restaurant.min_order > params[:total]

    order = Order.new(total: params[:total],
      payment_type: params[:payment_type],
      address: params[:address],
      observations: params[:observations],
      products: products,
      profile: current_user.profile )

    if order.save
      render jsonapi: order, status: :created
    else
      render jsonapi_errors: order.errors, status: :unprocessable_entity
    end
  end

  def update
    order = Order.find(params[:id])

    if order.update(orders_params)
      render jsonapi: order, status: :ok
    else
      render jsonapi_errors: order.errors, status: :unprocessable_entity
    end
  end

  private
  def orders_params
    params.permit(:total, :address, :payment_type)
  end
end
