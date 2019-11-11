import * as React from 'react';
import { Container, SimpleButton, Title } from './components';

const items = (() => {
  const itemIndexes = [0, 1, 2, 3, 4, 5];

  const getRandomItem = (category) => {
    const rngIndex = Math.floor(Math.random() * itemIndexes.length);
    const itemNumber = itemIndexes[rngIndex];
    itemIndexes.splice(rngIndex, 1);
    return `${category}-Item-${itemNumber}`;
  };

  return ['Land', 'Sea', 'Sky'].reduce(
    (acc, category) => ({
      ...acc,
      [category]: Array(Math.random() < 0.5 ? 1 : 2)
        .fill(0)
        .map(() => getRandomItem(category))
    }),
    {}
  );
})();

export const PurchasesHome = ({ setRoute }) => (
  <Container backgroundColor={'#9d9'}>
    <Title>Categories Purchased</Title>
    {Object.keys(items).map((category, key) => (
      <SimpleButton
        name={category}
        key={key}
        onPress={() =>
          setRoute({
            route: 'CategoryView',
            navigationTitle: 'Purchases',
            params: {
              category,
              backgroundColor: '#9f9',
              items: items[category]
            }
          })
        }
      />
    ))}
  </Container>
);
