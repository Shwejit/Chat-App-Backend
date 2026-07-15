import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";
import { getCurrentUser } from "../services/auth.service.js";
import { refreshAccessToken } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validatedData;

  const result = await registerUser(name, email, password);

  res
    .status(201)
    .cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false, // we'll change this later
      sameSite: "lax",
    })
    .json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
    });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    user: result.user,
    accessToken: result.accessToken,
  });
});
export const getMe = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.userId);

  res.json({
    success: true,
    user,
  });
});

export const refresh = asyncHandler((req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  const accessToken = refreshAccessToken(refreshToken);

  return res.json({
    success: true,
    accessToken,
  });
});

export const logout = asyncHandler((req, res) => {
  res.clearCookie("refreshToken");

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
});
