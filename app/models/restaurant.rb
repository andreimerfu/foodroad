# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_many :products
  has_many :categories, through: :products
  include Modules::Geolocation

  def self.find_nearest_restaurants(lat, lng)
    restaurants = Restaurant.all
    current_location = [lat.to_f, lng.to_f]
    nearest_restaurants(current_location, restaurants)
  end
end
