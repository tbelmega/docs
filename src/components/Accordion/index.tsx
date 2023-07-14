import { Details, Summary } from './styles';
import { Expand, DeepDive } from './icons';
import { useRef, useState, createElement, useEffect } from 'react';

type AccordionProps = {
  title?: string;
  headingLevel?: string;
  eyebrow?: string;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  headingLevel,
  eyebrow,
  children
}) => {
  const [closeButton, setCloseButton] = useState(false);
  const [contentTopCoordinate, setContentTopCoordinate] = useState(0);
  const docsExpander = useRef<HTMLElement>(null);
  const docsExpanderBody = useRef<HTMLElement>(null);

  useEffect(() => {
    const accordion = docsExpander.current;
    const accordionContent = docsExpanderBody.current;
    if (
      accordionContent &&
      accordionContent instanceof HTMLElement &&
      accordion
    ) {
      setContentTopCoordinate(
        accordion.offsetTop - accordion.offsetHeight - 48 // height of global Nav
      );

      if (accordionContent.offsetHeight > window.innerHeight) {
        setCloseButton(() => true);
      }
    }
  }, []);

  const headingId = title?.replace(/\s+/g, '-').toLowerCase();
  headingLevel = headingLevel ? 'h' + headingLevel : 'div';
  const expanderTitle = createElement(
    headingLevel,
    {
      id: headingId,
      className: 'docs-expander__title'
    },
    title
  );

  const anchor = createElement(
    'a',
    { href: window.location.pathname + '#' + headingId },
    expanderTitle
  );

  const closeAccordion = () => {
    docsExpander.current?.removeAttribute('open');
    window.scrollTo(0, contentTopCoordinate);
  };

  console.log(children)

  return (
    <Details className="docs-expander" ref={docsExpander}>
      <Summary className="docs-expander__summary">
        <div className="docs-expander__eyebrow">
          <DeepDive />
          {eyebrow}
        </div>
        {anchor}
        <div className="docs-expander__title__indicator">
          <Expand />
        </div>
      </Summary>
      <div className="docs-expander__body" ref={docsExpanderBody}>
        {children}
        {closeButton ? (
          <button
            className="docs-expander__body__button"
            onClick={closeAccordion}
          >
            Close
          </button>
        ) : null}
      </div>
    </Details>
  );
};

export default Accordion;