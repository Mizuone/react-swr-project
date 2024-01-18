import { AnyFactories, Assign, ModelDefinition } from "miragejs/-types";
import { Registry, Server } from "miragejs";
import { act, renderHook, waitFor } from "@testing-library/react";

import { Project } from "../../api/dtos/project.dto";
import { makeServer } from "../mirageServer";
import { useProjects } from "../../api/hooks/useProjects";

describe('useProjects integration with mirageJS as a REST Client', () => {
    let server: Server<Registry<{ project: ModelDefinition<Assign<object, Partial<Project>>>; }, AnyFactories>>;

    beforeEach(() => {
        server = makeServer();
        server.db.emptyData();
    });

    afterEach(() => server.shutdown());

    it('should return a list of empty project', async () => {
        const { result } = renderHook(() => useProjects());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.projects.length).toBe(0);
        })
    });

    it('should return a list of a single project', async () => {
        const { result } = renderHook(() => useProjects());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);

            act(() => {
                result.current.createProject({
                    id: '8e09dc16-0efb-474b-b991-dc2e8e89c4c3', 
                    name: 'Project 1',
                    description: 'This is project 1',
                    startDate: '2023-12-20',
                    endDate: '2023-12-25' 
                });
            });

            const newlyCreatedProject = result.current.projects.find(project => project.id === '8e09dc16-0efb-474b-b991-dc2e8e89c4c3');

            expect(newlyCreatedProject).toBeTruthy();
        });
    });

    it("should correctly update the newly created project's name", async () => {
        server.create('project', {
            id: '8e09dc16-0efb-474b-b991-dc2e8e89c4c3', name: 'Project 1', description: 'This is project 1', startDate: '2023-12-20', endDate: '2023-12-25' 
        });

        const { result } = renderHook(() => useProjects());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);

            act(() => {
                const projectId = '8e09dc16-0efb-474b-b991-dc2e8e89c4c3';
                const updatedProject: Project = {
                    name: 'Project 12',
                    description: 'This is project 1',
                    startDate: '2023-12-20',
                    endDate: '2023-12-25'
                }

                result.current.updateProject(projectId, updatedProject);
            });

            const newlyUpdatedProject = result.current.projects.find(project => project.name === 'Project 12');

            expect(newlyUpdatedProject).toBeTruthy();
        });
    });


    it('should correctly delete the newly created project', async () => {
        server.create('project', {
            id: '8e09dc16-0efb-474b-b991-dc2e8e89c4c3', name: 'Project 1', description: 'This is project 1', startDate: '2023-12-20', endDate: '2023-12-25' 
        });

        const { result } = renderHook(() => useProjects());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);

            act(() => {
                const projectId = '8e09dc16-0efb-474b-b991-dc2e8e89c4c3';
                
                result.current.deleteProject(projectId);
            });

            expect(result.current.projects.length).toBe(0);
        });
    });
});