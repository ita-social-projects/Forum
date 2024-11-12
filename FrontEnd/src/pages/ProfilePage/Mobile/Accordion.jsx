import AccordionItem from './AccordionItem';

const Accordion = ({ sections }) => {

  return (
    <div className="accordion">
      {sections.map((section, index) => (
       <AccordionItem key={index} title={section.title} content={section.content} />
      ))}
    </div>
  );
};

export default Accordion;