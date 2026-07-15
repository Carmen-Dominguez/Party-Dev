import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventDetails from '../components/EventDetails';

vi.mock('../components/EventDetails.scss', () => ({}));

describe('EventDetails', () => {
  it('renders the section heading', () => {
    render(<EventDetails />);
    expect(screen.getByText(/A Night of Elegance/i)).toBeInTheDocument();
  });

  it('renders the date information', () => {
    render(<EventDetails />);
    expect(screen.getByText(/27 June/i)).toBeInTheDocument();
  });

  it('renders the arrival time', () => {
    render(<EventDetails />);
    expect(screen.getByText('18:00')).toBeInTheDocument();
  });

  it('renders the venue city', () => {
    render(<EventDetails />);
    expect(screen.getByText(/Gardens, Cape Town/i)).toBeInTheDocument();
  });

  it('renders three detail items', () => {
    render(<EventDetails />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });
});
