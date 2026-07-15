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

  it('renders customized title and RSVP when customization is passed', () => {
    render(
      <Hero
        customization={{
          titleLine1: 'Maya',
          titleLine2: 'Birthday Bash',
          titleColor: '#F7E7CE',
          accentColor: '#ab9d03',
          bgColor: '#611a22',
          titleFontSize: 4,
          titleItalic: true,
          rsvpLabel: 'Count me in',
          rsvpAlert: 'See you there!',
        }}
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Maya');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Birthday Bash');
    expect(screen.getByRole('button', { name: /count me in/i })).toBeInTheDocument();
  });
});
