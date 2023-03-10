// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', "unsplash.com", "jenga.s3.eu-west-3.amazonaws.com", "jenga.s3.eu-west-3.amazonaws.com", "res.cloudinary.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;