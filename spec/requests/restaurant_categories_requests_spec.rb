# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_users'
require 'requests/shared_restaurants'

describe 'Restaurant categories' do
  include_context 'shared restaurants'

  let(:restaurant_categories_create_params) {
    {
      name: Faker::Food.ingredient
    }
  }

  let(:restaurant_categories_update_params) {
    {
      name: "#{Faker::Food.ingredient}_updated"
    }
  }
  context 'authorized' do
    before do
      post api_v1_restaurants_path, params: restaurant_create_params, as: :json
      @restaurant_id = Restaurant.last.id
      # TODO add auth headers or something
      post api_v1_restaurant_categories_path(@restaurant_id), params: restaurant_categories_create_params, as: :json
    end

    it '#create' do
      expect(response).to have_http_status(:ok)
    end

    it '#update' do
      category = Category.last
      name = category.name
      put api_v1_restaurant_category_path(@restaurant_id, category.id), params: restaurant_categories_update_params, as: :json
      expect(response).to have_http_status(:ok)
      expect(name).not_to match(category.name)
    end
  end
end