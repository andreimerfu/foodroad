# frozen_string_literal: true

FactoryBot.define do
  factory :product do
  end
  factory :category do
  end
  factory :restaurant do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
    delivery_zone { Faker::Number.between(1, 10) }
  end

  factory :user do
    email { Faker::Internet.email }
    password { 'password123' }
  end
end
