import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout2';
// import '../Superfluidstyles.css';
import { CalculateFlowRate } from '../components/CalculateFlowRate';
import { CreateFlow } from '../components/CreateFlow';

export default function claim() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new file"
          description="View car properties"
        />
      <CalculateFlowRate />
      <CreateFlow />

      </Layout>
    </ThemeProvider>
  );
}
