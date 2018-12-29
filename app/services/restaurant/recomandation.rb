class RecommendationSystem < ApplicationRecord
  class Product
    attr_reader: user

    def initialize(user)
      @user = user.id
    end

    def call

    end
  end
end
