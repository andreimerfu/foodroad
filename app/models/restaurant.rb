# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :categories, through: :products
  has_many_attached :documents, dependent: :destroy

  validates_presence_of :name, :manager_name, :manager_email, :manager_phone
  validates_numericality_of :delivery_zone, :delivery_time, :min_order,
                            greater_than_or_equal_to: 0, only_integer: true, allow_nil: true
  validates_numericality_of :lat, :lng,
                            greater_than_or_equal_to: 0, allow_nil: true
  validates :cui, presence: true, length: 7..8
  validates :progress_value, numericality: {
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 100
  }

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
    :image, :manager_name, :manager_email, :manager_phone, :cui,
    documents: []
  ].freeze

  scope :search, -> (query) do
    joins(:products, :categories)
      .where('restaurants.name ILIKE :search
              OR products.name ILIKE :search
              OR categories.name ILIKE :search',
             search: "%#{query}%")
  end
end
