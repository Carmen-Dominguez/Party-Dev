import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DressCode from '../components/DressCode';

vi.mock('../components/DressCode.scss', () => ({}));

describe('DressCode', () => {
  it('renders the section heading', () => {
    render(<DressCode />);
    expect(screen.getByRole('heading', { name: /Dress Code/i })).toBeInTheDocument();
  });

  it('renders "Smart Casual"', () => {
    render(<DressCode />);
    // Use exact text match for the code element
    expect(screen.getByText('Smart Casual')).toBeInTheDocument();
  });

  it('renders the attire overline', () => {
    render(<DressCode />);
    expect(screen.getByText('Attire')).toBeInTheDocument();
  });

  it('renders a descriptive paragraph', () => {
    render(<DressCode />);
    expect(screen.getByText(/understated refinement/i)).toBeInTheDocument();
  });
});
