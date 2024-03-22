import app from '../server';
import request from 'supertest';

describe('GET/', () => {
  it('should send back some data', async () => {
    const res = await request(app).get('/');
    expect(res.body.message).toBe('hello');
  });
});
