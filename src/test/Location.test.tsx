import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Location from '../components/Location';

vi.mock('../components/Location.scss', () => ({}));

describe('Location', () => {
  it('renders the section heading', () => {
    render(<Location />);
    expect(screen.getByRole('heading', { name: /Location & Time/i })).toBeInTheDocument();
  });

  it('renders the street address', () => {
    render(<Location />);
    expect(screen.getByText(/10 Derwent Road/i)).toBeInTheDocument();
  });

  it('renders the suburb', () => {
    render(<Location />);
    expect(screen.getByText(/Bowbells 24/i)).toBeInTheDocument();
  });

  it('renders the city', () => {
    render(<Location />);
    expect(screen.getByText(/Gardens, Cape Town/i)).toBeInTheDocument();
  });

  it('renders the arrival time', () => {
    render(<Location />);
    expect(screen.getByText('18:00')).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<Location />);
    expect(screen.getByText(/Saturday, 27 June/i)).toBeInTheDocument();
  });

  it('renders a Google Maps link', () => {
    render(<Location />);
    const link = screen.getByRole('link', { name: /open venue in google maps/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('maps.google.com'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('encodes the address correctly in the maps link', () => {
    render(<Location />);
    const link = screen.getByRole('link', { name: /open venue in google maps/i });
    const href = link.getAttribute('href') ?? '';
    expect(href).toContain('10%20Derwent%20Road');
  });
});
