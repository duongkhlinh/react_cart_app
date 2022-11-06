import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import mockData from './mockData.json'

const server = setupServer(
  rest.get('https://fakestoreapi.com/products/', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())

// Only 3 tests were created for demonstration purpose
// Therefore, not all test cases are covered here

test('succeeds if there is "Loading..." after the app renders', () => {
  render(<App />);
  const loadingElement = screen.getAllByText("Loading...");
  expect(loadingElement).toHaveLength(1);
});

test('succeeds if renders products after API call', async () => {
  render(<App />);
  const TShirtElement = await screen.findByText("Mens Casual Premium Slim Fit T-Shirts");
  expect(TShirtElement).toBeInTheDocument();
})

test('succeeds if product is displayed in cart after being added', async () => {
  render(<App />);
  const addToCartButtons = await screen.findAllByText('Add to Cart');
  const firstButton = addToCartButtons[0];
  const firstProductBeforeClicked = screen.getAllByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
  expect(firstProductBeforeClicked).toHaveLength(1);
  fireEvent.click(firstButton);
  const firstProductAfterClicked = screen.getAllByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
  expect(firstProductAfterClicked).toHaveLength(2);
  const clearButton = screen.getByText("Clear Cart");
  fireEvent.click(clearButton);
})

test('succeeds if total price is correctly calculated', async () => {
  render(<App />);
  const addToCartButtons = await screen.findAllByText('Add to Cart');
  const firstButton = addToCartButtons[0];
  fireEvent.click(firstButton);
  const payButtonFirstClick = screen.getByText("Pay $110");
  expect(payButtonFirstClick).toBeInTheDocument();
  fireEvent.click(firstButton);
  const payButtonSecondClick = screen.getByText("Pay $220");
  expect(payButtonSecondClick).toBeInTheDocument();
})