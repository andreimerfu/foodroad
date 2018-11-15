# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.all
    render jsonapi: categories, status: :ok
  end
end
