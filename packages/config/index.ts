// Shared environment configuration
export const config = {
  api: {
    port: process.env.API_PORT || 3001,
    host: process.env.API_HOST || '0.0.0.0',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_db',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  environment: process.env.NODE_ENV || 'development',
};
