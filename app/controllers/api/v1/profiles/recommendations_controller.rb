# frozen_string_literal: true

class Api::V1::Profiles::RecommendationsController < ApplicationController
  before_action -> { is_authenticated_as(:user) }, only: [:index, :random]

  def index
    recommendations = Recommendation.find_by(profile: current_user.profile)

    render jstonapi: recommendations, status: :ok
  end

  def random
    recommendations = Recommendation.where(profile: current_user.profile)

    render jsonapi: recommendations.sample, status: :ok
  end
end
