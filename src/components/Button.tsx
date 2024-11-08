import React from 'react';

interface Props {
  className?: string;
  text: string;
  onClick: () => any;
}

/**
 * Button component that triggers a click event.
 *
 * This component renders a customizable button that responds to click events.
 * It can be styled using the `className` prop and displays text passed through
 * the `text` prop.
 *
 * @param {Object} props - The properties object passed to the component.
 * @param {string} [props.className] - Optional additional CSS classes for custom styling.
 * @param {string} props.text - The text to be displayed on the button.
 * @param {function} props.onClick - Callback function to be executed when the button is clicked.
 *
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button: React.FC<Props> = ({ className, text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={
        className + ' w-[256px] h-[64px] rounded-lg grid-center cursor-pointer select-none'
      }>
      <span className="text-[20px]">{text}</span>
    </div>
  );
};
