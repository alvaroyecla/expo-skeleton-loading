import type { PropsWithChildren, ReactNode } from 'react';

export interface SkeletonLoadingProps extends PropsWithChildren {
  /**
   * background of the loader componenet
   */
  background: string;
  /**
   * highlight color of the loader component
   */
  highlight: string;
  children?: ReactNode;
}

declare const SkeletonLoading: (props: SkeletonLoadingProps) => JSX.Element;
export default SkeletonLoading;
