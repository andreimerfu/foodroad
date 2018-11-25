# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :admin do
    resources :categories, only: %i(index create update destroy)
    resources :products
    resources :restaurants, only: %i(index show create)

    root to: 'restaurants#index'
  end

  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resource :profiles, only: [:show, :update, :destroy]
      resources :restaurants, only: [:index, :show, :create] do
        resources :products, module: :restaurants
        resources :categories, only: [:index, :create, :update, :destroy], module: :restaurants
      end
      resources :categories
    end
  end
end
