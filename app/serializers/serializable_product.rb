# frozen_string_literal: true

class SerializableProduct < JSONAPI::Serializable::Resource
  type 'products'

  attributes :name, :price, :description, :category

  link :self do
    @url_helpers.api_v1_restaurant_path(@object.id)
  end

  meta do
    { featured: true }
  end

end
