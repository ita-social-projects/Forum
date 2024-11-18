import { useState, useContext } from 'react';
import AccordionItem from './AccordionItem';
import MyModal from '../UI/MyModal/MyModal';
import WarnUnsavedDataModal from '../FormComponents/WarnUnsavedDataModal';
import { DirtyFormContext } from '../../../context/DirtyFormContext';

const Accordion = ({ sections }) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const {  setFormIsDirty } = useContext(DirtyFormContext);

  const onConfirmModal = () => {
    setShowWarningModal(false);
    setFormIsDirty(false);
  };

  const onCancelModal = () => {
    setShowWarningModal(false);
  };

  return (
    <>
      <div className="accordion">
        {sections.map((section) => (
          <AccordionItem
            key={section.title}
            title={section.title}
            content={section.content}
            disabled={section.disabled}
            warningHandler={() => setShowWarningModal(true)} />
        ))}
      </div>
      <MyModal visible={showWarningModal}>
        <WarnUnsavedDataModal
          onCancel={onCancelModal}
          onConfirm={onConfirmModal} />
      </MyModal>
    </>
  );
};

export default Accordion;