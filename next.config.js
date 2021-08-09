const { builtinModules } = require("module")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  compress: true,
  images: {
    domains: ["d1s18u38217pqv.cloudfront.net"],
  },
  webpack(config, { webpack }) {
    const prod = process.env.NEXT_PUBLIC_MODE === "production"
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins: [
        ...config.plugins,
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    }
  },
})
