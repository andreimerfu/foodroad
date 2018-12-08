class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.belongs_to :profile, index: true
      t.string :address
      t.float :total
      t.timestamps
    end
  end
end
