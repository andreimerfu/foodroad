class Order < ApplicationRecord
  has_and_belongs_to_many :products
  belongs_to :profile

  after_initialize :set_default_status, if: :new_record?
  enum status: [:in_progress, :delivered, :canceled]

  def set_default_status
    self.status ||= :in_progress
  end
end
