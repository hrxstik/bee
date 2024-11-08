import React from 'react';

interface Props {
  className?: string;
  text: string;
  onClick: () => any;
}

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
