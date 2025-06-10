import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom';
import { server } from './test-server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
