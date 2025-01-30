import { fetchProjects } from './projectsSlice';
import { fetchProjectsData } from '../api';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';

// Mock the API call
jest.mock('../api', () => ({
  fetchProjectsData: jest.fn(),
}));

describe('fetchProjects', () => {
  it('dispatches the correct actions on successful fetch', async () => {
    const mockData = [
      { "s.no": 0, "amt.pledged": 15823, "percentage.funded": 186, "title": "Test Project 1" },
      { "s.no": 1, "amt.pledged": 6859, "percentage.funded": 8, "title": "Test Project 2" },
    ];
    fetchProjectsData.mockResolvedValueOnce(mockData);

    const store = configureStore({ reducer: { projects: projectsReducer } });

    await store.dispatch(fetchProjects());

    const state = store.getState().projects;
    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it('dispatches the correct actions on failed fetch', async () => {
    fetchProjectsData.mockRejectedValueOnce(new Error('Failed to fetch'));

    const store = configureStore({ reducer: { projects: projectsReducer } });

    await store.dispatch(fetchProjects());

    const state = store.getState().projects;
    expect(state.error).toBe('Failed to fetch');
    expect(state.loading).toBe(false);
  });
});
