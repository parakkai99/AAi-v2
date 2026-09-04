import React from 'react';
import { ArchitectAnyHeader, ArchitectAnyHeaderProps } from '../header/ArchitectAnyHeader';

export type HeaderProps = ArchitectAnyHeaderProps;

export const Header: React.FC<HeaderProps> = (props) => {
  return <ArchitectAnyHeader {...props} />;
};
