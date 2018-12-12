# frozen_string_literal: true

8.times do
  FactoryBot.create(:user, role: 2)
  FactoryBot.create(:category)
end

User.find_each do |manager|
  FactoryBot.create(:restaurant, manager_id: manager.id)
end

Restaurant.find_each do |restaurant|
  Category.find_each do |category|
    FactoryBot.create(:product, restaurant: restaurant, category: category)
  end
end
