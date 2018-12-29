class Recommendation < ApplicationRecord
  belongs_to :profile
  belongs_to :product

  class << self
    def training(user, restaurants)
      Recommendation::Core.new(user, restaurants).training
    end
  end
end
