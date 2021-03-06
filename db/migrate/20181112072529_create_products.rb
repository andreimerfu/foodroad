# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.belongs_to :restaurant, index: true
      t.belongs_to :category, index: true
      t.string :name, null: false
      t.float :price, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
