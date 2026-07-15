import pool from "../config/db.js";

export const createRoom = async ({ name, createdBy }) => {
  const query = `
    INSERT INTO rooms (
      name,
      created_by
    )
    VALUES ($1,$2)
    RETURNING *
  `;

  const result = await pool.query(query, [name, createdBy]);

  return result.rows[0];
};

export const addMemberToRoom = async ({ roomId, userId }) => {
  const query = `
    INSERT INTO room_members(
      user_id,
      room_id
    )
    VALUES($1,$2)
    RETURNING *
  `;

  const result = await pool.query(query, [userId, roomId]);

  return result.rows[0];
};

export const getMembership = async ({ roomId, userId }) => {
  const query = `
    SELECT *
    FROM room_members
    WHERE room_id = $1
    AND user_id = $2
  `;

  const result = await pool.query(query, [roomId, userId]);

  return result.rows[0];
};

export const removeMemberFromRoom =
async ({
  roomId,
  userId,
}) => {

  const query = `
    DELETE FROM room_members
    WHERE room_id = $1
    AND user_id = $2
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [roomId, userId]
    );

  return result.rows[0];
};
export const getUserRooms =
async (userId) => {

  const query = `
    SELECT
      r.*
    FROM rooms r
    INNER JOIN room_members rm
      ON rm.room_id = r.id
    WHERE rm.user_id = $1
    ORDER BY r.created_at DESC
  `;

  const result =
    await pool.query(
      query,
      [userId]
    );

  return result.rows;
};