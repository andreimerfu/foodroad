Rails.application.routes.draw do

  devise_for :user, path: 'auth', controllers: {
    registrations: 'users/registrations'
  }, only: [:registrations]
  mount_devise_token_auth_for 'User', at: 'auth', skip: [:registrations]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

    end
  end
end
