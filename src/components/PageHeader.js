import React from "react";
import { Helmet } from "react-helmet";
import { config } from "../config";

export default function PageHeader() {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="google-adsense-account" content="ca-pub-9747065248920607"></meta>
        <title>{config.siteTitle}</title>
        <link rel="canonical" href={config.siteUrl} />
      </Helmet>
    </div>
  )
}