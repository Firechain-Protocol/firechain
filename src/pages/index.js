import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Services from 'sections/services';
import UltimateFeatures from 'sections/ultimate-feature';
import CustomerSupport from 'sections/customer-support';
import Faq from 'sections/faq';




export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Fireside Protocol"
          description="MultiCollection NFT MarketPlace"
        />
        <Banner />
        <UltimateFeatures />
        <CustomerSupport />
        <Faq />
        {/**
        <Services />
        <UltimateFeatures />
        <Faq />
        <PremiumFeature />
        <CustomerSupport />
        <Pricing />
        <Testimonials />
        <Blog />
        <Support />
   */}
      </Layout>
    </ThemeProvider>
  );
}
