import connection from '../../db/connection';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connection();
  if (req.method === 'POST') {
    try {
      const parsedBody = JSON.parse(req.body);
      await db.collection('boards').insertOne(parsedBody);
      res.json(parsedBody);
    } catch (err) {
      res.send({ success: false, err });
      console.log(err);
    }
  }
  if (req.method === 'PUT') {
    try {
      const parsedBody = JSON.parse(req.body);
      const { _id, ...body } = parsedBody;
      await db.collection('boards').updateOne({ _id: new ObjectID(_id) }, { $set: { ...body } });
      res.json(parsedBody);
    } catch (err) {
      res.send({ success: false, err });
      console.log(err);
    }
  }
  if (req.method === 'GET') {
    try {
      const result = await db.collection('boards').find().toArray();
      res.send(result);
    } catch (err) {
      res.send(err);
      console.log({ err });
    }
  }
  if (req.method === 'DELETE') {
    try {
      const { _id } = JSON.parse(req.body);
      await db.collection('boards').deleteOne({ _id: new ObjectID(_id) });
    } catch (err) {
      res.send({ success: false, err });
      console.log(err);
    }
  }
}
