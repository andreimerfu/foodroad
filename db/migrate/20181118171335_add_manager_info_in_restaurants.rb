class AddManagerInfoInRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :manager_name, :string, null: false
    add_column :restaurants, :manager_email, :string, null: false
    add_column :restaurants, :manager_phone, :string, null: false
    add_column :restaurants, :approval_status, :integer, null: false
  end
end
