# frozen_string_literal: true

class Api::V1::ProductsController < ApplicationController
  # before_action -> { is_authenticated_as(:restaurant) }, only: [:create, :update, :destroy]
  def index
    products = Product.where(restaurant_id: params[:restaurant_id])
                      .order(:category_id)
                      .includes(:category)
    render jsonapi: products, status: :ok
  end

  def show
    product = Product.find(params[:id])
    render json: product, status: :ok
  end
end
