class AccessController < ApplicationController
before_action :confirm_logged_in, except: [:new, :create, :attempt_login, :password_reset, :reset, :reset_password, :logout, :home]
before_action :prevent_login_signup, only: [:login, :new]

  

# HOME PAGE
  def home
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if(@user.save)
      UserMailer.signup_confirmation(@user).deliver
      session[:user_id] = @user.id
      # flash[:success] = "You are now logged in!"
      redirect_to index_path
    else
      # flash[:alert] = "Something went wrong Try again"
      redirect_to root_path
    end

  end

  def attempt_login

    if params[:username].present? && params[:password].present?
      found_user = User.where(username: params[:username]).first
      if found_user
        authorized_user = found_user.authenticate(params[:password])
      end
    end

    if !found_user
      # flash.now[:alert] = "Invalid username"
      @user = User.new
      render :home
    elsif !authorized_user
      # flash.now[:alert] = "Invalid password"
      @user = User.new
      render :home
    else
      session[:user_id] = authorized_user.id
      # flash[:success] = "You are now logged in."
      redirect_to index_path
    end
  end

  def password_reset

    if User.where(username: params[:username]).present?
      @user = User.where(username: params[:username]).first
      @user.update_attributes(:reset_token => Random.rand(100))
      UserMailer.password_reset(@user).deliver
      redirect_to root_path
    else
      redirect_to root_path
    end
  end

# RESET PAGE
  def reset
    puts "RESET ACTION!!!!"
    if User.find_by_reset_token(params[:user_reset_token]).present?
      @user = User.find_by_reset_token(params[:user_reset_token])
    else
      redirect_to root_path
    end
  end


  def reset_password
    @user = User.find_by_reset_token(params[:user_reset_token])
    @user.update_attributes(user_params)
    @user.update_attributes(:reset_token => nil)
    if(@user.save)
      session[:user_id] = @user.id
      # flash[:success] = "You're profile is updated"
      redirect_to root_path
    else
      render :reset
    end
  end


  def logout
    # mark user as logged out
    session[:user_id] = nil
    # flash[:notice] = "Logged out"
    redirect_to root_path
  end

# APP PAGE
  def index
    @current_user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end

