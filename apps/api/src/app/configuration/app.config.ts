import {registerAs} from '@nestjs/config';
import {config} from 'dotenv';
import * as process from 'process';

config();

export enum ConfigNamespaces {
  graphql = 'graphql',
}

export const GRAPHQL_CONFIG = registerAs(ConfigNamespaces.graphql, () => ({
  autoSchemaFile: process.env.AUTO_SCHEMA_FILE || true,
}));
