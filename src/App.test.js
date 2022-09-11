import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// db.urls.aggregate([
//   {$group:{_id:{$dateToString:{format:"%Y-%m-%d", date:"$date"}},count:{$sum:1}}},
//   {$sort:{_id:1}}
// ])

// db.urls.aggregate([
//   {$group:{_id:{$month:{date:"$date"}},count:{$sum:1}}}
// ])