class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]

  # GET /posts
  def index
    posts_per_page = 2
    @posts = Post.order(created_at: :desc)
    posts_with_images = paginate_posts(@posts, posts_per_page)
    total_posts_count = Post.count

    render json: {
      posts: posts_with_images,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end

  # GET /posts/1
  def show
    if @post.image.attached?
      render json: @post.as_json.merge(image_url: url_for(@post.image))
    else
      render json: @post.as_json.merge(image_url: nil)
    end
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      # We can't render the @post because we are now in /api/v1/posts
      render json: @post, status: :created, location: api_v1_post_url(@post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :body, :image)
  end
end
