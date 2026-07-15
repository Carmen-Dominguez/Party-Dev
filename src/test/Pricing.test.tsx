import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pricing from '../components/Pricing';

vi.mock('../components/Pricing.scss', () => ({}));

describe('Pricing', () => {
  it('renders the section heading', () => {
    render(<Pricing />);
    expect(screen.getByRole('heading', { name: /Pricing/i })).toBeInTheDocument();
  });

  it('renders the dinner price', () => {
    render(<Pricing />);
    expect(screen.getByText('R200')).toBeInTheDocument();
  });

  it('renders the wine price', () => {
    render(<Pricing />);
    expect(screen.getByText('R30')).toBeInTheDocument();
  });

  it('renders the champagne price', () => {
    render(<Pricing />);
    expect(screen.getByText('R40')).toBeInTheDocument();
  });

  it('renders all three pricing items as list items', () => {
    render(<Pricing />);
    const list = screen.getByRole('list', { name: /pricing information/i });
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('shows "per person" note for dinner', () => {
    render(<Pricing />);
    const notes = screen.getAllByText(/per person/i);
    expect(notes.length).toBeGreaterThan(0);
  });

  it('shows "per glass" note for beverages', () => {
    render(<Pricing />);
    const notes = screen.getAllByText(/per glass/i);
    expect(notes).toHaveLength(2);
  });
});
