# frozen_string_literal: true

class Api::V1::OrdersController < ApplicationController
  before_action -> { is_authenticated_as(:user) }, only: [:create]
  before_action -> { is_authenticated_as(:restaurant) }, only: [:update]

  def create
    order = Order.new(orders_params)

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
    params.permit(:total, :address, :products)
  end
end
