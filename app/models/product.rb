# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :restaurant
  belongs_to :category
end
