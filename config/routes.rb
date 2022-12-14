Rails.application.routes.draw do
  resources :lists, only: [:index, :show, :create]
  resources :users, only: [:create, :show, :index] 
  resources :tasks

  post '/login',    to: 'sessions#create'
  delete '/logout',   to: 'sessions#destroy'
  get '/logged-in', to: 'sessions#is_logged_in?'
  post '/signup',    to: 'users#create'


  # post '/users',         to: 'users#create'
  get '/me', to: 'users#show'
  # get '/users',          to: 'users#index'
  # patch "/tasks/${task.user_id}", to: "tasks#update"
  # delete "/tasts/${task.user_id}", to: "tasks#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
