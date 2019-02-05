# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :restaurants, through: :products

  validates_presence_of :name

  BANNED_WORDS = %w(alimente farfurie bucătărie ceașcă).freeze
end
