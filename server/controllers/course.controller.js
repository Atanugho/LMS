// import course from "../models/course.model.js";
// import { ApiError} from "../utils/apiError.js";
// import fs from 'fs/promises';
// import cloudinary from 'cloudinary';


// const getAllCourses = async function (req, res, next) {
//   try { 
//     const courses = await course.find({}).select("-lectures");

//     res.status(200).json({
//       success: true,
//       message: "All courses",
//       courses,
//     });
//   } catch (e) {
//     return next(new AppError(e.message, 500));
//   }
// };

// const getLecturesByCourseId = async function (req, res, next) {
//   try {
//     const { id } = req.params;

//     const course = await course.findById(id);

//     if (!course) {
//       return next(new AppError("Invalid courses id", 400));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Course lecture fetched succesfully",
//       lectures: course.lectures,
//     });
//   } catch (e) {
//     return next(new AppError(e.message, 500));
//   }
// };

// const createCourse = async (req, res, next) => {
//   const { title, description, category, createdBy } = req.body;

//   if (!title || !description || !category || !createdBy) {
//     return next(new AppError("All fields are required", 400));
//   }

//   const course = await course.create({
//     title,
//     description,
//     category,
//     createdBy,
//     thumbnail: {
//       public_id: 'Dummy',
//       secure_url:'Dummy'
//     },
//   })

//   if(!course){
//     return next(
//       new AppError('Course could not created, please try again',500)
//     )
//   }

//   if (req.file) {
//     const result = await cloudinary.v2.uploader.upload(req.file.path,{
//       folder:'lms'
//     });
//     if(result) {
//       course.thumbnail.public_id = result.public_id;
//       course.thumbnail.secure_url = result.secure_url;
//     }

//     fs.rm(`uploads/${req.file.filename}`);
//   }

//   await course.save();

//   res.status(200).json({
//     success: true,
//     message:'Course created successfully',
//     course,
//   });
// };

// const updateCourse = async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     const course = await course.findByIdAndUpdate(
//       id,
//       {
//         $set : req,body
//       },
//       {
//         runValidator: true
//       }
//     );

//     if(!course) {
//       return next(
//         new AppError('Course with given id does not exist',500)
//       )
//     }

//     res.status(200).json({
//       success:true,
//       message:'Course updated succesfully',
//       course
//     })

//   } catch (e) {
//     return next(
//       new AppError(e.message,500)
//     )
//   }
// };

// const removeCourse = async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     const course = await course.findById(id);

//     if(!course) {
//       return next(
//         new AppError('Course with given id does not exist',500)
//       )
//     }

//     await course.findByIdAndDelete(id);

//     res.status(200).json({
//       success:true,
//       message:'Course deleted seccessfully'
//     })

//   } catch (e) {
//     return next(
//       new AppError(e.message,500)
//     )
//   }
// }

// const addLectureToCourseId = async(req,res,next) => {
//    const { title,description } = req.body ;
//    const { id} = req.params;

//    if (!title || !description) {
//     return next(new AppError("All fields are required", 400));
//   }

//    const course = await course.findById(id);

//    if(!course) {
//     return next(
//       new AppError('Course with given id does not exist',500)
//     )
//   }

//   const lectureData = {
//     title,
//     description,
//     lecture:{}
//   };

//   if(req.file) {
//     const result = await cloudinary.v2.uploader.upload(req.file.path,{
//       folder:'lms'
//     });
//     if(result) {
//       lectureData.lecture.public_id = result.public_id;
//       lectureData.lecture.secure_url = result.secure_url;
//     }

//     fs.rm(`uploads/${req.file.filename}`);
//   }

//   course.lectures.push(lectureData);

//   course.numberOfLectures = course.lectures.length;

//   await course.save();

//   res.status(200).json({
//     success:true,
//     message:'Lectures successfully added to the courses',
//     course
//   })

// }

// export {
//   getAllCourses,
//   getLecturesByCourseId,
//   createCourse,
//   updateCourse,
//   removeCourse,
//   addLectureToCourseId
// };
