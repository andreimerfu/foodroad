# frozen_string_literal: true

class SerializableRestaurant < JSONAPI::Serializable::Resource
  type 'restaurants'

  attributes :name, :address, :delivery_zone, :image, :min_order, :delivery_time

  link :self do
    @url_helpers.api_v1_restaurant_path(@object.id)
  end

  meta do
    { featured: true }
  end
end
