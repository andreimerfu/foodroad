# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :products
  has_many :restaurants, through: :products

  validates_presence_of :name
end
