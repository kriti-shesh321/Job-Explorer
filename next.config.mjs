/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = withPWA({
    dest: 'public',
    disable: isDev,
})({
    reactStrictMode: true
});

export default nextConfig;
