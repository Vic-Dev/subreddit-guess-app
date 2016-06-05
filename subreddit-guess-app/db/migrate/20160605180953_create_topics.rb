class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title
      t.string :subreddit
      t.string :ups
      t.string :thumbnail
      t.string :url

      t.timestamps null: false
    end
  end
end
