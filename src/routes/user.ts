import { Router } from 'express';
import * as controller from '../controllers/authController'
//const userController = require('./../controllers/userController');
//const authController = require('./../controllers/authController');


const userRouter = Router();

userRouter.post('/signup', controller.SignUp);
userRouter.post('/login', controller.Login);
// router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.protect) // Will auth those after routers, bellow

// router.patch('/updatePassword', authController.updatePassword)
// router.get('/me', userController.getMe, userController.getUser)
// router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe )
// router.delete('/deleteMe', userController.deleteMe )


// router.use(authController.restrictTo('admin'))

// router
//     .route('/')
//     .get(userController.getAllUsers)
// //     .post(userController.createUser);

// router
//     .route('/:id')
//     .delete(userController.deleteUser)
//     .get(userController.getUser)
//     .patch(userController.updateUser)
// // router
// //     .route('/:id')
// //     .get(userController.getUser)
// //     .patch(userController.updateUser)
// //     .delete(userController.deleteUser);

export {userRouter};