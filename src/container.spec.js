import container from './container'

describe('container', () => {
    it('should have registered dependencies', () => {
        expect(container.cradle).toHaveProperty('app');
        expect(container.cradle).toHaveProperty('server');
        expect(container.cradle).toHaveProperty('config');
        expect(container.cradle).toHaveProperty('router');
        expect(container.cradle).toHaveProperty('logger');
        expect(container.cradle).toHaveProperty('dbConfig');
        expect(container.cradle).toHaveProperty('db');
        expect(container.cradle).toHaveProperty('logRepository');
        expect(container.cradle).toHaveProperty('writeLinkedLineUseCase');
        expect(container.cradle).toHaveProperty('linkedLineController');
    });
})