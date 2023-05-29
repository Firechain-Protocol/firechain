import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout2';
import ViewFile from 'components/viewing';

export default function carDetails() {

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new file"
          description="View car properties"
        />
        <ViewFile />

      </Layout>
    </ThemeProvider>
  );
}