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
    mediaUrl: {
      type: String,
    },
    mediaId: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
