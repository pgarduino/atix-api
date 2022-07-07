import { Application } from './application';

const mockServer = {
    start: jest.fn(),
    stop: jest.fn()
}

describe('Application', () => {
    const app = new Application({ server: mockServer});

    it('should start the server', async () => {
        await app.start();
        expect(mockServer.start).toHaveBeenCalledTimes(1)
    })

    it('should stop the server', async () => {
        await app.stop();
        expect(mockServer.stop).toHaveBeenCalledTimes(1)
    })
});

