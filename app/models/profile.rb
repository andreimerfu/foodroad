class Profile < ApplicationRecord
  belongs_to :user, dependent: :destroy

  validate :valid_addresses

  def valid_addresses
    unless addresses.map(&:keys).all? { |keys| keys == %w(address tag) }
      errors.add(:addresses, 'Invalid format')
    end
  end
end
