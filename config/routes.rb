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
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resource :profiles, only: [:show, :update, :destroy]
      resources :restaurants do
        resources :products, module: :restaurants
        resources :categories, only: [:index, :create, :update, :destroy], module: :restaurants
      end
      resources :categories
    end
  end
end
