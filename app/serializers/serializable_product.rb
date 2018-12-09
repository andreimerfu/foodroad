# frozen_string_literal: true

class SerializableProduct < JSONAPI::Serializable::Resource
  type 'products'

  attributes :id, :name, :price, :description, :category

  meta do
    { featured: true }
  end
end
