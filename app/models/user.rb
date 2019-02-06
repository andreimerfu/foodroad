# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
  include DeviseTokenAuth::Concerns::User

  def tokens_has_json_column_type?
    false
  end

  enum role: [:user, :admin, :restaurant, :courier]
  after_initialize :set_default_role, if: :new_record?
  after_create :create_profile!

  has_one :profile, dependent: :destroy

  def set_default_role
    self.role ||= :user
  end

  def set_role(role)
    self.role = role
  end

  class << self
    def facebook_login(data)
      where(uid: data['email']).first_or_initialize.tap do |user|
        user.provider = 'facebook_oauth2'
        user.name = data[:name]
        user.uid = data[:email]
        user.email = data[:email]
        user.image = data['picture']['url']
        user.confirmed_at = Time.current
        user.password = Devise.friendly_token[0, 20]
        user.password_confirmation = user.password
        user
      end
    end
  end
end
