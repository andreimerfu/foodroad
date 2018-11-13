# frozen_string_literal: true

module Queries
  class CategoriesQuery
    attr_reader :restaurant

    def initialize(restaurant)
      @restaurant = restaurant
    end

    def call
      Category.joins(:products)
              .where(products: { restaurant_id: @restaurant })
              .order(:id)
    end
  end
end
