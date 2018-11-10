class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
    	t.string :name, null: false
    	t.string :address, null: false
    	t.integer :delivery_zone, default: 0
    	t.integer :min_order, default: 0
    	t.integer :delivery_time, default: 0
      t.float :lat, default: 0
      t.float :lng, default: 0
    	
      t.timestamps
    end
  end
end