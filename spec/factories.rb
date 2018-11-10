FactoryBot.define do
  factory :restaurant do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
  end

  factory :user do
    email { Faker::Internet.email }
    password { "password123" }
  end

end
