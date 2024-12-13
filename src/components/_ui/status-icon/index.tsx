import React from 'react';

import { CircleNotch, Check } from '@phosphor-icons/react';

export const StatusIcon: React.FC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <>
      {loading ? (
        <CircleNotch
          data-testid="icon-loading"
          weight="bold"
          color="white"
          className="size-5 animate-spin"
        />
      ) : (
        <Check data-testid="icon-check" className="size-5" weight="bold" />
      )}
    </>
  );
};
