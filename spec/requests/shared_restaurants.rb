# frozen_string_literal: true

RSpec.shared_context 'shared restaurants', shared_context: :metadata do
  let(:restaurant_manager_email) { 'restaurant@food-stuff.ro' }
  let(:restaurant_manager_password) { '12345678' }

  let(:restaurant_create_params) {
    {
      email: restaurant_manager_email,
      password: restaurant_manager_password,
      restaurant: {
        name: "#{Faker::Food.spice} #{Faker::Company.industry}",
        address: Faker::Address.full_address,
        delivery_zone: 5,
        min_order: 50,
        delivery_time: 1.5.hours,
        manager_name: Faker::Name.name,
        manager_phone: Faker::PhoneNumber.phone_number,
        cui: Faker::Number.number(7)
      }
    }
  }

  let(:restaurant_manager) {
    {
      email: restaurant_manager_email,
      password: restaurant_manager_password
    }
  }

  let(:manager_headers) {
    post user_session_path, params: restaurant_manager
    response.headers.slice('Content-Type', 'access-token', 'token-type', 'client', 'expiry', 'uid')
  }

  let(:invalid_restaurant_create_params) {
    {
      restauran: {}
    }
  }
end

RSpec.configure do |rspec|
  rspec.include_context 'shared restaurants', include_shared: true
end
