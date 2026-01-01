import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import MetaPixel from "@/components/analytics/MetaPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TreeShop - Professional Land Clearing & Forestry Mulching",
  description: "Central Florida's trusted forestry mulching and land clearing experts. Transparent DBH pricing, free same-day quotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        {/* Facebook SDK */}
        <div id="fb-root"></div>
        <Script
          id="facebook-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `
          }}
        />

        <MetaPixel />
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>

        {/* LocalBusiness Schema */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "TreeShop LLC",
              "image": "https://www.treeshop.app/logo.png",
              "url": "https://www.treeshop.app",
              "telephone": "+1-386-843-5266",
              "email": "office@fltreeshop.com",
              "description": "Professional forestry mulching, land clearing, stump grinding, and drainage services in Central Florida. Transparent pricing, 10 years experience.",
              "priceRange": "$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3634 Watermelon Lane",
                "addressLocality": "New Smyrna Beach",
                "addressRegion": "FL",
                "postalCode": "32168",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.0258,
                "longitude": -80.9270
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 29.0258,
                  "longitude": -80.9270
                },
                "geoRadius": "50 mi"
              },
              "sameAs": [
                "https://www.youtube.com/@TheTreeShop",
                "https://www.facebook.com/TreeShopFlorida",
                "https://www.instagram.com/fltreeshop"
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "07:00",
                  "closes": "17:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "50"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Land Clearing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Forestry Mulching",
                      "description": "Clear brush and trees up to 15 inch diameter"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Land Clearing",
                      "description": "Complete lot preparation for construction"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Stump Grinding",
                      "description": "Remove stumps below grade"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "FreedomDrains",
                      "description": "Lifetime-guaranteed drainage with Hydroblox technology"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TreeShop LLC",
              "url": "https://www.treeshop.app",
              "logo": "https://www.treeshop.app/logo.png",
              "founder": {
                "@type": "Person",
                "name": "Jeremiah Anderson"
              },
              "foundingDate": "2015",
              "sameAs": [
                "https://www.youtube.com/@TheTreeShop",
                "https://www.facebook.com/TreeShopFlorida",
                "https://www.instagram.com/fltreeshop"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
