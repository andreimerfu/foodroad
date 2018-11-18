# frozen_string_literal: true

8.times do
  FactoryBot.create(:restaurant)
  FactoryBot.create(:category)
end

Restaurant.find_each do |restaurant|
  Category.find_each do |category|
    FactoryBot.create(:product, restaurant: restaurant, category: category)
  end
end
