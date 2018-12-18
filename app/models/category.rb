# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :restaurants, through: :products

  validates_presence_of :name

  BANNED_WORDS = [
      :food, :cuisine, :dish
  ].freeze
end
