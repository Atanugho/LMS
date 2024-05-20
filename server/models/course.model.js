import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [8, "Title must be atlest 8 char"],
      maxLength: [60, "Title should be less than 60 char"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [8, "Description must be atlest 8 char"],
      maxLength: [100, "Description should be less than 60 char"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timespamps: true,
  }
);

const Course = model("Course", courseSchema);

export default Course;
