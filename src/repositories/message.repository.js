import pool from "../config/db.js";

export const createMessage =
async ({
  roomId,
  senderId,
  content,
}) => {

  const query = `
    INSERT INTO messages (
      room_id,
      sender_id,
      content
    )
    VALUES ($1,$2,$3)
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [
        roomId,
        senderId,
        content,
      ]
    );

  return result.rows[0];
};
export const getMessagesByRoom =
async ({
  roomId,
  limit,
  offset,
}) => {

  const query = `
    SELECT
      m.id,
      m.content,
      m.created_at,
      u.id as sender_id,
      u.name as sender_name
    FROM messages m
    INNER JOIN users u
      ON m.sender_id = u.id
    WHERE m.room_id = $1
    ORDER BY m.created_at DESC
    LIMIT $2
    OFFSET $3
  `;

  const result =
    await pool.query(
      query,
      [
        roomId,
        limit,
        offset,
      ]
    );

  return result.rows;
};