import React, { useEffect, useState } from 'react';

import { ModalProps } from "../../../types/ModalProps";
import { Project } from '../../../api/dtos/project.dto';

export const AddProjectModal = (props: ModalProps) => {
    const { submitModal, closeModal } = props;

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState("");
    const [ endDate, setEndDate ] = useState("");

    const [ formIsCompleted, setFormIsCompleted ] = useState(false);

    useEffect(() => {
        name && description && startDate && endDate ? setFormIsCompleted(true) : setFormIsCompleted(false);
    }, [ name, description, startDate, endDate ]);

    const resetForm = () => {
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
    }

    const createProject = () => {
        const newProject: Project = { name, description, startDate, endDate }
        
        resetForm();

        return newProject;
    }

    const submitForm = (event: React.FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            event.preventDefault();
            closeModal()
            
            submitModal(createProject())
        }
    }

    return (
        <div id="defaultModal" className="flex justify-center items-center bg-overlay overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto modal-mw-desktop">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-between align-items p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Add Project</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => closeModal()}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="relative w-full max-h-full" onSubmit={(event) => submitForm(event)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                              * Project Name
                          </label>
                          <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name" onChange={(e) => setName(e.currentTarget.value)} value={name} type="text"
                          />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label htmlFor="message" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">* Project Description</label>
                          <textarea required id="message" rows={4} onChange={(e) => setDescription(e.currentTarget.value)} value={description}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:bg-white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="">
                          </textarea>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="start-date">
                              * Start Date
                          </label>
                          <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="start-date" onChange={(e) => {console.log(e.currentTarget.value); setStartDate(e.currentTarget.value) }} value={startDate} type="date" name="project-start" min="10-18-2023" max="12-31-2059" 
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="end-date">
                              * End Date
                          </label>
                          <div className="relative">
                            <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="end-date" type="date" onChange={(e) => setEndDate(e.currentTarget.value)} value={endDate} name="project-end" min="10-18-2023" max="12-31-2059" 
                            />
                          </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end pl-6 pt-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none"
                        type="button"
                        onClick={() => closeModal()}
                      >
                        Close
                      </button>
                      <button
                        className="ml-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border rounded disabled:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-400"
                        type="submit"
                        disabled={formIsCompleted ? false : true}
                      >
                        Add Project
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}