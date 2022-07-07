import request from 'supertest';
import container from './../../../container';
import { WriteLinkedLineUseCase } from '../../../application/usecase/writeLinkedLine/writeLinkedLineUseCase.js';
jest.mock('./../../../application/usecase/writeLinkedLine/writeLinkedLineUseCase.js');


describe("LinkedLineController", () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        WriteLinkedLineUseCase.mockClear();
    });
    const app = container.cradle.server.express;

    test('should resolve with 201 created', async () => {
        const res = await request(app)
            .post('/api/linked-line')
            .send({
                message: 'dummy-message'
            });
        expect(res.statusCode).toEqual(201)
    })

    test('should resolve with 400 bad request', async () => {
        const res = await request(app)
            .post('/api/linked-line')
            .send({
                other: 'dummy-message'
            });
        expect(res.statusCode).toEqual(400)
    })
});
