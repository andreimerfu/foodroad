class AddPaymentTypeToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :payment_type, :string
    add_column :orders, :observations, :text
  end
end
