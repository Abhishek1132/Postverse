const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recentComment: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Comment",
    }
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
