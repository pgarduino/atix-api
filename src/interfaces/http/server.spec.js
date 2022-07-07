import express from 'express'

import { Server } from './Server';
import config from './../../../config/index';

jest.mock('express');

const mockParams = {
    config,
    router: { test: 'router' },
    logger: { test: 'logger', info: jest.fn() }
};

const mockHttp = {
    close: jest.fn(callback => setTimeout(callback, 1)),
    address: jest.fn(() => mockParams.config.web)
};

const mockExpress = {
    disable: jest.fn(),
    use: jest.fn(),
    listen: jest.fn((port, callback) => {
        setTimeout(callback, 1);
        return mockHttp
    })
};

express.mockImplementation(() => mockExpress);

describe('Server', () => {
    const server = new Server(mockParams);

    it('should properly construct', () => {
        expect(server).toHaveProperty('http', null);
        expect(server).toHaveProperty('config', mockParams.config);
        expect(server).toHaveProperty('logger', mockParams.logger);

        expect(mockExpress.use).toHaveBeenCalledWith(mockParams.router)
    });

    it('should start', async () => {
        await server.start().then(() => {
            expect(server).toHaveProperty('http', mockHttp)
        })
    });

    it('should stop', async () => {
        await server.stop().then(() => {
            expect(server).toHaveProperty('http', null);
        })
    })
});