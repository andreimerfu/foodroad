# frozen_string_literal: true

class Profile < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_many :orders

  validate :valid_addresses

  def valid_addresses
    unless addresses.map(&:keys).all? { |keys| keys.all? { |key| key.in? %w(address tag _destroy) } }
      errors.add(:addresses, 'Invalid format')
    end
  end
end
