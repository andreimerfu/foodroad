# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :restaurants, only: [:index, :show] do
        resources :products, module: :restaurants
        resources :categories, only: [:index, :create, :update, :destroy], module: :restaurants
      end
      resources :categories
    end
  end
end
