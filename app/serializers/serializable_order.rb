# frozen_string_literal: true

class SerializableOrder < JSONAPI::Serializable::Resource
  attribute :total
  attribute :address
  attribute :payment_type

  attribute :products do
    @object.products
  end
end
