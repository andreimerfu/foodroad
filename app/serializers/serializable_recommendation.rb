# frozen_string_literal: true

class SerializableRecommendation < JSONAPI::Serializable::Resource
  type 'recommendations'

  attributes :profile, :product

  attribute :restaurant_name do
  	@object.product.restaurant.name
  end
end
