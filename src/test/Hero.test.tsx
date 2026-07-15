import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

vi.mock('../components/Hero.scss', () => ({}));

describe('Hero', () => {
  it('renders the event title', () => {
    render(<Hero />);
    expect(screen.getByText(/Shirley's/i)).toBeInTheDocument();
    expect(screen.getByText(/Dinner Party/i)).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<Hero />);
    expect(screen.getByText(/27 June/i)).toBeInTheDocument();
  });

  it('renders the location hint', () => {
    render(<Hero />);
    expect(screen.getByText(/Gardens, Cape Town/i)).toBeInTheDocument();
  });

  it('renders the invitation overline', () => {
    render(<Hero />);
    expect(screen.getByText(/You are cordially invited/i)).toBeInTheDocument();
  });

  it('has an accessible landmark label', () => {
    render(<Hero />);
    expect(screen.getByRole('region', { name: /welcome/i })).toBeInTheDocument();
  });
});
