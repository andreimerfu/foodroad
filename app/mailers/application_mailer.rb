# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'foodroadmailer@gmail.com'
  layout 'mailer'
end
