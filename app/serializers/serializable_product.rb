# frozen_string_literal: true

class SerializableProduct < JSONAPI::Serializable::Resource
  type 'products'

  attributes :name, :price, :description, :category

  meta do
    { featured: true }
  end
end
