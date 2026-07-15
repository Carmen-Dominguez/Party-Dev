import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Stub SCSS imports so Vitest doesn't try to parse them
vi.mock('../styles/global.scss', () => ({}));
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders the main element', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders all six sections', () => {
    render(<App />);
    // Hero — aria-label="Welcome"
    expect(screen.getByRole('region', { name: /welcome/i })).toBeInTheDocument();
    // EventDetails — aria-labelledby points to h2 "A Night of Elegance"
    expect(screen.getByRole('region', { name: /A Night of Elegance/i })).toBeInTheDocument();
    // Pricing — aria-labelledby points to h2 "Pricing"
    expect(screen.getByRole('region', { name: /^Pricing$/i })).toBeInTheDocument();
    // DressCode — aria-labelledby points to h2 "Dress Code"
    expect(screen.getByRole('region', { name: /Dress Code/i })).toBeInTheDocument();
    // Location — aria-labelledby points to h2 "Location & Time"
    expect(screen.getByRole('region', { name: /Location/i })).toBeInTheDocument();
    // Contact — rendered as footer (contentinfo landmark)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
