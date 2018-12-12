# frozen_string_literal: true

class SerializableProduct < JSONAPI::Serializable::Resource
  type 'products'

  attributes :id, :name, :price, :description, :category, :restaurant, :image

  meta do
    { featured: true }
  end
end
