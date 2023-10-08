class Api::V1::SearchController < ApplicationController
  def posts
    posts_per_page = 2
    # If you're using a different DB, you might need to use ILIKE instead of LIKE
    @posts = Post.where('title LIKE ? OR body LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    posts_with_images = paginate_posts(@posts, posts_per_page)
    total_posts_count = @posts.count

    render json: {
      posts: posts_with_images,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end
end
