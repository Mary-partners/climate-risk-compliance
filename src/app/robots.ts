import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth', '/diagnostic', '/report', '/tools'],
      },
    ],
    sitemap: 'https://climate-risk-compliance.com/sitemap.xml',
  }
}
