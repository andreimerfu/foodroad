# frozen_string_literal: true

class SerializableRecommendation < JSONAPI::Serializable::Resource
  type 'recommendations'

  attributes :profile, :product
end
