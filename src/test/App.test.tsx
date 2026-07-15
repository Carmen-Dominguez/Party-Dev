import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('../styles/global.scss', () => ({}));
vi.mock('../learn/LearnLayout.scss', () => ({}));
vi.mock('../learn/InspectorPanel.scss', () => ({}));
vi.mock('../learn/TourMode.scss', () => ({}));
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

describe('App', () => {
  it('renders learn mode by default', () => {
    render(<App />);
    expect(screen.getByText('Party Page Lab')).toBeInTheDocument();
    expect(screen.getByTitle(/live party preview/i)).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /code inspector/i })).toBeInTheDocument();
  });

  it('switches to tour mode and shows dinner party sections', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /see finished party/i }));

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /A Night of Fun/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /^Pricing$/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Dress Code/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Location/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('updates the hero title from young-explorer controls', async () => {
    const user = userEvent.setup();
    render(<App />);

    const firstLine = screen.getByLabelText(/first line of the name/i);
    await user.clear(firstLine);
    await user.type(firstLine, 'Maya');

    expect(screen.getByDisplayValue('Maya')).toBeInTheDocument();
    expect((screen.getByLabelText(/html code/i) as HTMLTextAreaElement).value).toMatch(/Maya/);
  });

  it('opens lesson 2 and changes the background color', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /next: clothes/i }));

    expect(screen.getByText(/Lesson 2:/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the room/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Wine$/i }));

    expect((screen.getByLabelText(/css code/i) as HTMLTextAreaElement).value).toMatch(
      /#611a22/i,
    );
  });

  it('styles the title size and italic from clothes controls', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: /clothes/i }));

    const size = screen.getByLabelText(/title size/i);
    await user.click(size);
    fireEvent.change(size, { target: { value: '5' } });

    await user.click(screen.getByRole('checkbox', { name: /fancy italic/i }));

    const css = (screen.getByLabelText(/css code/i) as HTMLTextAreaElement).value;
    expect(css).toMatch(/font-size:\s*5rem/);
    expect(css).toMatch(/font-style:\s*italic/);
  });

  it('opens lesson 3 and updates the RSVP alert message', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /next: clothes/i }));
    await user.click(screen.getByRole('button', { name: /next: muscles/i }));

    expect(screen.getByText(/Lesson 3:/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /rsvp button/i })).toBeInTheDocument();

    await user.selectOptions(
      screen.getByLabelText(/rsvp alert message/i),
      'Yay! See you at the dinner party!',
    );

    expect((screen.getByLabelText(/js code/i) as HTMLTextAreaElement).value).toMatch(
      /Yay! See you at the dinner party!/,
    );
  });
});
