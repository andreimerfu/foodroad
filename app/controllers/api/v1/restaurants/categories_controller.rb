# frozen_string_literal: true

class Api::V1::Restaurants::CategoriesController < ApplicationController
  before_action -> { is_authenticated_as(:restaurant) }, only: [:create, :update, :destroy]

  def index
    categories = Queries::CategoriesQuery.new(params[:restaurant_id]).call
    render jsonapi: categories, status: :ok
  end

  def create
    category = Category.new(categories_params)
    if category.save
      render jsonapi: category, status: :created
    else
      render jsonapi_errors: category.errors, status: :unprocessable_entity
    end
  end

  def update
    category = Category.update(categories_params)
    render jsonapi: category, status: :ok
  end

  def destroy
    category = Category.destroy(params[:id])
    render jsonapi: category, status: :ok
  end

  private
    def categories_params
      params.permit(:name)
    end
end
