/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_INFURA_ID:
      "https://ropsten.infura.io/v3/61778f8337ab4ddab531940abe721ab9",
  },
};

module.exports = nextConfig;
