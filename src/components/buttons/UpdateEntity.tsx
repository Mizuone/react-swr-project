import React, { useState } from 'react';

import { ModalProps } from '../../types/ModalProps';
import { Project } from '../../api/dtos/project.dto';

interface UpdateEntityProps {
    buttonText: string;
    entity: Project
    modalComponent: React.ComponentType<ModalProps>;
    modalSubmit: (updatedEntity: Project) => Promise<void>;
    hideDropDown?: () => void;
}

export const UpdateEntity = (props: UpdateEntityProps) => {
    const { buttonText, modalComponent: ModalComponent, modalSubmit, entity, hideDropDown } = props;
    const [ showModal, setShowModal ] = useState(false);

    const closeModal = () => {
        setShowModal(false);

        if (hideDropDown) {
            hideDropDown();
        }
    }
    
    return (
        <>
            <button onClick={() => setShowModal(true)}
                data-modal-target="UpdateProjectModal"  data-modal-toggle="UpdateProjectModal" type="button"
                className="w-full px-4 py-2 text-sm text-gray-700 bg-green-100 hover:bg-green-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white active:bg-green-400"
            >
                { buttonText }
            </button>

            { showModal ? <ModalComponent entity={entity} submitModal={modalSubmit} closeModal={closeModal} /> : null}
        </>
    )
}