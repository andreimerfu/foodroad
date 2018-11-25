# frozen_string_literal: true

class SerializableProfile < JSONAPI::Serializable::Resource
  type 'profiles'

  attributes :id, :addresses

  attribute :role do
    @object.user.role
  end

  link :self do
    @url_helpers.api_v1_profiles_path
  end

  meta do
    { featured: true }
  end
end
