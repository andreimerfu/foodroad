# frozen_string_literal: true

class SerializableRestaurant < JSONAPI::Serializable::Resource
  type 'restaurants'

  attributes :name, :address, :delivery_zone, :image, :min_order, :delivery_time,
             :approval_status, :progress_value, :cui, :image, :manager_name,
             :manager_email, :manager_phone, :validation_steps

  link :self do
    @url_helpers.api_v1_restaurant_path(@object.id)
  end

  meta do
    { featured: true }
  end
end
