const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.wfzstojledyyzaqwdcem',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'AvaliacaoA3',
  port: 6543,
});

module.exports = pool;