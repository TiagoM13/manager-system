import React from 'react';

import { Meta } from '@storybook/react';

import { Card as CardComponent } from '.';

export default {
  title: 'Components/Card',
  component: CardComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Card = () => {
  return (
    <div className="max-w-[540px]">
      <CardComponent>
        <p className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          officiis repellat qui non ducimus. Qui, ex asperiores earum, nostrum
          quos labore quidem provident temporibus ea eius harum magnam
          laudantium fugiat?
        </p>
        <p className="mb-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque nihil
          temporibus fuga iste vero asperiores cum ipsam inventore maiores fugit
          repellendus deserunt, iure odio molestias dolores iusto unde et
          voluptatibus.
        </p>
      </CardComponent>
    </div>
  );
};
