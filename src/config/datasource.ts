import { DataSource } from 'typeorm';

export const datasourceConfig = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'marionorberto',
  password: 'cavera?@mau',
  database: 'postable',
  synchronize: true,
});
