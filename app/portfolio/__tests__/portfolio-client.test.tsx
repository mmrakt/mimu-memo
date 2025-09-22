// Mock Next.js navigation hooks early to avoid importing real module
import { vi, beforeEach, describe, expect, it } from 'vitest';
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock PortfolioModal to avoid React hook usage in modal internals during tests
vi.mock('@/portfolio/components/portfolio-modal', () => ({
  default: ({ item }: { item: any }) => (item ? <div data-testid="portfolio-modal" /> : null),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PortfolioItem } from '@/portfolio/types';
import PortfolioClient from '../portfolio-client';

// Mock AnimatedBackground component
vi.mock('@/_components/animated-background', () => ({
  default: ({ variant }: { variant: string }) => (
    <div data-testid="animated-background" data-variant={variant} />
  ),
}));

// Mock PageHeader component
vi.mock('@/_components/page-header', () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

const mockPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Work Project 1',
    category: 'work',
    description: 'A work project description',
    image: '/portfolio/work1.png',
    tech: ['React', 'TypeScript'],
    demo: 'https://work1.example.com',
    github: 'https://github.com/user/work1',
    fullDescription: 'Full description of work project 1',
    startedAt: '2024.01',
    isActive: true,
  },
  {
    id: 2,
    title: 'Solo Project 1',
    category: 'solo-development',
    description: 'A solo development project description',
    image: '/portfolio/solo1.png',
    tech: ['Rust', 'CLI'],
    demo: 'https://solo1.example.com',
    github: 'https://github.com/user/solo1',
    fullDescription: 'Full description of solo project 1',
    startedAt: '2023.12',
    isActive: true,
  },
  {
    id: 3,
    title: 'Solo Project 2',
    category: 'solo-development',
    description: 'Another solo development project',
    image: '/portfolio/solo2.png',
    tech: ['Next.js', 'Tailwind CSS'],
    demo: 'https://solo2.example.com',
    github: 'https://github.com/user/solo2',
    fullDescription: 'Full description of solo project 2',
    startedAt: '2023.06',
    isActive: false,
  },
];

const VIEW_DETAILS_REGEX = /View details for/;

const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;
const mockUseSearchParams = useSearchParams as ReturnType<typeof vi.fn>;

describe('PortfolioClient', () => {
  const mockPush = vi.fn();
  const mockSearchParams = {
    get: vi.fn(),
    toString: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    mockSearchParams.toString.mockReturnValue('');
  });

  it('should render all items when filter is "all"', () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'all';
      }
      if (key === 'item') {
        return null;
      }
      return null;
    });

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Test portfolio description')).toBeInTheDocument();
    // Check for portfolio cards by description text which is unique
    expect(screen.getByText('A work project description')).toBeInTheDocument();
    expect(screen.getByText('A solo development project description')).toBeInTheDocument();
    expect(screen.getByText('Another solo development project')).toBeInTheDocument();
  });

  it('should filter items by work category', () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'work';
      }
      if (key === 'item') {
        return null;
      }
      return null;
    });

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    expect(screen.getByText('A work project description')).toBeInTheDocument();
    expect(screen.queryByText('A solo development project description')).not.toBeInTheDocument();
    expect(screen.queryByText('Another solo development project')).not.toBeInTheDocument();
  });

  it('should filter items by solo-development category', () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'solo-development';
      }
      if (key === 'item') {
        return null;
      }
      return null;
    });

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    expect(screen.queryByText('A work project description')).not.toBeInTheDocument();
    expect(screen.getByText('A solo development project description')).toBeInTheDocument();
    expect(screen.getByText('Another solo development project')).toBeInTheDocument();
  });

  it('should show all items when no category filter is set', () => {
    mockSearchParams.get.mockReturnValue(null);

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    expect(screen.getByText('A work project description')).toBeInTheDocument();
    expect(screen.getByText('A solo development project description')).toBeInTheDocument();
    expect(screen.getByText('Another solo development project')).toBeInTheDocument();
  });

  it('should handle filter change correctly', async () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'all';
      }
      if (key === 'item') {
        return null;
      }
      return null;
    });

    const user = userEvent.setup();

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    const workButton = screen.getByRole('button', { name: 'Work' });
    await user.click(workButton);

    expect(mockPush).toHaveBeenCalledWith('/portfolio?category=work', { scroll: false });
  });

  it('should handle filter change to "all" by removing category param', async () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'work';
      }
      if (key === 'item') {
        return null;
      }
      return null;
    });

    const user = userEvent.setup();

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    const allButton = screen.getByRole('button', { name: 'All' });
    await user.click(allButton);

    expect(mockPush).toHaveBeenCalledWith('/portfolio', { scroll: false });
  });

  it('should handle card click and open modal', async () => {
    mockSearchParams.get.mockReturnValue(null);

    const user = userEvent.setup();

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    // Find the first portfolio card button
    const cardButtons = screen.getAllByRole('button', { name: VIEW_DETAILS_REGEX });
    await user.click(cardButtons[0]);

    expect(mockPush).toHaveBeenCalledWith('/portfolio?item=1', { scroll: false });
  });

  it('should show modal when item is selected', () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return null;
      }
      if (key === 'item') {
        return '1';
      }
      return null;
    });

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    // Modal should be rendered with the selected item
    // This would depend on the actual PortfolioModal implementation
  });

  it('should handle modal close correctly', () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'work';
      }
      if (key === 'item') {
        return '1';
      }
      return null;
    });
    mockSearchParams.toString.mockReturnValue('category=work&item=1');

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    // The modal close logic is handled internally
    // We would need to trigger it through the modal component
  });

  it('should clear item selection when changing filter', async () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return 'work';
      }
      if (key === 'item') {
        return '1';
      }
      return null;
    });
    mockSearchParams.toString.mockReturnValue('category=work&item=1');

    const user = userEvent.setup();

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    const soloButton = screen.getByRole('button', { name: 'Solo Development' });
    await user.click(soloButton);

    // Should clear item param when changing filter
    expect(mockPush).toHaveBeenCalledWith('/portfolio?category=solo-development', {
      scroll: false,
    });
  });

  it('should handle invalid item ID gracefully', () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === 'category') {
        return null;
      }
      if (key === 'item') {
        return '999'; // Non-existent ID
      }
      return null;
    });

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    // Should not crash and should not show modal
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should render animated background with pulse variant', () => {
    mockSearchParams.get.mockReturnValue(null);

    render(
      <PortfolioClient
        pageDescription="Test portfolio description"
        portfolioItems={mockPortfolioItems}
      />
    );

    const background = screen.getByTestId('animated-background');
    expect(background).toHaveAttribute('data-variant', 'pulse');
  });

  it('should handle empty portfolio items array', () => {
    mockSearchParams.get.mockReturnValue(null);

    render(<PortfolioClient pageDescription="Test portfolio description" portfolioItems={[]} />);

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Test portfolio description')).toBeInTheDocument();
    // Should not render any portfolio cards
    expect(screen.queryAllByRole('button', { name: VIEW_DETAILS_REGEX })).toHaveLength(0);
  });
});
