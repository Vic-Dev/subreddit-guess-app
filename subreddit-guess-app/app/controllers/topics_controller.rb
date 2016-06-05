class TopicsController < ApplicationController
  def index
    @topics = Topic.order(id: :desc)
    respond_to do |format|
      format.json { render json: @topics.to_json }
      format.html {}
    end
  end

  def create
    @topic = Topic.new(topic_params)
    if @topic.save
      render json: @topic.to_json, status: :created
    end
  end

  private

  def topic_params
    params.require(:article).permit(:title, :subreddit, :ups, :thumbnail, :url)
  end
end
