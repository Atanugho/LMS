import upload from "../middlewares/multer.midddleware.js";
import { Router } from "express";
import {
  addLectureToCourseId,
  createCourse,
  getAllCourses,
  getLecturesByCourseId,
  removeCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn,authorizedSubscriber } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/') 
    .get(getAllCourses)
    .post(
      isLoggedIn,
      authorizedRoles('ADMIN'),
      upload.single('thumbnail'),
      createCourse
    );

router.route("/:id")
      .get(isLoggedIn,authorizedSubscriber,getLecturesByCourseId)
      .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse, 
      )
      .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourse
      )
      .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseId
      );

export default router;
