import React from 'react';
import './button.scss';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const className = ['ui-button', `ui-button--${size}`, primary ? 'ui-button--primary' : 'ui-button--secondary'].join(' ');

  const style = backgroundColor ? { backgroundColor } as React.CSSProperties : undefined;

  return (
    <button type="button" className={className} style={style} {...props}>
      {label}
    </button>
  );
};

export default Button;
