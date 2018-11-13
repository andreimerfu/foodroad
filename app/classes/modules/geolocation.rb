# frozen_string_literal: true

module Modules
  module Geolocation
    def nearest_restaurants(location, restaurants)
      nearest_restaurants = Array.new
      restaurants.each do |restaurant|
        destination = [restaurant.lat, restaurant.lng]
        if distance_between_2_points(location, destination) <= restaurant.delivery_zone
          nearest_restaurants << restaurant
        end
      end
      nearest_restaurants
    end

    def self.included(receiver)
      receiver.extend Geolocation
    end
  end
end
