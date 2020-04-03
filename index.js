import express from 'express';
import cors from 'cors';
import roomType from './src/routes/room-type';
import rooms from './src/routes/rooms';
import bookings from './src/routes/bookings';

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/room-type', roomType);
app.use('/api/rooms', rooms);
app.use('/api/bookings', bookings);
app.get('*', (req, res) => {
  res.send('App Working');
});
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
