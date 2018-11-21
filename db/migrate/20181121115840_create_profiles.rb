class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.json "addresses", default: [], array: true
      t.references :user, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
