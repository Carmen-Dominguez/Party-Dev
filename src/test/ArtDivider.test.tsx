import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArtDivider from '../components/ArtDivider';

vi.mock('../components/ArtDivider.scss', () => ({}));

describe('ArtDivider', () => {
  it('renders a decorative image band', () => {
    render(<ArtDivider />);
    const img = screen.getByRole('presentation', { hidden: true });
    expect(img).toHaveAttribute('src', '/v-t-chrysanthemums.jpg');
    expect(img).toHaveAttribute('alt', '');
  });

  it('is hidden from assistive technology', () => {
    const { container } = render(<ArtDivider />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
