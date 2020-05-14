import { EmptyState, Layout, Page, Card, Tabs } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { ResourcePicker, TitleBar, Context } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithDraftOrders from '../components/ResourceDraftorderList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { 
    open: false,
    selectedTab: 0,
  };

  handleTabChange = (selectedTab) => {
    this.setState({
      selectedTab
    });
  }

  render() {
    const app = this.context;
    const gotoCreate = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/create-quote',
      );
    };


    const tabs = [
      {
        id: 'open',
        content: 'Open',
        accessibilityLabel: 'Open',
        panelID: 'open-content',
        filter: 'open',
      },
      {
        id: 'invoice-sent',
        content: 'Invoice Sent',
        accessibilityLabel: 'Invoice Sent',
        panelID: 'invoice-sent',
        filter: 'invoice-sent',
      },
      {
        id: 'completed',
        content: 'Completed',
        accessibilityLabel: 'Completed',
        panelID: 'completed',
        filter: 'completed'
      }
    ]

    return (
      <Page
        title="Quote"
        primaryAction={{
          content: 'Create Quote',
          onAction: () => gotoCreate(),
        }}
      >
        <Card>
          <Tabs tabs={tabs} selected={this.state.selectedTab} onSelect={this.handleTabChange}>
            <Card.Section>
              <ResourceListWithDraftOrders classify={tabs[this.state.selectedTab].filter} />
            </Card.Section>
          </Tabs>
        </Card>
      </Page>
    );
  }
}

export default Index;
