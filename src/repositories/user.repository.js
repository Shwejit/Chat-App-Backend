import pool from "../config/db.js";

export const getAllUsers = async () => {
  const result = await pool.query(
    `Select  id,name,email,created_at from users order by id;`,
  );
  return result.rows;
};

// export const getUserById = async (id) => {
//   const result = await pool.query(
//     `SELECT id, name, email, created_at FROM users WHERE id = $1 `,
//     [id],
//   );
//   return result.rows[0];
// };

export const createUser = async (name, email, passwordHash) => {
  const result = await pool.query(
    `INSERT INTO users ( name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at;`,
    [name, email, passwordHash],
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
};

export const getUserById = async (userId) => {
  const query = `
    SELECT
      id,
      name,
      email,
      created_at
    FROM users
    WHERE id = $1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0];
};
