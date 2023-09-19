import request from 'supertest';

import sequelizeConnection from '../db/config';
import { Application } from 'express';
import { app } from '../index';
import Shorted from '../db/models/Shorted';
import { redis } from '../db/redis';

describe('Shortener e2e | module', () => {
  const express: Application = app;
  beforeAll(async () => {
    await sequelizeConnection.authenticate();
    await sequelizeConnection.sync({ force: true, logging: false });
  });
  afterAll(async () => {
    await sequelizeConnection.close();
    redis.disconnect();
  });
  afterEach(async () => {
    await Shorted.destroy({ where: {} });
  });
  describe('shorten url', () => {
    it('should return shortened url if it already exist', async () => {
      const record = await Shorted.create({
        url: 'https://google.com',
        shorted: 'http://localhost/abc',
      });
      return request(express)
        .post('/api/v1/shortener')
        .send({ url: record.url })
        .then((res) => {
          expect(res.body).toEqual({
            id: record.id,
            url: record.url,
            shorted: record.shorted,
          });
        });
    });
    it('should return shortened url if it does not exist', async () => {
      return request(express)
        .post('/api/v1/shortener')
        .send({ url: 'https://google.com' })
        .then((res) => {
          expect(res.body).toEqual({
            id: expect.any(Number),
            url: 'https://google.com',
            shorted: expect.any(String),
          });
        });
    });
    it('should return bad request error if invalid url provided', async () => {
      return request(express)
        .post('/api/v1/shortener')
        .send({ url: 'invalid-url' })
        .expect(400);
    });
    it('should return bad request error if no url provided', async () => {
      return request(express).post('/api/v1/shortener').expect(400);
    });
  });
  describe('get full origin url', () => {
    it('should return not found err if record not found', async () => {
      return request(express)
        .get('/api/v1/shortener?url=http://localhost:3000/not-found')
        .expect(404);
    });
    it('should return full url if record found', async () => {
      const record = await Shorted.create({
        url: 'https:/google.com',
        shorted: 'http://localhost/abc',
      });
      return request(express)
        .get('/api/v1/shortener?url=http://localhost/abc')
        .then((res) => {
          expect(res.body).toEqual({
            id: record.id,
            url: record.url,
            shorted: record.shorted,
          });
        });
    });
  });
});
