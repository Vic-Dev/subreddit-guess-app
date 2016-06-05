class TopicsController < ApplicationController
  def index
    @topics = Topic.order(id: :desc)
    respond_to do |format|
      format.json { render json: @topics.to_json }
      format.html {}
    end
  end

  private

  def topic_params
    params.require(:article).permit(:title, :subreddit, :ups, :thumbnail, :url)
  end
end
