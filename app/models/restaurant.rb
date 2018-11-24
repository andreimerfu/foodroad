# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_many :products
  has_many :categories, through: :products

  validates_presence_of :name, :address, :manager_name, :manager_email, :manager_phone
  validates_numericality_of :delivery_zone, :delivery_time, greater_than: 0, only_integer: true
  validates_numericality_of :min_order, :lat, :lng, greater_than: 0
  validates :cui, presence: true, length: 7..8

  enum approval_status: [:rejected, :in_progress, :approved]
  after_initialize :set_default_status, if: :new_record?

  class << self
    include Geolocation

    def find_nearest_restaurants(lat, lng)
      restaurants = Restaurant.all
      current_location = [lat.to_f, lng.to_f]
      nearest_restaurants(current_location, restaurants)
    end

    def approved_filter
      Restaurant.where(approval_status: :approved)
    end
  end

  def set_default_status
    self.approval_status ||= :in_progress
  end

  RESTAURANT_PARAMS = [
    :name, :address, :delivery_zone, :min_order, :delivery_time,
    :image, :manager_name, :manager_email, :manager_phone, :cui
  ].freeze

  scope :search, -> (query) do
    joins(:products, :categories)
      .where('restaurants.name ILIKE :search
              OR products.name ILIKE :search
              OR categories.name ILIKE :search',
             search: "%#{query}%")
  end
end
