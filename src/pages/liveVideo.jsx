import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout2';
import Stream from 'components/Stream';

export default function Live() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new file"
          description="add a new file"
        />
  <div className="bg-gradient-to-b from-blue-700 to-black">
    <div className="text-4xl text-center text-white font-bold  mb-10">
      <h1> Live Stream Page</h1>
    </div>
    <Stream />
  </div>

      </Layout>
    </ThemeProvider>
  );
}


