import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { readFileSync } from 'fs';

import { DBConnection } from './db';
import { logger } from './logger';
import { Tab, Widget } from './services/dashboard.interfaces';
import { DashboardService } from './services/dashboard.service';

const query = readFileSync(__dirname + '/../graphql/schema.graphql').toString();
const typeDefs = gql(query);
const db = new DBConnection();

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const dashboardService = new DashboardService(db);
const resolvers = {
    Query: {
        tabs: () => dashboardService.getTabs(),
        addTab: (parent: any, { tab }: {tab: Tab}) => dashboardService.addTab(tab),
        removeTab: (parent: any, { id }: Tab) => dashboardService.removeTab(id),
        updateTab: (parent: any, { tab }: {tab: Tab}) => dashboardService.updateTab(tab),
        
        widgets: () => dashboardService.getWidgets(),
        addWidget: (parent: any, {widget}: {widget: Widget}) => dashboardService.addWidget(widget),
        removeWidget: (parent: any, { id }: Widget) => dashboardService.removeWidget(id),
        updateWidget: (parent: any, { widget }: {widget: Widget}) => dashboardService.updateWidget(widget)
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => {
    logger.info(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
});
