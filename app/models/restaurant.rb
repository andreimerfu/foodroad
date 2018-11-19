# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_many :products
  has_many :categories, through: :products

  validates :cui, presence: true, length: 7..8

  include Modules::Geolocation

  enum approval_status: [:rejected, :in_progress, :approved]
  after_initialize :set_default_status, if: :new_record?

  def set_default_status
    self.approval_status ||= :in_progress
  end

  def self.find_nearest_restaurants(lat, lng)
    restaurants = Restaurant.all
    current_location = [lat.to_f, lng.to_f]
    nearest_restaurants(current_location, restaurants)
  end

  RESTAURANT_PARAMS = [
    :name, :address, :delivery_zone, :min_order, :delivery_time,
    :image, :manager_name, :manager_email, :manager_phone, :cui
  ].freeze

  scope :search, -> (q) do
  	joins(:products, :categories)
    .where('restaurants.name ILIKE :search
           OR products.name ILIKE :search
           OR categories.name ILIKE :search',
    search: "%#{q.to_s.downcase}%")
  end
end
