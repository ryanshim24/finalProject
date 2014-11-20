Rails.application.routes.draw do 

 ### ACCESS + MAIN ROUTES
  root 'access#home'
  
  get '/', to: 'access#home'

  post 'signup', to: 'access#create', as: 'create_user'

  post 'login', to: 'access#attempt_login'

  get 'logout', to: 'access#logout'

  get 'index', to: 'access#index'

  post 'forgot', to: "access#password_reset"

  get 'reset/:user_reset_token', to: 'access#reset', as: 'reset'

  patch 'reset/:user_reset_token', to: 'access#reset_password'
  
end
  