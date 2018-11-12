# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_many :products
  has_many :categories, through: :products


  def self.find_nearest_restaurants(lat, lng)
    restaurants = Restaurant.all
    current_location = [lat.to_f, lng.to_f]
    nearest_restaurants(current_location, restaurants)
  end

  private

    def self.nearest_restaurants(location, restaurants)
      nearest_restaurants = []
      restaurants.each do |restaurant|
        destination = [restaurant.lat, restaurant.lng]
        if distance_between_2_points(location, destination) <= restaurant.delivery_zone
          nearest_restaurants << restaurant
        end
      end
      nearest_restaurants
    end
end
