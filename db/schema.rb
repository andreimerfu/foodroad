# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_08_105202) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "trgm_idx_categories_name", opclass: :gin_trgm_ops, using: :gin
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "profile_id"
    t.string "address"
    t.float "total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id"], name: "index_orders_on_profile_id"
  end

  create_table "orders_products", id: false, force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.index ["order_id", "product_id"], name: "index_orders_products_on_order_id_and_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "restaurant_id"
    t.bigint "category_id"
    t.string "name", null: false
    t.float "price", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image", default: "https://placehold.it/300x300.png"
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["name"], name: "trgm_idx_products_name", opclass: :gin_trgm_ops, using: :gin
    t.index ["restaurant_id"], name: "index_products_on_restaurant_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.json "addresses", default: [], array: true
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", default: "", null: false
    t.integer "delivery_zone", default: 0
    t.integer "min_order", default: 0
    t.integer "delivery_time", default: 0
    t.float "lat", default: 0.0
    t.float "lng", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "manager_name", null: false
    t.string "manager_email", null: false
    t.string "manager_phone", null: false
    t.integer "approval_status", null: false
    t.integer "manager_id", null: false
    t.integer "cui", null: false
    t.float "progress_value", default: 0.0
    t.jsonb "validation_steps", default: {"cui"=>false, "menu"=>false, "documents"=>false, "informations"=>false}
    t.index ["name"], name: "trgm_idx_restaurants_name", opclass: :gin_trgm_ops, using: :gin
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "profiles", "users"
end
