# frozen_string_literal: true

class SerializableCategory < JSONAPI::Serializable::Resource
  type 'categories'

  attributes :name

  link :self do
    @url_helpers.api_v1_restaurant_path(@object.id)
  end

  meta do
    { featured: true }
  end
end
