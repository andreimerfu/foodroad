class Restaurant < ApplicationRecord
  class Check_API
    attr_reader :record

    def initialize(record)
      @record = record
    end

    def call
      # Skip this API call if the `CUI` is already validated.
      if @record.validation_steps['cui'] == true
        return
      end

      # Move this key to credentials.yml.enc
      headers = {
        'x-api-key': '8dJ79CviZfN9957wzcaUSwfsj5vhCQNsAEz8GxBtYqhQ5iCiEQ'
      }

      response = HTTParty.get("https://api.openapi.ro/api/companies/#{@record.cui}", headers: headers)
      if response.code == 200
        @record.validation_steps['cui'] = true
        @record.progress_increment
      end
    end
  end
end
