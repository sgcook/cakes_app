import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Cake from "./Cake";

const cakeData = {
  id: 57463,
  name: 'testCake',
  comment: 'fluffy',
  imageUrl: 'image of a cake',
  yumFactor: 3,
};

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

  describe('Cake model', () => {
    it('should create and save cake', async () => {
      const cake = new Cake(cakeData);
  
      const savedCake = await cake.save();
      expect(savedCake._id).toBeDefined();
      expect(savedCake.name).toBe('testCake');
      expect(savedCake.comment).toBe('fluffy');
      expect(savedCake.imageUrl).toBe('image of a cake');
      expect(savedCake.yumFactor).toBe(3);
    });

    it('should throw error when name is null', async () => {
      const cakeDataTest = {
        ...cakeData,
        name: null
      }

      try {
        const cake = new Cake(cakeDataTest);
        await cake.save();
      } catch (e) {
        expect(e.errors.name.message).toBe('A name is required.');
      }
    });

    it('should throw error when comment is null', async () => {
      const cakeDataTest = {
        ...cakeData,
        comment: null
      }

      try {
        const cake = new Cake(cakeDataTest);
        await cake.save();
      } catch (e) {
        expect(e.errors.comment.message).toBe('A comment is required.');
      }
    });

    it('should throw error when imageUrl is null', async () => {
      const cakeDataTest = {
        ...cakeData,
        imageUrl: null
      }

      try {
        const cake = new Cake(cakeDataTest);
        await cake.save();
      } catch (e) {
        expect(e.errors.imageUrl.message).toBe('An imageUrl is required.');
      }
    });

    it('should throw error when yumFactor is null', async () => {
      const cakeDataTest = {
        ...cakeData,
        yumFactor: null
      }

      try {
        const cake = new Cake(cakeDataTest);
        await cake.save();
      } catch (e) {
        expect(e.errors.yumFactor.message).toBe('A yum factor is required.');
      }
    });
  });


});