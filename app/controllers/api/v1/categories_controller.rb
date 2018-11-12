# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action -> { is_authenticated_as(:admin) }, only: [:create, :update, :destroy]

  def index
    categories = Category.all
    render json: categories, status: :ok
  end

  def update
    category = Category.update(categories_params)
    render json: category, status: :ok
  end

  def destroy
    category = Category.destroy(params[:id])
    render json: category, status: :ok
  end

  private
    def categories_params
      params.permit(:name)
    end
end
