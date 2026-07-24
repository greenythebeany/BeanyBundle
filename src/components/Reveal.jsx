import { useReveal } from '../hooks/useReveal.js';

export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useReveal();
  const cls = `${className} reveal${inView ? ' in-view' : ''}`.trim();
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
