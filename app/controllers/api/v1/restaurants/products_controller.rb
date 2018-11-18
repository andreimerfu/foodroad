# frozen_string_literal: true

class Api::V1::Restaurants::ProductsController < ApplicationController
  before_action -> { is_authenticated_as(:restaurant) }, only: [:create, :update, :destroy]

  def index
    products = Product.where(restaurant_id: params[:restaurant_id])
                      .order(:category_id)
                      .includes(:category)
    render jsonapi: products, status: :ok
  end

  def show
    product = Product.find_by(id: params[:id], restaurant_id: params[:restaurant_id])
    render json: product, status: :ok
  end

  def create
    product = Product.new(products_params)
    if product
      render jsonapi: product, status: :created
    else
      render jsonapi_errors: product.errors, status: :unprocessable_entity
    end
  end

  def update
    product = Product.find_by(id: params[:id], restaurant_id: params[:restaurant_id])
    if product.update
      render jsonapi: product, status: :ok
    else
      render jsonapi_errors: product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    product = Product.find_by(id: params[:id], restaurant_id: params[:restaurant_id])
    if product.destroy
      render jsonapi: product, status: :no_content
    else
      render jsonapi_errors: product.errors, status: :unprocessable_entity
    end
  end

  private
    def products_params
      permit.params(:name, :price, :description)
    end
end
