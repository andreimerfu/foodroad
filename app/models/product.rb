# frozen_string_literal: true

class Product < ApplicationRecord
  has_and_belongs_to_many :orders
  belongs_to :restaurant
  belongs_to :category

  validates_presence_of :name, :price, :description
  validates_numericality_of :price, greater_than: 0
end
