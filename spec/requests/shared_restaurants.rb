# frozen_string_literal: true

RSpec.shared_context 'shared restaurants', shared_context: :metadata do
  let(:restaurant_create_params) {
    {
      email: Faker::Internet.email,
      password: '12345678',
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

  let(:invalid_restaurant_create_params) {
    {
      restauran: {}
    }
  }
end

RSpec.configure do |rspec|
  rspec.include_context 'shared restaurants', include_shared: true
end
