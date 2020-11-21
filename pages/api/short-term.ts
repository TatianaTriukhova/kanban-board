import connection from '../../db/connection';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connection();
  if (req.method === 'POST') {
    try {
      const parsedBody = JSON.parse(req.body);
      await db.collection('short-term').insertOne(parsedBody);
      res.json(parsedBody);
    } catch (err) {
      res.send({ success: false, err });
      console.log(err);
    }
  }

  if (req.method === 'PUT') {
    try {
      const parsedBody = JSON.parse(req.body);
      const { _id, ...theRest } = parsedBody;
      await db
        .collection('short-term')
        .updateOne({ _id: new ObjectID(_id) }, { $set: { ...theRest } });
      res.json(parsedBody);
    } catch (err) {
      res.send({ success: false, err });
      console.log(err);
    }
  }
  if (req.method === 'GET') {
    try {
      const result = await db.collection('short-term').find().toArray();
      res.send(result);
    } catch (err) {
      res.send({ err });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const parsedBody = JSON.parse(req.body);
      await db.collection('short-term').deleteOne({ _id: new ObjectID(parsedBody._id) });
    } catch (err) {
      res.send({ success: false, err });
      console.log(err);
    }
  }
}
