import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import {twMerge} from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus-visible:outline-indigo-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'hover:bg-gray-100',
        link: 'text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline'
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  icon,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        buttonVariants({ variant, size, className }),
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className={children ? 'mr-3' : ''}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
