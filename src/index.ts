import { server } from './server/server';
import { initDatabase } from './server/config/initDataBase';

const port = process.env.PORT || 5000;

initDatabase();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



