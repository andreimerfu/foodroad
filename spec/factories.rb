# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    association :category
    association :restaurant
    name { Faker::Food.dish }
    description { Faker::Food.description }
    price { Faker::Number.decimal(2, 2) }
  end

  factory :category do
    name { Faker::Lorem.word }
  end

  factory :restaurant do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
    delivery_zone { 50 }
    manager_name { Faker::Name.name_with_middle }
    manager_email { Faker::Internet.email }
    manager_phone { Faker::PhoneNumber.phone_number }
    lng { 26.102538399999958 }
    lat { 44.4267674 }
    image { Faker::Placeholdit.image }
    cui { Faker::Number.number(8) }
  end

  factory :user do
    email { Faker::Internet.email }
    password { 'password123' }
  end
end
