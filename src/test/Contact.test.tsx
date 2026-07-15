import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';

vi.mock('../components/Contact.scss', () => ({}));

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
  });

  it('renders Carmen as a host', () => {
    render(<Contact />);
    expect(screen.getByText('Carmen')).toBeInTheDocument();
  });

  it('renders Shirley as a host', () => {
    render(<Contact />);
    expect(screen.getByText('Shirley')).toBeInTheDocument();
  });

  it('renders both hosts in a list', () => {
    render(<Contact />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('renders introductory copy', () => {
    render(<Contact />);
    const paragraphs = screen.getAllByText(/RSVPs, dietary requirements/i);
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders as a footer landmark', () => {
    render(<Contact />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the current year in the copyright', () => {
    render(<Contact />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
