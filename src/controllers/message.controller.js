import asyncHandler
from "../utils/asyncHandler.js";

import {
  sendMessageService, getMessagesService
} from "../services/message.service.js";

export const sendMessage =
asyncHandler(
 async (req,res)=>{

   const message =
     await sendMessageService({
       roomId:Number(
         req.params.roomId
       ),
       senderId:
         req.user.userId,
       content:
         req.body.content,
     });

   res.status(201).json({
     success:true,
     message,
   });

 }
);

export const getMessages =
asyncHandler(
 async (req,res)=>{

   const page =
     Number(
       req.query.page
     ) || 1;

   const limit =
     Number(
       req.query.limit
     ) || 20;

   const messages =
     await getMessagesService({
       roomId:Number(
         req.params.roomId
       ),
       userId:
         req.user.userId,
       page,
       limit,
     });

   res.json({
     success:true,
     page,
     limit,
     messages,
   });

 }
);