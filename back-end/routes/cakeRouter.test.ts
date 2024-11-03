import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Cake from '../models/Cake';

describe('cakeRouter tests', () => {
  let mongo;
  beforeEach(async () => {
    mongo = await MongoMemoryServer.create();

    await mongoose.connect(mongo.getUri());
  });


  afterEach(async () => {
    if (mongo) {
      await Cake.deleteMany();

      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongo.stop();
    }
  });

  describe('GET /cakes', () => {
    it('should return all cakes', async () => {
      const cake = new Cake({
        id: 57463,
        name: 'testCake',
        comment: 'fluffy',
        imageUrl: 'image of a cake',
        yumFactor: 3,
      });
  
      const savedCake = await cake.save();

      const res = await request(app).get('/cakes');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    })
  })

  describe('GET /cakes/:id', () => {
    it('should return a cake by id', async () => {
      const cake = await request(app).post('/cakes').send({
        id: 57463,
        name: 'testCake',
        comment: 'fluffy',
        imageUrl: 'image of a cake',
        yumFactor: 3,
      });
      
      const cakeId = cake.body._id;

      const res = await request(app).get(`/cakes/${cakeId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.comment).toBe('fluffy');
      expect(res.body.yumFactor).toBe(3);
    })
  })

  describe('POST /cakes/', () => {
    it('should create a cake', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        name: 'testCake',
        comment: 'nice and red',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("testCake");
      expect(res.body.comment).toBe('nice and red');
      expect(res.body.imageUrl).toBe('image of a cake');
      expect(res.body.yumFactor).toBe(1);
    });

    it('should throw error if name missing', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        comment: 'nice and red',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('Name must not be empty.');
    });

    it('should throw error if comment is missing', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        name: 'testCake',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('Comment must not be empty.');
    });

    it('should throw error if comment is invalid', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        comment: 'blue',
        name: 'testCake',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('Comment must be between 5 and 200 characters.');
    });

    it('should throw error if imageUrl is missing', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        comment: 'nice and red',
        name: 'testCake',
        yumFactor: 1,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('ImageUrl must not be empty.');
    });

    it('should throw error if yumFactor is missing', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        comment: 'nice and red',
        name: 'testCake',
        imageUrl: 'image of a cake',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('Yum factor must not be empty.');
    });

    it('should throw multiple errors if multiple fields missing', async () => {
      const res = await request(app).post('/cakes').send({
        id: 1,
        comment: 'nice and red',
        name: 'testCake',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('ImageUrl must not be empty.');
      expect(res.body.errors[1].msg).toBe('Yum factor must not be empty.');
    });
  });

  describe("PUT /cakes/:id", () => {
    it("should update a cake", async () => {
      const cake = await request(app).post('/cakes').send({
        id: 444,
        name: 'testCake',
        comment: 'nice and red',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });
      
      const cakeId = cake.body._id;

      const res = await request(app)
        .patch(`/cakes/${cakeId}`)
        .send({
          name: 'testCake',
          comment: 'light and fluffy',
          imageUrl: 'angelCake',
          yumFactor: 5,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("testCake");
        expect(res.body.comment).toBe('light and fluffy');
        expect(res.body.imageUrl).toBe('angelCake');
        expect(res.body.yumFactor).toBe(5);
    });


    it("should throw error if comment is under 5 characters", async () => {
      const cake = await request(app).post('/cakes').send({
        id: 444,
        name: 'testCake',
        comment: 'nice and red',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });
      
      const cakeId = cake.body._id;

      const res = await request(app)
        .patch(`/cakes/${cakeId}`)
        .send({
          comment: 'red',
          imageUrl: 'angelCake',
          yumFactor: 5,
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].msg).toBe('Comment must be between 5 and 200 characters.');
    });
  });

  describe('DELETE /cakes/', () => {
    it('should create a cake', async () => {
      const cake = await request(app).post('/cakes').send({
        id: 34859,
        name: 'testCake',
        comment: 'nice and red',
        imageUrl: 'image of a cake',
        yumFactor: 1,
      });

      const cakeId = cake.body._id;

      const res = await request(app).delete(`/cakes/${cakeId}`);
      expect(res.statusCode).toBe(200);
    });
  });
})
