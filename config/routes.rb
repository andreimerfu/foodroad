# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :admin do
    %i(restaurants categories products).each do |name|
      resources name, only: %i(index show new create edit update destroy)
    end

    root to: 'restaurants#index'
  end
  resources :admin_sessions, only: %i(new create destroy)

  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1 do
      resource :profiles, only: [:show, :update, :destroy]
      resources :restaurants do
        resources :products, module: :restaurants
        resources :categories, only: [:index, :create, :update, :destroy], module: :restaurants
      end
      get '/restaurants/find_by_manager/:manager_id', to: 'restaurants#find_by_manager'
      get 'get_restaurant_id', to: 'restaurants#get_restaurant_id'

      resources :categories
      resources :orders, only: [:create, :update]

      resource :profiles do
        resources :orders, only: [:index], module: :profiles
      end
    end
  end
end
