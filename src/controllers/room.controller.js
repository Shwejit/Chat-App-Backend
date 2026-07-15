import asyncHandler
from "../utils/asyncHandler.js";

import {
  createRoomService,joinRoomService, leaveRoomService, getUserRoomsService
} from "../services/room.service.js";

export const createRoom =
  asyncHandler(
    async (req, res) => {

      const room =
        await createRoomService({
          name:
            req.body.name,
          userId:
            req.user.userId,
        });

      res.status(201).json({
        success: true,
        room,
      });
    }
  );
  export const joinRoom =
asyncHandler(
 async (req,res) => {

   const membership =
     await joinRoomService({
       roomId:
         Number(
           req.params.roomId
         ),
       userId:
         req.user.userId,
     });

   res.status(201).json({
     success:true,
     membership,
   });
 }
);

export const leaveRoom =
asyncHandler(
 async (req,res)=>{

   const result =
     await leaveRoomService({
       roomId:Number(
         req.params.roomId
       ),
       userId:req.user.userId,
     });

   res.json({
     success:true,
     result,
   });

 }
);

export const getMyRooms =
asyncHandler(
 async (req,res)=>{

   const rooms =
     await getUserRoomsService(
       req.user.userId
     );

   res.json({
     success:true,
     rooms,
   });

 }
);