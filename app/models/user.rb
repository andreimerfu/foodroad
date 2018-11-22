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

  has_one :profile

  def set_default_role
    self.role ||= :user
  end

  def set_role(role)
    self.role = role
  end
end
